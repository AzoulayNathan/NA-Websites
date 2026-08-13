import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { usePreview } from '@/lib/PreviewContext';
import { useI18n, useProjectText } from '@/i18n';
import ProjectGalleryFrame from '@/components/atelier/ProjectGalleryFrame';
import { openProjectFromEvent } from '@/components/atelier/lib/openProject';
import { sortProjectsBySlug } from '../lib/roomHelpers';

const SAAS_ORDER = ['questline', 'peerless', 'dilemma-royale'];

const NODE_LAYOUT = {
  questline: { left: '26%', top: '6%', w: '46%', annotation: 'flow' },
  peerless: { left: '2%', top: '36%', w: '30%', annotation: 'rank' },
  'dilemma-royale': { left: '48%', top: '48%', w: '40%', annotation: 'branch' },
};

const EDGES = [
  ['questline', 'peerless'],
  ['questline', 'dilemma-royale'],
];

function nodeCenter(layout) {
  const x = parseFloat(layout.left) + parseFloat(layout.w) / 2;
  const y = parseFloat(layout.top) + 8;
  return { x, y };
}

function ConstellationNode({
  project,
  layout,
  isActive,
  dimmed,
  onHover,
  openPreview,
  t,
}) {
  const copy = useProjectText(project);
  const annotation = t(`work.rooms.saas.annotations.${layout.annotation}`);

  return (
    <button
      type="button"
      data-work-cursor={isActive ? 'focus' : 'trace'}
      onMouseEnter={onHover}
      onFocus={onHover}
      onClick={(e) => {
        if (e.target instanceof Element && e.target.closest('[data-project-frame]')) return;
        openProjectFromEvent(openPreview, project, e);
      }}
      className={`work-gallery-zone work-saas-node absolute text-left transition-all duration-500 ${
        isActive ? 'z-30 scale-[1.06]' : dimmed ? 'z-10 opacity-50 scale-[0.96]' : 'z-20 opacity-95'
      }`}
      style={{ left: layout.left, top: layout.top, width: layout.w }}
    >
      <ProjectGalleryFrame
        project={project}
        roomType="saas"
        layout="constellation"
        className="min-h-[120px] md:min-h-[150px] border-sky-blue/35"
        interactive
      />
      {isActive && (
        <span className="absolute -top-1 right-0 text-[8px] uppercase tracking-[0.14em] bg-deep-green text-quartz px-2 py-0.5">
          {annotation}
        </span>
      )}
      <p className="mt-2 text-[12px] font-medium text-ink">{project.title}</p>
      <p className="text-[11px] text-deep-green line-clamp-1">{copy.microLine}</p>
    </button>
  );
}

export default function SaasConstellation({ projects }) {
  const { openPreview } = usePreview();
  const { t } = useI18n();
  const ordered = sortProjectsBySlug(projects, SAAS_ORDER);
  const [activeSlug, setActiveSlug] = useState('questline');

  const layouts = useMemo(() => {
    const map = {};
    ordered.forEach((p) => {
      map[p.slug] = NODE_LAYOUT[p.slug] || { left: '10%', top: '10%', w: '30%', annotation: 'flow' };
    });
    return map;
  }, [ordered]);

  return (
    <div className="work-room work-room--saas">
      <header className="mb-6 md:mb-8 max-w-xl">
        <p className="text-eyebrow text-deep-green mb-2">{t('work.rooms.saas.eyebrow')}</p>
        <h2 className="font-serif text-[28px] md:text-[36px] font-light text-ink">{t('work.rooms.saas.heading')}</h2>
        <p className="text-[14px] text-ink mt-2">{t('work.rooms.saas.line')}</p>
      </header>

      <div className="work-saas-constellation relative min-h-[480px] md:min-h-[620px] py-6 md:py-10 bg-[#B8CCD4]/25 border border-sky-blue/30 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
          {EDGES.map(([a, b]) => {
            const la = layouts[a];
            const lb = layouts[b];
            if (!la || !lb) return null;
            const ca = nodeCenter(la);
            const cb = nodeCenter(lb);
            const lit = activeSlug === a || activeSlug === b;
            return (
              <motion.line
                key={`${a}-${b}`}
                x1={`${ca.x}%`}
                y1={`${ca.y}%`}
                x2={`${cb.x}%`}
                y2={`${cb.y}%`}
                stroke="#3F5A4F"
                strokeWidth={lit ? 1.5 : 0.8}
                strokeOpacity={lit ? 0.65 : 0.28}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            );
          })}
        </svg>

        {ordered.map((p) => (
          <ConstellationNode
            key={p.slug}
            project={p}
            layout={layouts[p.slug]}
            isActive={activeSlug === p.slug}
            dimmed={activeSlug !== p.slug}
            onHover={() => setActiveSlug(p.slug)}
            openPreview={openPreview}
            t={t}
          />
        ))}
      </div>
    </div>
  );
}
