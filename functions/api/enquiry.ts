import {
  pushLeadToEagleCRM,
  type EagleLead,
  type EagleConfig,
} from "../../src/lib/eagleCrm";
interface Env extends EagleConfig {
  TURNSTILE_SECRET?: string;
  ENQUIRIES: KVNamespace;
}
const json = (body: unknown, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
const types = new Set([
  "selling",
  "buying",
  "leasing",
  "general",
  "appraisal",
  "rental-appraisal",
]);
export const onRequestPost: PagesFunction<Env> = async (context) => {
  const request = context.request,
    url = new URL(request.url);
  if (request.headers.get("Origin") !== url.origin)
    return json(
      { success: false, error: "Please submit from the Krish website." },
      403,
    );
  if (!request.headers.get("Content-Type")?.includes("application/json"))
    return json({ success: false, error: "JSON required" }, 415);
  if (Number(request.headers.get("Content-Length") || 0) > 16000)
    return json({ success: false, error: "Request too large" }, 413);
  let raw: Record<string, unknown>;
  try {
    const body = await request.text();
    if (body.length > 16000)
      return json({ success: false, error: "Request too large" }, 413);
    raw = JSON.parse(body);
    if (!raw || Array.isArray(raw) || typeof raw !== "object")
      throw new Error();
  } catch {
    return json({ success: false, error: "Invalid request" }, 400);
  }
  if (raw.website)
    return json({ success: false, error: "Unable to submit" }, 400);
  const fields: Record<string, string> = {};
  for (const key of [
    "name",
    "email",
    "phone",
    "message",
    "enquiry_type",
    "source",
    "address",
    "property_type",
    "bedrooms",
    "bathrooms",
    "timeline",
    "notes",
    "property_id",
    "page_url",
    "referrer",
    "campaign",
    "request_id",
  ]) {
    if (raw[key] !== undefined && typeof raw[key] !== "string")
      return json({ success: false, error: "Invalid field" }, 400);
    fields[key] = typeof raw[key] === "string" ? raw[key].trim() : "";
  }
  const p = fields;
  if (
    p.name.length < 2 ||
    p.name.length > 120 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email) ||
    p.email.length > 254 ||
    !/^\+?[\d\s().-]{8,25}$/.test(p.phone) ||
    !types.has(p.enquiry_type) ||
    !p.source ||
    !/^[-a-f0-9]{36}$/i.test(p.request_id) ||
    [p.message, p.notes].some((v) => v.length > 4000) ||
    [p.address, p.page_url, p.referrer, p.campaign].some(
      (v) => v.length > 500,
    ) ||
    (p.property_id && !/^\d{1,12}$/.test(p.property_id))
  )
    return json(
      {
        success: false,
        error: "Please check your name, email, phone and enquiry details.",
      },
      400,
    );
  if (!context.env.TURNSTILE_SECRET)
    return json(
      {
        success: false,
        error:
          "Security verification is temporarily unavailable. Please call 0479 092 216.",
      },
      503,
    );
  if (context.env.TURNSTILE_SECRET) {
    const token = raw["cf-turnstile-response"];
    if (typeof token !== "string" || !token || token.length > 2048)
      return json(
        { success: false, error: "Please complete the security check." },
        403,
      );
    try {
      const check = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            secret: context.env.TURNSTILE_SECRET,
            response: token,
            remoteip: request.headers.get("CF-Connecting-IP") || "",
          }),
          signal: AbortSignal.timeout(10000),
        },
      );
      const result = (await check.json()) as {
        success: boolean;
        hostname: string;
        action: string;
      };
      if (
        !check.ok ||
        result.success !== true ||
        result.hostname !== url.hostname ||
        result.action !== "enquiry"
      )
        return json(
          {
            success: false,
            error: "Security check expired. Please try again.",
          },
          403,
        );
    } catch {
      return json(
        {
          success: false,
          error: "Security check unavailable. Please try again.",
        },
        503,
      );
    }
  }
  if (!context.env.ENQUIRIES)
    return json(
      {
        success: false,
        error: "Enquiries temporarily unavailable. Please call 0479 092 216.",
      },
      503,
    );
  const key = `request:${p.request_id}`,
    existing = await context.env.ENQUIRIES.get(key);
  if (existing) {
    const saved = JSON.parse(existing);
    return json(saved, saved.success ? 200 : 503);
  }
  const digest = Array.from(
    new Uint8Array(
      await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(
          request.headers.get("CF-Connecting-IP") || "unknown",
        ),
      ),
    ),
  )
    .map((n) => n.toString(16).padStart(2, "0"))
    .join("");
  const rateKey = `rate:${digest}:${Math.floor(Date.now() / 600000)}`;
  const count = Number((await context.env.ENQUIRIES.get(rateKey)) || 0);
  if (count >= 5)
    return json(
      {
        success: false,
        error: "Please wait a few minutes or call 0479 092 216.",
      },
      429,
    );
  await context.env.ENQUIRIES.put(rateKey, String(count + 1), {
    expirationTtl: 660,
  });
  const payload: EagleLead = {
    ...p,
    name: p.name,
    email: p.email,
    phone: p.phone,
    enquiry_type: p.enquiry_type,
    source: p.source,
  };
  const crm = await pushLeadToEagleCRM(context.env, payload);
  const result = {
    success: crm.success,
    reference: p.request_id,
    channels: {
      crm: crm.success ? "synced" : crm.contactId ? "partial" : "failed",
      notification: "eagle",
    },
    ...(crm.success
      ? {}
      : {
          error: crm.contactId
            ? "Your details were saved, but the enquiry needs review. Please call 0479 092 216 and quote your reference."
            : "We could not send your enquiry. Please try again or call 0479 092 216.",
        }),
  };
  if (crm.success || crm.contactId)
    await context.env.ENQUIRIES.put(key, JSON.stringify(result), {
      expirationTtl: 86400,
    });
  console.log(
    JSON.stringify({
      event: "enquiry",
      reference: p.request_id,
      stage: crm.stage,
      notification: "eagle",
    }),
  );
  return json(result, crm.success ? 200 : 503);
};
