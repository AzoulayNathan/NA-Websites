import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePreview } from '@/lib/PreviewContext';
import { useI18n } from '@/i18n';
import { useScrollReveal } from '@/lib/useScrollReveal';
import ProjectActionCTA from '@/components/shared/ProjectActionCTA';
import { EASE, useReducedMotion, useFeaturedProject, projectFrames, SceneImage } from './shared';

const NODES = [
  { id: 'desktop', frameIndex: 0, x: '8%', y: '18%', w: '28%', z: 10 },
  { id: 'cover', frameIndex: 1, x: '62%', y: '8%', w: '32%', z: 30, active: true },
  { id: 'mobile', frameIndex: 2, x: '72%', y: '58%', w: '22%', z: 20 },
];

export default function QuestlineConstellationScene() {
  const slug = 'questline';
  const project = useFeaturedProject(slug);
  const { t } = useI18n();
  const { openPreview } = usePreview();
  const [ref, inView] = useScrollReveal(0.08);
  const reduced = useReducedMotion();
  const frames = projectFrames(project);
  const [activeId, setActiveId] = useState('cover');
  const tags = t('featured.scenes.questline.tags');
  const tagList = Array.isArray(tags) ? tags : ['Progress', 'Streaks', 'Flow'];

  if (!project) return null;

  return (
    <article ref={ref} className="featured-scene featured-scene--constellation relative py-12 md:py-16 min-h-[420px] md:min-h-[480px]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <h3 className="font-serif text-[24px] md:text-[32px] font-light text-ink">{project.title}</h3>
          <ProjectActionCTA project={project} variant="theme" asLabel />
        </div>

        <div className="relative min-h-[340px] md:min-h-[400px]">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            {NODES.map((from) =>
              NODES.filter((to) => to.id !== from.id).map((to) => {
                const lit = activeId === from.id || activeId === to.id;
                const x1 = parseFloat(from.x) + parseFloat(from.w) / 2;
                const y1 = parseFloat(from.y) + 12;
                const x2 = parseFloat(to.x) + parseFloat(to.w) / 2;
                const y2 = parseFloat(to.y) + 12;
                return (
                  <motion.line
                    key={`${from.id}-${to.id}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#3F5A4F"
                    strokeWidth="0.15"
                    initial={reduced ? false : { opacity: 0.08 }}
                    animate={{ opacity: lit ? 0.45 : 0.1 }}
                    transition={{ duration: 0.35 }}
                  />
                );
              }),
            )}
          </svg>

          {NODES.map((node) => {
            const isActive = activeId === node.id;
            const src = frames[node.frameIndex] || frames[0];
            if (!src) return null;
            return (
              <motion.button
                key={node.id}
                type="button"
                onClick={() => {
                  setActiveId(node.id);
                  openPreview(project);
                }}
                onMouseEnter={() => setActiveId(node.id)}
                className={`absolute overflow-hidden border bg-sand/60 text-left transition-all duration-500 ease-out ${
                  isActive ? 'border-olive/50 shadow-md z-30' : 'border-olive/15 opacity-75 z-10'
                }`}
                style={{
                  left: node.x,
                  top: node.y,
                  width: isActive ? `calc(${node.w} + 4%)` : node.w,
                }}
                initial={reduced ? false : { opacity: 0, scale: 0.94 }}
                animate={inView ? { opacity: isActive ? 1 : 0.82, scale: isActive ? 1 : 0.96 } : {}}
                transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
              >
                <div className={`relative ${isActive ? 'aspect-[4/3]' : 'aspect-[3/4]'}`}>
                  <SceneImage src={src} slug={slug} alt="" className="absolute inset-0 w-full h-full object-cover object-top" />
                </div>
                {isActive && (
                  <motion.span
                    className="absolute -top-6 left-0 text-[8px] uppercase tracking-[0.14em] text-olive bg-sand/90 px-2 py-0.5 border border-olive/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {tagList[NODES.indexOf(node) % tagList.length]}
                  </motion.span>
                )}
              </motion.button>
            );
          })}

          <div className="absolute bottom-0 left-0 flex flex-wrap gap-3 pointer-events-none">
            {tagList.map((tag, i) => (
              <span
                key={tag}
                className={`text-[8px] uppercase tracking-[0.14em] px-2 py-1 border transition-colors duration-300 ${
                  activeId === NODES[i % NODES.length]?.id ? 'border-olive/35 text-deep-green' : 'border-olive/15 text-olive/40'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
