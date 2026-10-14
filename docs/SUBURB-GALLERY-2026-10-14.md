# Suburb gallery and safe image delivery — 14 October 2026

The homepage Local Knowledge section now uses a warm stone ground, ivory framed cards, fine champagne borders, larger serif names and more generous image space. The Areas index and individual guides share the same four existing generated suburb scenes. Scene content is retained without cropping or semantic editing. The originals are `public/images/suburb-{wollert,epping,craigieburn,donnybrook}.jpg`; they are illustrative artwork, not authenticated location photographs. A discreet note outside the cards and accurate alt text make that distinction clear.

Responsive AVIF and WebP assets are saved in `public/images/areas/{slug}-{480,720,1200}.{avif,webp}`. `src/components/areas/AreaImage.tsx` supplies the same artwork and responsive source selection on all three surfaces. Reproduce the encodings with `node scripts/prepare-area-images.mjs`. This pass reuses previous generated artwork; no new image-generation call or invented generation prompt is involved.

## Measured performance issue and scoped fix

The [03:25 IST PageSpeed baseline](https://pagespeed.web.dev/analysis/https-krishrealestate-com-au/tejby815bg?form_factor=mobile) measured mobile 83, desktop 100. LCP was the hero headline, with 2,340 ms element render delay. It also flagged oversized first property-card images, with approximately 111 KiB combined estimated savings. Their source hints used `100vw` even though actual cards have gutters. At some mobile widths this put the requested size just above the available 720px candidate, causing selection of 1080px files.

The shared property card now declares its real gutter/grid width. Existing 720px photos can be selected where appropriate without changing their quality, visual treatment or desktop source. The same fix covers homepage previews, catalogues and guides. Generated suburb JPEGs are separately re-encoded into modern responsive files. Fonts, hero artwork, video controls and enquiry handling are retained.

The [Google LCP guidance](https://web.dev/articles/optimize-lcp) supports checking the actual largest element and its delays before optimising. [Next.js CSS inlining](https://nextjs.org/docs/app/api-reference/config/next-config-js/inlineCss) was researched but not enabled: it is experimental, changes CSS caching and is explicitly not recommended for production. No score improvement is assumed before a new measurement.

## Guide accuracy

The guide's “current properties” filter now includes active and under-offer records only; sold and leased history no longer appears as current stock. Unsupported blanket distance, owner-occupier and growth statements were removed from the overview strip. Metadata now describes the information actually present rather than promising median prices that are not supplied.

## Release evidence

Pre-release checks passed: 127 generated routes, lint, diff whitespace check, and export audit (122 public pages, 1,390 files, no broken local references). All 24 image variants have the declared pixel width. The 720px AVIF files are 73,516 bytes (Wollert), 87,544 (Epping), 79,146 (Craigieburn) and 63,354 (Donnybrook), compared with original JPEGs of roughly 1 MB each.

Browser checks covered 320px and 390px phones, a 768px tablet and 1440px desktop. There is no horizontal overflow in the checked gallery and guide views. The Areas-index Wollert link opens the matching guide and artwork. Exported current-property URLs exactly match the active/under-offer feed for all four areas: Wollert 1, Epping 0, Craigieburn 1 and Donnybrook 4. Epping shows an honest empty state and search-brief action.

Release `2c8c067` is deployed at [c9aaf25e.krish-real-estate.pages.dev](https://c9aaf25e.krish-real-estate.pages.dev) and the public domain. [GitHub quality checks](https://github.com/kloudocean-kodex/krish-real-estate/actions/runs/38512469760) passed. Live browser checks confirmed the warm stone background, four matching images, Areas-index navigation and Wollert's matching guide/current-property count. Desktop, phone and guide screenshots are archived as `live-suburb-gallery-desktop-2026-10-14.png`, `live-suburb-gallery-phone-2026-10-14.png` and `live-suburb-guide-desktop-2026-10-14.png` in `audit-private/evidence/`.

## Fresh performance result

One new [PageSpeed analysis](https://pagespeed.web.dev/analysis/https-krishrealestate-com-au/oezuz2frv7?form_factor=mobile) was run after publication, **14 October 2026 at 10:13 IST**.

| Metric | Mobile | Desktop |
| --- | --- | --- |
| Performance | 84 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |
| First Contentful Paint | 2.1 s | 0.5 s |
| Largest Contentful Paint | 3.8 s | 0.7 s |
| Total Blocking Time | 20 ms | 10 ms |
| Cumulative Layout Shift | 0 | 0 |
| Speed Index | 4.5 s | 0.8 s |

The mobile image-delivery opportunity fell from 116 KiB to 4 KiB; the three oversized property-card images are no longer flagged in the summary. Their 1080px files total 185,448 bytes, while the existing 720px files total 92,270 bytes. The width hints now permit the appropriate smaller sources. This is a measurable transfer-size improvement; the score change from 83 to 84 is modest and can fall within run-to-run lab variation.

Headline rendering and render-blocking CSS remain the larger mobile opportunities. No experimental CSS pipeline, new typeface, degraded hero artwork or extra third-party script was introduced to chase the score. No CrUX field data was available. This is a single Lighthouse 13.5.0 lab run with slow-4G mobile throttling, not a guarantee for every visit.

Report DOM readbacks and screenshots are archived as `pagespeed-suburb-gallery-mobile-2026-10-14.*` and `pagespeed-suburb-gallery-desktop-2026-10-14.*` in `audit-private/evidence/`.
