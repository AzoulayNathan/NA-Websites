import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/lib/useScrollReveal';
import RevealText from '../shared/RevealText';

const territories = [
  {
    number: '01',
    title: 'Local Business',
    headline: 'Ordinary niches, upgraded into credible digital presences.',
    line: 'Trust, clear offer, speed, contact.',
    mood: 'local',
    meta: 'TRUST / SERVICE / CONTACT',
    bg: '#E8DFC9',
    textDark: true,
    accentBar: '#3F5A4F',
    MicroAnim: () => (
      <svg className="absolute bottom-6 left-6 right-6 h-12 pointer-events-none" viewBox="0 0 200 48" preserveAspectRatio="none">
        <motion.path
          d="M 0 36 Q 50 30 100 34 Q 150 38 200 32"
          fill="none" stroke="#3F5A4F" strokeWidth="0.8" opacity="0.35"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.circle cx="40" cy="33" r="2.5" fill="#3F5A4F" opacity="0.5"
          initial={{ scale: 0 }} animate={{ scale: [0, 1.4, 1] }}
          transition={{ delay: 0.4, duration: 0.5 }}
        />
        <motion.circle cx="120" cy="35" r="1.8" fill="#3F5A4F" opacity="0.35"
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        />
        <motion.circle cx="170" cy="31" r="3" fill="none" stroke="#3F5A4F" strokeWidth="0.8" opacity="0.4"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'SaaS & Web Apps',
    headline: 'Interfaces built around use, not decoration.',
    line: 'Flow, hierarchy, product logic.',
    mood: 'saas',
    meta: 'FLOW / INTERFACE / LOGIC',
    bg: '#F6F3ED',
    textDark: true,
    accentBar: '#AFC8D1',
    MicroAnim: () => (
      <svg className="absolute bottom-4 left-6 right-6 h-16 pointer-events-none" viewBox="0 0 200 64" preserveAspectRatio="none">
        <defs>
          <pattern id="ter-grid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#1F3D33" strokeWidth="0.3"/>
          </pattern>
        </defs>
        <rect width="200" height="64" fill="url(#ter-grid)" opacity="0.12"/>
        <motion.rect x="20" y="20" width="70" height="28" rx="1" fill="none" stroke="#AFC8D1" strokeWidth="0.6" opacity="0.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <motion.circle cx="160" cy="34" r="3.5" fill="#AFC8D1" opacity="0.6"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        />
        <motion.line x1="100" y1="34" x2="156" y2="34" stroke="#AFC8D1" strokeWidth="0.5" opacity="0.3"
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          style={{ transformOrigin: '100px 34px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Signature Concepts',
    headline: 'More cinematic, more specific, more memorable.',
    line: 'Atmosphere, identity, storytelling.',
    mood: 'signature',
    meta: 'ATMOSPHERE / IDENTITY / MEMORY',
    bg: '#1F3D33',
    textDark: false,
    accentBar: '#AFC8D1',
    MicroAnim: () => (
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 260" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="sig-glow-ter" cx="30%" cy="20%" r="55%">
            <stop offset="0%" stopColor="#AFC8D1" stopOpacity="0.14"/>
            <stop offset="100%" stopColor="#AFC8D1" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <motion.rect width="200" height="260" fill="url(#sig-glow-ter)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1.0 }}
        />
        <motion.line x1="100" y1="0" x2="100" y2="260" stroke="#F6F3ED" strokeWidth="0.5" opacity="0.07"
          initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
          style={{ transformOrigin: '100px 0px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.line x1="0" y1="30" x2="60" y2="100" stroke="#AFC8D1" strokeWidth="0.6" opacity="0.25"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </svg>
    ),
  },
];

export default function TerritoriesSection() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [ref, visible] = useScrollReveal(0.1);

  return (
    <section className="py-24 md:py-32 bg-quartz relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16 mb-16 md:mb-20 items-end">
          <div>
            <RevealText as="h2" className="font-serif text-[30px] md:text-[48px] leading-[1.1] font-light text-ink">
              Three territories.
            </RevealText>
            <RevealText as="h2" delay={0.08} className="font-serif text-[30px] md:text-[48px] leading-[1.1] font-light text-ink/50 italic">
              One studio frame.
            </RevealText>
          </div>
          <RevealText as="p" delay={0.15} className="text-[15px] text-ink/40 font-light max-w-sm">
            The structure stays precise. The atmosphere adapts.
          </RevealText>
        </div>

        {/* Territory panels — unequal editorial layout */}
        <div
          ref={ref}
          className="grid gap-px"
          style={{
            gridTemplateColumns: activeIndex === 0
              ? '1.25fr 0.9fr 0.85fr'
              : activeIndex === 1
                ? '0.9fr 1.25fr 0.85fr'
                : activeIndex === 2
                  ? '0.9fr 0.85fr 1.25fr'
                  : '1.05fr 0.95fr 1fr',
            transition: 'grid-template-columns 0.55s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {territories.map((t, i) => (
            <motion.div
              key={t.number}
              initial={{ opacity: 0, y: 24 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              className="relative overflow-hidden transition-opacity duration-400 cursor-default"
              style={{
                backgroundColor: activeIndex === i ? t.bg : (t.mood === 'signature' ? '#1F3D33' : '#F6F3ED'),
                opacity: activeIndex !== null && activeIndex !== i ? 0.65 : 1,
                minHeight: '200px',
              }}
            >
              {/* Active micro-animation */}
              {activeIndex === i && <t.MicroAnim />}

              {/* Active top seam */}
              <motion.div
                animate={{ scaleX: activeIndex === i ? 1 : 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-0 left-0 right-0 h-[2px] origin-left"
                style={{ backgroundColor: t.accentBar }}
              />

              <div className="relative p-8 md:p-10">
                <p className={`text-[10px] tracking-[0.3em] mb-6 ${t.textDark ? 'text-olive/30' : 'text-quartz/25'}`}>
                  {t.number}
                </p>

                <h3
                  className={`text-[11px] uppercase tracking-[0.18em] font-medium mb-4 transition-all duration-300`}
                  style={{
                    color: activeIndex === i
                      ? (t.mood === 'signature' ? 'rgba(175,200,209,0.85)' : '#3F5A4F')
                      : (t.textDark ? 'rgba(26,26,24,0.45)' : 'rgba(246,243,237,0.35)'),
                    transform: activeIndex === i ? 'translateX(4px)' : 'translateX(0)',
                    transition: 'transform 0.35s ease, color 0.3s ease',
                  }}
                >
                  {t.title}
                </h3>

                <p
                  className="font-serif text-[22px] md:text-[27px] leading-[1.2] font-light mb-4 transition-all duration-500"
                  style={{
                    color: t.textDark ? 'rgba(26,26,24,0.82)' : 'rgba(246,243,237,0.85)',
                    transform: activeIndex === i ? 'translateX(4px)' : 'translateX(0)',
                    transition: 'transform 0.4s ease',
                  }}
                >
                  {t.headline}
                </p>

                <p
                  className={`text-[13px] font-light transition-colors duration-300 ${
                    activeIndex === i
                      ? (t.textDark ? 'text-ink/55' : 'text-quartz/55')
                      : (t.textDark ? 'text-ink/28' : 'text-quartz/28')
                  }`}
                >
                  {t.line}
                </p>

                {/* Bottom meta */}
                <div
                  className={`flex items-center gap-2 mt-8 transition-opacity duration-300 ${activeIndex === i ? 'opacity-100' : 'opacity-0'}`}
                >
                  <motion.div
                    animate={{ scaleX: activeIndex === i ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="h-[1px] w-8 origin-left"
                    style={{ backgroundColor: t.textDark ? 'rgba(63,90,79,0.35)' : 'rgba(246,243,237,0.2)' }}
                  />
                  <span
                    className="text-[9px] uppercase tracking-[0.2em]"
                    style={{ color: t.textDark ? 'rgba(63,90,79,0.5)' : 'rgba(175,200,209,0.5)' }}
                  >
                    {t.meta}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}