#!/usr/bin/env node
import { execSync } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const steps = [
  'node scripts/audit-project-sources.mjs',
  'node scripts/discover-github-repos.mjs',
  'node scripts/create-or-connect-github-repos.mjs',
  'node scripts/capture-project-assets.mjs',
  'node scripts/sync-project-proof.mjs',
];

for (const cmd of steps) {
  console.log(`\n>> ${cmd}`);
  execSync(cmd, { cwd: root, stdio: 'inherit' });
}
