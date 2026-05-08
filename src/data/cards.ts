// Wall of Love — content. Edit this list to swap real assets in.
// Image / GIF / video paths are resolved against import.meta.env.BASE_URL
// (so they work both in dev at "/" and on GitHub Pages under "/wall-of-love/").

export type CardKind = 'quote' | 'image' | 'gif' | 'video';

export interface QuoteCard {
  id: string;
  type: 'quote';
  body: string;
  name: string;
  role: string;
  avatar: string; // 2-letter initials
  client: string;
  meta: string;
}

export interface MediaCard {
  id: string;
  type: 'image' | 'gif' | 'video';
  /** Thumbnail / grid src (absolute or BASE-relative path starting with /) */
  thumb: string;
  /** Lightbox-size src (often same as thumb for video / gif) */
  full: string;
  alt: string;
  client: string;
  meta: string;
  caption: string;
}

export type Card = QuoteCard | MediaCard;

export const cards: Card[] = [
  {
    id: '001',
    type: 'quote',
    body: "tonik shipped our MVP in six weeks. The brand still feels like ours, the product still feels like theirs — somehow both at once.",
    name: 'Maya Kim',
    role: 'Founder · Linerbase',
    avatar: 'MK',
    client: 'Linerbase',
    meta: '#001 · Quote',
  },
  {
    id: '002',
    type: 'image',
    thumb: 'https://picsum.photos/seed/tonik-screen-1/900/620',
    full: 'https://picsum.photos/seed/tonik-screen-1/1600/1100',
    alt: 'Linerbase marketing site hero — first redesign',
    client: 'Linerbase',
    meta: '#002 · Marketing',
    caption: 'Linerbase · Marketing site v1',
  },
  {
    id: '003',
    type: 'video',
    thumb: '/design-ref/d03ad660969b8b4c850e8cf39ff0b4eb.mp4',
    full: '/design-ref/d03ad660969b8b4c850e8cf39ff0b4eb.mp4',
    alt: 'Hover Studio product reel',
    client: 'Hover Studio',
    meta: '#003 · Reel',
    caption: 'Hover Studio · Product reel',
  },
  {
    id: '004',
    type: 'quote',
    body: "They didn't ask us what we wanted. They asked us what we were scared of. That's the right first question.",
    name: 'Julian Rios',
    role: 'CEO · Northpine',
    avatar: 'JR',
    client: 'Northpine',
    meta: '#004 · Quote',
  },
  {
    id: '005',
    type: 'gif',
    thumb: 'https://picsum.photos/seed/tonik-gif-1/900/900',
    full: 'https://picsum.photos/seed/tonik-gif-1/1400/1400',
    alt: 'Northpine onboarding flow — animated walkthrough',
    client: 'Northpine',
    meta: '#005 · Onboarding',
    caption: 'Northpine · Onboarding flow',
  },
  {
    id: '006',
    type: 'image',
    thumb: 'https://picsum.photos/seed/tonik-screen-2/900/1200',
    full: 'https://picsum.photos/seed/tonik-screen-2/1600/2000',
    alt: 'Driftwave mobile app shell — primary tab navigation',
    client: 'Driftwave',
    meta: '#006 · Mobile',
    caption: 'Driftwave · Mobile app shell',
  },
  {
    id: '007',
    type: 'quote',
    body: "We came in with a Notion doc and a deadline. We left with a brand, a website, and a team that finally agreed on what we were building.",
    name: 'Emma Asplund',
    role: 'Co-founder · Halftide',
    avatar: 'EA',
    client: 'Halftide',
    meta: '#007 · Quote',
  },
  {
    id: '008',
    type: 'image',
    thumb: 'https://picsum.photos/seed/tonik-screen-3/900/600',
    full: 'https://picsum.photos/seed/tonik-screen-3/1800/1200',
    alt: 'Halftide analytics dashboard — light theme',
    client: 'Halftide',
    meta: '#008 · Dashboard',
    caption: 'Halftide · Dashboard',
  },
  {
    id: '009',
    type: 'gif',
    thumb: 'https://picsum.photos/seed/tonik-gif-2/800/1200',
    full: 'https://picsum.photos/seed/tonik-gif-2/1200/1800',
    alt: 'Glasswork pricing page — animated tier toggle',
    client: 'Glasswork',
    meta: '#009 · Pricing',
    caption: 'Glasswork · Pricing interaction',
  },
  {
    id: '010',
    type: 'quote',
    body: "Best six weeks of money we've ever spent. Period.",
    name: 'Daniel Tovar',
    role: 'Founder · Aperture Labs',
    avatar: 'DT',
    client: 'Aperture Labs',
    meta: '#010 · Quote',
  },
];
