#!/usr/bin/env node
import { existsSync } from 'fs';
import { join } from 'path';
import {
  loadConfig,
  PROJECT_SLUGS,
  workDir,
  extractZip,
  findProjectRoot,
  readGitRemote,
  scanSecrets,
  reportsDir,
  writeJson,
} from './lib/intake-utils.mjs';

const config = loadConfig();
const wd = workDir(config);
const sourcesRoot = join(wd, 'sources');
const out = {};

for (const slug of PROJECT_SLUGS) {
  const zipPath = config.zipSources?.[slug];
  let localPath = null;
  let localSourceStatus = 'none';
  let gitRemote = null;
  let hasPackageJson = false;
  let secretHits = [];

  if (zipPath && existsSync(zipPath)) {
    const dest = join(sourcesRoot, slug);
    const ex = extractZip(zipPath, dest);
    if (ex.ok) {
      localPath = findProjectRoot(dest);
      localSourceStatus = 'zip_extracted';
      hasPackageJson = existsSync(join(localPath, 'package.json'));
      gitRemote = readGitRemote(localPath);
      secretHits = scanSecrets(localPath);
    } else {
      localSourceStatus = `extract_failed:${ex.error}`;
    }
  } else if (zipPath) {
    localSourceStatus = 'zip_missing';
  }

  out[slug] = {
    slug,
    zipPath: zipPath || null,
    zipExists: zipPath ? existsSync(zipPath) : false,
    localPath,
    localSourceStatus,
    hasPackageJson,
    gitRemote,
    secretHits,
    repoStatus: secretHits.length ? 'blocked_secret_detected' : null,
  };
}

const reportPath = join(reportsDir(config), 'v5-audit.json');
writeJson(reportPath, { generatedAt: new Date().toISOString(), projects: out });
console.log(`Audit written: ${reportPath}`);
