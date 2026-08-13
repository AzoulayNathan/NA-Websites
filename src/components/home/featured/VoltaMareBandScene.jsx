import React from 'react';
import { motion } from 'framer-motion';
import { usePreview } from '@/lib/PreviewContext';
import { useScrollReveal } from '@/lib/useScrollReveal';
import ProjectActionCTA from '@/components/shared/ProjectActionCTA';
import { EASE, useReducedMotion, useFeaturedProject, projectFrames, SceneImage } from './shared';

export default function VoltaMareBandScene() {
  const slug = 'volta-mare-energy';
  const project = useFeaturedProject(slug);
  const { openPreview } = usePreview();
  const [ref, inView] = useScrollReveal(0.06);
  const reduced = useReducedMotion();
  const frames = projectFrames(project);
  const visual = frames[0];

  if (!project) return null;

  return (
    <article ref={ref} className="featured-scene featured-scene--infra relative w-full overflow-hidden min-h-[220px] md:min-h-[280px] bg-[#C5D4DC]/50">
      <motion.div
        className="featured-infra-grid absolute inset-0 pointer-events-none"
        aria-hidden
        animate={reduced || !inView ? {} : { backgroundPosition: ['0px 0px', '48px 0px'] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent, transparent 47px, rgba(31,61,51,0.07) 47px, rgba(31,61,51,0.07) 48px), repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(175,200,209,0.15) 31px, rgba(175,200,209,0.15) 32px)',
        }}
      />

      <svg className="absolute inset-x-0 bottom-[22%] h-12 pointer-events-none opacity-50" viewBox="0 0 1200 40" preserveAspectRatio="none" aria-hidden>
        <motion.path
          d="M0 22 Q300 14 600 20 Q900 26 1200 18"
          fill="none"
          stroke="#3F5A4F"
          strokeWidth="0.8"
          initial={reduced ? false : { pathLength: 0.2 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, ease: EASE }}
        />
      </svg>

      {inView && !reduced && (
        <>
          <span className="absolute top-[18%] left-[12%] w-1.5 h-1.5 rounded-full bg-olive/40" aria-hidden />
          <span className="absolute top-[28%] left-[34%] w-1 h-1 rounded-full bg-sky-blue/50" aria-hidden />
          <span className="absolute top-[22%] right-[22%] w-1.5 h-1.5 border border-olive/35" aria-hidden />
        </>
      )}

      <button
        type="button"
        onClick={() => openPreview(project)}
        className="relative block w-full h-full min-h-[220px] md:min-h-[280px] text-left group"
      >
        <div className="absolute inset-y-0 right-0 w-[72%] md:w-[78%] border-l border-olive/20 bg-sand/30 featured-infra-blueprint overflow-hidden">
          {visual && (
            <SceneImage
              src={visual}
              slug={slug}
              alt={project.title}
              className="w-full h-full object-cover object-top opacity-90 mix-blend-multiply group-hover:opacity-100 transition-opacity duration-500"
            />
          )}
          <div className="absolute inset-4 border border-olive/15 pointer-events-none" aria-hidden />
          <div className="absolute inset-8 border border-dashed border-olive/10 pointer-events-none hidden md:block" aria-hidden />
        </div>

        <div className="relative z-10 p-8 md:p-10 max-w-[280px] h-full flex flex-col justify-end">
          <p className="text-[9px] uppercase tracking-[0.24em] text-olive mb-2">Coastal infrastructure</p>
          <h3 className="font-serif text-[20px] md:text-[24px] font-light text-ink leading-snug mb-3">{project.title}</h3>
          <p className="text-[11px] text-ink/70 font-light leading-relaxed max-w-[200px]">{project.microLine}</p>
          <div className="mt-4">
            <ProjectActionCTA project={project} variant="primary" asLabel />
          </div>
        </div>
      </button>
    </article>
  );
}
