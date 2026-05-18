import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/lib/useScrollReveal';
import { useI18n } from '@/i18n';

export default function MethodSpine() {
  const { t, raw } = useI18n();
  const steps = raw('method.steps') || [];
  const [activeStep, setActiveStep] = useState(0);
  const [ref, visible] = useScrollReveal(0.08);

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
      <div className="lg:col-span-5 relative">
        <motion.div
          initial={{ scaleY: 0 }}
          animate={visible ? { scaleY: 1 } : {}}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-[11px] top-0 bottom-0 w-[1px] bg-olive/12 origin-top"
        />

        <div className="space-y-0">
          {steps.map((step, i) => (
            <motion.button
              key={step.number}
              type="button"
              initial={{ opacity: 0, x: -16 }}
              animate={visible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setActiveStep(i)}
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
                activeStep === i ? 'text-olive/60' : 'text-olive/25'
              }`}>{step.number}</p>

              <h3 className={`font-serif text-[20px] md:text-[24px] font-light transition-all duration-300 ${
                activeStep === i ? 'text-ink translate-x-1' : 'text-ink/50'
              }`}>{step.title}</h3>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-7 flex items-start pt-4">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-olive/40 mb-4">
            {t('process.stepOf')} {steps[activeStep]?.number} / 05
          </p>
          <h4 className="font-serif text-[32px] md:text-[42px] leading-[1.1] font-light text-ink mb-5">
            {steps[activeStep]?.title}
          </h4>

          <motion.div
            key={`seam-${activeStep}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-[1px] bg-olive/15 origin-left w-24 mb-6"
          />

          <p className="text-[16px] md:text-[17px] text-ink/55 font-light leading-relaxed mb-6">
            {steps[activeStep]?.description}
          </p>

          <div className={`p-5 rounded-sm ${activeStep === steps.length - 1 ? 'bg-deep-green/6 border border-terracotta/10' : 'bg-sand/40'}`}>
            <p className="text-[12px] text-ink/40 font-light leading-relaxed">
              {steps[activeStep]?.detail}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
