import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getProject, enrichProject } from '@/lib/projects';
import { useI18n } from '@/i18n';
import ProjectGalleryFrame from '@/components/atelier/ProjectGalleryFrame';

const ZONES = [
  {
    slug: 'atelier-nova-habitat',
    category: 'local-business',
    zoneKey: 'artisans',
    className: 'work-showroom-zone--artisans',
  },
  {
    slug: 'volta-mare-energy',
    category: 'product-brand',
    zoneKey: 'brand',
    className: 'work-showroom-zone--brand',
  },
  {
    slug: 'questline',
    category: 'saas-web-app',
    zoneKey: 'saas',
    className: 'work-showroom-zone--saas',
  },
  {
    slug: 'dreams',
    category: 'signature-concept',
    zoneKey: 'signature',
    className: 'work-showroom-zone--signature',
  },
];

const zoneMotion = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
};

function ZoneBlock({ zone, index, onEnterTerritory, t }) {
  const project = enrichProject(getProject(zone.slug));
  const [hovered, setHovered] = useState(false);
  if (!project) return null;

  return (
    <motion.div
      {...zoneMotion}
      transition={{ delay: 0.35 + index * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`work-showroom-zone work-gallery-zone group ${zone.className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        type="button"
        onClick={() => onEnterTerritory?.(zone.category)}
        className="absolute top-3 right-3 z-20 text-[9px] uppercase tracking-[0.18em] text-deep-green bg-quartz/95 px-2 py-1 border border-olive/30 hover:border-olive transition-colors"
      >
        {t(`work.rooms.showroom.zones.${zone.zoneKey}`)} →
      </button>
      <ProjectGalleryFrame
        project={project}
        roomType={zone.zoneKey}
        layout={zone.zoneKey === 'signature' ? 'cinematic' : zone.zoneKey === 'saas' ? 'constellation' : zone.zoneKey === 'artisans' ? 'artisanTriptych' : 'productWide'}
        className={`absolute inset-0 border-0 transition-transform duration-500 ${hovered ? 'scale-[1.03]' : 'scale-100'}`}
        interactive
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 pointer-events-none">
        <p className="text-[10px] uppercase tracking-[0.2em] text-quartz font-medium">
          {t(`work.rooms.showroom.zones.${zone.zoneKey}`)}
        </p>
        <p className="font-serif text-xl md:text-2xl font-light text-quartz mt-1">{project.title}</p>
      </div>
    </motion.div>
  );
}

export default function ShowroomPath({ onEnterTerritory }) {
  const { t } = useI18n();
  const table = enrichProject(getProject('dropdrop'));

  return (
    <div className="work-room work-room--showroom">
      <header className="mb-8 md:mb-10">
        <p className="text-eyebrow text-deep-green mb-2">{t('work.rooms.showroom.eyebrow')}</p>
        <h2 className="font-serif text-[28px] md:text-[40px] font-light text-ink leading-tight max-w-2xl">
          {t('work.rooms.showroom.heading')}
        </h2>
        <p className="text-[14px] md:text-[15px] text-ink mt-3 max-w-lg">{t('work.rooms.showroom.line')}</p>
      </header>

      <div className="work-showroom-atelier relative min-h-[520px] md:min-h-[680px]">
        <svg className="work-showroom-map absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
          {[
            [50, 42, 22, 18],
            [50, 42, 78, 18],
            [50, 42, 22, 78],
            [50, 42, 78, 78],
          ].map(([x1, y1, x2, y2], i) => (
            <motion.line
              key={`${x1}-${y1}-${x2}-${y2}`}
              x1={`${x1}%`}
              y1={`${y1}%`}
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="#3F5A4F"
              strokeWidth="1"
              strokeOpacity="0.45"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </svg>

        {table && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="work-showroom-table work-gallery-zone group text-left block w-full"
          >
            <ProjectGalleryFrame
              project={table}
              roomType="showroom"
              layout="productWide"
              className="absolute inset-0 border-olive/25"
              interactive
            />
            <div className="absolute inset-0 bg-gradient-to-r from-quartz/90 via-quartz/40 to-transparent md:max-w-[45%] pointer-events-none" />
            <div className="absolute bottom-0 left-0 p-6 md:p-10 max-w-md pointer-events-none">
              <p className="text-[10px] uppercase tracking-[0.22em] text-deep-green font-medium">
                {t('work.rooms.showroom.tableLabel')}
              </p>
              <h3 className="font-serif text-3xl md:text-4xl font-light text-ink mt-2">{table.title}</h3>
              <p className="text-[13px] text-ink mt-2">{t('work.rooms.showroom.tableLine')}</p>
            </div>
          </motion.div>
        )}

        {ZONES.map((zone, i) => (
          <ZoneBlock
            key={zone.slug}
            zone={zone}
            index={i}
            onEnterTerritory={onEnterTerritory}
            t={t}
          />
        ))}
      </div>
    </div>
  );
}
