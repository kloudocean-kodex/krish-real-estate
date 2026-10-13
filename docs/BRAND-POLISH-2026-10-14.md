# Krish final brand polish — 14 October 2026

Chirag's chosen promise, **Working together means winning together.**, now leads the homepage and is used in the footer, metadata and organisation slogan. The local service copy explains what this means for a property customer. The phrase is a partnership promise, not a guarantee of a particular sale price or investment outcome.

## Creative assets

Generated with the built-in image-generation tool. The supplied Krish logo and Eagle property photographs remain authentic supplied assets. The new artwork is conceptual brand imagery and is labelled accordingly in the hero.

- `public/images/brand/together-exterior.avif` / `.webp`: original architectural brand composition, desktop hero.
- `public/images/brand/together-mobile.avif` / `.webp`: responsive crop of that same artwork.
- `public/images/brand/together-interior.avif` / `.webp`: original interior and keys composition, closing section and film.
- `public/images/brand/seller-presentation.avif` / `.webp`: original warm Australian living-room composition for “Your home deserves more than a template.” The visible caption identifies it as conceptual brand imagery. It replaces the unrelated catalogue-photo selection in this brand section, while listing cards retain their authentic Eagle photographs.
- `public/images/brand/together-brand-film.mp4`: 12-second, silent, 1280×720 H.264 film, gentle motion and dissolves between the generated stills. It is an editorial motion treatment of images, not AI-generated spatial footage or footage of an actual listing.
- Full PNG originals are retained privately in `audit-private/creative/`.
- Reproduce encoding with `scripts/render-brand-film.py`. It requires Pillow and imageio-ffmpeg, and is not part of the site's production runtime or build dependency chain.

The image is the initial hero resource. Desktop film starts after page load and idle time, when the hero is visible. Mobile, Save-Data, slow connections, and reduced-motion preferences retain the still image unless the visitor explicitly plays the film. Playback pauses off-screen or in a hidden tab. An explicit pause/play control remains available. The separate picture serves as the poster, avoiding an additional video-poster download.

Runway's connector still required reauthentication after browser login. OpenArt's available balance did not cover its listed video jobs. This film uses local rendering and incurs no additional service charge or subscription. A later full scene-motion render can replace the MP4 without changing the accessible controls or fast image fallback.

## Final generation prompts

### Exterior

Use case: photorealistic-natural. Asset type: premium real estate website hero brand image, cinematic widescreen 16:9 composition, high detail. Create an original editorial architecture photograph that evokes the welcoming contemporary homes and eucalyptus landscape of Melbourne's northern suburbs, without depicting any identifiable real property or landmark. A refined, believable single-storey Australian home on the RIGHT half of the frame: warm pale limestone, charcoal vertical timber battens, modest broad eaves, floor-to-ceiling glazing with soft amber interior light, carefully composed native grasses and young eucalyptus. Late golden hour just before dusk, champagne sunlight, warm ivory highlights, muted sage foliage, charcoal shadows, blue-grey sky. The LEFT 45 percent should have quiet dark garden/sky negative space suitable for a large white editorial serif headline, with no busy bright detail. Camera at human eye level, 35mm architectural lens, straight verticals, tactile natural materials, understated elegance, attainable local residential scale. Full horizontal canvas, beautiful coherent composition, no collage. No people, no cars, no pools, no skyscrapers, no tropical palms, no exaggerated mansion, no text, no logos, no watermarks. This is conceptual brand imagery, never a listing photograph.

### Interior

Use case: photorealistic-natural. Asset type: supporting brand image and second shot for a premium Australian real estate website film, cinematic widescreen 16:9. Create a quiet editorial photograph from just inside a welcoming contemporary Australian home at late golden hour. Foreground on RIGHT: a tactile pale travertine console with a simple brushed-brass key ring holding two ordinary house keys resting neatly, a small ivory ceramic vessel with a single eucalyptus sprig, warm natural oak and linen textures. Beyond, an open doorway and soft native garden in gentle focus, warm evening light tracing the threshold. LEFT half softly shadowed, calm negative space for website copy. The emotion is belonging, care, and the beginning of a new chapter, sophisticated and personal rather than flashy. Champagne, warm ivory, charcoal and muted sage palette. Natural plausible details, restrained styling, cinematic depth, subtle film grain, architectural editorial photography, no people or hands, no text, no brand marks, no watermarks, no estate-agent signs. Conceptual brand artwork only, no implication of an actual client home or actual transaction.

## Review evidence and presentation

