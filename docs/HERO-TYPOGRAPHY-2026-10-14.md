# Cinematic hero typography — 14 October 2026

Chirag's exact headline, “Working together means winning together.”, is retained. The existing Cormorant Garamond and DM Sans pairing is retained. The opening line is set in warm ivory; the smaller italic response is champagne, slightly inset on larger screens. Kerning, tracking, line spacing and the quiet rule above the title give the composition a more deliberate editorial rhythm. The original supporting copy is split into its two sentences. A restrained left-to-right shade improves the text backdrop while keeping the architecture visible.

Phone typography removes the inset and balances the italic line when it needs to wrap. At the smallest checked viewport, the response wraps to two lines without clipping. A separate issue found during visual QA was corrected: a native select's intrinsic width could force the search panel outside its intended phone gutter. The panel, grid and selects now shrink within the available width.

No new fonts, media assets, dependencies or requests were added. The title stays visible on first paint; obsolete unused entrance keyframes were removed. Film controls and their accessible labels are retained. Enquiry handling, Eagle CRM integration and catalogue synchronisation were not changed by this typography pass.

## Pre-release verification

- Production build: 127 generated routes, successful TypeScript check.
- ESLint and whitespace checks passed.
- Export audit: 122 public pages, 1,390 files, no broken local references.
- Browser checks at 320px, 390px, 768px and 1440px; no horizontal document overflow in the checked hero views.
- Search panel and selects remain inside the phone gutters after the intrinsic-width fix.
- Buy / Donnybrook / House opens the correct filtered catalogue (3 homes in the current feed).
- Rent / Wollert / House opens the correct rental URL and honest empty state (no current rental stock).
- Appraisal opens the property-appraisal page.
- A fresh phone load offers the play control without auto-starting the film.

Local preview screenshots are archived in `audit-private/evidence/hero-type-preview-*-2026-10-14.png`.

## Live release

Commit `406b4ace05a7fd6cf7ae049fc7235c42d419a487` is published at [5759adca.krish-real-estate.pages.dev](https://5759adca.krish-real-estate.pages.dev) and [krishrealestate.com.au](https://krishrealestate.com.au/). [GitHub quality checks passed](https://github.com/kloudocean-kodex/krish-real-estate/actions/runs/38514350530), including the existing tests. Live desktop and phone checks confirmed the new headline spans, colour treatment, sentence layout and phone search gutters. A fresh phone load has no video source until the visitor requests playback.

Live screenshots are archived as `live-hero-typography-desktop-2026-10-14.png` and `live-hero-typography-phone-2026-10-14.png` in `audit-private/evidence/`.

## Fresh PageSpeed after publication

One new [Google PageSpeed analysis](https://pagespeed.web.dev/analysis/https-krishrealestate-com-au/j0t9prlbzm?form_factor=mobile) was captured **14 October 2026 at 10:49 IST**. Both strategies are from that analysis.

| Metric | Mobile | Desktop |
| --- | --- | --- |
| Performance | 84 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |
| First Contentful Paint | 2.2 s | 0.5 s |
| Largest Contentful Paint | 3.7 s | 0.8 s |
| Total Blocking Time | 90 ms | 10 ms |
| Cumulative Layout Shift | 0 | 0 |
| Speed Index | 4.7 s | 0.7 s |

Mobile performance is the same score as the earlier 10:13 analysis after responsive-image improvements, and one point above the earlier 83 baseline. This does not establish a statistically significant improvement from typography. Mobile image-delivery estimated savings remain only 4 KiB. The remaining mobile render-blocking CSS estimate is 360 ms; framework JavaScript and headline rendering still deserve measured investigation if deeper performance work is commissioned. No CrUX field data was available. These are single-run Lighthouse 13.5.0 lab measurements, not guarantees across devices and visits.

Report DOM readbacks and screenshots are archived as `pagespeed-hero-typography-{mobile,desktop}-2026-10-14.{txt,png}` in `audit-private/evidence/`.
