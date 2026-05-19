#!/usr/bin/env node
import { join } from 'path';
import {
  loadConfig,
  PROJECT_SLUGS,
  reportsDir,
  readJson,
  writeJson,
  listGhRepos,
  scoreRepoMatch,
  readGitRemote,
  workDir,
} from './lib/intake-utils.mjs';

const config = loadConfig();
const audit = readJson(join(reportsDir(config), 'v5-audit.json'), { projects: {} });
const ghResult = listGhRepos(config.githubOwner);
const repos = ghResult.error ? [] : ghResult;
const authRequired = Boolean(ghResult.error);

const out = {};

for (const slug of PROJECT_SLUGS) {
  const auditEntry = audit.projects?.[slug] || {};
  const aliases = config.repoAliases?.[slug] || [slug];
  let githubUrl = auditEntry.gitRemote || null;
  let repoStatus = 'not_found';
  let candidates = [];

  const hint = config.githubHints?.[slug];
  if (hint) {
    githubUrl = hint;
    repoStatus = 'found_hint';
  } else if (githubUrl) {
    repoStatus = 'found_local_remote';
  } else if (!authRequired) {
    const PORTFOLIO_REPOS = new Set(['na-websites', 'na_websites']);

    for (const repo of repos) {
      const repoKey = repo.name.toLowerCase().replace(/_/g, '-');
      if (PORTFOLIO_REPOS.has(repoKey)) continue;
      const score = scoreRepoMatch(slug, aliases, repo.name);
      if (score >= 90) candidates.push({ name: repo.name, url: repo.url, score, updatedAt: repo.updatedAt });
    }
    candidates.sort((a, b) => b.score - a.score || new Date(b.updatedAt) - new Date(a.updatedAt));

    const top = candidates.filter((c) => c.score >= 95);

    if (top.length === 1) {
      githubUrl = top[0].url;
      repoStatus = 'found';
    } else if (top.length > 1) {
      repoStatus = 'multiple_candidates';
    } else if (candidates.length === 1 && candidates[0].score >= 98) {
      githubUrl = candidates[0].url;
      repoStatus = 'found';
    } else if (candidates.filter((c) => c.score >= 90).length > 1) {
      repoStatus = 'multiple_candidates';
    }
  } else {
    repoStatus = 'auth_required';
  }

  if (auditEntry.repoStatus === 'blocked_secret_detected') {
    repoStatus = 'blocked_secret_detected';
    githubUrl = null;
  }

  out[slug] = {
    slug,
    githubUrl,
    repoStatus,
    candidates: candidates.slice(0, 5),
  };
}

const reportPath = join(reportsDir(config), 'v5-discover.json');
writeJson(reportPath, {
  generatedAt: new Date().toISOString(),
  githubOwner: config.githubOwner,
  authRequired,
  projects: out,
});
console.log(`Discovery written: ${reportPath}`);
