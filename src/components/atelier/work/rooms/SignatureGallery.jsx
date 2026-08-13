import React from 'react';
import { motion } from 'framer-motion';
import { usePreview } from '@/lib/PreviewContext';
import { useI18n, useProjectText } from '@/i18n';
import ProjectGalleryFrame from '@/components/atelier/ProjectGalleryFrame';
import { openProjectFromEvent } from '@/components/atelier/lib/openProject';
import { sortProjectsBySlug } from '../lib/roomHelpers';

const SIGNATURE_ORDER = ['dreams', 'lumenvault-archives', 'na-studio-portfolio'];

const POSTER_VARIANT = {
  dreams: 'hero',
  'lumenvault-archives': 'vault',
  'na-studio-portfolio': 'studio',
};

function SignaturePoster({ project, variant, delay }) {
  const { openPreview } = usePreview();
  const { t } = useI18n();
  const copy = useProjectText(project);

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
      whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ delay, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      onClick={(e) => {
        if (e.target instanceof Element && e.target.closest('[data-project-frame]')) return;
        openProjectFromEvent(openPreview, project, e);
      }}
      className={`work-gallery-zone work-signature-poster work-signature-poster--${variant} group relative w-full text-left overflow-hidden border border-sky-blue/20`}
    >
      <div className="work-signature-aperture absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden />
      <ProjectGalleryFrame
        project={project}
        roomType="signature"
        layout="cinematic"
        className="absolute inset-0 border-0 min-h-[inherit]"
        interactive
      />
      <div className="absolute inset-0 bg-gradient-to-t from-deep-green via-deep-green/50 to-deep-green/10" />
      {variant === 'vault' && (
        <div className="absolute inset-4 border border-sky-blue/25 pointer-events-none" aria-hidden />
      )}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <p className="text-[10px] uppercase tracking-[0.26em] text-sky-blue font-medium">
          {t('work.rooms.signature.legend')}
        </p>
        <h3
          className={`font-serif font-light text-quartz leading-none mt-2 ${
            variant === 'hero' ? 'text-[36px] md:text-[56px]' : 'text-[28px] md:text-[40px]'
          }`}
        >
          {project.title}
        </h3>
        <p className="text-[13px] text-quartz mt-2 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {copy.microLine}
        </p>
      </div>
    </motion.button>
  );
}

export default function SignatureGallery({ projects }) {
  const { t } = useI18n();
  const ordered = sortProjectsBySlug(projects, SIGNATURE_ORDER);

  return (
    <div className="work-room work-room--signature -mx-6 md:mx-0 px-6 md:px-0 py-6 md:py-10 bg-deep-green">
      <header className="mb-10 md:mb-14 max-w-xl">
        <p className="text-[10px] uppercase tracking-[0.22em] text-sky-blue font-medium mb-2">
          {t('work.rooms.signature.eyebrow')}
        </p>
        <h2 className="font-serif text-[28px] md:text-[40px] font-light text-quartz">{t('work.rooms.signature.heading')}</h2>
        <p className="text-[14px] text-quartz mt-2">{t('work.rooms.signature.line')}</p>
      </header>

      <div className="flex flex-col gap-8 md:gap-14 max-w-[1600px]">
        {ordered.map((p, i) => (
          <SignaturePoster
            key={p.slug}
            project={p}
            variant={POSTER_VARIANT[p.slug] || 'hero'}
            delay={i * 0.1}
          />
        ))}
      </div>
    </div>
  );
}
