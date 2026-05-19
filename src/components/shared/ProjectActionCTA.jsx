import React from 'react';
import { useI18n } from '@/i18n';
import { usePreview } from '@/lib/PreviewContext';
import { getProjectCta } from '@/lib/projectCta';
import StudioCTA from './StudioCTA';

export default function ProjectActionCTA({ project, variant = 'primary', className = '' }) {
  const { t } = useI18n();
  const { openPreview } = usePreview();
  const cta = getProjectCta(project, t);

  if (cta.mode === 'external' && cta.href) {
    return (
      <StudioCTA href={cta.href} variant={variant} className={className}>
        {cta.label}
      </StudioCTA>
    );
  }

  if (cta.mode === 'mixed' && cta.href) {
    return (
      <span className={`inline-flex flex-wrap items-center gap-4 ${className}`}>
        <StudioCTA href={cta.href} variant={variant}>
          {cta.label}
        </StudioCTA>
        {cta.secondaryHref ? (
          <StudioCTA href={cta.secondaryHref} variant="secondary">
            {cta.secondaryLabel}
          </StudioCTA>
        ) : null}
      </span>
    );
  }

  return (
    <StudioCTA onClick={() => openPreview(project)} variant={variant} className={className}>
      {cta.label}
    </StudioCTA>
  );
}
