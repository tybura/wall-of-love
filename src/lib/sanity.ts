import { createClient, type SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { Card, QuoteCard, MediaCard } from '../data/cards';
import { cards as fallbackCards } from '../data/cards';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION || '2024-10-01';

export const isSanityConfigured = Boolean(projectId);

export const sanityClient: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: 'published',
    })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

/** URL for a Sanity image asset, sized for the grid thumbnail. */
export function imageThumb(src: SanityImageSource, w = 1200): string {
  if (!builder) return '';
  return builder.image(src).width(w).auto('format').fit('max').url();
}

/** Larger URL for the lightbox view. */
export function imageFull(src: SanityImageSource, w = 2000): string {
  if (!builder) return '';
  return builder.image(src).width(w).auto('format').fit('max').url();
}

/** GROQ query — note we only fetch fields used by the Astro side. */
const cardsQuery = /* groq */ `*[_type == "card"] | order(order asc) {
  "id": _id,
  type,
  order,
  meta,
  "client": client->name,
  // quote
  body, name, role, avatar,
  // media
  alt, caption, image, "video": video.asset->url
}`;

interface SanityCardRaw {
  id: string;
  type: 'quote' | 'image' | 'video';
  order: number;
  meta?: string;
  client: string;
  body?: string;
  name?: string;
  role?: string;
  avatar?: string;
  alt?: string;
  caption?: string;
  image?: SanityImageSource;
  video?: string;
}

function mapToCard(raw: SanityCardRaw, index: number): Card | null {
  const meta = raw.meta || `#${String(index + 1).padStart(3, '0')} · ${raw.type}`;

  if (raw.type === 'quote') {
    if (!raw.body) return null;
    const card: QuoteCard = {
      id: raw.id,
      type: 'quote',
      body: raw.body,
      name: raw.name || '',
      role: raw.role || '',
      avatar: raw.avatar || '',
      client: raw.client,
      meta,
    };
    return card;
  }

  if (raw.type === 'image') {
    if (!raw.image) return null;
    const thumb = imageThumb(raw.image, 1200);
    const full = imageFull(raw.image, 2000);
    const card: MediaCard = {
      id: raw.id,
      type: 'image',
      thumb,
      full,
      alt: raw.alt || '',
      client: raw.client,
      meta,
      caption: raw.caption || raw.client,
    };
    return card;
  }

  if (raw.type === 'video') {
    if (!raw.video) return null;
    const card: MediaCard = {
      id: raw.id,
      type: 'video',
      thumb: raw.video,
      full: raw.video,
      alt: raw.alt || '',
      client: raw.client,
      meta,
      caption: raw.caption || raw.client,
    };
    return card;
  }

  return null;
}

/**
 * Fetch cards. Falls back to local demo data when Sanity isn't configured
 * or the dataset is empty / unreachable.
 */
export async function getCards(): Promise<Card[]> {
  if (!sanityClient) {
    console.warn(
      '[sanity] Not configured (set PUBLIC_SANITY_PROJECT_ID in .env.local). ' +
        'Using local demo cards from src/data/cards.ts.'
    );
    return fallbackCards;
  }

  try {
    const raw = await sanityClient.fetch<SanityCardRaw[]>(cardsQuery);
    if (!raw || raw.length === 0) {
      console.warn('[sanity] Dataset is empty. Using local demo cards.');
      return fallbackCards;
    }
    return raw
      .map(mapToCard)
      .filter((c): c is Card => c !== null);
  } catch (err) {
    console.error('[sanity] Fetch failed, falling back to local demo cards:', err);
    return fallbackCards;
  }
}
