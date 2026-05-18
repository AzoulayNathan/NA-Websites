import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SESSION_KEY = 'na-websites-opening-seen';
const EASE = [0.22, 1, 0.36, 1];
const TOTAL_MS = 1550;

export default function OpeningSequence() {
  const [show, setShow] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setReducedMotion(true);
      return undefined;
    }
    if (sessionStorage.getItem(SESSION_KEY)) return undefined;

    sessionStorage.setItem(SESSION_KEY, '1');
    setShow(true);
    const timer = setTimeout(() => setShow(false), TOTAL_MS);
    return () => clearTimeout(timer);
  }, []);

  if (reducedMotion) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="opening"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#1F3D33' }}
          aria-hidden
        >
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-[0.045]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          <motion.div
            className="relative flex flex-col items-center justify-center text-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.55, ease: EASE }}
              className="font-serif font-light text-white/90 leading-none tracking-[0.02em]"
              style={{ fontSize: 'clamp(3.25rem, 11vw, 6.5rem)' }}
            >
              NA
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
              className="mt-2 text-[11px] md:text-[13px] uppercase tracking-[0.42em] text-white/55 font-light"
            >
              Websites
            </motion.span>

            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ width: 1, height: 'clamp(5.5rem, 18vw, 9rem)' }}
            >
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ delay: 0.32, duration: 0.5, ease: EASE }}
                className="absolute inset-0 w-full origin-center"
                style={{ backgroundColor: 'rgba(246,243,237,0.22)' }}
              />
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.52, duration: 0.48, ease: EASE }}
                className="absolute inset-0 origin-center"
                style={{
                  width: 'clamp(20px, 5vw, 52px)',
                  left: '50%',
                  x: '-50%',
                  background:
                    'linear-gradient(90deg, transparent, rgba(232,223,201,0.2) 50%, transparent)',
                }}
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: [0, 0.35, 0], scaleX: [0, 1, 1] }}
            transition={{ delay: 0.88, duration: 0.7, ease: 'easeInOut' }}
            className="absolute inset-y-0 left-1/2 w-[min(42vw,520px)] -translate-x-1/2 pointer-events-none origin-center"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(246,243,237,0.09) 50%, transparent)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
