import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SESSION_KEY = 'na-websites-opening-seen';
const EASE = [0.22, 1, 0.36, 1];
const TOTAL_MS = 1500;

export default function OpeningSequence() {
  const [show, setShow] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [gapPx, setGapPx] = useState(40);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setReducedMotion(true);
      return undefined;
    }
    if (sessionStorage.getItem(SESSION_KEY)) return undefined;

    const narrow = window.matchMedia('(max-width: 640px)').matches;
    setGapPx(narrow ? 22 : 40);

    sessionStorage.setItem(SESSION_KEY, '1');
    setShow(true);
    const timer = setTimeout(() => setShow(false), TOTAL_MS);
    return () => clearTimeout(timer);
  }, []);

  if (reducedMotion) return null;

  const halfShift = gapPx / 2;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="opening"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#1F3D33' }}
          aria-hidden
        >
          {/* Mineral grain */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Sand / quartz light in seam (behind panels) */}
          <div
            className="absolute inset-y-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: gapPx,
              maxWidth: '48px',
              background: 'linear-gradient(180deg, #F6F3ED 0%, #E8DFC9 50%, #F6F3ED 100%)',
              opacity: 0.85,
            }}
          />

          {/* Left panel */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: -halfShift }}
            transition={{ delay: 0.6, duration: 0.45, ease: EASE }}
            className="absolute inset-y-0 left-0 w-1/2"
            style={{ backgroundColor: '#1F3D33' }}
          />
          {/* Right panel */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: halfShift }}
            transition={{ delay: 0.6, duration: 0.45, ease: EASE }}
            className="absolute inset-y-0 right-0 w-1/2"
            style={{ backgroundColor: '#1F3D33' }}
          />

          {/* Grain on panels */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.045 }}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Wordmark + seam line (centered, above panels in z-order) */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.45, ease: EASE }}
              className="font-serif font-light text-white/92 tracking-tight"
              style={{ fontSize: 'clamp(1.35rem, 4.2vw, 2rem)' }}
            >
              <span className="tracking-[0.02em]">NA</span>
              <span className="text-white/55 font-light text-[0.55em] md:text-[0.5em] uppercase tracking-[0.38em] ml-2 md:ml-3">
                Websites
              </span>
            </motion.div>

            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.35, duration: 0.4, ease: EASE }}
              className="mt-6 h-[min(28vh,200px)] w-px origin-top bg-white/18"
            />
          </div>

          {/* One soft light sweep — barely visible */}
          <motion.div
            initial={{ x: '-120%', opacity: 0 }}
            animate={{ x: '120%', opacity: [0, 0.12, 0] }}
            transition={{ delay: 0.95, duration: 0.65, ease: 'easeInOut' }}
            className="absolute inset-y-0 left-0 w-[45%] pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(246,243,237,0.06) 50%, transparent)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
