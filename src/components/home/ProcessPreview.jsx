import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/lib/useScrollReveal';
import RevealText from '../shared/RevealText';
import StudioCTA from '../shared/StudioCTA';

const steps = ['Understand', 'Structure', 'Design', 'Build', 'Refine'];

export default function ProcessPreview() {
  const [ref, visible] = useScrollReveal(0.15);

  return (
    <section className="py-20 md:py-28 bg-sand/25 border-t border-olive/6">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Label */}
          <div className="md:col-span-3">
            <RevealText as="h2" className="font-serif text-[22px] md:text-[28px] leading-[1.2] font-light text-ink">
              From rough idea to sharp web presence.
            </RevealText>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-6"
            >
              <StudioCTA to="/process" variant="secondary">See the process</StudioCTA>
            </motion.div>
          </div>

          {/* Step strip */}
          <div ref={ref} className="md:col-span-9 relative">
            {/* Horizontal line draw — words appear as line passes them */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={visible ? { scaleX: 1 } : {}}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-3 left-0 right-0 h-[1px] bg-olive/15 origin-left"
            />

            <div className="grid grid-cols-5 gap-0">
              {steps.map((step, i) => {
                const isLast = i === steps.length - 1;
                return (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.25 + i * 0.18, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="relative pt-8 pr-4"
                  >
                    {/* Dot — terracotta for last */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={visible ? { scale: 1 } : {}}
                      transition={{ delay: 0.35 + i * 0.18, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className={`absolute top-[9px] left-0 w-[7px] h-[7px] rounded-full border ${
                        isLast
                          ? 'border-terracotta bg-terracotta'
                          : 'border-olive/30 bg-transparent'
                      }`}
                    />
                    <p className="text-[9px] text-olive/35 tracking-[0.25em] uppercase mb-1">
                      0{i + 1}
                    </p>
                    <p className="font-serif text-[16px] md:text-[18px] font-light text-ink/70">
                      {step}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}