import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..', 'public', 'assets', 'projects');

const specs = {
  drfuel: { bg: '#1C3028', accent: '#B5523B', accent2: '#E8DFC9', label: 'Product & Brand', mood: 'energy' },
  dreams: { bg: '#0F1A22', accent: '#AFC8D1', accent2: '#3F5A6A', label: 'Signature Concept', mood: 'cinematic' },
  dropdrop: { bg: '#E8DFC9', accent: '#3F6B8A', accent2: '#F6F3ED', label: 'Product & Brand', mood: 'mediterranean' },
  'plumber-template-01': { bg: '#F6F3ED', accent: '#3F5A4F', accent2: '#B5523B', label: 'Local Business', mood: 'emergency' },
  'plumber-template-02': { bg: '#EDE6D4', accent: '#5A6B4F', accent2: '#8A7A5A', label: 'Local Business', mood: 'artisan' },
  'plumber-template-03': { bg: '#F4F1EA', accent: '#1F3D33', accent2: '#AFC8D1', label: 'Local Business', mood: 'modern' },
  'volta-mare-energy': { bg: '#1F3D33', accent: '#AFC8D1', accent2: '#3F6B8A', label: 'Product & Brand', mood: 'coastal' },
  'arborum-materials': { bg: '#2C2419', accent: '#C4A574', accent2: '#8A7A5A', label: 'Product & Brand', mood: 'materials' },
  'lumenvault-archives': { bg: '#141820', accent: '#AFC8D1', accent2: '#C4A574', label: 'Signature Concept', mood: 'archive' },
  'atelier-nova-habitat': { bg: '#EDE8DF', accent: '#6B5A4A', accent2: '#C4A574', label: 'Local Business', mood: 'interior' },
  'maison-oria-vet-care': { bg: '#EEF2EA', accent: '#5A7A5A', accent2: '#AFC8D1', label: 'Local Business', mood: 'vet' },
  'maison-loria': { bg: '#FAF3E8', accent: '#B5523B', accent2: '#C4A574', label: 'Local Business', mood: 'bakery' },
  'na-studio-portfolio': { bg: '#1F3D33', accent: '#AFC8D1', accent2: '#F6F3ED', label: 'Signature Concept', mood: 'editorial' },
  questline: { bg: '#F6F3ED', accent: '#3F5A4F', accent2: '#B5523B', label: 'SaaS & Web App', mood: 'gamified' },
  'dilemma-royale': { bg: '#1A1A18', accent: '#AFC8D1', accent2: '#B5523B', label: 'SaaS & Web App', mood: 'strategy' },
  peerless: { bg: '#F0EDE6', accent: '#1F3D33', accent2: '#AFC8D1', label: 'SaaS & Web App', mood: 'ranking' },
};

const titles = {
  drfuel: 'DRFuel',
  dreams: 'Dreams',
  dropdrop: 'DROPDROP',
  'plumber-template-01': 'Emergency Plumbing',
  'plumber-template-02': 'Artisan Plumbing',
  'plumber-template-03': 'Modern Trade',
  'volta-mare-energy': 'Volta Mare Energy',
  'arborum-materials': 'Arborum Materials',
  'lumenvault-archives': 'LumenVault Archives',
  'atelier-nova-habitat': 'Atelier Nova Habitat',
  'maison-oria-vet-care': 'Maison Oria',
  'maison-loria': 'Maison Loria',
  'na-studio-portfolio': 'NA Studio',
  questline: 'Questline',
  'dilemma-royale': 'Dilemma Royale',
  peerless: 'Peerless',
};

