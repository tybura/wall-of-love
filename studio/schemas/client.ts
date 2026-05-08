import { defineField, defineType } from 'sanity';

export const client = defineType({
  name: 'client',
  title: 'Client',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Display name shown on the wall (e.g. "Linerbase").',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 64 },
    }),
  ],
  preview: {
    select: { title: 'name' },
  },
});
