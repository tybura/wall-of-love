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

```bash
npm run deploy   # builds dist/ and force-pushes to the gh-pages branch
```

GitHub Pages is configured to serve `gh-pages` (path `/`).
Live URL: <https://tybura.github.io/wall-of-love/>

## Edit content

The site reads cards from **Sanity** at build time, with a built-in fallback to
local demo data in [`src/data/cards.ts`](src/data/cards.ts) when Sanity isn't
configured (so the build never breaks).

### One-time Sanity setup

```bash
# 1. Install Studio deps + bootstrap a Sanity project (interactive — you'll log in,
#    pick "Create new project", and choose dataset name "production")
npm run studio:install
npm run studio:init

# 2. Copy the project ID it printed into .env.local (at repo root)
cp .env.example .env.local
$EDITOR .env.local         # paste PROJECT_ID into both PUBLIC_… and SANITY_STUDIO_…

# 3. Edit content locally
npm run studio:dev         # http://localhost:3333

# 4. Publish the Studio so anyone you invite can edit content from the browser
npm run studio:deploy      # picks a hostname like wall-of-love.sanity.studio
```

After that, editing content in Studio + running `npm run deploy` rebuilds the
site from Sanity and pushes a new `gh-pages`. (The site won't auto-rebuild on
Studio changes — that's a one-line addition we can wire up if you want.)

### What lives where

- **Cards (testimonials / images / videos):** Sanity Studio → "Cards"
- **Clients:** Sanity Studio → "Clients" (referenced by cards)
- **Local demo cards (used as fallback):** [`src/data/cards.ts`](src/data/cards.ts)
- **Hero copy:** still in code as props on `<Hero />` in
  [`src/pages/index.astro`](src/pages/index.astro). Move to Sanity later if needed.
- **Tokens (colors, type, spacing):** [`src/styles/global.css`](src/styles/global.css),
  sourced from [`design.md`](design.md).

## Brand reference

The full Tonik design system (colors, type scale, logo rules, voice) lives in
[`design.md`](design.md), with brand-book PNG sources in [`tonik-branding/`](tonik-branding/).
