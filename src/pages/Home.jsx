import React from 'react';
import OpeningSequence from '../components/home/OpeningSequence';
import HeroSection from '../components/home/HeroSection';
import TerritoriesSection from '../components/home/TerritoriesSection';
import FeaturedWorkSection from '../components/home/FeaturedWorkSection';
import AdaptiveThemeSection from '../components/home/AdaptiveThemeSection';
import ProcessPreview from '../components/home/ProcessPreview';
import ContactClose from '../components/home/ContactClose';

export default function Home() {
  return (
    <>
      <OpeningSequence />
      <HeroSection />
      <TerritoriesSection />
      <FeaturedWorkSection />
      <AdaptiveThemeSection />
      <ProcessPreview />
      <ContactClose />
    </>
  );
}