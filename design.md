# Tonik — Design System & Brand Guidelines

> Single source of truth for the **Tonik Wall of Love** site (Phase 2 build).
> Reconciles the canonical brand book (`tonik brand guidelines _ Slides _ Templates.fig`, exports in [`tonik-branding/`](tonik-branding/)) with the live `tonik.com` implementation. Where they conflict, **the brand book wins**; the live-site additions are documented as a clearly-labeled "web extension."

---

## 1. Brand essentials

**Positioning.** Tonik is a *design studio for visionaries* — a founder-first, 0→1 studio that defines, designs, and builds digital products. The brand voice should feel confident, technical, slightly playful, and never corporate.

**Tagline (locked).** `Design studio for visionaries` — appears at the bottom-left of every brand-book slide and is part of the visual identity, not just marketing copy. We will reproduce it on the website chrome.

**Brand promise (verbatim from brand book, slide [`14.png`](tonik-branding/14.png)).**
> "Design is the API between vision and reality. Consider us your gateway."

**Voice principles.**

| Do | Don't |
|---|---|
| Write short, declarative sentences. | Use marketing fluff ("synergy", "leverage", "robust"). |
| Use technical metaphors when they earn their keep ("0→1", "API", "ship"). | Default to corporate jargon. |
| Stay lower-case where the brand uses lower-case (the wordmark, "tonik" in body copy). | Capitalize "tonik" mid-sentence. It's always lower-case. |
| Be a little playful — *"…and other digital wizardry."* | Overuse the playful tone — cue, not crutch. |
| Talk to founders directly ("you", "your team"). | Talk *about* founders in the third person. |

**Sample headlines (from brand book + live site, verbatim).**

- "Design studio for visionaries"
- "Design is the API between vision and reality. Consider us your gateway."
- "Founder-first, 0→1 studio that defines, designs, and builds products and other digital wizardry."
- "Cool people · wearing cool clothes" *(swag/lifestyle voice — for casual surfaces)*
- "Brand essentials" / "Brand in use" *(typical section titles, sentence case, no period)*

---

## 2. Color

### 2.1 Canonical palette (brand book — slide [`19.png`](tonik-branding/19.png))

This is the entire palette. All print, presentation, and brand-critical surfaces use **only these three values**.

| Name | HEX | RGB | CMYK | CSS variable |
|---|---|---|---|---|
| Off White | `#EFEFEF` | `239 239 239` | `0 0 0 7` | `--color-off-white` |
| Off Black | `#212121` | `33 33 33`    | `5 5 5 95` | `--color-off-black` |
| Dark Grey | `#383838` | `56 56 56`    | `3 0 3 90` | `--color-dark-grey` |

**Default surface:** Off Black background, Off White text. The light-mode inverse (Off White bg, Off Black text) is allowed and shown explicitly on slide [`12.png`](tonik-branding/12.png).

> ⚠️ **Never** place the logo or critical text on Dark Grey — the brand-book "do not use insufficient contrast" lockup specifically warns against grey-on-grey (slides [`08.png`](tonik-branding/08.png), [`09.png`](tonik-branding/09.png)). Dark Grey is a **surface tone only** (cards, secondary panels, table headers).

### 2.2 Web extension (live `tonik.com` — *web only, never print*)

The live site extends the canonical palette with a few values. Use sparingly and only on web surfaces.

| Name | HEX | Purpose | CSS variable |
|---|---|---|---|
| Button Black | `#121212` | Primary CTA fill (one shade darker than Off Black for contrast) | `--color-button-black` |
| Accent Green | `#04B745` | Single-purpose CTA color (e.g., "Submit your testimonial"). One per page max. | `--color-accent-green` |
| Pure White | `#FFFFFF` | Borders, focus rings, hover-state highlights. Never body text — use Off White. | `--color-white` |
| Pure Black | `#000000` | Deep shadows / image overlays only. | `--color-black` |
| Light Grey | `#D0D0D0` | Secondary body text, footer copy, table dividers. | `--color-light-grey` |

### 2.3 Semantic tokens

Map the raw palette to roles. Phase 2 should use the semantic names in components, not the raw color names.

