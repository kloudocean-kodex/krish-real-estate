import type { EagleLead } from "./eagleCrm";
export async function submitEnquiry(
  payload: EagleLead,
  form: HTMLFormElement,
): Promise<{ success: boolean; error?: string; reference?: string }> {
  const fields = new FormData(form),
    requestId = form.dataset.requestId || crypto.randomUUID();
  form.dataset.requestId = requestId;
  const params = new URLSearchParams(window.location.search);
  try {
    const response = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        request_id: requestId,
        page_url: window.location.origin + window.location.pathname,
        referrer: document.referrer ? new URL(document.referrer).origin : "",
        campaign: ["utm_source", "utm_medium", "utm_campaign"]
          .map((k) => (params.has(k) ? `${k}=${params.get(k)}` : ""))
          .filter(Boolean)
          .join("&")
          .slice(0, 500),
        website: fields.get("website") || "",
        "cf-turnstile-response": fields.get("cf-turnstile-response") || "",
      }),
      signal: AbortSignal.timeout(60000),
    });
    const data = (await response.json()) as {
      success?: boolean;
      error?: string;
      reference?: string;
    };
    return {
      success: response.ok && data.success === true,
      error: data.error,
      reference: data.reference,
    };
  } catch {
    return {
      success: false,
      error:
        "We could not confirm delivery. Please call 0479 092 216 or retry using the same form.",
      reference: requestId,
    };
  }
}
