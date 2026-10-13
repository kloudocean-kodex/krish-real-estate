import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
try {
  for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m && !process.env[m[1]])
      process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, "");
  }
} catch {}
const id = process.env.EAGLE_CRM_CLIENT_ID,
  secret = process.env.EAGLE_CRM_CLIENT_SECRET;
if (!id || !secret) {
  if (process.env.CF_PAGES)
    throw new Error(
      "Eagle credentials required for production listing refresh",
    );
  console.log("Using checked-in public listing snapshot");
  process.exit(0);
}
const base = "https://www.eagleagent.com.au";
const auth = await fetch(`${base}/api/v3/token`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${id}:${secret}`,
    "Content-Type": "application/json",
  },
  signal: AbortSignal.timeout(15000),
});
const token = (await auth.json())?.data?.token?.token;
if (!auth.ok || !token) throw new Error("Eagle authentication failed");
const fields = `id status saleOrLease displayOnWebsite addressDisplay advertisedPrice formattedSoldPrice soldDisplay headline description landSize landSizeUnits updatedAt documents{url filename statementOfInformation shareWithBuyersOrPotentialTenants} images{url position} floorplans{url position} onlineTour1Url onlineTour2Url videoUrl address{postcode{... on PostcodeAustralia{suburb state postcode}} streetNo street unit} agents{name email mobile title} listingDetails{__typename ... on ResidentialSale{bedrooms bathrooms garageSpaces carportSpaces openCarSpaces propertyType} ... on ResidentialRental{bedrooms bathrooms garageSpaces carportSpaces openCarSpaces propertyType}} inspections{nodes{start finish}}`;
let cursor = null,
  properties = [];
do {
  const response = await fetch(`${base}/api/v3/graphql`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query($after:String){properties(first:50,after:$after){nodes{${fields}} pageInfo{hasNextPage endCursor}}}`,
      variables: { after: cursor },
    }),
    signal: AbortSignal.timeout(20000),
  });
  const result = await response.json();
  if (!response.ok || result.errors)
    throw new Error(
      `Eagle public listings query failed: ${JSON.stringify(result.errors)}`,
    );
  properties.push(...result.data.properties.nodes);
  cursor = result.data.properties.pageInfo.hasNextPage
    ? result.data.properties.pageInfo.endCursor
    : null;
} while (cursor);
const title = (s) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
const clean = (s) =>
  (s || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
const listings = properties
  .filter(
    (p) =>
      p.displayOnWebsite &&
      ["ACTIVE", "UNDER_OFFER", "SOLD", "LEASED"].includes(p.status) &&
      p.images?.length &&
      p.address?.postcode,
  )
  .map((p) => {
    const a = p.address,
      pc = a.postcode,
      full = p.addressDisplay === "FULL_ADDRESS";
    const street = full
      ? [a.unit ? `${a.unit}/` : "", a.streetNo, a.street]
          .filter(Boolean)
          .join(" ")
          .replace("/ ", "/")
      : "Address available on request";
    const suburb = title(pc.suburb),
      display = full
        ? `${street}, ${suburb} ${pc.state} ${pc.postcode}`
        : `${suburb} ${pc.state} ${pc.postcode}`;
    const details = p.listingDetails || {};
    const isRent = p.saleOrLease === "LEASE";
    const status = {
      ACTIVE: "active",
      UNDER_OFFER: "under-offer",
      SOLD: "sold",
      LEASED: "leased",
    }[p.status];
    const price =
      status === "sold"
        ? p.soldDisplay && p.formattedSoldPrice
          ? `Sold — ${p.formattedSoldPrice}`
          : "Sold — price undisclosed"
        : status === "leased"
          ? "Leased"
          : clean(p.advertisedPrice) || "Contact agent";
    const slug = full
      ? `${street}-${suburb}-${pc.postcode}`
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "") + `-${p.id}`
      : `${suburb}-${p.id}`.toLowerCase();
    return {
      listingId: p.id,
      status,
      transactionType: isRent ? "rent" : "sale",
      propertyType: title(
        details.propertyType ||
          details.__typename?.replace("Residential", "") ||
          "Land",
      ),
      address: {
        display,
        street,
        suburb,
        state: pc.state,
        postcode: pc.postcode,
      },
      price: {
        display: price,
        ...(!["sold", "leased"].includes(status) && /\$[\d,]+/.test(price)
          ? { from: Number(price.match(/\$([\d,]+)/)[1].replaceAll(",", "")) }
          : {}),
      },
      beds: details.bedrooms || 0,
      baths: details.bathrooms || 0,
      cars:
        (details.garageSpaces || 0) +
        (details.carportSpaces || 0) +
        (details.openCarSpaces || 0),
      ...(p.landSizeUnits?.toLowerCase() === "square metres" ||
      p.landSizeUnits === "Square meters" ||
      p.landSizeUnits === "sqm"
        ? { landSize: parseFloat(p.landSize) || undefined }
        : {}),
      description: (p.description || '').replace(/<br\s*\/?\s*>|<\/(?:p|div|li)>/gi,'\n\n').replace(/<[^>]*>/g,'').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/\*\*(.*?)\*\*/g,'$1').replace(/[ \t]+/g,' ').replace(/\n{3,}/g,'\n\n').trim(),
      statementOfInformation:
        p.documents
          ?.find((d) => d.statementOfInformation && d.url)
          ?.url?.replace(/^http:/, "https:") || undefined,
      features: [],
      media: [...p.images
        .filter((i) => /^https?:\/\//.test(i.url || ""))
        .sort((a, b) => (a.position || 0) - (b.position || 0))
        .map((i, index) => ({
          url: i.url.replace(/^http:/, "https:"),
          alt: `${display} — property photograph ${index + 1}`,
          type: "image",
        })),...(p.floorplans||[]).filter(f=>/^https?:\/\//.test(f.url||"" )).map((f,index)=>({url:f.url.replace(/^http:/,"https:"),alt:`${display} — floor plan ${index+1}`,type:"floorplan"}))],
      tours: [p.onlineTour1Url,p.onlineTour2Url,p.videoUrl].filter(u=>/^https:\/\//.test(u||'')),
      inspections: (p.inspections?.nodes || [])
        .filter((i) => i.start && new Date(i.start) > new Date())
        .map((i) => {
          const fmt = new Intl.DateTimeFormat("en-CA", {
            timeZone: "Australia/Melbourne",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
          const time = (d) =>
            new Intl.DateTimeFormat("en-GB", {
              timeZone: "Australia/Melbourne",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }).format(new Date(d));
          return {
            date: fmt.format(new Date(i.start)),
            startTime: time(i.start),
            endTime: time(i.finish || i.start),
          };
        }),
      agents: p.agents
        .filter((a) => a.name && a.mobile)
        .map((a) => ({
          name: a.name,
          phone: a.mobile,
          email: a.email || "chirag@krishrealestate.com.au",
          photo: a.name.toLowerCase().includes("rohan")
            ? "/images/team-rohan.webp"
            : a.name.toLowerCase().includes("meenu")
              ? "/images/team-meenu.webp"
              : a.name.toLowerCase().includes("jagtar")
                ? "/images/team-jagtar.webp"
                : a.name.toLowerCase().includes("chirag")
                  ? "/images/team-chirag.webp"
                  : undefined,
        })),
      slug,
      updatedAt: p.updatedAt,
    };
  })
  .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
mkdirSync("src/data", { recursive: true });
writeFileSync(
  "src/data/listings.json",
  JSON.stringify({ syncedAt: new Date().toISOString(), listings }, null, 2) +
    "\n",
);
console.log(
  `Synced ${listings.length} public listings (${listings.filter((l) => ["active", "under-offer"].includes(l.status)).length} current), private fields excluded.`,
);
