import { readFileSync, existsSync, mkdirSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname, basename, normalize } from 'path';
import { fileURLToPath } from 'url';
import { execSync, spawnSync } from 'child_process';
// zip extraction via PowerShell Expand-Archive on Windows

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCRIPTS_ROOT = join(__dirname, '..');
const CONFIG_PATH = join(SCRIPTS_ROOT, 'project-intake.config.json');

export const PROJECT_SLUGS = [
  'drfuel', 'dreams', 'dropdrop', 'plumber-template-01', 'plumber-template-02', 'plumber-template-03',
  'volta-mare-energy', 'arborum-materials', 'lumenvault-archives', 'atelier-nova-habitat',
  'maison-oria-vet-care', 'maison-loria', 'na-studio-portfolio', 'questline', 'dilemma-royale',
  'peerless', 'patch-your-path', 'side-a-sound',
];

const SECRET_PATTERNS = [
  /API_KEY\s*=/i, /SECRET\s*=/i, /PASSWORD\s*=/i, /PRIVATE_KEY/i,
  /OPENAI/i, /SUPABASE/i, /FIREBASE/i, /STRIPE/i, /DATABASE_URL/i,
  /JWT/i, /GITHUB_TOKEN/i, /VITE_[A-Z0-9_]+\s*=\s*['"][^'"]+['"]/i,
];

const SKIP_DIRS = new Set(['node_modules', 'dist', 'build', '.git', '.cache', '.vercel', '.netlify']);

export function loadConfig() {
  return JSON.parse(readFileSync(CONFIG_PATH, 'utf8'));
}

export function normalizeName(s) {
  return (s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function portfolioRoot(config) {
  return config.portfolioRoot.replace(/\\/g, '/');
}

export function workDir(config) {
  return join(portfolioRoot(config), '.v5-work');
}

export function reportsDir(config) {
  const d = join(portfolioRoot(config), 'scripts', 'reports');
  mkdirSync(d, { recursive: true });
  return d;
}

export function assetsDir(config, slug) {
  const d = join(portfolioRoot(config), 'public', 'assets', 'projects', slug);
  mkdirSync(d, { recursive: true });
  return d;
}

export function extractZip(zipPath, destDir) {
  if (!existsSync(zipPath)) return { ok: false, error: 'zip_missing' };
  mkdirSync(destDir, { recursive: true });
  try {
    execSync(
      `powershell -NoProfile -Command "Expand-Archive -Path '${zipPath.replace(/'/g, "''")}' -DestinationPath '${destDir.replace(/'/g, "''")}' -Force"`,
      { stdio: 'pipe', timeout: 120000 },
    );
    return { ok: true, path: destDir };
  } catch (e) {
    return { ok: false, error: String(e.message || e) };
  }
}

export function findProjectRoot(extractDir) {
  if (!existsSync(extractDir)) return null;
  const hasPkg = (d) => existsSync(join(d, 'package.json'));
  if (hasPkg(extractDir)) return extractDir;
  const entries = readdirSync(extractDir, { withFileTypes: true }).filter((e) => e.isDirectory());
  for (const e of entries) {
    const sub = join(extractDir, e.name);
    if (hasPkg(sub)) return sub;
    const nested = readdirSync(sub, { withFileTypes: true }).filter((x) => x.isDirectory());
    for (const n of nested) {
      const deep = join(sub, n.name);
      if (hasPkg(deep)) return deep;
    }
  }
  return extractDir;
}

export function readGitRemote(folder) {
  if (!existsSync(join(folder, '.git'))) return null;
  try {
    const out = execSync('git remote -v', { cwd: folder, encoding: 'utf8', timeout: 10000 });
    const m = out.match(/github\.com[:/]([^/]+\/[^/\s]+)/i);
    if (m) return `https://github.com/${m[1].replace(/\.git$/, '')}`;
    return null;
  } catch {
    return null;
  }
}

export function scanSecrets(folder, maxFiles = 200) {
  const hits = [];
  let count = 0;
  function walk(dir, depth = 0) {
    if (depth > 6 || count > maxFiles) return;
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      if (SKIP_DIRS.has(e.name) || e.name.startsWith('.env')) continue;
      const p = join(dir, e.name);
      if (e.isDirectory()) walk(p, depth + 1);
      else if (/\.(env|pem|key|json)$/i.test(e.name) && !e.name.includes('example')) {
        if (/\.env/i.test(e.name)) hits.push(p);
      } else if (/\.(js|ts|tsx|jsx|mjs|py|toml|yaml|yml)$/i.test(e.name)) {
        count += 1;
        if (count > maxFiles) return;
        try {
          const text = readFileSync(p, 'utf8').slice(0, 8000);
          for (const pat of SECRET_PATTERNS) {
            if (pat.test(text)) {
              hits.push(p);
              break;
            }
          }
        } catch { /* skip */ }
      }
    }
  }
  walk(folder);
  return [...new Set(hits)].slice(0, 20);
}

export async function verifyLiveUrl(url) {
  if (!url) return { ok: false, status: 'missing' };
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 12000);
    const res = await fetch(url, { method: 'GET', redirect: 'follow', signal: ctrl.signal });
    clearTimeout(t);
    if (res.status >= 200 && res.status < 400) return { ok: true, status: 'live_verified', code: res.status };
    return { ok: false, status: 'live_broken', code: res.status };
  } catch {
    return { ok: false, status: 'live_broken' };
  }
}