function moodArt(mood, s) {
  const a = s.accent;
  const b = s.accent2;
  switch (mood) {
    case 'energy':
      return `<circle cx="620" cy="160" r="90" fill="${a}" opacity="0.12"/><path d="M580 280 L640 120 L660 200 L720 180" stroke="${a}" stroke-width="2" fill="none" opacity="0.5"/><rect x="520" y="300" width="200" height="8" fill="${a}" opacity="0.35" rx="4"/>`;
    case 'cinematic':
      return `<radialGradient id="glow"><stop offset="0%" stop-color="${a}" stop-opacity="0.25"/><stop offset="100%" stop-color="${a}" stop-opacity="0"/></radialGradient><ellipse cx="200" cy="120" rx="180" ry="100" fill="url(#glow)"/><path d="M0 380 Q200 320 400 360 T800 340" stroke="${a}" stroke-width="0.6" fill="none" opacity="0.3"/>`;
    case 'mediterranean':
      return `<circle cx="650" cy="140" r="70" fill="${a}" opacity="0.15"/><path d="M0 420 Q200 380 400 400 T800 380" stroke="${a}" stroke-width="1.2" fill="none" opacity="0.25"/><ellipse cx="680" cy="320" rx="60" ry="24" fill="${a}" opacity="0.2"/>`;
    case 'emergency':
      return `<rect x="560" y="100" width="180" height="44" fill="${a}" opacity="0.85" rx="3"/><circle cx="600" cy="280" r="8" fill="${b}" opacity="0.8"/><path d="M84 360 L200 360" stroke="${a}" stroke-width="2" opacity="0.4"/>`;
    case 'artisan':
      return `<rect x="540" y="120" width="220" height="160" fill="none" stroke="${a}" stroke-width="0.8" opacity="0.35" rx="2"/><line x1="560" y1="200" x2="740" y2="200" stroke="${b}" stroke-width="0.5" opacity="0.3"/>`;
    case 'modern':
      return `<rect x="580" y="90" width="160" height="200" fill="${a}" opacity="0.06" rx="2"/><rect x="600" y="110" width="120" height="4" fill="${a}" opacity="0.4"/><rect x="600" y="130" width="80" height="4" fill="${a}" opacity="0.2"/>`;
    case 'coastal':
      return `<path d="M0 450 Q200 400 400 430 T800 410 L800 500 L0 500 Z" fill="${a}" opacity="0.12"/><circle cx="700" cy="180" r="50" fill="${b}" opacity="0.15"/>`;
    case 'materials':
      return `<rect x="560" y="100" width="40" height="120" fill="${a}" opacity="0.4" rx="1"/><rect x="610" y="130" width="40" height="90" fill="${b}" opacity="0.35" rx="1"/><rect x="660" y="110" width="40" height="110" fill="${a}" opacity="0.25" rx="1"/>`;
    case 'archive':
      return `<rect x="560" y="100" width="200" height="140" fill="none" stroke="${a}" stroke-width="0.6" opacity="0.4"/><path d="M580 140 L740 140 M580 170 L700 170 M580 200 L720 200" stroke="${a}" stroke-width="0.4" opacity="0.25"/>`;
    case 'interior':
      return `<rect x="560" y="280" width="200" height="8" fill="${a}" opacity="0.3"/><rect x="580" y="120" width="160" height="140" fill="none" stroke="${b}" stroke-width="0.6" opacity="0.35" rx="1"/>`;
    case 'vet':
      return `<circle cx="640" cy="200" r="60" fill="${a}" opacity="0.12"/><path d="M620 200 Q640 170 660 200 Q640 230 620 200" fill="${b}" opacity="0.25"/>`;
    case 'bakery':
      return `<ellipse cx="650" cy="220" rx="80" ry="50" fill="${a}" opacity="0.2"/><circle cx="620" cy="200" r="20" fill="${b}" opacity="0.35"/><circle cx="680" cy="210" r="16" fill="${b}" opacity="0.25"/>`;
    case 'editorial':
      return `<line x1="400" y1="60" x2="400" y2="440" stroke="${a}" stroke-width="0.5" opacity="0.2"/><rect x="560" y="100" width="180" height="240" fill="${a}" opacity="0.06"/>`;
    case 'gamified':
      return `<rect x="560" y="120" width="48" height="48" fill="${a}" opacity="0.2" rx="4"/><rect x="620" y="120" width="48" height="48" fill="${a}" opacity="0.35" rx="4"/><rect x="680" y="120" width="48" height="48" fill="${b}" opacity="0.25" rx="4"/><path d="M560 200 L760 200" stroke="${a}" stroke-width="3" opacity="0.3"/>`;
    case 'strategy':
      return `<circle cx="620" cy="200" r="70" fill="none" stroke="${a}" stroke-width="0.8" opacity="0.35"/><circle cx="700" cy="160" r="40" fill="none" stroke="${b}" stroke-width="0.6" opacity="0.3"/><line x1="660" y1="180" x2="680" y2="150" stroke="${a}" stroke-width="0.5" opacity="0.4"/>`;
    case 'ranking':
      return `<rect x="560" y="100" width="200" height="36" fill="${a}" opacity="0.15" rx="2"/><rect x="560" y="150" width="160" height="36" fill="${a}" opacity="0.25" rx="2"/><rect x="560" y="200" width="120" height="36" fill="${a}" opacity="0.35" rx="2"/>`;
    default:
      return '';
  }
}

