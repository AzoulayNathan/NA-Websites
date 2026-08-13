import React from 'react';
import { useI18n } from '@/i18n';
import { usePreview } from '@/lib/PreviewContext';
import StudioCTA from './StudioCTA';

const labelClass = {
  primary: 'text-[10px] uppercase tracking-[0.15em] text-olive/55',
  secondary: 'text-[10px] uppercase tracking-[0.12em] text-ink/40',
  dark: 'text-[10px] uppercase tracking-[0.15em] text-sky-blue/55',
  theme: 'text-[10px] uppercase tracking-[0.15em] text-olive/55',
};

/**
 * All portfolio actions now open the dedicated case-study page.
 * Live/GitHub proof remains available inside that page, so the original
 * showroom never sends a visitor away before they can inspect the project.
 */
export default function ProjectActionCTA({
  project,
  variant = 'primary',
  className = '',
  asLabel = false,
}) {
  const { t } = useI18n();
  const { openPreview } = usePreview();
  const label = t('preview.openInspection', 'Open project');

  if (asLabel) {
    return (
      <button
        type="button"
        className={`${labelClass[variant] || labelClass.primary} ${className}`}
        onClick={(e) => {
          e.stopPropagation();
          openPreview(project);
        }}
      >
        {label} →
      </button>
    );
  }

  return (
    <span className={className}>
      <StudioCTA onClick={() => openPreview(project)} variant={variant}>
        {label}
      </StudioCTA>
    </span>
  );
}
