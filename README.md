# tonik — Wall of Love

A curated highlight reel of design work and testimonials shipped over the last
two months. Built on [Astro](https://astro.build), deployed to GitHub Pages.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321/wall-of-love
```

## Build

```bash
npm run build    # outputs dist/
npm run preview  # serve dist/ locally
```

## Deploy

`main` branch auto-deploys to GitHub Pages via `.github/workflows/deploy.yml`.
Live URL: https://tybura.github.io/wall-of-love/

## Edit content

- **Cards:** [`src/data/cards.ts`](src/data/cards.ts) — add/remove/rearrange
  testimonials, screenshots, GIFs, and videos.
- **Hero copy:** props on `<Hero />` in [`src/pages/index.astro`](src/pages/index.astro).
- **Tokens:** [`src/styles/global.css`](src/styles/global.css) — colors, type,
  spacing variables sourced from [`design.md`](design.md).

## Brand reference

The full Tonik design system (colors, type scale, logo rules, voice) lives in
[`design.md`](design.md), with brand-book PNG sources in [`tonik-branding/`](tonik-branding/).
