import { defineField, defineType } from 'sanity';

const isQuote = ({ parent }: { parent?: { type?: string } }) => parent?.type !== 'quote';
const isMedia = ({ parent }: { parent?: { type?: string } }) => parent?.type === 'quote';
const isImage = ({ parent }: { parent?: { type?: string } }) => parent?.type !== 'image';
const isVideo = ({ parent }: { parent?: { type?: string } }) => parent?.type !== 'video';

export const card = defineType({
  name: 'card',
  title: 'Card',
  type: 'document',
  description:
    'A single piece on the wall. Pick a type, then fill in the fields that appear for that type.',
  fields: [
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first.',
      initialValue: 100,
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Quote (testimonial)', value: 'quote' },
          { title: 'Image / screenshot', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'client',
      title: 'Client',
      type: 'reference',
      to: [{ type: 'client' }],
      description: 'Pick the client this card is from. Manage the list under "Clients".',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'meta',
      title: 'Caption meta',
      type: 'string',
      description:
        'Short label shown after the client name in the caption row. e.g. "#003 · Reel".',
    }),

    /* ─── Quote fields ─────────────────────────────────────── */
    defineField({
      name: 'body',
      title: 'Quote',
      type: 'text',
      rows: 4,
      description: 'The testimonial text. Plain text — no HTML.',
      hidden: isQuote,
      validation: (r) =>
        r.custom((val, ctx) => {
          const parent = ctx.parent as { type?: string } | undefined;
          if (parent?.type === 'quote' && !val) return 'Quote text is required';
          return true;
        }),
    }),
    defineField({
      name: 'name',
      title: 'Author name',
      type: 'string',
      hidden: isQuote,
    }),
    defineField({
      name: 'role',
      title: 'Author role',
      type: 'string',
      description: 'e.g. "Founder · Linerbase". Shown in mono caps below the name.',
      hidden: isQuote,
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar initials',
      type: 'string',
      description: '2 letters. Shown in the small circle in the quote attribution.',
      validation: (r) => r.max(3),
      hidden: isQuote,
    }),

    /* ─── Image fields ─────────────────────────────────────── */
    defineField({
      name: 'image',
      title: 'Image / screenshot',
      type: 'image',
      options: { hotspot: true },
      description: 'JPG, PNG, WebP, or animated GIF.',
      hidden: isImage,
      validation: (r) =>
        r.custom((val, ctx) => {
          const parent = ctx.parent as { type?: string } | undefined;
          if (parent?.type === 'image' && !val) return 'An image is required';
          return true;
        }),
    }),

    /* ─── Video fields ─────────────────────────────────────── */
    defineField({
      name: 'video',
      title: 'Video file',
      type: 'file',
      options: { accept: 'video/mp4,video/webm,video/quicktime' },
      description: 'MP4 / WebM / MOV. Will autoplay muted on the wall.',
      hidden: isVideo,
      validation: (r) =>
        r.custom((val, ctx) => {
          const parent = ctx.parent as { type?: string } | undefined;
          if (parent?.type === 'video' && !val) return 'A video file is required';
          return true;
        }),
    }),

    /* ─── Shared media fields ──────────────────────────────── */
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description: 'Describe the image/video for screen readers.',
      hidden: isMedia,
    }),
    defineField({
      name: 'caption',
      title: 'Lightbox caption',
      type: 'string',
      description: 'Shown under the media when opened. e.g. "Hover Studio · Product reel".',
      hidden: isMedia,
    }),
  ],

  orderings: [
    {
      title: 'Manual order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      type: 'type',
      meta: 'meta',
      clientName: 'client.name',
      body: 'body',
      image: 'image',
    },
    prepare({ type, meta, clientName, body, image }) {
      const titleMap: Record<string, string> = {
        quote: '“ ' + (body || '').slice(0, 60),
        image: 'Image — ' + (clientName || '?'),
        video: 'Video — ' + (clientName || '?'),
      };
      return {
        title: titleMap[type] || 'Card',
        subtitle: [clientName, meta].filter(Boolean).join(' · '),
        media: image,
      };
    },
  },
});
