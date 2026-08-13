import React from 'react';
import { motion } from 'framer-motion';
import { usePreview } from '@/lib/PreviewContext';
import { useScrollReveal } from '@/lib/useScrollReveal';
import ProjectActionCTA from '@/components/shared/ProjectActionCTA';
import { EASE, useReducedMotion, useFeaturedProject, projectFrames, SceneImage } from './shared';

export default function DreamsGalleryScene() {
  const slug = 'dreams';
  const project = useFeaturedProject(slug);
  const { openPreview } = usePreview();
  const [ref, inView] = useScrollReveal(0.08);
  const reduced = useReducedMotion();
  const frames = projectFrames(project);
  const visual = frames[0] || frames[1];

  if (!project) return null;

  return (
    <article
      ref={ref}
      className="featured-scene featured-scene--dreams relative w-[100vw] max-w-none left-1/2 -translate-x-1/2 bg-deep-green py-16 md:py-24 overflow-hidden"
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-sky-blue/10 pointer-events-none featured-dreams-seam"
        aria-hidden
      />
      <motion.div
        className="absolute top-[12%] left-[18%] w-[40%] h-[30%] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(175,200,209,0.12) 0%, transparent 70%)' }}
        initial={reduced ? false : { opacity: 0 }}
        animate={inView ? { opacity: [0.3, 0.55, 0.35] } : {}}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex flex-col items-center">
        <motion.button
          type="button"
          onClick={() => openPreview(project)}
          className="relative w-full max-w-[920px] aspect-[16/9] md:aspect-[2/1] overflow-hidden group text-left"
          initial={reduced ? false : { clipPath: 'inset(0 50% 0 50%)' }}
          animate={inView ? { clipPath: 'inset(0 0% 0 0%)' } : {}}
          transition={{ duration: 1.15, ease: EASE }}
        >
          {visual && (
            <SceneImage
              src={visual}
              slug={slug}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover object-center opacity-88 group-hover:opacity-95 transition-opacity duration-700"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-deep-green via-deep-green/20 to-transparent pointer-events-none" />
        </motion.button>

        <motion.div
          className="mt-10 md:mt-14 text-center max-w-md"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.7, ease: EASE }}
        >
          <p className="text-[9px] uppercase tracking-[0.32em] text-sky-blue/60 mb-3">Signature concept</p>
          <h3 className="font-serif text-[28px] md:text-[36px] font-light text-quartz leading-tight">{project.title}</h3>
          <p className="mt-4 text-[12px] text-quartz/65 font-light italic tracking-wide">{project.microLine}</p>
          <div className="mt-6 flex justify-center">
            <ProjectActionCTA project={project} variant="dark" asLabel />
          </div>
        </motion.div>
      </div>
    </article>
  );
}
