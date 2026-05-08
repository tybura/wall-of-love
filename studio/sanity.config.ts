import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'YOUR_PROJECT_ID';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

export default defineConfig({
  name: 'wall-of-love',
  title: 'Wall of Love',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Cards')
              .child(
                S.documentTypeList('card')
                  .title('Cards')
                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
              ),
            S.divider(),
            S.documentTypeListItem('client').title('Clients'),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
});
