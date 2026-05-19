/**
 * Resolves CTA behavior from merged project proof fields.
 */
export function getProjectCta(project, t) {
  if (!project) return { mode: 'preview', label: t('cta.viewPreview') };

  const proofType = project.proofType || 'visual';
  const labelKey = project.ctaLabel || 'viewPreview';
  const label = t(`cta.${labelKey}`) || t('cta.viewPreview');

  if (proofType === 'live' && project.proofUrl) {
    return { mode: 'external', href: project.proofUrl, label: t('cta.visitSite'), proofType };
  }

  if (proofType === 'mixed' && project.proofUrl) {
    return {
      mode: 'mixed',
      href: project.proofUrl,
      label: t('cta.visitSite'),
      secondaryHref: project.githubUrl,
      secondaryLabel: t('cta.viewGithub'),
      proofType,
    };
  }

  if (proofType === 'github' && project.githubUrl) {
    return { mode: 'external', href: project.githubUrl, label: t('cta.viewGithub'), proofType };
  }

  if (proofType === 'pdf' && project.pdfUrl) {
    return { mode: 'external', href: project.pdfUrl, label: t('cta.viewPdf'), proofType };
  }

  return { mode: 'preview', label, proofType: 'visual' };
}
