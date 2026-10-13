# Local Knowledge refinement — 14 October 2026

The original homepage suburb cards compressed copy into a portrait photograph. Their dark bronze postcodes and small translucent descriptions were difficult to read, particularly with two narrow columns on phones. The new treatment uses wider 3:2 property photographs, warm ivory copy areas, larger serif suburb names, readable bronze postcodes, clear descriptions and a named destination with a restrained circular arrow.

Phones show one complete card per row; tablets show two; desktop shows four. The header has an editorial title and a separate introduction with an “All suburb guides” link. Existing catalogue photographs and suburb data are retained. These photographs show properties represented by Krish, rather than claiming to be neighbourhood panoramas. No generated suburb imagery, invented market statistics, new font, carousel or external script is added.

## Research and reasoning

- [Baymard's homepage/navigation research](https://baymard.com/research-articles/ecommerce-navigation-best-practice?product=breeze) recommends clear scope in mobile homepage links. Applying this navigation principle to suburb guides is a design inference, not a measured real-estate conversion result. Each card visibly names its destination and has a full accessible link name.
- [WCAG contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) supports moving small text to a predictable solid background. Postcodes and arrows use dark bronze on ivory; descriptions use the existing dark warm grey.
- Images retain native lazy loading and reserved geometry. Card movement is limited to colour and shadow; there is no image zoom or scroll animation added. Existing global reduced-motion settings apply.
- [Google's PageSpeed documentation](https://developers.google.com/speed/docs/insights/v5/about) distinguishes lab diagnostics from real-user field data. A fresh public-domain run will follow deployment; its results will be reported as a single measurement, not a guarantee of every visit.

## Verification

Build (127 generated routes), lint and export audit passed: 122 public pages, 1,366 files and no broken internal references. Browser checks covered the 320px and 390px phone layouts, the 768px two-column tablet layout and the 1440px four-column desktop layout. No horizontal overflow was found. Keyboard focus is visible around the complete card. Wollert's card opens its guide and the new all-guides link opens the area index; all four card destinations exist in the export.

Calculated contrast on the ivory card background: bronze postcode/arrow 5.38:1, description 5.37:1. A screenshot-tool pixel-scale mismatch was resolved with a read-only viewport capture; it was not a site layout defect. The tablet proof is saved in `audit-private/evidence/local-knowledge-tablet-preview-2026-10-14.png`.

The fresh public-domain PageSpeed result is recorded after deployment.
