const ASSET_BASE = '/assets/projects';

export function resolveAssetPath(slug, kind, proofAssets) {
  const fromProof = proofAssets?.[`${kind}Image`] || proofAssets?.[kind === 'cover' ? 'coverImage' : kind === 'desktop' ? 'desktopScreenshot' : 'mobileScreenshot'];
  if (fromProof) return fromProof;

  const names = kind === 'cover' ? ['cover'] : kind === 'desktop' ? ['desktop'] : ['mobile'];
  for (const name of names) {
    for (const ext of ['webp', 'png', 'svg']) {
      return `${ASSET_BASE}/${slug}/${name}.${ext}`;
    }
  }
  return `${ASSET_BASE}/${slug}/${names[0]}.svg`;
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
