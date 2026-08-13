import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SESSION_KEY = 'na-websites-opening-seen';
const EASE = [0.22, 1, 0.36, 1];
const TOTAL_MS = 2000;
const FAILSAFE_MS = 2400;

/** @returns {number} seam aperture width in px */
function seamAperture() {
  if (typeof window === 'undefined') return 48;
  return window.innerWidth < 768 ? 28 : 52;
}

export default function OpeningSequence() {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [aperture, setAperture] = useState(52);
  const dismissedRef = useRef(false);

  const dismiss = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    setShow(false);
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* private mode */
    }
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const applyMq = () => setReducedMotion(mq.matches);
    applyMq();
    mq.addEventListener('change', applyMq);

    if (mq.matches) {
      try {
        if (sessionStorage.getItem(SESSION_KEY)) return undefined;
        if (new URLSearchParams(window.location.search).get('skipOpening') === '1') return undefined;
      } catch {
        return undefined;
      }
      dismissedRef.current = false;
      setShow(true);
      const end = window.setTimeout(dismiss, 900);
      return () => {
        mq.removeEventListener('change', applyMq);
        window.clearTimeout(end);
      };
    }

    try {
      if (sessionStorage.getItem(SESSION_KEY)) return undefined;
      if (new URLSearchParams(window.location.search).get('skipOpening') === '1') return undefined;
    } catch {
      return undefined;
    }

    setAperture(seamAperture());
    dismissedRef.current = false;
    setShow(true);
    setPhase(1);

    const t2 = window.setTimeout(() => setPhase(2), 360);
    const t3 = window.setTimeout(() => setPhase(3), 720);
    const t4 = window.setTimeout(() => setPhase(4), 1180);
    const t5 = window.setTimeout(() => setPhase(5), 1380);
    const t6 = window.setTimeout(() => setPhase(6), 1880);
    const tEnd = window.setTimeout(dismiss, TOTAL_MS);
    const failsafe = window.setTimeout(dismiss, FAILSAFE_MS);

    const onResize = () => setAperture(seamAperture());
    window.addEventListener('resize', onResize);

    return () => {
      mq.removeEventListener('change', applyMq);
      window.removeEventListener('resize', onResize);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
      window.clearTimeout(t5);
      window.clearTimeout(t6);
      window.clearTimeout(tEnd);
      window.clearTimeout(failsafe);
    };
  }, [dismiss]);

  const seamOpen = phase >= 5;
  const seamLine = phase >= 4;
  const textVisible = phase < 6;
  const half = aperture / 2;

  if (reducedMotion) {
    return (
      <AnimatePresence>
        {show && (
          <motion.div
            key="opening-reduced"
            role="presentation"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            onAnimationComplete={() => dismiss()}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-deep-green cursor-pointer opening-grain"
            onClick={dismiss}
          >
            <p className="font-serif text-[clamp(2.5rem,10vw,4.5rem)] font-light text-quartz tracking-tight leading-none">
              NA
            </p>
            <p className="mt-3 font-sans text-[clamp(0.7rem,2.2vw,0.95rem)] font-medium uppercase tracking-[0.28em] text-quartz/90">
              Websites
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="opening-seal"
          role="presentation"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="fixed inset-0 z-[9999] overflow-hidden cursor-pointer"
          onClick={dismiss}
          onKeyDown={(e) => {
            if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') dismiss();
          }}
          tabIndex={0}
          aria-label="NA Websites"
        >
          {/* Curtains — split at viewport center (aligned with centered NA seam) */}
          <motion.div
            className="opening-grain fixed top-0 bottom-0 left-0 z-[6] bg-deep-green"
            initial={{ width: '50%' }}
            animate={{ width: seamOpen ? `calc(50% - ${half}px)` : '50%' }}
            transition={{ duration: 0.62, ease: EASE }}
          />
          <motion.div
            className="opening-grain fixed top-0 bottom-0 right-0 z-[6] bg-deep-green"
            initial={{ width: '50%' }}
            animate={{ width: seamOpen ? `calc(50% - ${half}px)` : '50%' }}
            transition={{ duration: 0.62, ease: EASE }}
          />

          {/* Soft quartz glow in the opening */}
          <motion.div
            className="pointer-events-none fixed top-0 bottom-0 z-[5]"
            style={{ left: `calc(50% - ${half}px)` }}
            initial={{ width: 1, opacity: 0 }}
            animate={{
              width: seamOpen ? aperture : seamLine ? 1 : 1,
              opacity: seamLine ? (seamOpen ? 0.85 : 0.55) : 0,
            }}
            transition={{ duration: seamOpen ? 0.62 : 0.35, ease: EASE }}
            aria-hidden
          >
            <div
              className="h-full w-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, hsl(var(--sand) / 0.35) 35%, hsl(var(--quartz) / 0.5) 50%, hsl(var(--sand) / 0.35) 65%, transparent 100%)',
                boxShadow: seamOpen ? '0 0 48px hsl(var(--quartz) / 0.25)' : '0 0 12px hsl(var(--quartz) / 0.15)',
              }}
            />
          </motion.div>

          {/* Brand seal — NA + Websites */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-[10] flex flex-col items-center justify-center px-6 text-center"
            animate={{ opacity: textVisible ? 1 : 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="flex items-baseline justify-center leading-none">
              <motion.span
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: phase >= 1 ? 1 : 0, scale: phase >= 1 ? 1 : 0.97 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="font-serif font-light text-quartz tracking-tight"
                style={{ fontSize: 'clamp(3.25rem, 12vw, 6rem)' }}
              >
                N
              </motion.span>

              <motion.span
                className="relative mx-[0.05em] flex-shrink-0 self-stretch"
                style={{ minHeight: '0.82em', width: seamLine && !seamOpen ? 1 : 0 }}
                initial={{ opacity: 0, scaleY: 0.2 }}
                animate={{
                  opacity: seamLine && !seamOpen ? 1 : 0,
                  scaleY: seamLine && !seamOpen ? 1 : 0.2,
                }}
                transition={{ duration: 0.3, ease: EASE }}
                aria-hidden
              >
                <span
                  className="absolute inset-y-[8%] left-0 w-px"
                  style={{
                    background:
                      'linear-gradient(180deg, hsl(var(--quartz) / 0.2) 0%, hsl(var(--quartz)) 50%, hsl(var(--quartz) / 0.2) 100%)',
                  }}
                />
              </motion.span>

              <motion.span
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: phase >= 1 ? 1 : 0, scale: phase >= 1 ? 1 : 0.97 }}
                transition={{ duration: 0.45, ease: EASE, delay: 0.03 }}
                className="font-serif font-light text-quartz tracking-tight"
                style={{ fontSize: 'clamp(3.25rem, 12vw, 6rem)' }}
              >
                A
              </motion.span>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 6 }}
              transition={{ duration: 0.42, ease: EASE }}
              className="mt-5 font-sans font-medium uppercase tracking-[0.3em] text-[clamp(0.72rem,2.4vw,0.92rem)] text-quartz/88"
            >
              <span className={phase >= 3 ? 'opening-shimmer-once' : ''}>Websites</span>
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
