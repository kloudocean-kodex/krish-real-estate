import { mkdirSync } from 'node:fs';
import sharp from 'sharp';

// Re-encode the existing generated artwork without cropping or altering the scene.
mkdirSync('public/images/areas', { recursive: true });
for (const suburb of ['wollert', 'epping', 'craigieburn', 'donnybrook']) {
  for (const width of [480, 720, 1200]) {
    const image = sharp(`public/images/suburb-${suburb}.jpg`).resize({ width, withoutEnlargement: true });
    await image.clone().avif({ quality: 65, effort: 5 }).toFile(`public/images/areas/${suburb}-${width}.avif`);
    await image.clone().webp({ quality: 82, effort: 5 }).toFile(`public/images/areas/${suburb}-${width}.webp`);
  }
}
console.log('Prepared 24 responsive suburb artwork files. Original scenes retained.');
