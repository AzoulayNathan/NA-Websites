import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useI18n } from '@/i18n';
import { useScrollReveal } from '@/lib/useScrollReveal';

const EASE = [0.22, 1, 0.36, 1];
const LINE_DURATION = 3.2;

function stepTone(index, total) {
  if (total <= 1) return { dot: 'bg-deep-green border-deep-green', label: 'text-ink' };
  const ratio = index / (total - 1);
  if (ratio <= 0.2) return { dot: 'bg-olive/30 border-olive/35', label: 'text-ink/55' };
  if (ratio <= 0.4) return { dot: 'bg-olive/45 border-olive/50', label: 'text-ink/65' };
  if (ratio <= 0.6) return { dot: 'bg-olive/60 border-olive/65', label: 'text-ink/75' };
  if (ratio <= 0.8) return { dot: 'bg-olive/80 border-olive/85', label: 'text-ink/88' };
  return {
    dot: 'bg-deep-green border-deep-green shadow-[0_0_0_3px_hsl(var(--olive)/0.15)]',
    label: 'text-ink font-medium',
  };
}

export default function ProcessStrip() {
  const { t } = useI18n();
  const [ref, inView] = useScrollReveal(0.2);
  const reduced = useReducedMotion();
  const rawSteps = t('processPreview.steps');
  const steps = Array.isArray(rawSteps) ? rawSteps : [];
  const show = reduced || inView;
  const count = steps.length;

  return (
    <section className="process-strip py-16 md:py-20 border-t border-olive/10 bg-quartz">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <h2 className="font-serif text-[28px] md:text-[36px] font-light text-ink max-w-md">
            {t('processPreview.stripTitle')}
          </h2>
          <Link
            to="/process"
            className="text-[11px] uppercase tracking-[0.18em] text-olive font-medium hover:text-deep-green na-seam-hover"
          >
            {t('processPreview.cta')} →
          </Link>
        </div>

        <div ref={ref} className="relative pt-1 pb-2">
          {/* One shared axis: progress rail, step markers and CTA arrow all sit on the same line. */}
          <div className="relative pr-12 md:pr-14 min-h-[82px]">
            <div className="absolute left-[6px] right-0 top-[18px] h-[4px] md:h-[5px] rounded-full bg-olive/12 overflow-hidden" aria-hidden>
              <motion.div
                className="h-full w-full origin-left rounded-full bg-gradient-to-r from-olive/40 via-olive/70 to-deep-green"
                initial={reduced ? false : { scaleX: 0 }}
                animate={show ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: reduced ? 0 : LINE_DURATION, ease: EASE }}
              />
            </div>

            <ol
              className="relative grid list-none m-0 p-0"
              style={{ gridTemplateColumns: `repeat(${Math.max(count, 1)}, minmax(0, 1fr))` }}
            >
              {steps.map((label, i) => {
                const tone = stepTone(i, count);
                const reach = count > 1 ? i / (count - 1) : 0;
                const delay = reduced ? 0 : LINE_DURATION * reach * 0.88;

                return (
                  <motion.li
                    key={label}
                    className="relative flex flex-col items-center min-w-0"
                    initial={reduced ? false : { opacity: 0, y: 7 }}
                    animate={show ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay, duration: 0.5, ease: EASE }}
                  >
                    <span
                      className={`relative z-10 mt-[12px] block rounded-full border shrink-0 transition-colors duration-300 ${
                        i === count - 1 ? 'w-3.5 h-3.5 md:w-4 md:h-4' : 'w-2.5 h-2.5 md:w-3 md:h-3'
                      } ${tone.dot}`}
                      aria-hidden
                    />
                    <span className={`mt-4 text-[9px] md:text-[11px] uppercase tracking-[0.12em] md:tracking-[0.14em] text-center transition-colors duration-300 ${tone.label}`}>
                      {label}
                    </span>
                  </motion.li>
                );
              })}
            </ol>
          </div>

          <motion.div
            className="absolute right-0 top-0 z-20"
            initial={reduced ? false : { opacity: 0, x: -6 }}
            animate={show ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: reduced ? 0 : LINE_DURATION * 0.92, duration: 0.45, ease: EASE }}
          >
            <Link
              to="/process"
              aria-label={t('processPreview.cta')}
              className="group flex items-center justify-center w-10 h-10 rounded-full border border-deep-green bg-deep-green text-quartz hover:bg-sand hover:text-deep-green hover:border-sand transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive/50 shadow-[0_0_0_3px_hsl(var(--olive)/0.12)]"
            >
              <ArrowRight className="w-[18px] h-[18px] group-hover:translate-x-0.5 transition-transform duration-300" strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
