import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/lib/useScrollReveal';
import RevealText from '../shared/RevealText';
import { useI18n } from '@/i18n';

const EASE = [0.22, 1, 0.36, 1];
const ROOM_KEYS = ['local', 'brand', 'saas', 'signature'];

const ROOM_HREF = {
  local: '/work?category=local-business',
  brand: '/work?category=product-brand',
  saas: '/work?category=saas-web-app',
  signature: '/work?category=signature-concept',
};

const BASE_FLEX = [1.16, 1.04, 0.9, 1.12];
const HOVER_ACTIVE = 1.48;
const HOVER_INACTIVE = 0.82;

const ROOM = {
  local: { bg: '#F6F3ED', dark: false },
  brand: { bg: '#E8DFC9', dark: false },
  saas: { bg: '#F6F3ED', dark: false },
  signature: { bg: '#1F3D33', dark: true },
};

/** Aggressive diagonal cuts — reads as rooms, not rectangles */
const CLIP_LG = [
  'polygon(0 0, 94% 0, 78% 100%, 0 100%)',
  'polygon(8% 0, 100% 0, 90% 100%, 0 100%)',
  'polygon(10% 0, 100% 0, 88% 100%, 4% 100%)',
  'polygon(12% 0, 100% 0, 100% 100%, 6% 100%)',
];

const CLIP_SM = [
  'polygon(0 0, 100% 2%, 96% 100%, 0 100%)',
  'polygon(0 3%, 100% 0, 100% 97%, 0 100%)',
  'polygon(0 3%, 100% 0, 100% 97%, 0 100%)',
  'polygon(0 5%, 100% 0, 100% 100%, 0 100%)',
];

function RoomMotif({ roomKey, revealed, hover, reduced, index }) {
  const stroke = roomKey === 'signature' ? '#AFC8D1' : '#3F5A4F';
  const lit = hover || (revealed && !reduced);
  const pathT = reduced
    ? {}
    : {
        initial: { pathLength: 0 },
        animate: { pathLength: lit ? 1 : 0.15 },
        transition: { duration: 0.75, delay: revealed ? 0.2 + index * 0.14 : 0, ease: EASE },
      };

  if (roomKey === 'local') {
    return (
      <svg className="absolute inset-x-0 bottom-0 h-[50%] pointer-events-none" viewBox="0 0 240 100" preserveAspectRatio="none" aria-hidden>
        <motion.path d="M0 62 Q60 54 120 58 Q180 62 240 56" fill="none" stroke={stroke} strokeWidth="1" opacity={hover ? 0.65 : 0.2} {...pathT} />
        <motion.path d="M0 78 L240 74" fill="none" stroke={stroke} strokeWidth="0.4" opacity={hover ? 0.4 : 0.1} {...pathT} />
        <circle cx="48" cy="58" r="3.5" fill={stroke} opacity={hover ? 0.85 : 0.28} />
      </svg>
    );
  }
  if (roomKey === 'brand') {
    return (
      <svg className="absolute inset-0 pointer-events-none" viewBox="0 0 240 140" preserveAspectRatio="none" aria-hidden>
        <motion.line x1="-20" y1="130" x2="260" y2="-12" stroke="#B5523B" strokeWidth="0.6" opacity={hover ? 0.55 : 0} {...pathT} />
        <motion.line x1="30" y1="95" x2="200" y2="20" stroke="#3F5A4F" strokeWidth="0.5" opacity={hover ? 0.4 : 0.08} {...pathT} />
      </svg>
    );
  }
  if (roomKey === 'saas') {
    const gid = `saas-g-${index}`;
    return (
      <svg className="absolute inset-0 pointer-events-none" viewBox="0 0 160 220" preserveAspectRatio="none" aria-hidden>
        <defs>
          <pattern id={gid} width="14" height="14" patternUnits="userSpaceOnUse">
            <path d="M14 0 L0 0 0 14" fill="none" stroke="#1F3D33" strokeWidth="0.45" opacity="0.35" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${gid})`} opacity={hover ? 0.25 : 0.08} />
        <motion.line x1="28" y1="110" x2="120" y2="68" stroke="#AFC8D1" strokeWidth="0.7" opacity={hover ? 0.6 : 0.2} {...pathT} />
        <circle cx="120" cy="68" r="3" fill="#AFC8D1" opacity={hover ? 0.7 : 0.25} />
        <circle cx="80" cy="88" r="2" fill="#3F5A4F" opacity={hover ? 0.5 : 0.2} />
      </svg>
    );
  }
  const gid = `sig-g-${index}`;
  return (
    <svg className="absolute inset-0 pointer-events-none" viewBox="0 0 160 240" preserveAspectRatio="none" aria-hidden>
      <defs>
        <radialGradient id={gid} cx="30%" cy="15%" r="60%">
          <stop offset="0%" stopColor="#AFC8D1" stopOpacity={hover ? 0.25 : 0.08} />
          <stop offset="100%" stopColor="#AFC8D1" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${gid})`} />
      <motion.line
        x1="80"
        y1="0"
        x2="80"
        y2="240"
        stroke="#F6F3ED"
        strokeWidth="0.8"
        opacity={hover ? 0.16 : 0.05}
        initial={reduced ? false : { scaleY: 0 }}
        animate={{ scaleY: lit ? 1 : 0.2 }}
        style={{ transformOrigin: '80px 0' }}
        transition={{ duration: 0.9, delay: revealed ? 0.25 + index * 0.12 : 0, ease: EASE }}
      />
    </svg>
  );
}

