const asset = (slug) => `/assets/projects/${slug}`;

function project({
  slug,
  title,
  category,
  categorySlug,
  theme,
  type,
  shortPitch,
  microLine,
  tags,
  featured,
  number,
  translationKey,
}) {
  return {
    slug,
    title,
    category,
    categorySlug,
    theme,
    type,
    shortPitch,
    microLine,
    tags,
    featured,
    number,
    translationKey: translationKey || slug,
    coverImage: `${asset(slug)}/cover.svg`,
    desktopScreenshot: `${asset(slug)}/desktop.svg`,
    mobileScreenshot: `${asset(slug)}/mobile.svg`,
    galleryImages: [],
    coverVideo: null,
    proofType: 'visual',
    proofUrl: null,
    ctaLabel: 'viewVisual',
    assetStatus: 'placeholder',
    status: 'visual-ready',
  };
}

export const projects = [
  project({
    slug: 'drfuel',
    title: 'DRFuel',
    category: 'Product & Brand Websites',
    categorySlug: 'product-brand',
    theme: 'brand',
    type: 'Product website concept',
    shortPitch:
      'A sharper digital identity for a focused product concept, built around clarity, energy and trust.',
    microLine: 'Product clarity, energy and trust in one focused identity.',
    tags: ['Product', 'Landing Page', 'Identity', 'Conversion'],
    featured: true,
    number: '01',
  }),
  project({
    slug: 'dreams',
    title: 'Dreams',
    category: 'Signature Concepts',
    categorySlug: 'signature-concept',
    theme: 'signature',
    type: 'Cinematic web concept',
    shortPitch:
      'An atmospheric digital experience designed as a world rather than just a website.',
    microLine: 'A cinematic web world built around atmosphere and memory.',
    tags: ['Cinematic', 'Concept', 'Story', 'Atmosphere'],
    featured: true,
    number: '02',
  }),
  project({
    slug: 'dropdrop',
    title: 'DROPDROP',
    category: 'Product & Brand Websites',
    categorySlug: 'product-brand',
    theme: 'brand',
    type: 'Premium DTC product website',
    shortPitch:
      'A Mediterranean-inspired product website built around protection, summer movement and calm premium conversion.',
    microLine: 'Mediterranean DTC — protection, summer calm, premium conversion.',
    tags: ['DTC', 'Product', 'Waitlist', 'Brand'],
    featured: true,
    number: '03',
  }),
  project({
    slug: 'plumber-template-01',
    title: 'Plumber Template 01',
    category: 'Local Business',
    categorySlug: 'local-business',
    theme: 'local',
    type: 'Local service website',
    shortPitch:
      'A premium one-page website concept for emergency plumbing services, focused on trust, speed and contact.',
    microLine: 'Emergency plumbing — trust, speed and instant contact.',
    tags: ['Plumber', 'Local', 'Emergency', 'Conversion'],
    featured: true,
    number: '04',
  }),
  project({
    slug: 'plumber-template-02',
    title: 'Plumber Template 02',
    category: 'Local Business',
    categorySlug: 'local-business',
    theme: 'local',
    type: 'Local service website',
    shortPitch:
      'A calmer artisan-style plumbing website concept built around credibility, clarity and service structure.',
    microLine: 'Artisan plumbing — credibility, clarity, structured service.',
    tags: ['Plumber', 'Artisan', 'Trust', 'One-page'],
    featured: false,
    number: '05',
  }),
  project({
    slug: 'plumber-template-03',
    title: 'Plumber Template 03',
    category: 'Local Business',
    categorySlug: 'local-business',
    theme: 'local',
    type: 'Local service website',
    shortPitch:
      'A modern local trade website concept designed to make a practical service feel clean, serious and easy to contact.',
    microLine: 'Modern local trade — clean, serious, easy to contact.',
    tags: ['Local Business', 'Trade', 'Service', 'Contact'],
    featured: false,
    number: '06',
  }),
  project({
    slug: 'volta-mare-energy',
    title: 'Volta Mare Energy',
    category: 'Product & Brand Websites',
    categorySlug: 'product-brand',
    theme: 'brand',
    type: 'Premium energy website concept',
    shortPitch:
      'A bilingual premium website concept for floating solar microgrids serving islands, ports, marinas and coastal infrastructures.',
    microLine: 'Coastal solar microgrids — bilingual premium infrastructure.',
    tags: ['Energy', 'Coastal', 'Solar', 'Bilingual'],
    featured: true,
    number: '07',
  }),
  project({
    slug: 'arborum-materials',
    title: 'Arborum Materials',
    category: 'Product & Brand Websites',
    categorySlug: 'product-brand',
    theme: 'brand',
    type: 'Premium materials website',
    shortPitch:
      'A bilingual brand website for high-end bio-based materials designed for interiors, hospitality, retail and offices.',
    microLine: 'Bio-based materials — premium interiors and hospitality.',
    tags: ['Materials', 'Architecture', 'Premium', 'Bilingual'],
    featured: false,
    number: '08',
  }),
  project({
    slug: 'lumenvault-archives',
    title: 'LumenVault Archives',
    category: 'Signature Concepts',
    categorySlug: 'signature-concept',
    theme: 'signature',
    type: 'Digital preservation website',
    shortPitch:
      'A premium concept for 3D digitization, secure digital archiving and preservation services for museums, galleries and private collections.',
    microLine: '3D digitization and secure archival for cultural institutions.',
    tags: ['Archives', '3D', 'Museums', 'Security'],
    featured: true,
    number: '09',
  }),
  project({
    slug: 'atelier-nova-habitat',
    title: 'Atelier Nova Habitat',
    category: 'Local Business',
    categorySlug: 'local-business',
    theme: 'local',
    type: 'Interior renovation website',
    shortPitch:
      'A premium renovation and interior architecture website concept built around trust, guidance and turnkey project support.',
    microLine: 'Renovation studio — trust, guidance, turnkey support.',
    tags: ['Renovation', 'Interior', 'Premium', 'Local'],
    featured: false,
    number: '10',
  }),
  project({
    slug: 'maison-oria-vet-care',
    title: 'Maison Oria Vet & Care',
    category: 'Local Business',
    categorySlug: 'local-business',
    theme: 'local',
    type: 'Veterinary clinic website',
    shortPitch:
      'A warm premium website concept for preventive veterinary care, pet wellness, grooming and short-stay boarding.',
    microLine: 'Veterinary care — wellness, grooming, calm premium warmth.',
    tags: ['Veterinary', 'Wellness', 'Care', 'Local'],
    featured: false,
    number: '11',
  }),
  project({
    slug: 'maison-loria',
    title: 'Maison Loria',
    category: 'Local Business',
    categorySlug: 'local-business',
    theme: 'local',
    type: 'Bakery and café website',
    shortPitch:
      'A premium bakery, pastry house and café website concept built around craft, warmth and appetite appeal.',
    microLine: 'Bakery & café — craft, warmth, appetite appeal.',
    tags: ['Bakery', 'Café', 'Pastry', 'Local'],
    featured: false,
    number: '12',
  }),
  project({
    slug: 'na-studio-portfolio',
    title: 'NA Studio Portfolio',
    category: 'Signature Concepts',
    categorySlug: 'signature-concept',
    theme: 'signature',
    type: 'Personal studio portfolio',
    shortPitch:
      'A cinematic personal portfolio for a hybrid profile between design, code, data and systems thinking.',
    microLine: 'Cinematic studio portfolio — design, code, data, systems.',
    tags: ['Portfolio', 'Editorial', 'Identity', 'Studio'],
    featured: true,
    number: '13',
  }),
  project({
    slug: 'questline',
    title: 'Questline',
    category: 'SaaS & Web Apps',
    categorySlug: 'saas-web-app',
    theme: 'saas',
    type: 'Gamified productivity app',
    shortPitch:
      'A gamified discipline system combining tasks, streaks, journaling and progress tracking.',
    microLine: 'Gamified discipline — tasks, streaks, progress tracking.',
    tags: ['Productivity', 'App', 'Gamification', 'Tracking'],
    featured: true,
    number: '14',
  }),
  project({
    slug: 'dilemma-royale',
    title: 'Dilemma Royale',
    category: 'SaaS & Web Apps',
    categorySlug: 'saas-web-app',
    theme: 'saas',
    type: 'Strategy simulation app',
    shortPitch:
      "A playful web app exploring repeated decision-making and strategy through the iterated prisoner's dilemma.",
    microLine: 'Strategy simulation — decisions, rounds, playful tension.',
    tags: ['Game Theory', 'Simulation', 'Strategy', 'Web App'],
    featured: false,
    number: '15',
  }),
  project({
    slug: 'peerless',
    title: 'Peerless',
    category: 'SaaS & Web Apps',
    categorySlug: 'saas-web-app',
    theme: 'saas',
    type: 'Ranking web app',
    shortPitch:
      'A playful tier-list and comparison app for ranking ideas, characters, products or concepts quickly and visually.',
    microLine: 'Visual tier lists — rank ideas fast, playfully, clearly.',
    tags: ['Ranking', 'Web App', 'UI', 'Playful'],
    featured: false,
    number: '16',
  }),
  project({
    slug: 'patch-your-path',
    title: 'Patch Your Path',
    category: 'SaaS & Web Apps',
    categorySlug: 'saas-web-app',
    theme: 'saas',
    type: 'Guided self-progress app',
    shortPitch:
      'A structured web app concept for mapping choices, tracking personal progress and turning scattered intentions into clearer next steps.',
    microLine: 'Map choices, track progress, clarify next steps.',
    tags: ['Self-progress', 'Planning', 'App', 'Path'],
    featured: false,
    number: '17',
  }),
  project({
    slug: 'side-a-sound',
    title: 'Side a Sound',
    category: 'SaaS & Web Apps',
    categorySlug: 'saas-web-app',
    theme: 'saas',
    type: 'Audio experience app',
    shortPitch:
      'A music and audio-oriented web app concept built around mood, discovery and a more visual way to navigate sound.',
    microLine: 'Mood-led audio discovery — visual navigation for sound.',
    tags: ['Audio', 'Music', 'Discovery', 'Interface'],
    featured: false,
    number: '18',
  }),
];

