import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePreview } from '@/lib/PreviewContext';
import { useScrollReveal } from '@/lib/useScrollReveal';
import SceneLaunchTag from './SceneLaunchTag';
import { EASE, useReducedMotion, useFeaturedProject, projectFrames, SceneImage } from './shared';

export default function DropdropShelfScene() {
  const slug = 'dropdrop';
  const project = useFeaturedProject(slug);
  const { openPreview } = usePreview();
  const [ref, inView] = useScrollReveal(0.06);
  const reduced = useReducedMotion();
  const [hover, setHover] = useState(false);
  const frames = projectFrames(project);
  const visual = frames[0];

  if (!project) return null;

  const open = () => openPreview(project);

  return (
    <article
      ref={ref}
      className="featured-scene featured-scene--shelf relative w-full"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <motion.div
        className="featured-shelf-wipe absolute inset-0 pointer-events-none origin-left z-0"
        style={{
          background: 'linear-gradient(98deg, transparent 0%, hsl(174 28% 88% / 0.35) 42%, hsl(82 18% 42% / 0.12) 68%, transparent 100%)',
        }}
        initial={reduced ? false : { scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, ease: EASE }}
        aria-hidden
      />

      <div className="relative z-10 flex flex-col lg:block min-h-[300px] lg:min-h-[380px]">
        <motion.button
          type="button"
          onClick={open}
          className={`featured-shelf-visual group relative w-full lg:w-[88%] min-h-[260px] lg:min-h-[380px] text-left overflow-hidden border border-olive/20 bg-[#E8E4D8] transition-transform duration-500 ease-out ${
            hover ? 'lg:scale-[1.015] lg:origin-left' : ''
          }`}
          style={{ clipPath: 'polygon(0 0, 100% 0, 96% 100%, 0 100%)' }}
          initial={reduced ? false : { opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.85, ease: EASE }}
        >
          {visual && (
            <SceneImage
              src={visual}
              slug={slug}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          )}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(125deg, #F6F3ED 0%, transparent 28%, transparent 62%, hsl(174 35% 72% / 0.22) 100%)',
            }}
            aria-hidden
          />
          <svg className="featured-shelf-aquatic absolute inset-x-0 bottom-[18%] h-16 pointer-events-none" viewBox="0 0 800 48" preserveAspectRatio="none" aria-hidden>
            <motion.path
              d="M0 28 Q200 18 400 26 Q600 34 800 22"
              fill="none"
              stroke="#3F5A4F"
              strokeWidth="1"
              initial={reduced ? false : { pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.35, ease: EASE }}
            />
          </svg>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-sand/85 to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 md:left-10 max-w-[220px]">
            <p className="text-[9px] uppercase tracking-[0.28em] text-olive mb-1">DTC · Mediterranean</p>
            <p className="font-serif text-[22px] md:text-[26px] font-light text-ink leading-tight">{project.title}</p>
          </div>
        </motion.button>

        <div className="lg:absolute lg:right-6 lg:top-8 z-20 mt-4 lg:mt-0 px-6 lg:px-0 flex justify-end">
          <SceneLaunchTag project={project} />
        </div>
      </div>
    </article>
  );
}