function coverSvg(slug, spec) {
  const title = titles[slug];
  const dark = ['#1C3028', '#0F1A22', '#1F3D33', '#141820', '#1A1A18', '#2C2419'].includes(spec.bg);
  const text = dark ? '#F6F3ED' : '#1A1A18';
  const muted = dark ? 'rgba(246,243,237,0.4)' : 'rgba(26,26,24,0.4)';
  const panel = dark ? 'rgba(246,243,237,0.07)' : 'rgba(31,61,51,0.05)';
  const art = moodArt(spec.mood, spec);

  return `<svg width="800" height="500" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="500" fill="${spec.bg}"/>
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${spec.bg}" stop-opacity="0"/>
      <stop offset="100%" stop-color="${spec.bg}" stop-opacity="0.4"/>
    </linearGradient>
  </defs>
  ${art}
  <line x1="400" y1="0" x2="400" y2="500" stroke="${spec.accent}" stroke-width="0.5" opacity="0.1"/>
  <rect x="48" y="64" width="480" height="340" fill="${panel}" rx="2"/>
  <rect x="72" y="88" width="64" height="5" fill="${text}" opacity="0.5" rx="1"/>
  <rect x="72" y="128" width="280" height="18" fill="${text}" opacity="0.65" rx="1"/>
  <rect x="72" y="156" width="200" height="8" fill="${text}" opacity="0.22" rx="1"/>
  <rect x="72" y="188" width="112" height="32" fill="${spec.accent}" opacity="0.8" rx="2"/>
  <rect x="72" y="240" width="320" height="6" fill="${text}" opacity="0.12" rx="1"/>
  <rect x="72" y="256" width="260" height="6" fill="${text}" opacity="0.08" rx="1"/>
  <rect x="0" y="400" width="800" height="100" fill="url(#fade)"/>
  <text x="72" y="448" font-family="Georgia, 'Times New Roman', serif" font-size="26" fill="${text}" opacity="0.92">${title}</text>
  <text x="72" y="472" font-family="system-ui, sans-serif" font-size="9" letter-spacing="3.5" fill="${muted}">${spec.label.toUpperCase()}</text>
</svg>`;
}

function desktopSvg(slug, spec) {
  return coverSvg(slug, spec).replace('width="800" height="500"', 'width="1200" height="720"').replace('viewBox="0 0 800 500"', 'viewBox="0 0 800 500"');
}

function mobileSvg(slug, spec) {
  const title = titles[slug];
  const dark = ['#1C3028', '#0F1A22', '#1F3D33', '#141820', '#1A1A18', '#2C2419'].includes(spec.bg);
  const text = dark ? '#F6F3ED' : '#1A1A18';
  return `<svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="390" height="844" fill="${spec.bg}"/>
  ${moodArt(spec.mood, spec)}
  <line x1="195" y1="0" x2="195" y2="844" stroke="${spec.accent}" stroke-width="0.5" opacity="0.1"/>
  <rect x="24" y="120" width="342" height="200" fill="${dark ? 'rgba(246,243,237,0.06)' : 'rgba(31,61,51,0.04)'}" rx="2"/>
  <rect x="40" y="148" width="200" height="14" fill="${text}" opacity="0.6" rx="1"/>
  <rect x="40" y="172" width="140" height="8" fill="${text}" opacity="0.25" rx="1"/>
  <rect x="40" y="200" width="90" height="28" fill="${spec.accent}" opacity="0.75" rx="2"/>
  <text x="40" y="780" font-family="Georgia, serif" font-size="18" fill="${text}" opacity="0.9">${title}</text>
</svg>`;
}

for (const [slug, spec] of Object.entries(specs)) {
  const dir = join(root, slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'cover.svg'), coverSvg(slug, spec));
  writeFileSync(join(dir, 'desktop.svg'), coverSvg(slug, spec));
  writeFileSync(join(dir, 'mobile.svg'), mobileSvg(slug, spec));
}

console.log('Generated premium assets for', Object.keys(specs).length, 'projects');
