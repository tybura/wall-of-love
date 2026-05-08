import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'wall-of-love',
  title: 'Wall of Love',

  // Project ID is public (it shows up in every API request from any client).
  projectId: 'eprcy1z1',
  dataset: 'production',

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
