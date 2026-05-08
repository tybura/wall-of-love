import { defineCliConfig } from 'sanity/cli';

// Project ID is public (it appears in every API request your client makes).
// Hardcoded so `sanity dev` / `sanity deploy` work without env files.
export default defineCliConfig({
  api: {
    projectId: 'eprcy1z1',
    dataset: 'production',
  },
  /**
   * Set autoUpdates to true to receive automatic studio updates.
   * Set to false during local development if you want fully reproducible builds.
   */
  autoUpdates: true,
});
