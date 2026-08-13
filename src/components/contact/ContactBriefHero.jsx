import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useI18n } from '@/i18n';
import { useMaxWidth } from '@/lib/useMaxWidth';

const EASE = [0.22, 1, 0.36, 1];
const MARK_KEYS = ['local', 'brand', 'saas', 'signature', 'freelance'];

export default function ContactBriefHero() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const isMobile = useMaxWidth(767);
  const motionOff = reduced || isMobile;

  return (
    <section className="contact-brief-hero relative overflow-x-hidden bg-sand border-b border-olive/12">
      <div className="brief-room-hero-grain absolute inset-0 pointer-events-none opacity-[0.04]" aria-hidden />

      {!isMobile && (
        <>
          <motion.div
            className="contact-brief-hero-plane absolute -left-[8%] top-[12%] w-[62%] h-[48%] pointer-events-none"
            style={{
              background: 'linear-gradient(128deg, #F6F3ED 0%, #E8DFC9 55%, transparent 100%)',
              transform: 'rotate(-11deg)',
            }}
            initial={motionOff ? false : { opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, ease: EASE }}
            aria-hidden
          />
          <motion.div
            className="contact-brief-hero-plane absolute -right-[12%] bottom-[8%] w-[58%] h-[42%] pointer-events-none"
            style={{
              background: 'linear-gradient(115deg, transparent 0%, hsl(82 18% 42% / 0.14) 40%, #1F3D33 88%)',
              transform: 'rotate(9deg)',
            }}
            initial={motionOff ? false : { opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.15, delay: 0.12, ease: EASE }}
            aria-hidden
          />
        </>
      )}
      {isMobile && (
        <div
          className="contact-brief-hero-mobile-wash absolute inset-0 pointer-events-none"
          aria-hidden
        />
      )}

      <div className="relative max-w-[min(1800px,100%)] mx-auto px-5 sm:px-6 md:px-12 lg:px-16 pt-24 sm:pt-28 md:pt-36 pb-12 md:pb-20 min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-end">
          <div className="lg:col-span-7 xl:col-span-7 z-10 min-w-0">
            <motion.p
              initial={motionOff ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              className="text-[10px] uppercase tracking-[0.28em] sm:tracking-[0.3em] text-olive mb-5 md:mb-8"
            >
              {t('contact.label')} · {t('contact.heroRoom')}
            </motion.p>

            <motion.h1
              className="contact-brief-hero-title font-serif font-light text-ink tracking-tight text-[clamp(1.75rem,8.2vw,3.65rem)] max-w-full"
              initial={motionOff ? false : { clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: motionOff ? 0 : 1, delay: motionOff ? 0 : 0.18, ease: EASE }}
            >
              {t('contact.heroTitle')}
            </motion.h1>

            <motion.p
              initial={motionOff ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: motionOff ? 0 : 0.42, ease: EASE }}
              className="mt-5 md:mt-8 text-[15px] md:text-[16px] text-ink/85 font-light leading-[1.55] md:leading-relaxed max-w-xl"
            >
              {t('contact.heroSub')}
            </motion.p>

            <svg
              className="mt-8 md:mt-10 w-full max-w-md h-3 text-olive/50"
              viewBox="0 0 320 8"
              preserveAspectRatio="none"
              aria-hidden
            >
              <motion.line
                x1="0"
                y1="4"
                x2="320"
                y2="4"
                stroke="currentColor"
                strokeWidth="1.25"
                initial={motionOff ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: motionOff ? 0 : 1.25, delay: motionOff ? 0 : 0.55, ease: EASE }}
              />
            </svg>
          </div>

          <motion.div
            className="lg:col-span-5 xl:col-span-5 relative min-h-[200px] sm:min-h-[240px] md:min-h-[300px] hidden sm:block"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
            aria-hidden
          >
            <BriefTableMotif reduced={reduced} marks={MARK_KEYS.map((k) => t(`contact.themeStrip.${k}`))} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BriefTableMotif({ reduced, marks }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg className="w-full h-full max-h-[300px]" viewBox="0 0 400 280" fill="none" aria-hidden>
        <rect x="24" y="32" width="352" height="216" rx="2" stroke="#3F5A4F" strokeWidth="0.6" opacity="0.2" />
        {[0, 1, 2, 3].map((i) => (
          <line
            key={`h-${i}`}
            x1="40"
            y1={72 + i * 44}
            x2="360"
            y2={72 + i * 44}
            stroke="#3F5A4F"
            strokeWidth="0.35"
            opacity={0.12 + i * 0.04}
          />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={`v-${i}`}
            x1={72 + i * 64}
            y1="48"
            x2={72 + i * 64}
            y2="232"
            stroke="#3F5A4F"
            strokeWidth="0.3"
            opacity="0.1"
          />
        ))}
        <motion.line
          x1="200"
          y1="40"
          x2="200"
          y2="240"
          stroke="#3F5A4F"
          strokeWidth="0.8"
          opacity="0.35"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, delay: 0.65, ease: EASE }}
        />
        <rect x="328" y="48" width="8" height="184" fill="#1F3D33" opacity="0.55" rx="1" />
        {marks.map((label, i) => (
          <g key={label} transform={`translate(${42 + i * 78}, 248)`}>
            <circle cx="0" cy="0" r="2.5" fill="#3F5A4F" opacity={0.25 + i * 0.15} />
            <text
              x="0"
              y="14"
              textAnchor="middle"
              fill="#1F3D33"
              opacity={0.45 + i * 0.12}
              fontSize="7"
              fontFamily="system-ui, sans-serif"
              letterSpacing="0.12em"
            >
              {label.toUpperCase()}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