export default function TerritoriesSection() {
  const { t } = useI18n();
  const [hovered, setHovered] = useState(null);
  const [ref, inView] = useScrollReveal(0.05);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const go = () => setReduced(mq.matches);
    go();
    mq.addEventListener('change', go);
    return () => mq.removeEventListener('change', go);
  }, []);

  const flex = (i) => (hovered === null ? BASE_FLEX[i] : hovered === i ? HOVER_ACTIVE : HOVER_INACTIVE);

  return (
    <section className="territory-band relative py-20 md:py-28 bg-sand overflow-hidden w-full">
      <motion.div
        className="territory-band-wipe absolute inset-0 pointer-events-none origin-left"
        style={{ background: 'linear-gradient(105deg, transparent 0%, hsl(var(--olive) / 0.12) 45%, transparent 70%)' }}
        initial={reduced ? false : { scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.15, ease: EASE }}
        aria-hidden
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10 mb-10 md:mb-14">
        <RevealText as="h2" className="font-serif text-[28px] md:text-[44px] leading-[1.08] font-light text-ink">
          {t('territories.heading1')}
        </RevealText>
        <RevealText as="h2" delay={0.06} className="font-serif text-[28px] md:text-[44px] leading-[1.08] font-light text-deep-green italic -mt-1">
          {t('territories.heading2')}
        </RevealText>
        <RevealText as="p" delay={0.12} className="mt-5 text-[15px] text-ink font-light max-w-md leading-relaxed">
          {t('territories.sub')}
        </RevealText>
      </div>

      <div
        ref={ref}
        className="relative z-10 w-[100vw] max-w-none left-1/2 -translate-x-1/2 overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row lg:items-stretch w-full lg:min-h-[320px] lg:-skew-y-[0.6deg]">
          {ROOM_KEYS.map((key, i) => {
            const active = hovered === i;
            const dark = ROOM[key].dark;
            const show = inView || reduced;

            return (
              <motion.article
                key={key}
                initial={reduced ? false : { opacity: 0, x: -28 }}
                animate={show ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.11, duration: 0.8, ease: EASE }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`territory-room relative min-w-0 w-full transition-[flex] duration-500 ease-out lg:skew-y-[0.6deg] ${
                  i > 0 ? 'lg:-ml-[2.5%]' : ''
                } ${active ? 'z-30' : 'z-10'}`}
                style={{ flex: flex(i), backgroundColor: ROOM[key].bg }}
              >
                {i > 0 && (
                  <span
                    className="hidden lg:block absolute left-0 top-[8%] bottom-[8%] w-px bg-olive/25 z-20 pointer-events-none"
                    style={{ transform: 'skewX(-4deg)' }}
                    aria-hidden
                  />
                )}
                <div
                  className="territory-room-clip relative min-h-[220px] lg:min-h-[320px] h-full"
                  style={/** @type {React.CSSProperties & Record<string, string>} */ ({ '--clip-sm': CLIP_SM[i], '--clip-lg': CLIP_LG[i] })}
                >
                  <RoomMotif roomKey={key} revealed={show} hover={active} reduced={reduced} index={i} />
                  <div className="relative flex flex-col justify-end h-full p-8 md:p-10 lg:pr-8">
                    <Link to={ROOM_HREF[key]} className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive/50">
                      <span className={`block text-[10px] tracking-[0.28em] mb-3 ${dark ? 'text-quartz/80' : 'text-olive'}`}>
                        0{i + 1}
                      </span>
                      <h3
                        className={`text-[11px] uppercase tracking-[0.18em] font-medium mb-2 transition-transform duration-400 ${
                          dark ? 'text-sky-blue' : 'text-deep-green'
                        } ${active ? 'translate-x-2' : ''}`}
                      >
                        {t(`territories.${key}.title`)}
                      </h3>
                      <p
                        className={`font-serif text-[19px] md:text-[21px] leading-[1.24] font-light transition-transform duration-400 ${
                          dark ? 'text-quartz' : 'text-ink'
                        } ${active ? 'translate-x-2' : ''}`}
                      >
                        {t(`territories.${key}.headline`)}
                      </p>
                    </Link>

                    <div
                      className={`mt-5 transition-opacity duration-350 ${active ? 'opacity-100' : 'opacity-0 lg:opacity-0'}`}
                      aria-hidden={!active}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-px bg-olive transition-all duration-400 ${active ? 'w-12' : 'w-0'} ${dark ? '!bg-sky-blue/70' : ''}`}
                        />
                        <span className={`text-[9px] uppercase tracking-[0.2em] ${dark ? 'text-sky-blue' : 'text-olive'}`}>
                          {t(`territories.${key}.meta`)}
                        </span>
                      </div>
                      {key === 'brand' && active && (
                        <p className={`mt-2 text-[9px] uppercase tracking-[0.16em] ${dark ? 'text-quartz' : 'text-ink'}`}>
                          {t('territories.brand.tags')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
