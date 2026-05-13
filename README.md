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

### Vercel (primary)

The repo is wired for Vercel via [`vercel.json`](vercel.json). Every push to
`main` triggers an auto-deploy. To redeploy after a Sanity content edit, push
an empty commit or hit the deploy hook (see below).

Set in Vercel → Project → Settings → Environment Variables:

```
PUBLIC_SANITY_PROJECT_ID = eprcy1z1
PUBLIC_SANITY_DATASET    = production
SITE_URL                 = https://<your-vercel-subdomain>.vercel.app
```

### Content updates (ISR — no manual rebuild needed)

The site uses **Incremental Static Regeneration** via `@astrojs/vercel`. Each
request to `/` is served from Vercel's edge cache; the cache expires after
5 minutes (`isr.expiration: 300` in [`astro.config.mjs`](astro.config.mjs)) and
the next request triggers a background re-render that re-fetches from Sanity.

In practice: publish a card in Sanity Studio → wait up to 5 minutes → it
appears live. No webhook, no rebuild, no human in the loop.

If you ever need an instant refresh, you can still:

- Push an empty commit to `main` (`git commit --allow-empty -m "trigger redeploy" && git push`)
- Or trigger a Vercel deploy hook (Project → Settings → Git → Deploy Hooks)

### GitHub Pages (legacy fallback)

Still works in case Vercel goes down or you want to keep both:

```bash
npm run deploy   # builds with BASE_PATH=/wall-of-love and force-pushes gh-pages
```

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
