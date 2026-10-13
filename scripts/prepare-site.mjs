import { readFileSync, writeFileSync, copyFileSync } from "node:fs";
import sharp from "sharp";
const { listings } = JSON.parse(readFileSync("src/data/listings.json", "utf8"));
const redirects = [
  ["/contact-us", "/contact/"],
  ["/get-a-free-appraisal", "/sell/property-appraisal/"],
  ["/properties-for-sale", "/buy/"],
  ["/properties-for-rent", "/rent/"],
  ["/land-for-sale", "/buy/?type=land"],
  ["/sold-properties", "/sold/"],
  ["/our-team", "/team/"],
  ["/privacy-policy", "/privacy/"],
  ["/terms-and-conditions", "/terms/"],
];
for (const l of listings)
  for (const section of [
    "properties-for-sale",
    "land-for-sale",
    "properties-for-rent",
    "sold-properties",
  ])
    redirects.push([
      `/${section}/eagle_${l.listingId}`,
      `/property/${l.slug}/`,
    ]);
redirects.push(
  ["/our-team/*", "/team/"],
  ["/properties-for-sale/*", "/buy/"],
  ["/properties-for-rent/*", "/rent/"],
  ["/land-for-sale/*", "/buy/"],
  ["/latest-news/*", "/areas/"],
  ["/latest-news", "/areas/"],
);
writeFileSync(
  "public/_redirects",
  redirects.map(([a, b]) => `${a} ${b} 301`).join("\n") + "\n",
);
writeFileSync(
  "public/_routes.json",
  JSON.stringify({ version: 1, include: ["/api/*"], exclude: [] }, null, 2) +
    "\n",
);
copyFileSync("public/images/krish-favicon.ico", "public/favicon.ico");
const hero = listings.find(l => ['active', 'under-offer'].includes(l.status) && l.transactionType === 'sale' && l.propertyType === 'House');
if (hero?.media[0]?.url?.startsWith('/images/properties/')) {
  await sharp(`public${hero.media[0].url}`)
    .resize(640, 1138, { fit: 'cover', position: 'centre' })
    .webp({ quality: 78 })
    .toFile('public/images/hero-mobile.webp');
}
await sharp("public/images/krish-logo-stacked.png")
  .resize(180, 180, { fit: "contain", background: "#f4f1ea" })
  .png()
  .toFile("public/apple-touch-icon.png");
const logo = readFileSync("public/apple-touch-icon.png").toString("base64");
writeFileSync(
  "public/icon.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><image width="180" height="180" href="data:image/png;base64,${logo}"/></svg>`,
);
console.log(
  `Prepared ${redirects.length} migration redirects and brand icons.`,
);

// Use supplied brand artwork for social sharing, never a fictional property.
const socialLogo=await sharp('public/images/krish-logo-stacked.png').resize({height:500}).toBuffer();
await sharp({create:{width:1200,height:630,channels:3,background:'#f8f5ee'}}).composite([{input:socialLogo,gravity:'centre'}]).jpeg({quality:88}).toFile('public/images/og-brand.jpg');
