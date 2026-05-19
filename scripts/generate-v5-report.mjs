#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { loadConfig, reportsDir, PROJECT_SLUGS } from './lib/intake-utils.mjs';

const config = loadConfig();
const dir = reportsDir(config);
const audit = JSON.parse(readFileSync(join(dir, 'v5-audit.json'), 'utf8'));
const discover = JSON.parse(readFileSync(join(dir, 'v5-discover.json'), 'utf8'));
const capture = JSON.parse(readFileSync(join(dir, 'v5-capture.json'), 'utf8'));
const proof = JSON.parse(readFileSync(join(config.portfolioRoot, 'src/lib/projectProof.json'), 'utf8'));

const lines = [
  '# V5 Final Integration Report',
  '',
  `Generated: ${new Date().toISOString()}`,
  '',
  '## GitHub discovery',
  '',
  '| Project | Local zip | GitHub | Status | Live | Capture | Proof | CTA |',
  '|---------|-----------|--------|--------|------|---------|-------|-----|',
];

for (const slug of PROJECT_SLUGS) {
  const a = audit.projects?.[slug] || {};
  const d = discover.projects?.[slug] || {};
  const c = capture.projects?.[slug] || {};
  const p = proof.projects?.[slug] || {};
  lines.push(
    `| ${slug} | ${a.zipExists ? 'yes' : 'no'} | ${p.githubUrl ? 'yes' : 'no'} | ${p.repoStatus || d.repoStatus} | ${p.liveStatus || '-'} | ${c.captureStatus || '-'} | ${p.proofType} | ${p.ctaLabel} |`,
  );
}

lines.push('', '## Notes', '', '- NA-Websites portfolio repo excluded from fuzzy project matching.', '- Dreams: secrets in zip — visual only until cleaned.', '- Live URLs only when verified in config.');

const outPath = join(dir, 'V5-FINAL-REPORT.md');
writeFileSync(outPath, lines.join('\n'), 'utf8');
console.log(`Report: ${outPath}`);