```css
:root {
  /* Raw — brand book canonical */
  --color-off-white: #EFEFEF;
  --color-off-black: #212121;
  --color-dark-grey: #383838;

  /* Raw — web extension */
  --color-button-black: #121212;
  --color-accent-green: #04B745;
  --color-white:        #FFFFFF;
  --color-black:        #000000;
  --color-light-grey:   #D0D0D0;

  /* Semantic — dark mode default (use these in components) */
  --bg:           var(--color-off-black);
  --fg:           var(--color-off-white);
  --surface-1:    var(--color-dark-grey);
  --surface-2:    var(--color-button-black);
  --text-muted:   var(--color-light-grey);
  --accent:       var(--color-accent-green);
  --border:       var(--color-white);
  --border-muted: rgba(255, 255, 255, 0.12);
  --overlay:      rgba(33, 33, 33, 0.7);
}
```

A light-mode equivalent (rare — use only when the brief calls for it) flips `--bg` to `--color-off-white` and `--fg` to `--color-off-black`.

---

## 3. Typography

The brand uses **two typefaces only**: PP Neue Montreal for everything visual, IBM Plex Mono for labels/eyebrows/tables/micro-copy. Reference slides: [`15.png`](tonik-branding/15.png), [`16.png`](tonik-branding/16.png), [`13.png`](tonik-branding/13.png).

### 3.1 Font files

**PP Neue Montreal** — local OTFs already in the repo, [`Neue Montreal/`](Neue%20Montreal/):

```
NeueMontreal-Light.otf         (300)
NeueMontreal-LightItalic.otf   (300 italic)
NeueMontreal-Regular.otf       (400)
NeueMontreal-RegularItalic.otf (400 italic)
NeueMontreal-Medium.otf        (500)
NeueMontreal-MediumItalic.otf  (500 italic)
NeueMontreal-Bold.otf          (700)
NeueMontreal-BoldItalic.otf    (700 italic)
```

**IBM Plex Mono** — load from Google Fonts (Regular 400 + Medium 500 are sufficient).

### 3.2 `@font-face` (Phase 2 will copy these into a global stylesheet)

Convert the OTFs to WOFF2 during the Phase 2 build for size/perf, but keep the OTFs as the source of truth in the repo. Suggested Phase-2 location: `/public/fonts/neue-montreal/`.

```css
@font-face {
  font-family: "Neue Montreal";
  src: url("/fonts/neue-montreal/NeueMontreal-Light.woff2") format("woff2");
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Neue Montreal";
  src: url("/fonts/neue-montreal/NeueMontreal-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Neue Montreal";
  src: url("/fonts/neue-montreal/NeueMontreal-Medium.woff2") format("woff2");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Neue Montreal";
  src: url("/fonts/neue-montreal/NeueMontreal-Bold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
/* Italics: same as above with font-style: italic */

/* IBM Plex Mono via Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap");

:root {
  --font-sans: "Neue Montreal", ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, "SFMono-Regular", Menlo, monospace;
}
```

### 3.3 Type scale (brand book — slide [`13.png`](tonik-branding/13.png))

The brand book specifies sizes in absolute pt at presentation scale. For web, we map them to a fluid scale anchored at desktop (≥1280px) using a 1.5× boost over the book's pt → px translation, since web headlines on a 1440px viewport read smaller than a 16:9 slide. Mobile downscales linearly.

| Token | Use | Font | Weight | Size (px, desktop) | Line-height | Tracking |
|---|---|---|---|---|---|---|
| `display` | Hero, page-opening statements | Neue Montreal | 500 | 96 | 100% (96) | -2.4px |
| `h1` | Section titles ("Layouts", "Brand essentials") | Neue Montreal | 500 | 72 | 100% | -1.5px |
| `h2` | Subsection titles | Neue Montreal | 500 | 40 | 110% | -0.5px |
| `h3` | Card titles, callouts | Neue Montreal | 500 | 24 | 110% (≈26) | 0 |
| `body-lg` | Lead paragraphs, intro copy | Neue Montreal | 400 | 18 | 150% | 0 |
| `body` | Default body | Neue Montreal | 400 | 16 | 150% (24) | 0 |
| `caption` | Image captions, fine print | Neue Montreal | 400 | 12 | 125% (15) | 0 |
| `mono-label` | Eyebrows, nav, tag chips, table col 1 | IBM Plex Mono | 400 | 12 | 100% | -2% (≈ -0.24px), uppercase |
| `mono-micro` | Footer chrome, tiny captions | IBM Plex Mono | 400 | 10 | 100% | -2%, uppercase |

**Rule of thumb (slide [`13.png`](tonik-branding/13.png)):** the headline always uses tight 100% line-height; everything else gets ~110–150% so it breathes.

