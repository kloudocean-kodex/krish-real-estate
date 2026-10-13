import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import sharp from "sharp";
const data = JSON.parse(readFileSync("src/data/listings.json", "utf8"));
mkdirSync("public/images/properties", { recursive: true });
const jobs = data.listings
  .flatMap((l) => l.media.slice(0, 2).map((m, index) => ({ l, m, index })))
  .filter((j) => j.m.url.startsWith("https://"));
let cursor = 0,
  downloaded = 0;
await Promise.all(
  Array.from({ length: 5 }, async () => {
    while (cursor < jobs.length) {
      const { l, m, index } = jobs[cursor++];
      const hash = createHash("sha256").update(m.url).digest("hex").slice(0, 8);
      const name = `${l.listingId}-${index}-${hash}.webp`;
      const dest = `public/images/properties/${name}`;
      if (!existsSync(dest)) {
        const response = await fetch(m.url, {
          signal: AbortSignal.timeout(30000),
        });
        if (!response.ok)
          throw new Error(
            `Photo unavailable for listing ${l.listingId}: ${response.status}`,
          );
        await sharp(Buffer.from(await response.arrayBuffer()))
          .rotate()
          .resize({
            width: index === 0 ? 1600 : 1200,
            withoutEnlargement: true,
          })
          .webp({ quality: 80 })
          .toFile(dest);
        downloaded++;
      }
      m.url = `/images/properties/${name}`;
      if (index === 0) {
        const variants = [];
        const originalWidth = (await sharp(dest).metadata()).width;
        for (const width of new Set([360, 720, 1080].map(w => Math.min(w, originalWidth)))) {
          const variant = name.replace('.webp', `-${width}.webp`);
          const path = `public/images/properties/${variant}`;
          if (!existsSync(path)) await sharp(dest)
            .resize({ width, withoutEnlargement: true }).webp({ quality: 78 }).toFile(path);
          variants.push(`/images/properties/${variant} ${width}w`);
        }
        m.srcSet = variants.join(', ');
      }
    }
  }),
);
writeFileSync("src/data/listings.json", JSON.stringify(data, null, 2) + "\n");
writeFileSync(
  "src/data/listing-summaries.json",
  JSON.stringify(
    data.listings.map((l) => ({
      ...l,
      description: l.description.slice(0, 180),
      media: l.media.slice(0, 1),
      features: [],
    })),
    null,
    2,
  ) + "\n",
);
console.log(
  `Optimised catalogue photography: ${downloaded} downloaded; ${jobs.length} ready.`,
);
