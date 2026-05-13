// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// SITE_URL lets us point canonical/sitemap URLs at the actual production host.
// Set it in Vercel's project env vars (e.g. https://wall-of-love.vercel.app).
// Use || so an empty-string env var also falls back to the default.
const SITE = process.env.SITE_URL || 'https://tybura.github.io';

// BASE_PATH is only used for the legacy GitHub Pages deploy
// (BASE_PATH=/wall-of-love npm run build). On Vercel it's empty.
const BASE = process.env.BASE_PATH ?? '';

export default defineConfig({
  site: SITE,
  base: BASE,
  output: 'server',
  trailingSlash: 'ignore',
  build: { assets: '_assets' },
  adapter: vercel({
    // ISR (Incremental Static Regeneration)
    // - First request: renders the page on the server, caches at the edge
    // - Subsequent requests within `expiration`s: served from edge cache (no compute)
    // - After expiration: next request serves stale + regenerates in background
    // 300s = 5 minutes is a good balance: content updates land within a few
    // minutes of publish, no need for Sanity webhook → full rebuild dance.
    isr: {
      expiration: 300,
    },
    // Vercel's Image Optimization is currently disabled — we already serve
    // size-tuned, auto-format'd images straight from Sanity's CDN (see
    // src/lib/sanity.ts). Enable here later if we move to Astro <Image>.
    imageService: false,
    // Vercel Web Analytics — opt-in, you can flip this on whenever.
    webAnalytics: { enabled: false },
  }),
});
