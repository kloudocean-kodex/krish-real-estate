# Krish final brand polish — 14 October 2026

Chirag's chosen promise, **Working together means winning together.**, now leads the homepage and is used in the footer, metadata and organisation slogan. The local service copy explains what this means for a property customer. The phrase is a partnership promise, not a guarantee of a particular sale price or investment outcome.

## Creative assets

Generated with the built-in image-generation tool. The supplied Krish logo and Eagle property photographs remain authentic supplied assets. The new artwork is conceptual brand imagery and is labelled accordingly in the hero.

- `public/images/brand/together-exterior.avif` / `.webp`: original architectural brand composition, desktop hero.
- `public/images/brand/together-mobile.avif` / `.webp`: responsive crop of that same artwork.
- `public/images/brand/together-interior.avif` / `.webp`: original interior and keys composition, closing section and film.
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

## Integration boundaries

The existing production Eagle enquiry remains independently readable: Contact `28268161`, Enquiry `708117358`, source `https://krishrealestate.com.au/contact/`. Read-only authentication and record verification passed in this polish pass, as did seven transport tests. The public catalogue contains 106 listings, 10 current. The hourly GitHub refresh workflow is active, but run history at the time of this check only showed the earlier manual run; an unattended scheduled run still needs observation. Reviews are curated snapshots, not an automatic review feed. General enquiry notification routing, mailbox receipt, Search Console/GA4 ownership and ongoing field performance remain separate operational checks.

References: [Google video performance guidance](https://web.dev/learn/performance/video-performance), [Runway free-plan details](https://help.runwayml.com/hc/en-us/articles/50404627334547-Free-plan-details), [FFmpeg](https://ffmpeg.org/about.html).
