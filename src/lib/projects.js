import { themeTokens } from './themeTokens';

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
  translationKey = '',
  status = 'concept',
  role = 'Design & front-end',
  challenge = '',
  solution = '',
  outcome = '',
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
    status,
    role,
    challenge,
    solution,
    outcome,
    coverImage: `${asset(slug)}/cover.svg`,
    desktopScreenshot: `${asset(slug)}/desktop.svg`,
    mobileScreenshot: `${asset(slug)}/mobile.svg`,
    galleryImages: [],
    coverVideo: null,
    proofType: 'visual',
    proofUrl: null,
    ctaLabel: 'viewVisual',
    assetStatus: 'placeholder',
  };
}

/**
 * Curated portfolio: 12 projects, 3 per territory.
 * Internal category slugs are intentionally kept stable so the original
 * showroom/room animations and CSS remain intact.
 */
export const projects = [
  // BUSINESS WEBSITES — 3
  project({
    slug: 'atelier-nova-habitat',
    title: 'Atelier Nova Habitat',
    category: 'Business Websites',
    categorySlug: 'local-business',
    theme: 'local',
    type: 'Interior renovation website',
    shortPitch:
      'A premium renovation and interior architecture website concept built around trust, guidance and turnkey project support.',
    microLine: 'Renovation studio — trust, guidance, turnkey support.',
    tags: ['Renovation', 'Interior', 'Premium', 'Business'],
    featured: true,
    number: '01',
    status: 'concept',
    challenge:
      'High-consideration renovation work needs immediate credibility while still making a complex offer feel simple and approachable.',
    solution:
      'An editorial service hierarchy, restrained premium palette and reassurance-led flow that moves from capability to proof to contact without visual noise.',
    outcome: 'A business website concept designed to feel premium, clear and easy to trust at first glance.',
  }),
  project({
    slug: 'maison-oria-vet-care',
    title: 'Maison Oria Vet & Care',
    category: 'Business Websites',
    categorySlug: 'local-business',
    theme: 'local',
    type: 'Veterinary clinic website',
    shortPitch:
      'A warm premium website concept for preventive veterinary care, pet wellness, grooming and short-stay boarding.',
    microLine: 'Veterinary care — wellness, grooming, calm premium warmth.',
    tags: ['Veterinary', 'Wellness', 'Care', 'Business'],
    featured: false,
    number: '02',
    status: 'concept',
    challenge:
      'Several care services have to coexist without making the clinic feel fragmented, overly clinical or difficult to navigate.',
    solution:
      'A calm service system combines warm visual cues, clear care categories, practical information and trust markers in one coherent experience.',
    outcome: 'A reassuring local-service concept that balances professional care with a warmer hospitality feel.',
  }),
  project({
    slug: 'maison-loria',
    title: 'Maison Loria',
    category: 'Business Websites',
    categorySlug: 'local-business',
    theme: 'local',
    type: 'Bakery and café website',
    shortPitch:
      'A premium bakery, pastry house and café website concept built around craft, warmth and appetite appeal.',
    microLine: 'Bakery & café — craft, warmth, appetite appeal.',
    tags: ['Bakery', 'Café', 'Pastry', 'Business'],
    featured: false,
    number: '03',
    status: 'concept',
    challenge:
      'The digital experience needs to communicate craft and appetite without becoming another generic restaurant or menu template.',
    solution:
      'Product-led compositions, tactile editorial spacing and a simple visit-oriented hierarchy turn the brand story into a warm, navigable storefront.',
    outcome: 'A hospitality website concept built to feel crafted before the visitor even reaches the counter.',
  }),

  // PRODUCT & BRAND — 3
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
    number: '04',
    status: 'concept',
    challenge:
      'A focused product offer still needs enough structure and personality to feel credible, differentiated and easy to act on.',
    solution:
      'A concise conversion path, strong visual framing and repeated product cues keep the experience energetic without sacrificing clarity.',
    outcome: 'A compact product identity designed to explain the offer fast and leave a stronger visual memory.',
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
    number: '05',
    status: 'prototype',
    challenge:
      'The product needs to feel protective and useful while keeping the brand light, desirable and distinctly Mediterranean.',
    solution:
      'A sun-washed visual language, generous product staging and a focused waitlist journey balance utility with a more aspirational DTC identity.',
    outcome: 'A premium launch prototype where product explanation and brand atmosphere reinforce each other.',
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
    number: '06',
    status: 'prototype',
    challenge:
      'A technical infrastructure offer has to communicate credibility and scale without losing the clarity needed by non-technical decision makers.',
    solution:
      'Technical information is staged through broad coastal imagery, concise benefit layers and a bilingual structure that keeps the proposition readable.',
    outcome: 'An infrastructure concept that feels technical, international and premium without becoming visually heavy.',
  }),

  // WEB APPS & INTERFACES — 3
  project({
    slug: 'questline',
    title: 'Questline',
    category: 'Web Apps & Interfaces',
    categorySlug: 'saas-web-app',
    theme: 'saas',
    type: 'Gamified productivity app',
    shortPitch:
      'A gamified discipline system combining tasks, streaks, journaling and progress tracking.',
    microLine: 'Gamified discipline — tasks, streaks, progress tracking.',
    tags: ['Productivity', 'App', 'Gamification', 'Tracking'],
    featured: true,
    number: '07',
    status: 'personal',
    role: 'Product design & front-end',
    challenge:
      'Motivation features can quickly turn into visual clutter, especially when tasks, streaks, reflections and progress all compete for attention.',
    solution:
      'The interface turns progress into a clear hierarchy of quests, feedback loops and lightweight status signals while keeping daily actions central.',
    outcome: 'A personal product experiment around behavior, motivation and readable progression systems.',
  }),
  project({
    slug: 'dilemma-royale',
    title: 'Dilemma Royale',
    category: 'Web Apps & Interfaces',
    categorySlug: 'saas-web-app',
    theme: 'saas',
    type: 'Strategy simulation app',
    shortPitch:
      "A playful web app exploring repeated decision-making and strategy through the iterated prisoner's dilemma.",
    microLine: 'Strategy simulation — decisions, rounds, playful tension.',
    tags: ['Game Theory', 'Simulation', 'Strategy', 'Web App'],
    featured: false,
    number: '08',
    status: 'personal',
    role: 'Product design & front-end',
    challenge:
      'A repeated strategic model is easy to understand mathematically but harder to make immediate, playful and readable round after round.',
    solution:
      'Game-state feedback, strong action contrast and visible round progression turn the underlying model into a lightweight interactive experience.',
    outcome: 'A playful interface that makes repeated strategic choices understandable without exposing unnecessary complexity.',
  }),
  project({
    slug: 'peerless',
    title: 'Peerless',
    category: 'Web Apps & Interfaces',
    categorySlug: 'saas-web-app',
    theme: 'saas',
    type: 'Ranking web app',
    shortPitch:
      'A playful tier-list and comparison app for ranking ideas, characters, products or concepts quickly and visually.',
    microLine: 'Visual tier lists — rank ideas fast, playfully, clearly.',
    tags: ['Ranking', 'Web App', 'UI', 'Playful'],
    featured: false,
    number: '09',
    status: 'personal',
    role: 'Product design & front-end',
    challenge:
      'Ranking tools need to stay frictionless even as the list grows, while keeping comparison and movement visually obvious.',
    solution:
      'Large drag-oriented zones, clear hierarchy and playful visual feedback reduce the interface to the core action: compare, move and decide.',
    outcome: 'A direct product UI experiment centered on visual comparison and low-friction interaction.',
  }),

  // EXPERIMENTAL / SIGNATURE — 3
  project({
    slug: 'dreams',
    title: 'Dreams',
    category: 'Experimental / Signature',
    categorySlug: 'signature-concept',
    theme: 'signature',
    type: 'Cinematic web concept',
    shortPitch:
      'An atmospheric digital experience designed as a world rather than just a website.',
    microLine: 'A cinematic web world built around atmosphere and memory.',
    tags: ['Cinematic', 'Concept', 'Story', 'Atmosphere'],
    featured: true,
    number: '10',
    status: 'personal',
    role: 'Concept, art direction & front-end',
    challenge:
      'A dream journal should feel intimate and atmospheric without sacrificing the structure needed to revisit, connect and understand entries.',
    solution:
      'Layered motion, dark cinematic framing and restrained navigation create a sense of memory while maintaining clear entry and exploration paths.',
    outcome: 'A personal experiment where interface structure is intentionally hidden inside a more emotional visual world.',
  }),
  project({
    slug: 'lumenvault-archives',
    title: 'LumenVault Archives',
    category: 'Experimental / Signature',
    categorySlug: 'signature-concept',
    theme: 'signature',
    type: 'Digital preservation website',
    shortPitch:
      'A premium concept for 3D digitization, secure digital archiving and preservation services for museums, galleries and private collections.',
    microLine: '3D digitization and secure archival for cultural institutions.',
    tags: ['Archives', '3D', 'Museums', 'Security'],
    featured: false,
    number: '11',
    status: 'concept',
    challenge:
      'Digital preservation is technical and trust-sensitive, yet the audience expects the cultural material itself to remain central and elevated.',
    solution:
      'A dark archival atmosphere, precise technical labeling and museum-like framing make the service feel secure without turning it into a generic technology site.',
    outcome: 'A concept that treats preservation technology as part of the exhibition rather than a layer behind it.',
  }),
  project({
    slug: 'na-studio-portfolio',
    title: 'NA Studio Portfolio',
    category: 'Experimental / Signature',
    categorySlug: 'signature-concept',
    theme: 'signature',
    type: 'Personal studio portfolio',
    shortPitch:
      'A cinematic personal portfolio for a hybrid profile between design, code, data and systems thinking.',
    microLine: 'Cinematic studio portfolio — design, code, data, systems.',
    tags: ['Portfolio', 'Editorial', 'Identity', 'Studio'],
    featured: true,
    number: '12',
    status: 'live',
    role: 'Design, direction & front-end',
    challenge:
      'A multidisciplinary profile needs one coherent entry point without flattening design, code, data and research into a generic personal site.',
    solution:
      'The portfolio uses editorial pacing, distinct project worlds and a strong identity system to connect different disciplines under one studio logic.',
    outcome: 'A live personal platform that acts as the broader identity layer around NA Websites and adjacent projects.',
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
  local: { ...themeTokens.local, punctuation: themeTokens.brand.accent },
  brand: { ...themeTokens.brand, punctuation: themeTokens.brand.accent },
  saas: { ...themeTokens.saas, punctuation: themeTokens.saas.accent },
  signature: { ...themeTokens.signature, punctuation: '#B5523B' },
};

export const categories = [
  {
    slug: 'local-business',
    label: 'BUSINESS',
    fullLabel: 'Business Websites',
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
    label: 'WEB APP',
    fullLabel: 'Web Apps & Interfaces',
    theme: 'saas',
    meta: 'FLOW / INTERFACE / LOGIC',
  },
  {
    slug: 'signature-concept',
    label: 'SIGNATURE',
    fullLabel: 'Experimental / Signature',
    theme: 'signature',
    meta: 'ATMOSPHERE / IDENTITY / MEMORY',
  },
];

export const categoryLabels = {
  'local-business': 'BUSINESS WEBSITES',
  'product-brand': 'PRODUCT & BRAND',
  'saas-web-app': 'WEB APPS & INTERFACES',
  'signature-concept': 'EXPERIMENTAL / SIGNATURE',
};

export const HOME_FEATURED_SLUGS = [
  'dropdrop',
  'atelier-nova-habitat',
  'volta-mare-energy',
  'dreams',
  'questline',
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}

export { enrichProject, enrichProjects, getEnrichedProject } from './enrichProjects';
