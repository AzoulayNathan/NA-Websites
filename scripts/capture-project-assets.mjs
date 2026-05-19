#!/usr/bin/env node
/**
 * Captures screenshots for projects with verified live URLs.
 * Requires: npm install -D playwright && npx playwright install chromium
 */
import { join } from 'path';
import { existsSync } from 'fs';
import {
  loadConfig,
  PROJECT_SLUGS,
  reportsDir,
  readJson,
  writeJson,
  verifyLiveUrl,
  assetsDir,
} from './lib/intake-utils.mjs';

const config = loadConfig();
const out = {};

let playwright;
try {
  playwright = await import('playwright');
} catch {
  console.log('Playwright not installed — skipping capture (run: npm install -D playwright)');
  for (const slug of PROJECT_SLUGS) {
    out[slug] = { captureStatus: 'skipped_no_playwright' };
  }
  writeJson(join(reportsDir(config), 'v5-capture.json'), { projects: out });
  process.exit(0);
}

let browser;
try {
  browser = await playwright.chromium.launch({ headless: true });
} catch (e) {
  console.log('Playwright browser missing — run: npx playwright install chromium');
  for (const slug of PROJECT_SLUGS) {
    out[slug] = { captureStatus: 'skipped_no_browser' };
  }
  writeJson(join(reportsDir(config), 'v5-capture.json'), { projects: out });
  process.exit(0);
}

for (const slug of PROJECT_SLUGS) {
  const url = config.optionalLiveUrls?.[slug];
  if (!url) {
    out[slug] = { captureStatus: 'skipped_no_url' };
    continue;
  }

  const verified = await verifyLiveUrl(url);
  if (!verified.ok) {
    out[slug] = { captureStatus: 'failed', error: 'live_not_verified' };
    continue;
  }

  const dir = assetsDir(config, slug);
  try {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1440, height: 1050 });
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: join(dir, 'cover.png'), type: 'png' });
    await page.screenshot({ path: join(dir, 'desktop.png'), type: 'png' });

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: join(dir, 'mobile.png'), type: 'png' });
    await page.close();

    out[slug] = { captureStatus: 'captured', assets: ['cover.png', 'desktop.png', 'mobile.png'] };
    console.log(`Captured ${slug}`);
  } catch (e) {
    out[slug] = { captureStatus: 'failed', error: String(e.message || e).slice(0, 120) };
  }
}

await browser.close();
writeJson(join(reportsDir(config), 'v5-capture.json'), {
  generatedAt: new Date().toISOString(),
  projects: out,
});
console.log('Capture complete');
