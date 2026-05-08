// @ts-check
import { defineConfig } from 'astro/config';

// Vercel serves at the root of a project subdomain, so the default base is "".
// For the legacy GitHub Pages deploy (a project page under /wall-of-love), set
// BASE_PATH=/wall-of-love at build time:
//   BASE_PATH=/wall-of-love npm run build
const BASE = process.env.BASE_PATH ?? '';

// SITE_URL lets us point canonical/sitemap URLs at the actual production host.
// Set it in Vercel's project env vars (e.g. https://wall-of-love.vercel.app).
const SITE = process.env.SITE_URL ?? 'https://tybura.github.io';

export default defineConfig({
  site: SITE,
  base: BASE,
  output: 'static',
  trailingSlash: 'ignore',
  build: { assets: '_assets' },
});
