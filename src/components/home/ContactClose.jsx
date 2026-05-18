import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/lib/useScrollReveal';
import { useI18n } from '@/i18n';

export default function ContactClose() {
  const { t } = useI18n();
  const [ref, visible] = useScrollReveal(0.15);

  return (
    <section ref={ref} className="relative py-28 md:py-44 bg-deep-green overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={visible ? { scaleX: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(70%,480px)] h-[1px] bg-quartz/10 origin-center"
      />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-sky-blue/6 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ scaleY: 0 }}
        animate={visible ? { scaleY: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-10 bottom-10 w-[1px] bg-quartz/6 origin-top"
      />

      <motion.div
        initial={{ x: '-100%', opacity: 0 }}
        animate={visible ? { x: '200%', opacity: [0, 0.3, 0] } : {}}
        transition={{ duration: 2.8, delay: 0.6, ease: 'easeInOut' }}
        className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-transparent via-sky-blue/5 to-transparent pointer-events-none"
      />

      <div className="relative max-w-[800px] mx-auto px-6 md:px-10 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-[10px] uppercase tracking-[0.3em] text-quartz/25 mb-8"
        >
          {t('contactClose.eyebrow')}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[34px] md:text-[54px] lg:text-[62px] leading-[1.08] font-light text-quartz"
        >
          {t('contactClose.title')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="mt-6 text-[15px] md:text-[16px] text-quartz/40 font-light max-w-md mx-auto leading-relaxed"
        >
          {t('contactClose.body')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8"
        >
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.15em] font-medium text-quartz"
          >
            <span className="relative">
              {t('contactClose.cta')}
              <span className="absolute -bottom-1 left-0 h-[1px] bg-sky-blue/50 w-0 group-hover:w-full transition-all duration-400 origin-left" />
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-sky-blue group-hover:translate-x-1 transition-transform duration-300" />
          </Link>

          <Link
            to="/work"
            className="text-[13px] uppercase tracking-[0.12em] text-quartz/28 hover:text-quartz/55 transition-colors duration-300"
          >
            {t('contactClose.secondary')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
