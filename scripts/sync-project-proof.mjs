#!/usr/bin/env node
import { join } from 'path';
import { existsSync } from 'fs';
import {
  loadConfig,
  PROJECT_SLUGS,
  reportsDir,
  readJson,
  writeJson,
  verifyLiveUrl,
  deriveProof,
  assetExists,
  portfolioRoot,
} from './lib/intake-utils.mjs';

const config = loadConfig();
const audit = readJson(join(reportsDir(config), 'v5-audit.json'), { projects: {} });
const discover = readJson(join(reportsDir(config), 'v5-discover.json'), { projects: {} });
const capture = readJson(join(reportsDir(config), 'v5-capture.json'), { projects: {} });

const proof = {};

for (const slug of PROJECT_SLUGS) {
  const a = audit.projects?.[slug] || {};
  const d = discover.projects?.[slug] || {};
  const c = capture.projects?.[slug] || {};

  const liveUrl = config.optionalLiveUrls?.[slug] || null;
  let liveStatus = 'missing';
  let proofUrl = null;
  if (liveUrl) {
    const v = await verifyLiveUrl(liveUrl);
    liveStatus = v.status;
    if (v.ok) proofUrl = liveUrl;
  }

  const cover = assetExists(config, slug, 'cover');
  const desktop = assetExists(config, slug, 'desktop');
  const mobile = assetExists(config, slug, 'mobile');
  const hasWebp = [cover, desktop, mobile].some((f) => f?.endsWith('.webp') || f?.endsWith('.png'));
  const hasSvg = [cover, desktop, mobile].every(Boolean);

  let assetStatus = 'placeholder';
  if (hasWebp) assetStatus = c.partial ? 'partial' : 'real';
  else if (c.captureStatus === 'failed') assetStatus = 'needs_capture';

  const base = {
    slug,
    githubUrl: d.githubUrl || null,
    pdfUrl: null,
    proofUrl,
    liveStatus,
    localSourceStatus: a.localSourceStatus || 'none',
    repoStatus: d.repoStatus || 'not_found',
    captureStatus: c.captureStatus || 'skipped',
    assetStatus,
    coverImage: cover ? `/assets/projects/${slug}/${cover}` : `/assets/projects/${slug}/cover.svg`,
    desktopScreenshot: desktop ? `/assets/projects/${slug}/${desktop}` : `/assets/projects/${slug}/desktop.svg`,
    mobileScreenshot: mobile ? `/assets/projects/${slug}/${mobile}` : `/assets/projects/${slug}/mobile.svg`,
    galleryImages: [],
  };

  const derived = deriveProof({ ...base, proofUrl });
  proof[slug] = { ...base, ...derived, status: 'proof-ready' };
}

const proofPath = join(portfolioRoot(config), 'src', 'lib', 'projectProof.json');
writeJson(proofPath, { generatedAt: new Date().toISOString(), projects: proof });

const intakePath = join(reportsDir(config), 'v5-intake.json');
writeJson(intakePath, { generatedAt: new Date().toISOString(), projects: proof });
console.log(`Synced ${proofPath}`);
