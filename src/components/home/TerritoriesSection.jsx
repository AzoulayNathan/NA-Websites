import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/lib/useScrollReveal';
import RevealText from '../shared/RevealText';
import { useI18n } from '@/i18n';

const TERRITORY_KEYS = ['local', 'brand', 'saas', 'signature'];

const territoryStyle = {
  local: {
    mood: 'local',
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
      </svg>
    ),
  },
  brand: {
    mood: 'brand',
    bg: '#F6F3ED',
    textDark: true,
    accentBar: '#C4A574',
    MicroAnim: () => (
      <svg className="absolute bottom-6 left-6 right-6 h-14 pointer-events-none" viewBox="0 0 200 56" preserveAspectRatio="none">
        <motion.rect x="30" y="28" width="48" height="20" rx="2" fill="none" stroke="#C4A574" strokeWidth="0.7" opacity="0.45"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.circle cx="130" cy="36" r="14" fill="none" stroke="#C4A574" strokeWidth="0.6" opacity="0.35"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        />
      </svg>
    ),
  },
  saas: {
    mood: 'saas',
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
      </svg>
    ),
  },
  signature: {
    mood: 'signature',
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
      </svg>
    ),
  },
};

function gridColumns(activeIndex) {
  if (activeIndex === null) return '1.05fr 1fr 0.95fr 1fr';
  const cols = ['1fr', '1fr', '1fr', '1fr'];
  cols[activeIndex] = '1.22fr';
  return cols.join(' ');
}

export default function TerritoriesSection() {
  const { t } = useI18n();
  const [activeIndex, setActiveIndex] = useState(null);
  const [ref, visible] = useScrollReveal(0.1);

  const territories = TERRITORY_KEYS.map((key, i) => ({
    number: `0${i + 1}`,
    key,
    ...territoryStyle[key],
    title: t(`territories.${key}.title`),
    headline: t(`territories.${key}.headline`),
    line: t(`territories.${key}.line`),
    meta: t(`territories.${key}.meta`),
  }));

  return (
    <section className="py-24 md:py-32 bg-quartz relative overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(60%,400px)] h-[1px] bg-olive/10 origin-center"
      />

      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-24 bottom-24 w-[1px] bg-olive/6 origin-top pointer-events-none hidden md:block"
      />

      <motion.div
        initial={{ opacity: 0, x: '-100%' }}
        whileInView={{ opacity: [0, 0.25, 0], x: '200%' }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, delay: 0.5, ease: 'easeInOut' }}
        className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-sky-blue/4 to-transparent pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        whileInView={{ opacity: [0, 0.25, 0], x: '-200%' }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, delay: 0.5, ease: 'easeInOut' }}
        className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-transparent via-sky-blue/4 to-transparent pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[1400px] mx-auto px-6 md:px-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16 mb-16 md:mb-20 items-end text-center md:text-left"
        >
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <RevealText as="h2" className="font-serif text-[30px] md:text-[48px] leading-[1.1] font-light text-ink">
              {t('territories.heading1')}
            </RevealText>
            <RevealText as="h2" delay={0.08} className="font-serif text-[30px] md:text-[48px] leading-[1.1] font-light text-ink/50 italic">
              {t('territories.heading2')}
            </RevealText>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <RevealText as="p" delay={0.15} className="text-[15px] text-ink/40 font-light max-w-sm mx-auto md:mx-0">
              {t('territories.sub')}
            </RevealText>
          </motion.div>
        </motion.div>

        <div
          ref={ref}
          className="grid gap-px grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          style={{
            gridTemplateColumns: undefined,
            ...(typeof window !== 'undefined' && window.innerWidth >= 1024
              ? { gridTemplateColumns: gridColumns(activeIndex) }
              : {}),
          }}
        >
          {territories.map((ter, i) => (
            <motion.div
              key={ter.key}
              initial={{ opacity: 0, y: 24 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              className="relative overflow-hidden transition-opacity duration-400 cursor-default lg:col-span-1"
              style={{
                backgroundColor: activeIndex === i ? ter.bg : (ter.mood === 'signature' ? '#1F3D33' : '#F6F3ED'),
                opacity: activeIndex !== null && activeIndex !== i ? 0.65 : 1,
                minHeight: '200px',
              }}
            >
              {activeIndex === i && <ter.MicroAnim />}

              <motion.div
                animate={{ scaleX: activeIndex === i ? 1 : 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-0 left-0 right-0 h-[2px] origin-left"
                style={{ backgroundColor: ter.accentBar }}
              />

              <div className="relative p-8 md:p-10">
                <p className={`text-[10px] tracking-[0.3em] mb-6 ${ter.textDark ? 'text-olive/30' : 'text-quartz/25'}`}>
                  {ter.number}
                </p>

                <h3
                  className="text-[11px] uppercase tracking-[0.18em] font-medium mb-4 transition-all duration-300"
                  style={{
                    color: activeIndex === i
                      ? (ter.mood === 'signature' ? 'rgba(175,200,209,0.85)' : '#3F5A4F')
                      : (ter.textDark ? 'rgba(26,26,24,0.45)' : 'rgba(246,243,237,0.35)'),
                    transform: activeIndex === i ? 'translateX(4px)' : 'translateX(0)',
                  }}
                >
                  {ter.title}
                </h3>

                <p
                  className="font-serif text-[20px] md:text-[24px] leading-[1.2] font-light mb-4 transition-all duration-500"
                  style={{
                    color: ter.textDark ? 'rgba(26,26,24,0.82)' : 'rgba(246,243,237,0.85)',
                    transform: activeIndex === i ? 'translateX(4px)' : 'translateX(0)',
                  }}
                >
                  {ter.headline}
                </p>

                <p
                  className={`text-[13px] font-light transition-colors duration-300 ${
                    activeIndex === i
                      ? (ter.textDark ? 'text-ink/55' : 'text-quartz/55')
                      : (ter.textDark ? 'text-ink/28' : 'text-quartz/28')
                  }`}
                >
                  {ter.line}
                </p>

                <motion.div
                  className={`flex items-center gap-2 mt-8 transition-opacity duration-300 ${activeIndex === i ? 'opacity-100' : 'opacity-0'}`}
                >
                  <motion.div
                    animate={{ scaleX: activeIndex === i ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="h-[1px] w-8 origin-left"
                    style={{ backgroundColor: ter.textDark ? 'rgba(63,90,79,0.35)' : 'rgba(246,243,237,0.2)' }}
                  />
                  <span
                    className="text-[9px] uppercase tracking-[0.2em]"
                    style={{ color: ter.textDark ? 'rgba(63,90,79,0.5)' : 'rgba(175,200,209,0.5)' }}
                  >
                    {ter.meta}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
