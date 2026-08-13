import React from 'react';
import { motion } from 'framer-motion';
import { usePreview } from '@/lib/PreviewContext';
import { useI18n, useProjectText } from '@/i18n';
import ProjectGalleryFrame from '@/components/atelier/ProjectGalleryFrame';
import { openProjectFromEvent } from '@/components/atelier/lib/openProject';
import { sortProjectsBySlug } from '../lib/roomHelpers';

const BRAND_ORDER = ['dropdrop', 'volta-mare-energy', 'drfuel'];

const SHELF_CONFIG = {
  dropdrop: {
    variant: 'wide',
    layout: 'productWide',
    cartel: 'launch',
    accent: 'work-brand-shelf--aquatic',
  },
  'volta-mare-energy': {
    variant: 'band',
    layout: 'infraBand',
    cartel: 'identity',
    accent: 'work-brand-shelf--sea',
  },
  drfuel: {
    variant: 'strip',
    layout: 'default',
    cartel: 'launch',
    accent: 'work-brand-shelf--energy',
  },
};

function BrandShelf({ project, config, delay }) {
  const { openPreview } = usePreview();
  const { t } = useI18n();
  const copy = useProjectText(project);
  const cartelLabel = t(`work.rooms.brand.tags.${config.cartel}`);

  return (
    <motion.article
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-6%' }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`work-brand-shelf work-brand-shelf--${config.variant} work-gallery-zone group ${config.accent}`}
    >
      <button
        type="button"
        onClick={(e) => {
        if (e.target instanceof Element && e.target.closest('[data-project-frame]')) return;
        openProjectFromEvent(openPreview, project, e);
      }}
        className="w-full h-full text-left relative overflow-hidden border border-olive/25 bg-quartz/70 group-hover:translate-y-[-2%] transition-transform duration-500"
        style={{ transformOrigin: 'bottom center' }}
      >
        <span className="work-brand-cartel absolute top-4 left-4 z-10 text-[9px] uppercase tracking-[0.18em] text-deep-green bg-sand px-2 py-1 border border-olive/30">
          {cartelLabel}
        </span>
        <div className="work-brand-diagonal-seam" aria-hidden />
        <ProjectGalleryFrame
          project={project}
          roomType="brand"
          layout={config.layout}
          className="border-0 min-h-[inherit] h-full"
          interactive
        />
        <div className="work-brand-label absolute bottom-0 left-0 right-0 p-5 md:p-6 bg-gradient-to-t from-ink/75 to-transparent">
          <h3 className="font-serif text-2xl md:text-3xl font-light text-quartz">{project.title}</h3>
          <p className="text-[12px] text-quartz mt-1 max-w-md line-clamp-2">{copy.microLine}</p>
        </div>
      </button>
    </motion.article>
  );
}

export default function BrandShelves({ projects }) {
  const { t } = useI18n();
  const ordered = sortProjectsBySlug(projects, BRAND_ORDER);

  return (
    <div className="work-room work-room--brand py-4 md:py-8">
      <header className="mb-8 md:mb-10 max-w-xl">
        <p className="text-eyebrow text-deep-green mb-2">{t('work.rooms.brand.eyebrow')}</p>
        <h2 className="font-serif text-[28px] md:text-[36px] font-light text-ink">{t('work.rooms.brand.heading')}</h2>
        <p className="text-[14px] text-ink mt-2">{t('work.rooms.brand.line')}</p>
      </header>

      <div className="work-brand-vitrine relative">
        {ordered.map((p, i) => {
          const config = SHELF_CONFIG[p.slug] || {
            variant: 'strip',
            layout: 'productWide',
            cartel: 'launch',
            accent: '',
          };
          return (
            <BrandShelf key={p.slug} project={p} config={config} delay={i * 0.08} />
          );
        })}
      </div>
    </div>
  );
}