export function listGhRepos(owner) {
  try {
    const out = execSync(
      `gh repo list ${owner} --limit 300 --json name,url,description,updatedAt`,
      { encoding: 'utf8', timeout: 60000 },
    );
    return JSON.parse(out);
  } catch (e) {
    return { error: String(e.message || e), repos: [] };
  }
}

export function scoreRepoMatch(slug, aliases, repoName) {
  const raw = (repoName || '').toLowerCase();
  const n = normalizeName(repoName);
  const slugN = normalizeName(slug);
  if (n === slugN || raw === slug.toLowerCase()) return 100;
  for (const a of aliases) {
    const al = a.toLowerCase();
    if (raw === al || n === normalizeName(a)) return 98;
    const an = normalizeName(a);
    if (n === an) return 95;
    if (n.includes(an) || an.includes(n)) return 75;
  }
  return 0;
}

export function assetExists(config, slug, name) {
  const base = join(portfolioRoot(config), 'public', 'assets', 'projects', slug);
  for (const ext of ['webp', 'png', 'svg']) {
    if (existsSync(join(base, `${name}.${ext}`))) return `${name}.${ext}`;
  }
  return null;
}

export function writeJson(path, data) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
}

export function readJson(path, fallback = null) {
  if (!existsSync(path)) return fallback;
  return JSON.parse(readFileSync(path, 'utf8'));
}

export function deriveProof(entry) {
  const liveOk = entry.liveStatus === 'live_verified' && entry.proofUrl;
  const gh = entry.githubUrl;
  const pdf = entry.pdfUrl;

  if (liveOk && gh) {
    return {
      proofType: 'mixed',
      proofUrl: entry.proofUrl,
      githubUrl: gh,
      ctaLabel: 'visitSite',
      sourceStatus: 'live_and_repo_verified',
    };
  }
  if (liveOk) {
    return {
      proofType: 'live',
      proofUrl: entry.proofUrl,
      githubUrl: gh || null,
      ctaLabel: 'visitSite',
      sourceStatus: 'live_verified',
    };
  }
  if (gh) {
    return {
      proofType: 'github',
      proofUrl: null,
      githubUrl: gh,
      ctaLabel: 'viewGithub',
      sourceStatus: 'repo_verified',
    };
  }
  if (pdf) {
    return {
      proofType: 'pdf',
      proofUrl: null,
      pdfUrl: pdf,
      ctaLabel: 'viewPdf',
      sourceStatus: 'pdf_verified',
    };
  }
  return {
    proofType: 'visual',
    proofUrl: null,
    githubUrl: null,
    ctaLabel: 'viewPreview',
    sourceStatus: entry.repoStatus === 'multiple_candidates' ? 'needs_review' : 'visual_only',
  };
}
