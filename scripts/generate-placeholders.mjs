import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..', 'public', 'assets', 'projects');

const specs = {
  drfuel: { bg: '#1C3028', accent: '#B5523B', label: 'Product & Brand', mood: 'energy' },
  dreams: { bg: '#152A35', accent: '#AFC8D1', label: 'Signature Concept', mood: 'cinematic' },
  dropdrop: { bg: '#E8DFC9', accent: '#3F6B8A', label: 'Product & Brand', mood: 'mediterranean' },
  'plumber-template-01': { bg: '#F6F3ED', accent: '#3F5A4F', label: 'Local Business', mood: 'emergency' },
  'plumber-template-02': { bg: '#EDE6D4', accent: '#5A6B4F', label: 'Local Business', mood: 'artisan' },
  'plumber-template-03': { bg: '#F4F1EA', accent: '#1F3D33', label: 'Local Business', mood: 'modern' },
  'volta-mare-energy': { bg: '#1F3D33', accent: '#AFC8D1', label: 'Product & Brand', mood: 'coastal' },
  'arborum-materials': { bg: '#2C2419', accent: '#C4A574', label: 'Product & Brand', mood: 'materials' },
  'lumenvault-archives': { bg: '#141820', accent: '#AFC8D1', label: 'Signature Concept', mood: 'archive' },
  'atelier-nova-habitat': { bg: '#EDE8DF', accent: '#6B5A4A', label: 'Local Business', mood: 'interior' },
  'maison-oria-vet-care': { bg: '#EEF2EA', accent: '#5A7A5A', label: 'Local Business', mood: 'vet' },
  'maison-loria': { bg: '#FAF3E8', accent: '#B5523B', label: 'Local Business', mood: 'bakery' },
  'na-studio-portfolio': { bg: '#1F3D33', accent: '#AFC8D1', label: 'Signature Concept', mood: 'editorial' },
  questline: { bg: '#F6F3ED', accent: '#3F5A4F', label: 'SaaS & Web App', mood: 'gamified' },
  'dilemma-royale': { bg: '#1A1A18', accent: '#AFC8D1', label: 'SaaS & Web App', mood: 'strategy' },
  peerless: { bg: '#F0EDE6', accent: '#1F3D33', label: 'SaaS & Web App', mood: 'ranking' },
};

const titles = {
  drfuel: 'DRFuel',
  dreams: 'Dreams',
  dropdrop: 'DROPDROP',
  'plumber-template-01': 'Plumber Template 01',
  'plumber-template-02': 'Plumber Template 02',
  'plumber-template-03': 'Plumber Template 03',
  'volta-mare-energy': 'Volta Mare Energy',
  'arborum-materials': 'Arborum Materials',
  'lumenvault-archives': 'LumenVault Archives',
  'atelier-nova-habitat': 'Atelier Nova Habitat',
  'maison-oria-vet-care': 'Maison Oria Vet & Care',
  'maison-loria': 'Maison Loria',
  'na-studio-portfolio': 'NA Studio Portfolio',
  questline: 'Questline',
  'dilemma-royale': 'Dilemma Royale',
  peerless: 'Peerless',
};

function coverSvg(slug, spec) {
  const title = titles[slug];
  const dark = ['#1C3028', '#152A35', '#1F3D33', '#141820', '#1A1A18', '#2C2419'].includes(spec.bg);
  const text = dark ? '#F6F3ED' : '#1A1A18';
  const muted = dark ? 'rgba(246,243,237,0.35)' : 'rgba(26,26,24,0.35)';
  const panel = dark ? 'rgba(246,243,237,0.08)' : 'rgba(31,61,51,0.06)';

  return `<svg width="800" height="500" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="500" fill="${spec.bg}"/>
  <filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
  <rect width="800" height="500" opacity="0.05" filter="url(#g)"/>
  <line x1="400" y1="0" x2="400" y2="500" stroke="${spec.accent}" stroke-width="0.5" opacity="0.12"/>
  <rect x="60" y="80" width="520" height="320" fill="${panel}" rx="2"/>
  <rect x="84" y="104" width="80" height="6" fill="${text}" opacity="0.7" rx="1"/>
  <rect x="84" y="140" width="220" height="14" fill="${text}" opacity="0.55" rx="1"/>
  <rect x="84" y="164" width="180" height="8" fill="${text}" opacity="0.25" rx="1"/>
  <rect x="84" y="200" width="100" height="28" fill="${spec.accent}" opacity="0.75" rx="2"/>
  <rect x="620" y="100" width="120" height="280" fill="${panel}" rx="2"/>
  <line x1="0" y1="420" x2="800" y2="400" stroke="${spec.accent}" stroke-width="0.8" opacity="0.2"/>
  <text x="84" y="460" font-family="Georgia, serif" font-size="22" fill="${text}" opacity="0.9">${title}</text>
  <text x="84" y="478" font-family="system-ui, sans-serif" font-size="9" letter-spacing="3" fill="${muted}">${spec.label.toUpperCase()}</text>
</svg>`;
}

for (const [slug, spec] of Object.entries(specs)) {
  const dir = join(root, slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'cover.svg'), coverSvg(slug, spec));
}

console.log('Generated', Object.keys(specs).length, 'cover.svg files');
