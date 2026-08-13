import { fallbackSvgPath } from '@/lib/projectAssets';

const LAYOUT_CLASS = {
  productWide: 'aspect-[21/9] min-h-[200px]',
  artisanTriptych: 'aspect-[4/3] min-h-[220px]',
  infraBand: 'aspect-[2.4/1] min-h-[180px]',
  cinematic: 'aspect-[16/10] min-h-[280px]',
  constellation: 'aspect-[4/3] min-h-[200px]',
  default: 'aspect-[16/10] min-h-[200px]',
};

export function getLayoutClass(layout) {
  return LAYOUT_CLASS[layout] || LAYOUT_CLASS.default;
}

export function categoryToRoomType(categorySlug) {
  const map = {
    'local-business': 'artisans',
    'product-brand': 'brand',
    'saas-web-app': 'saas',
    'signature-concept': 'signature',
    showroom: 'showroom',
  };
  return map[categorySlug] || 'showroom';
}

/** Unique visual sources for frame cycling (max 3). */
export function buildVisualSources(project, overrideImages) {
  if (overrideImages?.length) return [...new Set(overrideImages.filter(Boolean))].slice(0, 3);
  if (!project) return [];

  const candidates = [
    project.coverImage,
    project.desktopScreenshot,
    project.mobileScreenshot,
    ...(project.galleryImages || []),
  ].filter(Boolean);

  const unique = [...new Set(candidates)];
  if (unique.length) return unique.slice(0, 3);

  const slug = project.slug;
  if (!slug) return [];
  const base = `/assets/projects/${slug}`;
  return [`${base}/cover.webp`, `${base}/desktop.webp`, `${base}/mobile.webp`].slice(0, 3);
}

export function getMobileSource(project) {
  return project?.mobileScreenshot || null;
}

export function getInspectionTabs(project) {
  if (!project) return [];

  const tabs = [];
  const cover = project.coverImage;
  const desktop = project.desktopScreenshot;
  const mobile = project.mobileScreenshot;
  const gallery = project.galleryImages || [];

  if (cover) tabs.push({ key: 'cover', src: cover });
  if (desktop && desktop !== cover) tabs.push({ key: 'desktop', src: desktop });
  if (mobile) tabs.push({ key: 'mobile', src: mobile });
  if (gallery.length) {
    tabs.push({ key: 'gallery', src: gallery[0], galleryAll: gallery });
  }

  if (!tabs.length) {
    const fb = fallbackSvgPath(project.slug);
    if (fb) tabs.push({ key: 'preview', src: fb });
    else {
      const base = `/assets/projects/${project.slug}`;
      tabs.push({ key: 'preview', src: `${base}/cover.webp` });
    }
  }

  if (tabs.length === 1) {
    return [{ key: 'preview', src: tabs[0].src }];
  }

  return tabs;
}

export function proofBadgeKey(proofType) {
  if (proofType === 'live') return 'proofLive';
  if (proofType === 'github') return 'proofGithub';
  if (proofType === 'mixed') return 'proofMixed';
  if (proofType === 'pdf') return 'proofPdf';
  return 'proofVisual';
}