export const SHOWROOM_SLUG = 'showroom';

export const workFilterOptions = [
  { slug: SHOWROOM_SLUG, theme: 'local', metaKey: 'work.showroomMeta' },
  { slug: 'local-business', theme: 'local', metaKey: 'categoriesMeta.local-business' },
  { slug: 'product-brand', theme: 'brand', metaKey: 'categoriesMeta.product-brand' },
  { slug: 'saas-web-app', theme: 'saas', metaKey: 'categoriesMeta.saas-web-app' },
  { slug: 'signature-concept', theme: 'signature', metaKey: 'categoriesMeta.signature-concept' },
];

export const themes = {
  local: {
    bg: '#F6F3ED',
    surface: '#E8DFC9',
    text: '#1A1A18',
    muted: '#6B6B60',
    accent: '#3F5A4F',
    deep: '#1F3D33',
    line: 'rgba(31, 61, 51, 0.18)',
    glow: 'rgba(175, 200, 209, 0.25)',
  },
  brand: {
    bg: '#F6F3ED',
    surface: '#E8DFC9',
    text: '#1A1A18',
    muted: '#6B6B60',
    accent: '#B5523B',
    deep: '#1F3D33',
    line: 'rgba(181, 82, 59, 0.2)',
    glow: 'rgba(175, 200, 209, 0.2)',
  },
  saas: {
    bg: '#F6F3ED',
    surface: '#FFFFFF',
    text: '#1A1A18',
    muted: '#6B6B60',
    accent: '#AFC8D1',
    deep: '#1F3D33',
    line: 'rgba(31, 61, 51, 0.18)',
    glow: 'rgba(175, 200, 209, 0.3)',
  },
  signature: {
    bg: '#1F3D33',
    surface: '#243F36',
    text: '#F6F3ED',
    muted: '#A0A090',
    accent: '#AFC8D1',
    deep: '#1A1A18',
    line: 'rgba(246, 243, 237, 0.15)',
    glow: 'rgba(175, 200, 209, 0.22)',
    punctuation: '#B5523B',
  },
};

