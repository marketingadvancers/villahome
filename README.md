# Luxury Residences — Next.js template

A single-page site for a luxury residential developer. It began as a rebuild of
a captured static page, and has since been stripped of that site's branding,
copy and photography — what remains is structure, motion and neutral
placeholder content.

## Rebranding it

Everything a visitor reads or sees lives in `src/lib/content.ts`; no component
holds copy of its own. The brand is **VillaHome**; changing `site.name` renames
it everywhere, including the wordmark. Entries still needing real values before
launch are marked `TODO` — phone, address, social profiles, registration line.

**The logo** is a typographic lockup in `ui/Wordmark.tsx` — a monogram of the
brand's initial in a hairline diamond, next to the letterspaced name. It is
built from type and borders, not artwork, so it inherits the display face and
the accent colour and stays sharp at any size. Renaming `site.name` renames the
logo too.

That is a deliberate stand-in, not a finished identity. To drop in a real mark,
replace the `<span aria-hidden>` diamond with a `next/image` or inline SVG and
leave the rest of the lockup alone.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

## Stack

- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript
- Tailwind CSS v4 — utilities are regenerated from the JSX; only the site's own
  non-utility CSS (tokens, theme classes, stroke-outline buttons, keyframes)
  lives in `src/app/globals.css`
- No animation library. The pinned/scrubbed sections use `position: sticky`
  plus a scroll-progress hook, replacing the original's GSAP ScrollTrigger.
- Runtime dependencies are exactly `next`, `react`, `react-dom`.

## Imagery

The capture's photography belonged to the original site and has been replaced
throughout, so nothing here ships someone else's renders. Interiors and project
exteriors come from Freepik (via Magnific) — each band from a single
photographer's series, which is what keeps it looking like a set rather than a
collage. The hero footage, its poster, the news card and the footer band come
from Pexels.

Rail captions describe the room ("Living Room", "Kitchen") rather than naming a
unit, because these are library photographs: labelling one after a specific
apartment would assert something untrue.

### The hero

`hero.video` drives the scroll-scrub: position sets `currentTime` rather than
playing the clip. Set it to `null` and the hero falls back to `hero.poster` with
a slow push-in, so the section works with or without footage.

**Scrubbing is not a `currentTime` write per scroll frame.** A seek is a decode;
asking for sixty a second makes the browser coalesce them into a few visible
jumps, which reads as lag. Hero keeps one seek in flight at a time, always aimed
at the newest scroll position, so the decoder runs flat out and never falls more
than one seek behind. The per-frame work is also written straight to the DOM via
`useScrollProgressEffect` — React state changes only when the headline does.

**The clip matters as much as the code.** Stock footage keyframes every few
seconds, so an arbitrary seek has to decode from far away. This one was
re-encoded to a keyframe every 5 frames, trimmed to 10s and scaled to 720p —
which took visible updates during a fast scroll from 3 per 150 frames to 21,
at 8.3 MB. If you swap the footage, run it through the same treatment:

```bash
ffmpeg -i source.mp4 -t 10 -an -vf "scale=1280:-2,fps=25"   -c:v libx264 -preset slow -crf 26 -g 5 -keyint_min 5 -sc_threshold 0   -pix_fmt yuv420p -movflags +faststart public/videos/hero.mp4
```

`hero.scrubSeconds` caps how much of the clip the scroll spreads across, for
when the source is longer than the scroll distance can smoothly cover.

## Header mega menu

The capture recorded the header dropdowns closed, so no panel markup survived
and the four dropdown triggers were inert. The panel in `Header.tsx` restores
them, adapting the interaction pattern from 21st.dev's "Navbar with Animated
Mega Dropdown": open on hover, close on a short delay so the pointer can cross
the gap into the panel, and slide the incoming panel in from whichever side the
pointer came from. The reference implementation drives this with Framer Motion;
here it is CSS transitions and two keyframes in `globals.css`, which keeps the
dependency list at three packages.

Because this build is a single page, every header entry is an anchor to a
section that exists below it — `#residences`, `#location`, `#news` and so on.
Two entries open a panel, and only because the section behind them holds several
items worth listing. `scroll-padding-top: 7rem` keeps the target clear of the
fixed header.

Menu contents live in `nav` in `src/lib/content.ts`. The footer navigates the
same way, so no link on the page leads anywhere that does not exist.

## Photo lightbox

The two photo rails carry eleven renders that were previously decorative. Each
is now a control that opens `ui/Lightbox.tsx`, with wrap-around prev/next and a
caption. The dialog semantics and the wrap-around paging follow 21st.dev's
"Gallery Grid with Lightbox"; the keyboard support (arrow keys, Escape), the
scroll lock and the focus restore are additions, and again the motion is CSS
rather than Framer Motion.

Captions come from each image's `alt`, so they are worth keeping accurate — the
rail's `alt` is what a screen reader announces and what the viewer prints under
the photo.

## Layout

```
src/
  app/          layout (fonts, metadata), page, globals.css, not-found
  components/
    site/       header, footer, brand rail, floating action rail
    sections/   one file per band of the page
    ui/         Reveal/WordReveal, StrokeOutline, Lightbox, Wordmark, icons
  lib/
    content.ts          all copy and data for the page
    useScrollProgress.ts
public/
  images/  Icons/
```

`src/lib/content.ts` holds every string and image path on the page, so a CMS can
be dropped in behind it without touching the components.

## Palette

The site was recoloured from the original emerald-and-gold to warm cream and
gold, on the neutral base of 21st.dev's "Elegant Luxury" theme with its red
primary replaced by the gold family. It lives entirely in the three token sets
at the top of `globals.css` — `:root` (dark bands), `.theme-light` and
`.theme-brand` — so another repalette means editing that block and nothing else.
No component carries a hard-coded colour.

One constraint worth keeping: bright gold is only legible as text on the dark
bands. On cream it sits near 2.7:1, so the light band uses the deep bronze
`--brand` for headings and accents instead.

## Track record

`sections/TrackRecord.tsx` is a credibility band whose figures count up on first
scroll into view. Every number in it is derived from what this site already
states — four residences, four upcoming destinations, the published
configuration, the gated-community security.

The numbers a visitor would also expect from a developer (years trading, square
feet delivered, families housed) are deliberately **not** there, because they
are claims only the business can verify. Add them to `trackRecord.stats` in
`content.ts` once confirmed rather than estimating them.

## Notes on the port

**Fonts.** Montserrat for body, Cormorant Garamond for display and Italiana for
the script accents, all from Google Fonts via `next/font`. Repoint
`--font-display-alt` / `--font-script` in `layout.tsx` to change them.

**Amenity icons.** The five `/public/Icons/*.svg` pictograms are drawn as CSS
masks, so they take their colour from the surrounding text. They come from the
Freepik icon library; the filenames are the labels in `featureIcons`.

**Routes.** Only `/` is built, and every link on the page is an in-page anchor,
so nothing resolves to the 404. `not-found.tsx` is styled anyway, for mistyped
URLs.

**Form.** The contact form validates and acknowledges in the browser; there is no
backend. Point `Contact.tsx`'s `onSubmit` at a real endpoint when one exists.

**Analytics.** The original's Google Tag Manager and GA4 snippets were left out
deliberately. Add them via `@next/third-parties` if they are wanted.
