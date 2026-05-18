import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '@/lib/useScrollReveal';
import RevealText from '../shared/RevealText';
import { projects } from '@/lib/projects';

const states = [
  {
    key: 'local',
    label: 'Local',
    meta: 'TRUST / CLARITY / CONTACT',
    text: 'Make the offer obvious, the company credible and the next action easy.',
    bg: 'bg-sand',
    bgHex: '#E8DFC9',
    textColor: 'text-ink',
    mutedColor: 'text-ink/45',
    project: projects.find(p => p.slug === 'premium-local-sites'),
    accentColor: '#3F5A4F',
    seam: 'bg-olive/20',
  },
  {
    key: 'saas',
    label: 'SaaS',
    meta: 'FLOW / HIERARCHY / LOGIC',
    text: 'Make the product easier to understand, navigate and use.',
    bg: 'bg-quartz',
    bgHex: '#F6F3ED',
    textColor: 'text-ink',
    mutedColor: 'text-ink/45',
    project: projects.find(p => p.slug === 'onepager-studio'),
    accentColor: '#AFC8D1',
    seam: 'bg-sky-blue/20',
  },
  {
    key: 'signature',
    label: 'Signature',
    meta: 'ATMOSPHERE / MEMORY / IDENTITY',
    text: 'Build a visual world people remember.',
    bg: 'bg-deep-green',
    bgHex: '#1F3D33',
    textColor: 'text-quartz',
    mutedColor: 'text-quartz/45',
    project: projects.find(p => p.slug === 'dreams'),
    accentColor: '#AFC8D1',
    seam: 'bg-sky-blue/20',
  },
];

export default function AdaptiveThemeSection() {
  const [active, setActive] = useState(0);
  const current = states[active];
  const [ref, visible] = useScrollReveal(0.1);

  return (
    <section className="py-24 md:py-36 bg-quartz overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-14 items-end">
          <div>
            <RevealText as="h2" className="font-serif text-[30px] md:text-[48px] leading-[1.1] font-light text-ink">
              One studio frame.
            </RevealText>
            <RevealText as="h2" delay={0.08} className="font-serif text-[30px] md:text-[48px] leading-[1.1] font-light text-ink/50 italic">
              Different digital worlds.
            </RevealText>
          </div>
          <RevealText as="p" delay={0.15} className="text-[15px] text-ink/40 font-light">
            A plumber, a SaaS tool and a cinematic concept should not feel the same.
          </RevealText>
        </div>

        <div ref={ref}>
          {/* Studio dial selector */}
          <div className="flex gap-0 mb-10 border-t border-olive/8">
            {states.map((s, i) => (
              <button
                key={s.key}
                onClick={() => setActive(i)}
                className="relative flex-1 py-6 text-left transition-all duration-400"
              >
                {/* Active seam indicator */}
                {active === i && (
                  <motion.div
                    layoutId="dial-indicator"
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ backgroundColor: s.accentColor }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}

                <span className={`text-[11px] uppercase tracking-[0.18em] transition-all duration-300 block ${
                  active === i ? 'text-ink font-medium' : 'text-ink/28 hover:text-ink/50'
                }`}>
                  {s.label}
                </span>

                {active === i && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[9px] tracking-[0.2em] mt-1"
                    style={{ color: s.accentColor, opacity: 0.5 }}
                  >
                    {s.meta}
                  </motion.p>
                )}
              </button>
            ))}
          </div>

          {/* Preview area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className={`${current.bg} rounded-sm overflow-hidden relative`}
            >
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[320px]">
                {/* Text side */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <p className={`text-[9px] uppercase tracking-[0.3em] ${current.mutedColor} mb-5`}>
                    {current.meta}
                  </p>
                  <h3 className={`font-serif text-[26px] md:text-[38px] leading-[1.15] font-light ${current.textColor} mb-4`}>
                    {current.text}
                  </h3>
                  {/* Seam line reveal on switch */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className={`h-[1px] ${current.seam} origin-left w-20`}
                  />
                </div>

                {/* Image side with seam wipe */}
                <div className="relative overflow-hidden min-h-[200px] md:min-h-0">
                  {current.project?.coverImage && (
                    <motion.div
                      key={current.project.coverImage}
                      initial={{ clipPath: 'inset(0 100% 0 0)' }}
                      animate={{ clipPath: 'inset(0 0% 0 0)' }}
                      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full h-full"
                    >
                      <img
                        src={current.project.coverImage}
                        alt={current.project.title}
                        className="w-full h-full object-cover object-top"
                      />
                    </motion.div>
                  )}
                  {/* Vertical seam across preview */}
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className={`absolute left-1/2 top-4 bottom-4 w-[1px] ${
                      current.key === 'signature' ? 'bg-quartz/6' : 'bg-olive/6'
                    } origin-top`}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}