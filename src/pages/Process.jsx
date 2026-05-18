import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import RevealText from '../components/shared/RevealText';
import SeamLine from '../components/shared/SeamLine';
import MethodSpine from '../components/process/MethodSpine';
import ProjectTypeEmphasis from '../components/process/ProjectTypeEmphasis';
import Deliverables from '../components/process/Deliverables';
import { useI18n } from '@/i18n';

export default function Process() {
  const { t } = useI18n();

  return (
    <div className="bg-quartz min-h-screen">
      <section className="pt-32 md:pt-40 pb-16 md:pb-20 max-w-[1400px] mx-auto px-6 md:px-10 relative">
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-10 md:right-20 top-32 bottom-0 w-[1px] bg-olive/8 origin-top hidden lg:block"
        />

        <RevealText as="p" className="text-[11px] uppercase tracking-[0.25em] text-olive/50 mb-4">
          {t('process.label')}
        </RevealText>
        <RevealText as="h1" delay={0.1} className="font-serif text-[42px] md:text-[68px] lg:text-[78px] leading-[1.05] font-light text-ink">
          {t('process.heroTitle1')}
        </RevealText>
        <RevealText as="h1" delay={0.2} className="font-serif text-[42px] md:text-[68px] lg:text-[78px] leading-[1.05] font-light text-ink/60 italic">
          {t('process.heroTitle2')}{' '}
          <span className="text-terracotta/70">{t('process.heroTitle2Accent')}</span>.
        </RevealText>
        <RevealText as="p" delay={0.3} className="mt-6 text-[16px] md:text-[17px] text-ink/45 font-light max-w-xl">
          {t('process.heroSub')}
        </RevealText>

        <SeamLine className="mt-14 md:mt-20" />
      </section>

      <section className="py-16 md:py-24 max-w-[1400px] mx-auto px-6 md:px-10">
        <MethodSpine />
      </section>

      <ProjectTypeEmphasis />
      <Deliverables />

      <section className="py-24 md:py-32 bg-deep-green">
        <div className="max-w-[900px] mx-auto px-6 md:px-10 text-center">
          <RevealText as="h2" className="font-serif text-[30px] md:text-[48px] leading-[1.1] font-light text-quartz">
            {t('process.ctaCloseTitle')}
          </RevealText>
          <RevealText as="p" delay={0.15} className="mt-5 text-[15px] text-quartz/45 font-light max-w-md mx-auto">
            {t('process.ctaCloseSub')}
          </RevealText>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.15em] font-medium text-quartz"
            >
              <span className="relative">
                {t('process.ctaClose')}
                <span className="absolute -bottom-1 left-0 h-[1px] bg-sky-blue/50 w-0 group-hover:w-full transition-all duration-400 origin-left" />
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-sky-blue group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