export const categories = [
  {
    slug: 'local-business',
    label: 'LOCAL',
    fullLabel: 'Local Business',
    theme: 'local',
    meta: 'TRUST / SERVICE / CONTACT',
  },
  {
    slug: 'product-brand',
    label: 'BRAND',
    fullLabel: 'Product & Brand Websites',
    theme: 'brand',
    meta: 'DESIRE / PRODUCT / POSITIONING',
  },
  {
    slug: 'saas-web-app',
    label: 'SAAS',
    fullLabel: 'SaaS & Web Apps',
    theme: 'saas',
    meta: 'FLOW / INTERFACE / LOGIC',
  },
  {
    slug: 'signature-concept',
    label: 'SIGNATURE',
    fullLabel: 'Signature Concepts',
    theme: 'signature',
    meta: 'ATMOSPHERE / IDENTITY / MEMORY',
  },
];

export const categoryLabels = {
  'local-business': 'LOCAL BUSINESS',
  'product-brand': 'PRODUCT & BRAND',
  'saas-web-app': 'SAAS / APP',
  'signature-concept': 'SIGNATURE CONCEPT',
};

export const HOME_FEATURED_SLUGS = [
  'dropdrop',
  'plumber-template-01',
  'volta-mare-energy',
  'dreams',
  'patch-your-path',
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}

export { enrichProject, enrichProjects, getEnrichedProject } from './enrichProjects';