- Google Maps live page on 14 October: **4.9 / 176 reviews** for Krish Real Estate Pty Ltd, 22 Wollemi Ave, Wollert. Address, website and phone match Krish. Daniyal Nadeem's public five-star review supplies the short rental-experience excerpt.
- Chirag's REA card retains **5.0 / 152 reviews**, last verified 13 October. Current search/open copies returned inconsistent nearby counts, so no new claim of an exact current agency total was added.
- Google, agent and agency destinations are separate. Counts are never added together. Short excerpts retain the public author or anonymous seller role, context, source link and snapshot date.
- [Google business profile](https://www.google.com/maps/place/Krish+Real+Estate+Pty+Ltd/@-37.6067795,144.9994168,17z/data=!3m1!4b1!4m6!3m5!1s0x6ad64dce250cdab9:0x4d578f6f7d52c269!8m2!3d-37.6067795!4d144.9994168!16s%2Fg%2F11rylmqc99)
- [Chirag on realestate.com.au](https://www.realestate.com.au/agent/chirag-yadav-3440092)
- [Agency on realestate.com.au](https://www.realestate.com.au/agency/krish-real-estate-wollert-YXQTHO)

The presentation is intentionally restrained: two separately attributed rating cards and three readable excerpts with local context and independent source links. These are curated snapshots rather than a live review widget. The next useful improvement is a supported review refresh with owner access, not more carousel motion or an invented combined rating. Each excerpt links to its source profile; individual review deep links and original review publication dates are not presently recorded. No self-serving aggregate-rating rich-result markup is added; [Google's review-snippet guidance](https://developers.google.com/search/docs/appearance/structured-data/review-snippet) excludes business-controlled reviews about that business from star rich-result eligibility.

### Seller presentation generation prompt

Use case: photorealistic-natural. Asset type: original premium real estate website supporting editorial brand photograph, landscape 4:3 composition. Create a believable, beautifully presented living room in a contemporary family home in Melbourne's northern suburbs. This is conceptual brand artwork, not a real listing. Human-eye-level architectural photography, straight verticals, 35mm lens, natural tactile detail. A warm ivory linen sofa, a low pale travertine coffee table with one closed neutral book and a small ceramic bowl, subtle oak joinery, an ivory textured wall, a restrained eucalyptus stem arrangement, soft muted sage accents. Tall glazing to the side looks into a modest native garden with eucalyptus and grasses, no spectacular panorama. Late afternoon champagne light gently falls across the floor and sofa, welcoming lived-in warmth and understated Australian design, uncluttered yet personal. Use warm ivory, charcoal accents, pale oak, champagne and soft sage to match an elegant charcoal-and-gold real estate brand. Compose the key furniture within the central 75 percent so the picture crops gracefully on phones; bottom 18 percent visually quiet for an HTML caption overlay. Do not include people, signage, logos, words, watermarks, keys, real property identifiers, ornate luxury, pools, skyscrapers, a mansion or a collage. Full single coherent image, quietly premium rather than glossy or overstyled.

Built-in generation output is archived privately as `audit-private/creative/seller-presentation-original.png`. Public derivatives are 1200×900, AVIF quality 48 (71,346 bytes) and WebP quality 78 (158,658 bytes), encoded with Pillow and served lazily with reserved 4:3 space.

## Integration boundaries

The existing production Eagle enquiry remains independently readable: Contact `28268161`, Enquiry `708117358`, source `https://krishrealestate.com.au/contact/`. Read-only authentication and record verification passed in this polish pass, as did seven transport tests. The public catalogue contains 106 listings, 10 current. The hourly GitHub refresh workflow is active, but run history at the time of this check only showed the earlier manual run; an unattended scheduled run still needs observation. Reviews are curated snapshots, not an automatic review feed. General enquiry notification routing, mailbox receipt, Search Console/GA4 ownership and ongoing field performance remain separate operational checks.

A production negative security check with a deliberately invalid Turnstile token returned HTTP 403 and `success: false` (“Security check expired. Please try again.”), before the code's CRM-processing path. No successful lead was created by this negative check.

## Performance bug found during final visual audit

Detailed PageSpeed output exposed React error 418 and identified the hero heading as the LCP element. Reproducing the site in `America/Los_Angeles` changed Eagle's date-only `2026-10-15` into 14 October after hydration, regenerating the client tree. Inspection dates now format with an explicit UTC calendar interpretation; the advertised local time remains unchanged. Eight tests pass, including inspection-date stability across Melbourne, Los Angeles, Honolulu and UTC, and a daylight-saving transition date. This fixes the mismatch rather than suppressing its warning. See [React's error explanation](https://react.dev/errors/418).

PageSpeed also identified oversized property-card and header-logo resources. The catalogue preparation now produces cached 360/720/1080-pixel WebP derivatives, capped at the source's natural width, and cards select them through `picture`/`srcset`. Property galleries retain their larger genuine photographs. The supplied horizontal logo has proportion-preserving 240/480-pixel WebP derivatives. The first listing below the homepage hero is no longer eagerly preloaded ahead of the hero. No additional runtime service or image-hosting subscription is required.

References: [Google video performance guidance](https://web.dev/learn/performance/video-performance), [Runway free-plan details](https://help.runwayml.com/hc/en-us/articles/50404627334547-Free-plan-details), [FFmpeg](https://ffmpeg.org/about.html).
