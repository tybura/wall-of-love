import { defineCliConfig } from 'sanity/cli';

// Project ID + dataset come from .env.local at the repo root, where you set them
// after running `npx sanity init` (it autofills these for you).
//
// SANITY_STUDIO_PROJECT_ID and SANITY_STUDIO_DATASET are the conventional names
// recognized by `sanity dev` / `sanity deploy`.
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'YOUR_PROJECT_ID';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

export default defineCliConfig({
  api: { projectId, dataset },
  /**
   * Set autoUpdates to true to receive automatic studio updates.
   * Set to false during local development if you want fully reproducible builds.
   */
  autoUpdates: true,
});
