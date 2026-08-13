import React from 'react';
import { motion } from 'framer-motion';
import RevealText from '@/components/shared/RevealText';
import SeamLine from '@/components/shared/SeamLine';
import FabricationTimeline from '@/components/atelier/FabricationTimeline';
import DiagonalMethodPanels from '@/components/atelier/DiagonalMethodPanels';
import DeliverablesConstellation from '@/components/atelier/DeliverablesConstellation';
import ProcessCollaborationRoom from '@/components/process/ProcessCollaborationRoom';
import { useI18n } from '@/i18n';
import PageMeta from '@/components/shared/PageMeta';

export default function Process() {
  const { t } = useI18n();

  return (
    <div className="bg-quartz min-h-screen relative">
      <PageMeta title="Process & Freelance" description="A clear web design and front-end process, plus flexible freelance ways to work together." />
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.35] z-0"
        aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='800' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 200 Q200 180 400 200 T800 200' fill='none' stroke='%233F5A4F' stroke-width='0.6' opacity='0.2'/%3E%3C/svg%3E")`,
          backgroundSize: '120% 100%',
          animation: 'shimmer-sweep 24s linear infinite',
        }}
      />
      <section className="pt-32 md:pt-40 pb-16 md:pb-20 max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-10 md:right-20 top-32 bottom-0 w-[1px] bg-olive/8 origin-top hidden lg:block"
        />

        <RevealText as="p" className="text-eyebrow mb-4">
          {t('process.label')}
        </RevealText>
        <RevealText as="h1" delay={0.1} className="font-serif text-[42px] md:text-[68px] lg:text-[78px] leading-[1.05] font-light text-ink">
          {t('process.heroTitle1')}
        </RevealText>
        <RevealText as="p" delay={0.2} className="font-serif text-[42px] md:text-[68px] lg:text-[78px] leading-[1.05] font-light text-ink/60 italic">
          {t('process.heroTitle2')}{' '}
          <span className="text-terracotta/70">{t('process.heroTitle2Accent')}</span>.
        </RevealText>
        <RevealText as="p" delay={0.3} className="mt-6 text-[16px] md:text-[17px] text-muted font-light max-w-xl">
          {t('process.heroSub')}
        </RevealText>

        <SeamLine className="mt-14 md:mt-20" />
      </section>

      <section className="py-16 md:py-24 max-w-[1400px] mx-auto px-6 md:px-10">
        <FabricationTimeline />
      </section>

      <DiagonalMethodPanels />
      <DeliverablesConstellation />
      <ProcessCollaborationRoom />
    </div>
  );
}
