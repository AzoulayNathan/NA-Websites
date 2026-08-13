import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePreview } from '@/lib/PreviewContext';
import { useI18n } from '@/i18n';
import { useScrollReveal } from '@/lib/useScrollReveal';
import ProjectActionCTA from '@/components/shared/ProjectActionCTA';
import { EASE, useReducedMotion, useFeaturedProject, projectFrames, SceneImage } from './shared';

const CYCLE_MS = 4000;

export default function BusinessPathScene() {
  const slug = 'atelier-nova-habitat';
  const project = useFeaturedProject(slug);
  const { t } = useI18n();
  const { openPreview } = usePreview();
  const [ref, inView] = useScrollReveal(0.08);
  const reduced = useReducedMotion();
  const [hover, setHover] = useState(false);
  const frames = projectFrames(project);
  const [slot, setSlot] = useState(0);

  useEffect(() => {
    if (frames.length <= 1) return undefined;
    const id = window.setInterval(() => setSlot((i) => (i + 1) % frames.length), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [frames.length]);

  if (!project) return null;

  const pathSteps = t('featured.scenes.business.pathSteps');
  const steps = Array.isArray(pathSteps) ? pathSteps : ['Offer', 'Proof', 'Trust', 'Contact'];

  return (
    <article ref={ref} className="featured-scene featured-scene--path relative py-14 md:py-20 bg-quartz/60 border-y border-olive/15">
      <svg className="absolute inset-x-0 top-[42%] h-24 w-full pointer-events-none hidden md:block" viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden>
        <motion.path
          d="M40 42 H520 Q640 42 720 38 H1160"
          fill="none"
          stroke="#3F5A4F"
          strokeWidth="1.2"
          strokeDasharray="4 6"
          initial={reduced ? false : { pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.2, ease: EASE }}
        />
        <circle cx="520" cy="42" r="5" fill="#F6F3ED" stroke="#3F5A4F" strokeWidth="1" />
      </svg>

      <div className="max-w-[1100px] mx-auto px-6 md:px-10 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-[9px] uppercase tracking-[0.26em] text-olive mb-2">{t('featured.scenes.business.eyebrow')}</p>
            <h3 className="font-serif text-[24px] md:text-[30px] font-light text-ink">{project.title}</h3>
          </div>
          <ProjectActionCTA project={project} variant="primary" asLabel />
        </div>

        <motion.div
          className={`featured-path-station mx-auto md:ml-auto md:mr-[8%] max-w-[640px] transition-transform duration-500 ease-out ${
            hover ? 'scale-[1.03]' : 'scale-100'
          }`}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.75, ease: EASE }}
        >
          <button
            type="button"
            onClick={() => openPreview(project)}
            className="w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive/40"
          >
            <div className="grid grid-cols-3 gap-1.5 p-2 border border-olive/25 bg-sand shadow-sm">
              {frames.slice(0, 3).map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-[3/4] overflow-hidden bg-sand/50"
                >
                  <SceneImage
                    src={src}
                    slug={slug}
                    alt={`${project.title} — view ${i + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ${
                      i === slot % frames.length ? 'opacity-100 scale-100' : 'opacity-55 scale-[1.015]'
                    }`}
                  />
                </div>
              ))}
            </div>
            <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-olive/80">{t('featured.scenes.business.station')}</p>
          </button>
        </motion.div>

        <ol className="mt-12 flex flex-wrap items-center justify-center md:justify-between gap-x-3 gap-y-2 max-w-[720px] md:mx-auto list-none p-0">
          {steps.map((label, i) => (
            <li key={label} className="flex items-center gap-3">
              <span
                className={`text-[9px] uppercase tracking-[0.16em] ${i <= slot % steps.length ? 'text-deep-green' : 'text-olive/60'}`}
              >
                {label}
              </span>
              {i < steps.length - 1 && <span className="text-olive/30 text-[10px]" aria-hidden>→</span>}
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
}
