#!/usr/bin/env node
import { join } from 'path';
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import {
  loadConfig,
  PROJECT_SLUGS,
  reportsDir,
  readJson,
  writeJson,
} from './lib/intake-utils.mjs';

const config = loadConfig();
const audit = readJson(join(reportsDir(config), 'v5-audit.json'), { projects: {} });
const discover = readJson(join(reportsDir(config), 'v5-discover.json'), { projects: {} });
const out = { ...discover.projects };

let ghOk = true;
try {
  execSync('gh auth status', { stdio: 'pipe' });
} catch {
  ghOk = false;
  console.log('GitHub auth not available — skipping repo creation');
}

if (ghOk) {
  for (const slug of PROJECT_SLUGS) {
    const a = audit.projects?.[slug];
    const d = discover.projects?.[slug];
    if (!a?.localPath || !a.hasPackageJson) continue;
    if (a.secretHits?.length) continue;
    if (d?.githubUrl) continue;
    if (d?.repoStatus === 'multiple_candidates') continue;

    const cwd = a.localPath;
    const repoName = `na-websites-${slug}`;
    try {
      if (!existsSync(join(cwd, '.git'))) {
        execSync('git init', { cwd, stdio: 'pipe' });
      }
      const remotes = execSync('git remote -v', { cwd, encoding: 'utf8' });
      if (remotes.includes('origin')) continue;

      execSync(
        `gh repo create ${config.githubOwner}/${repoName} --public --source . --remote origin --push`,
        { cwd, stdio: 'pipe', timeout: 180000 },
      );
      out[slug] = {
        ...d,
        githubUrl: `https://github.com/${config.githubOwner}/${repoName}`,
        repoStatus: 'created',
      };
      console.log(`Created ${repoName}`);
    } catch (e) {
      out[slug] = { ...d, repoStatus: 'create_failed', error: String(e.message || e).slice(0, 200) };
    }
  }
}

writeJson(join(reportsDir(config), 'v5-discover.json'), {
  ...discover,
  projects: out,
  connectRanAt: new Date().toISOString(),
});
console.log('Connect step complete');
