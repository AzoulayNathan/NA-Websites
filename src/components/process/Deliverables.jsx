import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/lib/useScrollReveal';
import RevealText from '../shared/RevealText';
import { useI18n } from '@/i18n';

export default function Deliverables() {
  const { t, raw } = useI18n();
  const deliverables = raw('deliverables.items') || [];
  const [ref, visible] = useScrollReveal(0.08);

  return (
    <section className="py-20 md:py-28 bg-sand/25 border-t border-olive/8">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4">
            <RevealText as="p" className="text-[10px] uppercase tracking-[0.25em] text-olive/40 mb-3">
              {t('process.deliverablesLabel')}
            </RevealText>
            <RevealText as="h2" delay={0.08} className="font-serif text-[26px] md:text-[36px] leading-[1.15] font-light text-ink">
              {t('process.deliverablesTitle')}
            </RevealText>
          </div>

          <div ref={ref} className="md:col-span-8 space-y-0">
            {deliverables.map((d, i) => (
              <motion.div
                key={d.item}
                initial={{ opacity: 0, x: 16 }}
                animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group flex items-start gap-4 border-t border-olive/8 py-5 hover:bg-sand/30 transition-colors duration-300 px-2"
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={visible ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="h-[1px] w-5 bg-olive/30 origin-left mt-2.5 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-light text-ink/75 group-hover:text-ink transition-colors">{d.item}</p>
                  <p className="text-[12px] text-ink/30 font-light mt-0.5">{d.detail}</p>
                </div>
                <p className="text-[9px] tracking-[0.2em] text-olive/25 flex-shrink-0 hidden md:block">0{i + 1}</p>
              </motion.div>
            ))}
            <div className="border-t border-olive/8" />
          </div>
        </div>
      </div>
    </section>
  );
}
