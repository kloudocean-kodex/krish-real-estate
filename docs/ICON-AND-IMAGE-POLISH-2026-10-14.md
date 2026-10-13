# Property icons and interior presentation — 14 October 2026

The property facts now use original, consistent 24-unit SVG line drawings: bed, bath, car spaces, land area and, when the CRM supplies it, floor area. The same facts component serves listing cards, the homepage results preview and the property detail page. Inspection calendars and agent phone/email actions share the same stroke style. No icon font, external asset request or additional package is required.

## Research and design judgement

- [REA's public Wollert search](https://www.realestate.com.au/buy/property-house-in-wollert%2C%2Bvic%2B3750/list-1) was inspected visually: a compact icon-and-number row puts bedrooms, bathrooms, parking and land size next to one another. The site uses that familiar scanning pattern with its own line drawings and bronze/ink palette.
- [REA's own property-profile guide](https://help.realestate.com.au/hc/en-us/articles/9393344786969-How-Property-Profiles-work) identifies these core attributes. Its [study-icon announcement](https://customer.realestate.com.au/news/developer/new-study-icon/) also explains the use of feature icons in search and detail pages.
- The logged-in Eagle property list was inspected read-only. It uses the same core facts and omits room/parking symbols on land listings. The website follows that distinction; it does not display misleading zero-bedroom or zero-bathroom rows on vacant land.
- Decorative SVGs are hidden from assistive technology and accompanied by full text equivalents. Each facts list has a complete accessible summary, and detail cards retain visible labels. This follows [W3C guidance on images with adjacent equivalent text](https://www.w3.org/WAI/tutorials/images/decorative/).

Icons are concentrated on functional information. Existing editorial headings and review excerpts remain visually quiet. Parking is labelled “Car spaces”, which does not imply that every space is an enclosed garage. Floor-area icons only appear when an actual positive `buildingSize` value is supplied.

## Interior image

Following the request for a complete cinematic scene, the desktop section uses a new 2:1 panoramic variant. At widths of 1200px and above, the complete panorama sits behind the selling story. A dark gradient and a softly blurred backdrop sit behind crisp, high-contrast HTML copy on the right. The original 4:3 scene appears in full above the copy on phones and tablets. No caption or imagery label is restored.

Both versions use `object-fit: contain`, the source's exact aspect ratio and no hover zoom. This follows [MDN's description of contain](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/object-fit): the entire image fits the box while retaining its proportions. Text uses warm ivory and lighter champagne against a dark backdrop; contrast is evaluated against [WCAG's minimum-contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). The photograph remains lazy-loaded and its geometry is reserved before loading. Responsive picture sources select the panorama only on larger screens; phones retain the smaller original artwork.

### Asset and generation record

Built-in imagegen edit mode was used, with the original generated interior as its reference. This is conceptual brand artwork, not a photograph of a listed property. The selected desktop variant is 1774 × 887 with no encoding crop:

- `public/images/brand/seller-panorama-v2.avif` — 137,509 bytes.
- `public/images/brand/seller-panorama-v2.webp` — 203,054 bytes, fallback.
- `audit-private/creative/seller-panorama-v2-original.png` — archived original, excluded from publication.

Final prompt:

> Edit and horizontally extend this existing conceptual interior brand photograph into a premium panoramic composition, approximately 2:1 landscape. Preserve the COMPLETE original living room scene and all its furniture, window, garden, sofa, travertine table and shelving without cropping any part of the original composition. Keep the original room occupying the LEFT roughly 60 percent of the expanded panorama. Extend the architecture naturally on the RIGHT with a quiet warm oak and soft ivory plaster wall and a restrained shadowed doorway, architectural negative space suitable for crisp HTML copy placed over it later. Do not add extra sofas or busy decoration on the right. Maintain the original realistic Australian contemporary interior, warm linen, natural oak, travertine, muted sage, champagne golden afternoon light, native garden, polished editorial property photography and subtle cinematic atmosphere. Perspective, shadows and photographic realism must remain coherent across the full expanded frame. No text, logos, captions, watermarks or people. The image must be a complete wide interior scene, not a montage, not a crop, not a mockup.

The generated edit reinterprets some details; it is a matching panoramic variant rather than a pixel-exact extension. The untouched original remains the phone/tablet source.

## Scope and checks

This is a presentation change. Eagle data, enquiry submission, subscriptions, notification routing and the hourly refresh workflow are unchanged. Validation includes the production export and lint, house/land fact checks, native accessibility-name readback, filter interactions, and phone/tablet/desktop visual checks. Existing PageSpeed measurements remain a separate baseline; no new score is claimed for this SVG/CSS refinement.

A narrow-screen property detail overflow was found in browser QA. The grid tracks and columns now permit shrinking to their available width rather than expanding the page to an intrinsic child width.

Pre-release checks passed: 127 generated routes, lint, diff whitespace check, and export audit (122 public pages, 1,366 files, no broken local references). Edge responsive checks covered 320, 390, 768 and 1440 requested viewport widths. House detail and land detail return the correct facts; the land filter returns four land listings and the house filter six houses. Both grid and list modes fit a narrow phone. Native accessibility readback includes complete facts in each card link name.

Conservative desktop text contrast, assuming a completely white photograph under the lightest fully opaque part of the backdrop: champagne 5.49:1, body copy 7.54:1, step copy 6.72:1. Dark CTA text on gold is 6.43:1. The masked edge finishes before the text starts. These are calculated colour ratios, not a claim of a new site-wide accessibility certification.
