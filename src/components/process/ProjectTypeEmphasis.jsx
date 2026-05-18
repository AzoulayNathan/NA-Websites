import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/lib/useScrollReveal';
import RevealText from '../shared/RevealText';
import ThemeTexture from '../shared/ThemeTexture';

const types = [
  {
    theme: 'local',
    label: 'Local Business',
    meta: 'TRUST / SERVICE / CONTACT',
    headline: 'Make the offer unmissable.',
    focus: ['Clear offer structure', 'Trust markers', 'Contact ease', 'Speed and clarity', 'Local credibility'],
    bg: 'bg-sand/40',
    accentText: 'text-olive',
    borderActive: 'border-olive/30',
  },
  {
    theme: 'saas',
    label: 'SaaS & Web Apps',
    meta: 'FLOW / INTERFACE / LOGIC',
    headline: 'Reduce friction at every step.',
    focus: ['Interface clarity', 'Feature hierarchy', 'Onboarding flow', 'Usability logic', 'Product narrative'],
    bg: 'bg-white/60',
    accentText: 'text-sky-blue',
    borderActive: 'border-sky-blue/25',
  },
  {
    theme: 'signature',
    label: 'Signature Concepts',
    meta: 'ATMOSPHERE / IDENTITY / MEMORY',
    headline: 'Build a world, not just a page.',
    focus: ['Visual identity', 'Atmosphere design', 'Storytelling arc', 'Memorability', 'Cinematic motion'],
    bg: 'bg-deep-green',
    accentText: 'text-sky-blue',
    borderActive: 'border-sky-blue/20',
  },
];

export default function ProjectTypeEmphasis() {
  const [active, setActive] = useState(0);
  const [ref, visible] = useScrollReveal(0.08);

  return (
    <section className="py-24 md:py-32 bg-quartz/60">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <RevealText as="p" className="text-[10px] uppercase tracking-[0.25em] text-olive/40 mb-3">
          Method by Project Type
        </RevealText>
        <RevealText as="h2" delay={0.08} className="font-serif text-[28px] md:text-[44px] leading-[1.1] font-light text-ink mb-14">
          Same method. Different emphasis.
        </RevealText>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-px bg-olive/8">
          {types.map((t, i) => (
            <motion.div
              key={t.theme}
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setActive(i)}
              className={`relative cursor-default overflow-hidden transition-all duration-500 ${
                active === i ? t.bg : 'bg-quartz'
              }`}
            >
              <ThemeTexture theme={t.theme} />

              {/* Active bar */}
              <motion.div
                animate={{ scaleX: active === i ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute top-0 left-0 right-0 h-[2px] ${
                  t.theme === 'local' ? 'bg-olive' : 'bg-sky-blue'
                } origin-left`}
              />

              <div className="relative p-8 md:p-10">
                <p className={`text-[9px] uppercase tracking-[0.25em] mb-3 ${
                  active === i
                    ? (t.theme === 'signature' ? 'text-quartz/35' : 'text-olive/50')
                    : 'text-ink/20'
                }`}>{t.meta}</p>

                <h3 className={`text-[11px] uppercase tracking-[0.18em] font-medium mb-4 transition-colors ${
                  active === i ? (t.theme === 'signature' ? 'text-quartz/70' : t.accentText) : 'text-ink/40'
                }`}>{t.label}</h3>

                <p className={`font-serif text-[20px] md:text-[24px] leading-[1.2] font-light mb-6 transition-all duration-400 ${
                  active === i ? (t.theme === 'signature' ? 'text-quartz' : 'text-ink') : 'text-ink/60'
                }`}>{t.headline}</p>

                <div className="space-y-2.5">
                  {t.focus.map((item, j) => (
                    <motion.div
                      key={item}
                      initial={false}
                      animate={{ opacity: active === i ? 1 : 0.4, x: active === i ? 0 : -4 }}
                      transition={{ delay: j * 0.05, duration: 0.3 }}
                      className="flex items-center gap-2.5"
                    >
                      <motion.div
                        animate={{ scaleX: active === i ? 1 : 0 }}
                        transition={{ delay: j * 0.05, duration: 0.3 }}
                        className={`h-[1px] w-4 origin-left ${
                          t.theme === 'signature' ? 'bg-quartz/20' : 'bg-olive/25'
                        }`}
                      />
                      <p className={`text-[13px] font-light ${
                        active === i ? (t.theme === 'signature' ? 'text-quartz/55' : 'text-ink/55') : 'text-ink/30'
                      }`}>{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}