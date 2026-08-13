import React, { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useScrollReveal } from '@/lib/useScrollReveal';
import { useI18n } from '@/i18n';

export default function MethodSpine() {
  const { t, raw } = useI18n();
  const steps = raw('method.steps') || [];
  const [activeStep, setActiveStep] = useState(0);
  const [headerRef, headerVisible] = useScrollReveal(0.08);
  const stepRefs = useRef([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !steps.length) return undefined;

    const observers = stepRefs.current.map((el, index) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveStep(index);
        },
        { rootMargin: '-35% 0px -45% 0px', threshold: 0.1 },
      );
      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, [steps.length, reduced]);

  const progress = steps.length > 1 ? activeStep / (steps.length - 1) : 0;

  return (
    <motion.div ref={headerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
      <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start relative">
        <motion.div
          initial={{ scaleY: 0 }}
          animate={headerVisible ? { scaleY: 1 } : {}}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-[11px] top-0 bottom-0 w-[1px] bg-olive/12 origin-top"
        />
        <motion.div
          className="absolute left-[11px] top-0 w-[1px] bg-olive/35 origin-top"
          style={{ height: `${Math.max(8, progress * 100)}%` }}
          transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="space-y-0">
          {steps.map((step, i) => (
            <button
              key={step.number}
              type="button"
              onClick={() => {
                stepRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setActiveStep(i);
              }}
              className={`group relative w-full text-left pl-8 py-5 transition-all duration-300 ${
                activeStep === i ? '' : 'hover:bg-sand/20'
              }`}
            >
              <motion.div
                className={`absolute left-1.5 top-6 w-[9px] h-[9px] rounded-full border transition-all duration-300 ${
                  activeStep === i
                    ? (i === steps.length - 1 ? 'border-terracotta bg-terracotta/60' : 'border-olive bg-olive/40')
                    : 'border-olive/25 bg-transparent'
                }`}
              />

              <p className={`text-[9px] tracking-[0.3em] uppercase mb-1 ${
                activeStep === i ? 'text-olive/70' : 'text-olive/25'
              }`}>{step.number}</p>

              <h3 className={`font-serif text-[20px] md:text-[24px] font-light transition-all duration-300 ${
                activeStep === i ? 'text-ink translate-x-1' : 'text-ink/45'
              }`}>{step.title}</h3>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-7 space-y-0">
        {steps.map((step, i) => (
          <article
            key={step.number}
            ref={(el) => { stepRefs.current[i] = el; }}
            className="min-h-[42vh] lg:min-h-[48vh] flex flex-col justify-center py-8 lg:py-10 scroll-mt-28"
          >
            <p className="text-eyebrow mb-4">
              {t('process.stepOf')} {step.number} / {String(steps.length).padStart(2, '0')}
            </p>
            <h4 className={`font-serif text-[28px] md:text-[38px] leading-[1.1] font-light mb-4 transition-colors duration-300 ${
              activeStep === i ? 'text-ink' : 'text-muted'
            }`}>
              {step.title}
            </h4>

            <motion.div
              className="h-[1px] bg-olive/15 origin-left mb-6"
              animate={{ scaleX: activeStep === i ? 1 : 0.35, width: activeStep === i ? 96 : 64 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />

            <p className="text-[15px] md:text-[16px] text-muted font-light leading-relaxed mb-4 max-w-xl">
              {step.description}
            </p>

            {step.action && (
              <p className="text-[11px] uppercase tracking-[0.18em] text-olive font-medium mb-4">
                → {step.action}
              </p>
            )}

            <div
              className={`p-4 max-w-xl border ${
                i === steps.length - 1 ? 'bg-deep-green/5 border-terracotta/15' : 'bg-sand/50 border-olive/12'
              }`}
            >
              <p className="text-[13px] text-caption font-light leading-relaxed m-0">{step.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </motion.div>
  );
}
