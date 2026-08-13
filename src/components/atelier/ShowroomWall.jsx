import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { getProject, enrichProject } from '@/lib/projects';
import { useI18n } from '@/i18n';
import StudioCTA from '@/components/shared/StudioCTA';
import NABubbleCTA from './NABubbleCTA';
import ProjectVisualFrame from '@/components/shared/ProjectVisualFrame';
import { usePreview } from '@/lib/PreviewContext';

const EASE = [0.22, 1, 0.36, 1];

const WINDOWS = [
  { slug: 'dropdrop', labelKey: 'product-brand', slot: 'center' },
  { slug: 'atelier-nova-habitat', labelKey: 'local-business', slot: 'leftTall' },
  { slug: 'dreams', labelKey: 'signature-concept', slot: 'rightTall' },
  { slug: 'questline', labelKey: 'saas-web-app', slot: 'mobile' },
  { slug: 'volta-mare-energy', labelKey: 'product-brand', slot: 'crop' },
];

const SLOT_CLASS = {
  center:
    'md:absolute md:left-[22%] md:right-[14%] md:top-[6%] md:h-[52%] z-20 min-h-[220px] md:min-h-[300px]',
  leftTall: 'md:absolute md:left-0 md:w-[18%] md:top-[2%] md:h-[44%] z-10 hidden md:block min-h-[200px]',
  rightTall: 'md:absolute md:right-0 md:w-[16%] md:top-[4%] md:h-[42%] z-10 hidden md:block min-h-[200px]',
  mobile:
    'md:absolute md:left-[2%] md:bottom-[4%] md:w-[26%] md:h-[30%] z-15 min-h-[140px] md:min-h-[180px]',
  crop:
    'md:absolute md:right-[-6%] md:bottom-0 md:w-[34%] md:h-[36%] z-5 min-h-[150px] md:min-h-[200px]',
};

export default function ShowroomWall() {
  const { t } = useI18n();
  const { openPreview } = usePreview();
  const reduced = useReducedMotion();
  const [linesReady, setLinesReady] = useState(false);

  useEffect(() => {
    if (reduced) {
      setLinesReady(true);
      return undefined;
    }
    const id = window.setTimeout(() => setLinesReady(true), 1100);
    return () => window.clearTimeout(id);
  }, [reduced]);

  return (
    <section className="relative min-h-[100svh] flex flex-col bg-quartz overflow-hidden">
      <div className="w-full max-w-[min(1680px,100%)] mx-auto flex-1 flex flex-col lg:flex-row lg:items-stretch px-6 md:px-10 pt-28 pb-16 lg:pt-32 lg:pb-20 gap-10 lg:gap-6">
        <div className="lg:w-[38%] lg:max-w-[480px] flex flex-col justify-center z-30 shrink-0">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="text-eyebrow mb-6 text-olive"
          >
            {t('hero.eyebrow')}
          </motion.p>
          {['title1', 'title2', 'title3', 'title4'].map((key, i) => (
            <motion.h1
              key={key}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + i * 0.08, duration: 0.75, ease: EASE }}
              className={`font-serif leading-[1.04] font-light text-[clamp(2.25rem,5.5vw,4.25rem)] ${
                i % 2 === 1 ? 'text-deep-green italic' : 'text-ink'
              }`}
            >
              {t(`hero.${key}`)}
            </motion.h1>
          ))}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.55 }}
            className="mt-5 text-[15px] text-ink leading-relaxed max-w-md font-light"
          >
            {t('hero.body')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.5 }}
            className="mt-9 flex flex-wrap items-center gap-5"
          >
            <StudioCTA to="/work" variant="primary">
              {t('hero.ctaPrimary')}
            </StudioCTA>
            <NABubbleCTA to="/contact" label={t('hero.ctaSecondary')} size="sm" />
          </motion.div>
        </div>

        <div className="lg:w-[62%] flex-1 relative min-h-[min(72vh,720px)] lg:min-h-[520px]">
          <svg
            className={`absolute inset-0 w-full h-full pointer-events-none text-olive/25 z-0 transition-opacity duration-700 ${
              linesReady ? 'opacity-100' : 'opacity-0'
            }`}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <line x1="10" y1="72" x2="48" y2="42" stroke="currentColor" strokeWidth="0.2" />
            <line x1="90" y1="68" x2="52" y2="44" stroke="currentColor" strokeWidth="0.2" />
            <line x1="14" y1="28" x2="46" y2="38" stroke="currentColor" strokeWidth="0.15" />
            <line x1="88" y1="32" x2="54" y2="40" stroke="currentColor" strokeWidth="0.15" />
            <line x1="8" y1="85" x2="42" y2="55" stroke="currentColor" strokeWidth="0.12" />
          </svg>

          <div className="relative w-full h-full flex flex-col gap-4 md:block md:gap-0">
            {WINDOWS.map((win, index) => {
              const project = enrichProject(getProject(win.slug));
              if (!project) return null;
              const isDark = project.theme === 'signature';
              return (
                <motion.div
                  key={win.slug}
                  initial={reduced ? false : { opacity: 0, clipPath: win.slot === 'center' ? 'inset(0 100% 0 0)' : 'inset(0 0 0 0)', y: 16 }}
                  animate={{ opacity: 1, clipPath: 'inset(0 0 0 0)', y: 0 }}
                  transition={{
                    delay: reduced ? 0 : win.slot === 'center' ? 0.7 : 0.95 + index * 0.07,
                    duration: reduced ? 0 : win.slot === 'center' ? 0.85 : 0.65,
                    ease: EASE,
                  }}
                  className={`overflow-hidden border cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive ${SLOT_CLASS[win.slot]} ${
                    isDark ? 'border-sky-blue/20' : 'border-olive/15'
                  }`}
                  style={win.slot === 'crop' ? { clipPath: 'polygon(8% 0, 100% 0, 100% 100%, 0 100%)' } : undefined}
                  onClick={() => openPreview(project)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openPreview(project);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${project.title} — open case study`}
                >
                  <ProjectVisualFrame project={project} className="absolute inset-0 w-full h-full" instant />
                  <div
                    className={`absolute inset-0 pointer-events-none ${
                      isDark
                        ? 'bg-gradient-to-t from-deep-green/85 via-deep-green/20 to-transparent'
                        : 'bg-gradient-to-t from-ink/55 via-transparent to-transparent'
                    }`}
                  />
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.35 + index * 0.05, duration: 0.4 }}
                    className={`absolute top-2 left-2 z-10 text-[8px] uppercase tracking-[0.22em] ${
                      isDark ? 'text-sky-blue/80' : 'text-olive'
                    }`}
                  >
                    {t(`heroCategory.${win.labelKey}`)}
                  </motion.span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
