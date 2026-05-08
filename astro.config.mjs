// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages deploy: project pages live at https://<user>.github.io/<repo>
// Override at build time by setting BASE_PATH (e.g. '' for root domain).
const BASE = process.env.BASE_PATH ?? '/wall-of-love';

export default defineConfig({
  site: 'https://tybura.github.io',
  base: BASE,
  output: 'static',
  trailingSlash: 'ignore',
  build: { assets: '_assets' },
});
