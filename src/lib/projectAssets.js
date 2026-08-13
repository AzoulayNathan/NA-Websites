const ASSET_BASE = '/assets/projects';

export function fallbackSvgPath(slug) {
  return slug ? `${ASSET_BASE}/${slug}/fallback.svg` : null;
}

/** Ordered fallbacks when primary raster/SVG fails (never broken img) */
export function assetErrorFallbacks(slug, primarySrc) {
  if (!slug) return [];
  const fb = fallbackSvgPath(slug);
  const coverSvg = `${ASSET_BASE}/${slug}/cover.svg`;
  const out = [];
  if (fb && primarySrc !== fb) out.push(fb);
  if (primarySrc !== coverSvg) out.push(coverSvg);
  return out;
}

/** Browser-side: pick best path from proof or ordered extensions */
export function resolveAssetPath(slug, kind, proofAssets) {
  const key = kind === 'cover' ? 'coverImage' : kind === 'desktop' ? 'desktopScreenshot' : 'mobileScreenshot';
  if (proofAssets?.[key]) return proofAssets[key];

  const name = kind === 'cover' ? 'cover' : kind === 'desktop' ? 'desktop' : 'mobile';
  return `${ASSET_BASE}/${slug}/${name}.svg`;
}

export function enrichProjectAssets(project, proofEntry) {
  if (!project) return project;
  const p = proofEntry || {};
  return {
    ...project,
    coverImage: p.coverImage || project.coverImage,
    desktopScreenshot: p.desktopScreenshot || project.desktopScreenshot,
    mobileScreenshot: p.mobileScreenshot || project.mobileScreenshot,
    galleryImages: p.galleryImages?.length ? p.galleryImages : project.galleryImages || [],
    assetStatus: p.assetStatus || project.assetStatus || 'placeholder',
    captureStatus: p.captureStatus || project.captureStatus || 'skipped',
  };
}
