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

Local preview screenshots are archived in `audit-private/evidence/hero-type-preview-*-2026-10-14.png`. Live release and fresh performance evidence will be appended after publication.
