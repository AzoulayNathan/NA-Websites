import React from 'react';
import { useI18n } from '@/i18n';
import RevealText from '../shared/RevealText';
import StudioCTA from '../shared/StudioCTA';
import DropdropShelfScene from './featured/DropdropShelfScene';
import BusinessPathScene from './featured/BusinessPathScene';
import VoltaMareBandScene from './featured/VoltaMareBandScene';
import DreamsGalleryScene from './featured/DreamsGalleryScene';
import QuestlineConstellationScene from './featured/QuestlineConstellationScene';

export default function FeaturedWorkSection() {
  const { t } = useI18n();

  return (
    <section className="featured-scenes py-20 md:py-28 bg-sand/30 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-12 md:mb-16">
        <RevealText as="p" className="text-eyebrow mb-3">
          {t('featured.label')}
        </RevealText>
        <RevealText as="h2" delay={0.06} className="font-serif text-[30px] md:text-[48px] leading-[1.08] font-light text-ink">
          {t('featured.title')}
        </RevealText>
        <RevealText as="p" delay={0.12} className="mt-4 text-[14px] text-ink/80 font-light max-w-lg leading-relaxed">
          {t('featured.sub')}
        </RevealText>
      </div>

      <div className="featured-scenes-stack flex flex-col gap-0 md:gap-2">
        <DropdropShelfScene />
        <BusinessPathScene />
        <VoltaMareBandScene />
        <DreamsGalleryScene />
        <QuestlineConstellationScene />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mt-14 md:mt-20 flex justify-end">
        <StudioCTA to="/work" variant="secondary">
          {t('featured.cta')}
        </StudioCTA>
      </div>
    </section>
  );
}
