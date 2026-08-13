import React from 'react';
import { motion } from 'framer-motion';
import { usePreview } from '@/lib/PreviewContext';
import { useI18n } from '@/i18n';
import { getProjectCta } from '@/lib/projectCta';
import { proofBadgeKey } from '@/lib/projectFrames';
import { openProjectFromEvent } from '@/components/atelier/lib/openProject';
import { SHOWROOM_SLUG } from '@/lib/projects';

function ProofBadge({ project, t, isDark }) {
  const key = proofBadgeKey(project.proofType);
  return (
    <span
      className={`shrink-0 text-[8px] uppercase tracking-[0.14em] px-2 py-0.5 border ${
        isDark ? 'border-sky-blue/30 text-sky-blue' : 'border-olive/30 text-deep-green'
      }`}
    >
      {t(`preview.${key}`)}
    </span>
  );
}

function IndexEntry({ project, index, isDark, t, openPreview }) {
  const cta = getProjectCta(project, t);
  const roomLabel =
    project.categorySlug === SHOWROOM_SLUG
      ? t('work.showroom')
      : t(`categories.${project.categorySlug}`);
  const cover = project.coverImage || `/assets/projects/${project.slug}/cover.webp`;

  return (
    <motion.li
      initial={{ opacity: 0, x: index % 2 === 0 ? -12 : 12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-4%' }}
      transition={{ delay: (index % 6) * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="work-index-entry work-gallery-zone"
    >
      <button
        type="button"
        onClick={(e) => openProjectFromEvent(openPreview, project, e)}
        className={`work-index-entry__btn group w-full text-left flex items-stretch gap-0 border transition-colors duration-300 ${
          isDark
            ? 'border-sky-blue/20 bg-deep-green/80 hover:border-sky-blue/40'
            : 'border-olive/25 bg-quartz/70 hover:border-olive/45 hover:bg-sand/50'
        }`}
        style={{ clipPath: 'polygon(0 0, 100% 0, 99% 100%, 0 100%)' }}
      >
        <span
          className={`work-index-entry__thumb relative w-[88px] md:w-[112px] shrink-0 overflow-hidden border-r ${
            isDark ? 'border-sky-blue/15' : 'border-olive/20'
          }`}
        >
          <img
            src={cover}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <span className="work-index-entry__seam absolute bottom-0 left-0 right-0 h-[2px] bg-olive scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400" />
        </span>
        <span className="flex-1 min-w-0 flex flex-col justify-center py-4 px-4 md:px-5">
          <span className="flex flex-wrap items-center gap-2 mb-1">
            <span className={`text-[10px] tracking-[0.2em] ${isDark ? 'text-sky-blue' : 'text-olive'}`}>
              {project.number}
            </span>
            <span className={`text-[9px] uppercase tracking-[0.16em] ${isDark ? 'text-quartz/70' : 'text-deep-green'}`}>
              {roomLabel}
            </span>
            <ProofBadge project={project} t={t} isDark={isDark} />
          </span>
          <span
            className={`font-serif text-xl md:text-2xl font-light truncate transition-transform duration-300 group-hover:translate-x-1 ${
              isDark ? 'text-quartz' : 'text-ink'
            }`}
          >
            {project.title}
          </span>
          <span className={`text-[11px] mt-1 uppercase tracking-[0.12em] ${isDark ? 'text-quartz/80' : 'text-deep-green'}`}>
            {cta.label} →
          </span>
        </span>
      </button>
    </motion.li>
  );
}

export default function WorkProjectIndexRail({ projects, activeCategory }) {
  const { openPreview } = usePreview();
  const { t } = useI18n();
  const isDark = activeCategory === 'signature-concept';
  const isShowroom = activeCategory === SHOWROOM_SLUG;

  return (
    <section className="work-index-rail" aria-labelledby="work-index-rail-title">
      <div className="flex items-center gap-4 mb-6 md:mb-8">
        <h2
          id="work-index-rail-title"
          className={`text-[11px] uppercase tracking-[0.22em] font-medium m-0 ${
            isDark ? 'text-quartz' : 'text-deep-green'
          }`}
        >
          {isShowroom ? t('work.indexRailAll') : t('work.indexRailRoom')}
        </h2>
        <div className={`h-px flex-1 ${isDark ? 'bg-quartz/25' : 'bg-olive/20'}`} />
      </div>
      <p className={`text-[13px] mb-6 max-w-lg ${isDark ? 'text-quartz' : 'text-ink'}`}>
        {isShowroom ? t('work.indexRailLineAll') : t('work.indexRailLineRoom')}
      </p>
      <ul className="work-index-rail__list flex flex-col gap-3 md:gap-4">
        {projects.map((project, i) => (
          <IndexEntry
            key={project.slug}
            project={project}
            index={i}
            isDark={isDark}
            t={t}
            openPreview={openPreview}
          />
        ))}
      </ul>
    </section>
  );
}
