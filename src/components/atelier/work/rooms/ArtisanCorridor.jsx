import React from 'react';
import { motion } from 'framer-motion';
import { usePreview } from '@/lib/PreviewContext';
import { useI18n, useProjectText } from '@/i18n';
import ProjectGalleryFrame from '@/components/atelier/ProjectGalleryFrame';
import { openProjectFromEvent } from '@/components/atelier/lib/openProject';

function openFromStation(openPreview, project, e) {
  if (e.target.closest('[data-project-frame]')) return;
  openProjectFromEvent(openPreview, project, e);
}
import { sortProjectsBySlug } from '../lib/roomHelpers';

const ARTISAN_ORDER = ['atelier-nova-habitat', 'maison-oria-vet-care', 'maison-loria'];

const LAYOUT_CYCLE = ['wide', 'vertical', 'diagonal', 'left', 'right', 'left'];

function TrustMarker({ label }) {
  return (
    <span className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 text-[9px] uppercase tracking-[0.16em] text-deep-green bg-quartz border border-olive/30 px-2 py-0.5">
      {label}
    </span>
  );
}

function ArtisanStation({ project, layout, index }) {
  const { openPreview } = usePreview();
  const { t } = useI18n();
  const copy = useProjectText(project);

  const frame = (
    <ProjectGalleryFrame
      project={project}
      roomType="artisans"
      layout="artisanTriptych"
      className="border-0 min-h-[200px] w-full h-full"
      interactive
    />
  );

  const meta = (
    <div className="flex flex-wrap items-center gap-2 mt-3">
      <TrustMarker label={t('work.rooms.artisans.markerArea')} />
      <TrustMarker label={t('work.rooms.artisans.markerCall')} />
    </div>
  );

  const copyBlock = (
    <>
      <span className="text-[10px] tracking-[0.2em] text-olive font-medium">{project.number}</span>
      <h3 className="font-serif text-2xl md:text-3xl font-light text-ink mt-1">{project.title}</h3>
      <p className="text-[13px] text-ink mt-1 max-w-sm leading-snug">{copy.microLine}</p>
      {meta}
    </>
  );

  if (layout === 'wide') {
    return (
      <motion.article
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-5%' }}
        className="work-artisan-station work-artisan-station--wide work-gallery-zone group"
      >
        <button
          type="button"
          onClick={(e) => openFromStation(openPreview, project, e)}
          className="w-full grid md:grid-cols-12 gap-0 text-left na-diagonal-clip border border-olive/20 bg-quartz/50 group-hover:bg-sand/40 transition-colors"
        >
          <div className="md:col-span-8 min-h-[240px] md:min-h-[300px]">{frame}</div>
          <div className="md:col-span-4 p-6 md:p-8 flex flex-col justify-center border-t md:border-t-0 md:border-l border-olive/15">
            {copyBlock}
          </div>
        </button>
      </motion.article>
    );
  }

  if (layout === 'vertical') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-5%' }}
        className="work-artisan-station work-artisan-station--vertical work-gallery-zone group flex justify-end"
      >
        <button
          type="button"
          onClick={(e) => openProjectFromEvent(openPreview, project, e)}
          className="w-full max-w-[340px] text-left border border-olive/20 bg-quartz/60 p-4 group-hover:shadow-lg transition-shadow"
        >
          <div className="max-w-[200px] mx-auto min-h-[280px]">{frame}</div>
          <div className="mt-4 pl-2 border-l-2 border-sky-blue/50">{copyBlock}</div>
        </button>
      </motion.article>
    );
  }

  if (layout === 'diagonal') {
    return (
      <motion.article
        initial={{ opacity: 0, rotate: -1 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        viewport={{ once: true, margin: '-5%' }}
        className="work-artisan-station work-artisan-station--diagonal work-gallery-zone group"
      >
        <button
          type="button"
          onClick={(e) => openProjectFromEvent(openPreview, project, e)}
          className="w-full text-left relative min-h-[260px] border border-olive/25 overflow-hidden"
          style={{ clipPath: 'polygon(0 8%, 100% 0, 100% 92%, 0 100%)' }}
        >
          <div className="absolute inset-0 scale-105 group-hover:scale-[1.02] transition-transform duration-500">
            {frame}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-quartz/95 to-transparent">
            {copyBlock}
          </div>
        </button>
      </motion.article>
    );
  }

  const isRight = layout === 'right';
  return (
    <motion.article
      initial={{ opacity: 0, x: isRight ? 24 : -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      className={`work-artisan-station work-artisan-station--${layout} work-gallery-zone group ${isRight ? 'md:ml-auto' : ''}`}
    >
      <button
        type="button"
        onClick={(e) => openProjectFromEvent(openPreview, project, e)}
        className={`w-full md:w-[88%] grid md:grid-cols-2 gap-0 text-left border border-olive/20 na-diagonal-clip overflow-hidden group-hover:border-olive/40 transition-colors ${isRight ? 'md:ml-auto' : ''}`}
      >
        <div className={`min-h-[220px] md:min-h-[280px] ${isRight ? 'md:order-2' : ''}`}>{frame}</div>
        <div
          className={`p-6 md:p-8 flex flex-col justify-center bg-sand/30 ${isRight ? 'md:order-1 md:text-right md:items-end' : ''}`}
        >
          {copyBlock}
        </div>
      </button>
    </motion.article>
  );
}

export default function ArtisanCorridor({ projects }) {
  const { t } = useI18n();
  const ordered = sortProjectsBySlug(projects, ARTISAN_ORDER);

  return (
    <div className="work-room work-room--artisans relative py-4 md:py-8">
      <header className="mb-8 md:mb-12 max-w-xl">
        <p className="text-eyebrow text-deep-green mb-2">{t('work.rooms.artisans.eyebrow')}</p>
        <h2 className="font-serif text-[28px] md:text-[36px] font-light text-ink">{t('work.rooms.artisans.heading')}</h2>
        <p className="text-[14px] text-ink mt-2">{t('work.rooms.artisans.line')}</p>
      </header>

      <div className="relative">
        <div className="work-artisan-path-line hidden md:block" aria-hidden />
        <div className="work-artisan-waterline hidden md:block" aria-hidden />
        <p className="text-[10px] uppercase tracking-[0.24em] text-olive text-center mb-10 md:mb-14">
          {t('work.rooms.artisans.path')}
        </p>
        <div className="flex flex-col gap-10 md:gap-16 relative z-10">
          {ordered.map((p, i) => (
            <ArtisanStation
              key={p.slug}
              project={p}
              layout={LAYOUT_CYCLE[i % LAYOUT_CYCLE.length]}
              index={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
