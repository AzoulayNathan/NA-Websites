import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SESSION_KEY = 'na-websites-opening-seen';
const EASE = [0.22, 1, 0.36, 1];
const DURATION_MS = 1400;

export default function OpeningSequence() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;
    if (sessionStorage.getItem(SESSION_KEY)) return undefined;

    sessionStorage.setItem(SESSION_KEY, '1');
    setShow(true);
    const timer = setTimeout(() => setShow(false), DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="opening"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#1F3D33', pointerEvents: 'all' }}
        >
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.04,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5, ease: EASE }}
            className="absolute font-serif text-[22px] md:text-[26px] font-light tracking-[0.06em] text-white/75 select-none"
          >
            NA Websites
          </motion.p>

          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.55, ease: EASE }}
            className="absolute left-1/2 top-[14%] bottom-[14%] w-px -translate-x-1/2 origin-top"
            style={{ backgroundColor: 'rgba(246,243,237,0.16)' }}
          />

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5, ease: EASE }}
            className="absolute left-1/2 top-[14%] bottom-[14%] -translate-x-1/2 origin-center"
            style={{
              width: 'clamp(16px, 4vw, 48px)',
              background:
                'linear-gradient(90deg, transparent, rgba(232,223,201,0.14) 50%, transparent)',
            }}
          />

          <motion.div
            initial={{ x: '-120%', opacity: 0 }}
            animate={{ x: '220%', opacity: [0, 0.14, 0] }}
            transition={{ delay: 0.95, duration: 0.65, ease: 'easeInOut' }}
            className="absolute inset-y-0 left-0 w-1/3 pointer-events-none"
            style={{
              background:
                'linear-gradient(105deg, transparent 35%, rgba(246,243,237,0.08) 50%, transparent 65%)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