**Table pairing rule.** When laying out a brand-book-style table (e.g., a spec sheet or stat block), col 1 is `mono-label` (IBM Plex Mono) and col 2 is Neue Montreal sized **30% larger than col 1, rounded up**. Example: `mono-label` at 9pt → Neue Montreal at 12pt.

### 3.4 Mono-label conventions

The `mono-label` style is the brand's signature secondary type. Always uppercase, always slightly negative tracking (-2%). Use for:

- Eyebrows above headlines (`SERVICES`, `CONTENTS`, `NUMBER OF SLIDES`).
- Page header chrome (`TONIK BRAND GUIDELINES` / page name / section name — see slide [`13.png`](tonik-branding/13.png)).
- Page footer chrome (`DESIGN STUDIO FOR VISIONARIES` / `TONIK.COM`).
- Nav links.
- Form field labels.
- Tag/category chips.

---

## 4. Logo & symbol

### 4.1 Assets

- Wordmark: [`Brand Name.svg`](Brand%20Name.svg) (lowercase "tonik", default fill `#EFEFEF`).
- Symbol: [`tonik-symbol.svg`](tonik-symbol.svg) (the H/X mark inside a slanted oval, default fill `#EFEFEF`).

The wordmark is described in the brand book (slide [`21.png`](tonik-branding/21.png)) as *"a strong lower-case logotype with geometric proportions which ensure visual balance and harmony. Do not modify them in any way."*

### 4.2 Color-on-color matrix

