import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useScrollReveal } from '@/lib/useScrollReveal';
import RevealText from '@/components/shared/RevealText';
import { getEnrichedProject } from '@/lib/projects';
import { themeTokens } from '@/lib/themeTokens';
import { useI18n } from '@/i18n';
import ProjectGalleryFrame from '@/components/atelier/ProjectGalleryFrame';

const STATE_CONFIG = [
  { key: 'local', slug: 'atelier-nova-habitat', theme: 'local' },
  { key: 'brand', slug: 'dropdrop', theme: 'brand' },
  { key: 'saas', slug: 'questline', theme: 'saas' },
  { key: 'signature', slug: 'dreams', theme: 'signature' },
];

export default function AdaptiveStudioFrame() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [ref, visible] = useScrollReveal(0.1);

  const states = STATE_CONFIG.map((cfg) => ({
    ...cfg,
    label: t(`adaptive.states.${cfg.key}.label`),
    meta: t(`adaptive.states.${cfg.key}.meta`),
    text: t(`adaptive.states.${cfg.key}.text`),
    token: themeTokens[cfg.theme],
    project: getEnrichedProject(cfg.slug),
  }));

  const current = states[active];

  return (
    <section className="py-24 md:py-32 bg-sand/30 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <RevealText as="h2" className="font-serif text-[30px] md:text-[44px] font-light text-ink mb-12 max-w-xl">
          {t('adaptive.heading1')}{' '}
          <span className="italic text-deep-green">{t('adaptive.heading2')}</span>
        </RevealText>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-3 flex flex-row lg:flex-col gap-2 lg:gap-0 border-b lg:border-b-0 lg:border-r border-olive/15 lg:pr-6">
            {states.map((s, i) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setActive(i)}
                className={`relative text-left px-4 py-4 lg:py-6 transition-colors flex-1 lg:flex-none ${
                  active === i ? 'bg-quartz border-l-2 border-olive' : 'hover:bg-sand/50 text-ink/65'
                }`}
              >
                <p className="text-[9px] uppercase tracking-[0.2em] text-olive mb-1">{s.meta}</p>
                <p className="text-[12px] uppercase tracking-[0.14em] font-medium">{s.label}</p>
              </button>
            ))}
          </div>

          <div className="lg:col-span-9 relative min-h-[360px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.key}
                initial={reduced ? false : { opacity: 0, clipPath: 'inset(0 0 0 100%)' }}
                animate={{ opacity: 1, clipPath: 'inset(0 0 0 0)' }}
                exit={reduced ? { opacity: 1 } : { opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                transition={{ duration: reduced ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="grid md:grid-cols-12 gap-6 min-h-[360px]"
                style={{ backgroundColor: current.token.bg }}
              >
                <div className="md:col-span-5 p-8 flex flex-col justify-center">
                  <p className={`text-[14px] font-light leading-relaxed ${current.theme === 'signature' ? 'text-quartz/85' : 'text-ink/80'}`}>
                    {current.text}
                  </p>
                </div>
                <div className="md:col-span-7 relative min-h-[280px] na-diagonal-clip overflow-hidden">
                  {current.project && (
                    <ProjectGalleryFrame project={current.project} interactive layout="default" className="absolute inset-0 h-full border-0" />
                  )}
                  <div className={`absolute bottom-0 left-0 right-0 h-px ${current.theme === 'signature' ? 'bg-sky-blue/40' : 'bg-olive/30'}`} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