| Background | Wordmark fill | Symbol fill |
|---|---|---|
| `--color-off-black` (#212121) | `--color-off-white` (#EFEFEF) ✅ | `--color-off-white` ✅ |
| `--color-off-white` (#EFEFEF) | `--color-off-black` (#212121) ✅ | `--color-off-black` ✅ |
| `--color-dark-grey` (#383838) | ❌ never (insufficient contrast) | ❌ never |
| Photo / busy bg | Use a flat panel behind the logo first, then place per the matrix. | Same. |

The SVGs ship with `fill="#EFEFEF"`. To switch to off-black, find/replace the fill, or in CSS use `currentColor` if you embed inline.

### 4.3 Safe space

- **Wordmark** (slide [`11.png`](tonik-branding/11.png)): clear-space `x = height of the lowercase "t"`. No graphic element (vector, illustration, photo, other text) may enter the `x` margin around the logo on all four sides.
- **Symbol** (slide [`10.png`](tonik-branding/10.png)): clear-space `x = width of the t* icon` (the small H/X glyph inside the oval). Same all-sides rule.

In CSS terms: when placing the logo in a container, give it `padding: var(--logo-x)` where `--logo-x` is the measured `x` for the logo's rendered size.

### 4.4 Forbidden practices

Six explicit don'ts each, per slides [`08.png`](tonik-branding/08.png) (symbol) and [`09.png`](tonik-branding/09.png) (wordmark):

**Wordmark — never:**

1. Stretch the logo (scale must be uniform — `transform: scale()` only).
2. Apply unapproved colors (anything outside the canonical palette).
3. Apply effects (shadows, glows, gradients, strokes, blurs).
4. Use insufficient contrast (no off-white-on-light or off-black-on-dark).
5. Change the size of individual letters.
6. Change the proportions (the logo is fixed geometry).

**Symbol — never:**

1. Stretch the symbol.
2. Apply unapproved colors.
3. Remove the oval.
4. Use insufficient contrast.
5. Change the size of the inner H/X relative to the oval.
6. Change the symbol's overall proportions.

---

## 5. Layout & grid

### 5.1 Page frame (the brand-book signature)

Every brand-book slide is wrapped in a 4-corner mono frame. **This is brand DNA — the website should reproduce it as the global page chrome.**

```
┌───────────────────────────────────────────────────────────────┐
│ TONIK BRAND GUIDELINES   {SECTION TITLE}      {SECTION NAME}  │  <- mono-label, top
│                                                               │
│                         {page content}                        │
│                                                               │
│ DESIGN STUDIO FOR VISIONARIES                       TONIK.COM │  <- mono-label, bottom
└───────────────────────────────────────────────────────────────┘
```

For the Wall of Love site, adapt to:

```
┌───────────────────────────────────────────────────────────────┐
│ tonik [logo]               WALL OF LOVE              [nav]   │
│                                                               │
│                         {page content}                        │
│                                                               │
│ DESIGN STUDIO FOR VISIONARIES                       TONIK.COM │
└───────────────────────────────────────────────────────────────┘
```

The header logo replaces the left mono label; everything else stays.

### 5.2 Grid

Sourced from the live site's computed CSS:

| Token | Value | Notes |
|---|---|---|
| Reference width | `1440px` | Design canvas. |
| Max content width | none (full-bleed) | Constrain per-section, not globally. |
| Columns (desktop) | `12` | |
| Gutter | `20px` | |
| Section padding-top | `120px` | The hero rhythm. |
| Section padding-x (desktop) | `48px` | |
| Section padding-x (mobile) | `24px` | |
| Sticky nav height | `58px` | |

CSS:

```css
:root {
  --container-max: 1440px;
  --grid-cols: 12;
  --grid-gap: 20px;
  --section-py: 120px;
  --section-px: 48px;
  --nav-h: 58px;

  /* Spacing scale (8px-based) */
  --s-1: 4px;   --s-2: 8px;   --s-3: 12px;  --s-4: 16px;
  --s-5: 24px;  --s-6: 32px;  --s-7: 48px;  --s-8: 64px;
  --s-9: 96px;  --s-10: 120px;
}

@media (max-width: 768px) {
  :root { --section-px: 24px; --section-py: 64px; --grid-cols: 4; }
}
```

### 5.3 Breakpoints

| Name | Min-width |
|---|---|
| `sm` | 480px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1440px |

---

## 6. Components

### 6.1 Buttons (live-site spec)

| Variant | Background | Text | Border | Radius | Padding | Font |
|---|---|---|---|---|---|---|
| Primary | `--color-button-black` (#121212) | `--color-white` | `2px solid var(--color-white)` | `2px` | `12px 20px` | `mono-label` style |
| Secondary | `--color-white` | `--color-button-black` | `2px solid var(--color-white)` | `2px` | `12px 20px` | `mono-label` style |
| Ghost / link-button | transparent | `--color-light-grey` | none | 0 | 0 | `body` style, underline |
| Accent (rare) | `--color-accent-green` | `--color-off-black` | none | `2px` | `12px 20px` | `mono-label` style |

Hover state: `opacity: 0.85` plus a 1-px upward `translate3d(0, -1px, 0)`. Transition: `all 0.4s ease-in-out` (see §7).

### 6.2 Links

Default text links inside body copy:

```css
a {
  color: var(--color-white);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
  transition: opacity 0.2s ease-in-out;
}
a:hover { opacity: 0.7; }
```

### 6.3 Cards

Two card archetypes for Phase 2:

**Project / case-study tile.**
- Edge-to-edge image, no padding.
- `border-radius: 0` (square corners — live site uses 0 for tiles).
- Hover: `transform: scale(1.02)` + slight `opacity` shift (0.4s ease-in-out).

**Testimonial card** (Wall of Love primary unit).
- Background: `--surface-1` (#383838) on the dark page.
- `border-radius: 6px`.
- Padding: `var(--s-6)` (32px).
- Optional `1px` border in `--border-muted`.
- Internal layout: mono-label eyebrow (role/company) → body quote (Neue Montreal 18, 150% LH) → footer row with avatar + name + handle.
- Shadow on hover: `0 32px 68px rgba(0, 0, 0, 0.3)` (live-site spec).

### 6.4 Tables (brand-book signature)

The brand book's tables are a recognizable element — replicate them on the site.

```
┌───────────────────────────────────────────────┐
│ TEAM SIZE          53                         │
├───────────────────────────────────────────────┤
│ NO. DESIGNERS      24                         │
├───────────────────────────────────────────────┤
│ LOCATION           Remote with Poznań HQ     │
└───────────────────────────────────────────────┘
```

- Col 1: `mono-label` (IBM Plex Mono, uppercase).
- Col 2: Neue Montreal Regular, 30% larger than col 1, rounded up.
- Row dividers: `1px solid var(--border-muted)`.
- No outer border, no zebra striping.
- Padding: `var(--s-3) 0` per row.

### 6.5 Form fields

For the "submit a testimonial" form on the Wall of Love site:

- Label: `mono-label` (uppercase, IBM Plex Mono 12, -2% tracking).
- Input: Neue Montreal Regular 16, 150% LH, transparent bg, `1px` bottom border in `--border-muted`. On focus, border becomes `--color-white`.
- Padding: `var(--s-3) 0`.
- No rounded corners on text inputs (square underline aesthetic).
- The submit CTA is the **only** place on the site where Accent Green is allowed (see §2.2).

---

## 7. Motion

Sourced from `tonik.com` computed transitions.

```css
:root {
  --motion-duration: 0.4s;
  --motion-ease: ease-in-out;
  --motion-fast: 0.2s;
}

* { transition-timing-function: var(--motion-ease); }

/* Default transition shorthand to use in components */
.transition-default {
  transition:
    opacity   var(--motion-duration) var(--motion-ease),
    transform var(--motion-duration) var(--motion-ease);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Rules.**
- Animate **only** `opacity` and `transform`. Never `width`, `height`, `top`, `left`, etc. (perf + jitter).
- 0.4s baseline; 0.2s for micro-interactions like link hover.
- Page enters fade-in `opacity 0 → 1` over 0.4s. No fancy scroll-triggered choreography unless the section is genuinely showpiece (hero only).
- Respect `prefers-reduced-motion: reduce`.

---

## 8. Imagery

### 8.1 Photography style (brand book — slide [`17.png`](tonik-branding/17.png))

- **Black-and-white only** for editorial photography.
- High-contrast, slightly grainy, candid.
- Subjects: people in streetwear (zoomed crops on hands, socks, jackets), low-angle architecture, urban concrete.
- No staged corporate stock photography. Ever.
- Aspect ratios: `1:1` (square) and `2:3` (portrait) dominate. `16:9` only for full-bleed hero panels.

### 8.2 3D / symbol renders (brand book — slide [`20.png`](tonik-branding/20.png))

- The symbol can be presented as a rough-finish metallic 3D render against pure black.
- Six approved metal-finish variations exist in the .fig (Metal v.001 – v.006).
- Use sparingly — at most one 3D treatment per page section.

### 8.3 Do / don't

| Do | Don't |
|---|---|
| Use B&W high-contrast photography. | Use color photography in editorial sections. |
| Crop tight on subjects. | Use loose, generic stock framing. |
| Place imagery edge-to-edge or in a strict grid. | Add decorative borders, drop shadows, or photo frames. |
| Pair photography with the mono header/footer chrome. | Cover the chrome with imagery. |
| Use the 3D symbol render as a hero accent (max 1/page). | Apply gradients, glows, or color overlays to the symbol. |

---

## 9. Iconography

The brand book defines five service icons (slide [`02.png`](tonik-branding/02.png)) — Product Design, Websites, Branding, No-code Development, Engineering. They are monoline geometric, drawn at the same stroke weight, and live inside the .fig.

For Phase 2, recreate the icons we actually need as SVGs in `/public/icons/`. General icon rules:

- 24 × 24 px box, 1.5px stroke, `currentColor`.
- Geometric, no rounded line caps.
- No fill (outline only) for service icons; small filled accents allowed for UI icons (chevron, close, external link).

---

## 10. Voice & copy reference

### 10.1 Vocabulary that fits

`founder-first`, `0→1`, `MVP`, `ship`, `gateway`, `define`, `design`, `build`, `scale`, `digital`, `product`, `wizardry` (rarely), `vision`, `visionaries`, `well-knit`, `eye-candy`, `pretty gradients`, `pickle` *(in casual surfaces only)*.

### 10.2 Vocabulary to avoid

`solutions`, `synergy`, `ecosystem`, `leverage`, `robust`, `cutting-edge`, `seamless` (overused to the point of meaninglessness), `passionate`, `industry-leading`.

### 10.3 Reference quotes (verbatim, brand book — slide [`13.png`](tonik-branding/13.png))

> "We're a well-knit digital design studio working with products, brands and (no-)code. Founders come to us because we help them define, build and scale their MVPs. That means we gotta think beyond eye-candy (though we love pretty gradients too)."

> "You're free to do the job your way, but the team is there for you. Doesn't matter if you're just in a pickle or need a real talk about your career — there's always folks happy to give you a hand."

> "And hey, we're not here to point the finger at what to do. If you see something we can improve or know how to reach our goals — do it and get your cred. The team is already asking about you. Don't make them wait, apply!"

These three paragraphs are a reliable reference for the brand's "long-form" voice. The Wall of Love copy should feel like it could sit next to them without seeming out of place.

### 10.4 Headline patterns

- **Two-line declaratives** (the brand book's preferred hero pattern): `Brand / essentials`, `Brand / in use`, `Two line / headline`. Hard line break in the middle, no orphans.
- **Sentence case**, no end punctuation on titles.
- **Mono eyebrow + display headline** is the canonical opening combo: `CONTENTS` / `Brand essentials`.

---

## 11. Phase 2 — implementation hints (non-binding)

These are starter hints for the build phase. Adjust freely when we know the full Wall of Love brief.

### 11.1 Suggested project layout (Astro)

```
wall-of-love/
├─ src/
│  ├─ components/
│  │  ├─ chrome/
│  │  │  ├─ HeaderFrame.astro       # mono header row
│  │  │  └─ FooterFrame.astro       # "DESIGN STUDIO FOR VISIONARIES" / "TONIK.COM"
│  │  ├─ Logo.astro                 # imports Brand Name.svg / tonik-symbol.svg
│  │  ├─ TestimonialCard.astro
│  │  ├─ Button.astro               # primary | secondary | ghost | accent
│  │  └─ Table.astro                # brand-book table style
│  ├─ layouts/
│  │  └─ BaseLayout.astro           # wraps content in HeaderFrame + FooterFrame
│  ├─ pages/
│  │  └─ index.astro
│  └─ styles/
│     ├─ tokens.css                 # the :root blocks from §2, §3, §5, §7
│     └─ global.css                 # @font-face + base resets
├─ public/
│  ├─ fonts/neue-montreal/          # WOFF2-converted from Neue Montreal/*.otf
│  ├─ icons/                        # service + UI icons as SVG
│  └─ logos/
│     ├─ tonik-wordmark.svg         # copy of Brand Name.svg
│     └─ tonik-symbol.svg
├─ Brand Name.svg                   # source of truth (kept for reference)
├─ tonik-symbol.svg                 # source of truth
├─ Neue Montreal/                   # source-of-truth OTFs
├─ tonik-branding/                  # source-of-truth brand-book PNGs
└─ design.md                        # this file
```

### 11.2 CMS

Recommend **Decap CMS** (formerly Netlify CMS) for the Wall of Love testimonials — file-based, lives next to the Astro repo, no hosting cost, fits the "simple CMS" ask. **Sanity** is the alternative if you want a hosted, queryable backend with more headroom (good for moderation flows). Pick at the start of Phase 2 once we know who's curating testimonials and how often.

### 11.3 Wall-of-Love-specific design notes

- Default treatment is **mono** (off-white-on-off-black). No accent color in the testimonial grid itself.
- The "Submit your testimonial" CTA is the **only** place Accent Green (`#04B745`) may appear. One Accent surface per page.
- Each testimonial card should pair Neue Montreal body type with a mono-label eyebrow ("FOUNDER · STARTUP NAME" or similar).
- Wall layout: masonry or 3-col grid of testimonial cards. Hover lifts the card via `translateY(-4px)` + the live-site shadow (see §6.3).
- If we add company logos, they live in a separate "trusted by" strip rendered at low opacity in mono — never colored.

---

## 12. Source-of-truth references

| Topic | Source |
|---|---|
| Color palette | Brand book slide [`19.png`](tonik-branding/19.png) |
| Typography overview | Slides [`15.png`](tonik-branding/15.png), [`16.png`](tonik-branding/16.png) |
| Type scale | Slide [`13.png`](tonik-branding/13.png) |
| Layouts | Slide [`14.png`](tonik-branding/14.png) |
| Logo construction | Slide [`21.png`](tonik-branding/21.png) |
| Logo safe space | Slide [`11.png`](tonik-branding/11.png) |
| Symbol safe space | Slide [`10.png`](tonik-branding/10.png) |
| Logo on color | Slide [`12.png`](tonik-branding/12.png) |
| Logo forbidden practices | Slide [`09.png`](tonik-branding/09.png) |
| Symbol forbidden practices | Slide [`08.png`](tonik-branding/08.png) |
| Service icons | Slide [`02.png`](tonik-branding/02.png) |
| Photography style | Slide [`17.png`](tonik-branding/17.png) |
| Swag / lifestyle voice | Slide [`18.png`](tonik-branding/18.png) |
| 3D symbol | Slide [`20.png`](tonik-branding/20.png) |
| Section divider style | Slide [`24.png`](tonik-branding/24.png) (Brand essentials cover) |
| Master file | [`tonik brand guidelines _ Slides _ Templates.fig`](tonik%20brand%20guidelines%20_%20Slides%20_%20Templates.fig) |
| Live site reference | https://www.tonik.com |
