import React from 'react';
import AtelierOpening from '@/components/atelier/AtelierOpening';
import ShowroomWall from '@/components/atelier/ShowroomWall';
import TerritoryBand from '@/components/atelier/TerritoryBand';
import FeaturedWorkScenes from '@/components/atelier/FeaturedWorkScenes';
import AdaptiveStudioFrame from '@/components/atelier/AdaptiveStudioFrame';
import ProcessStrip from '@/components/atelier/ProcessStrip';
import HomeContactClose from '@/components/atelier/HomeContactClose';
import PageMeta from '@/components/shared/PageMeta';

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <PageMeta description="Websites, front-end interfaces and web apps designed and built by Nathan Azoulay." />
      <AtelierOpening />
      <ShowroomWall />
      <TerritoryBand />
      <FeaturedWorkScenes />
      <AdaptiveStudioFrame />
      <ProcessStrip />
      <HomeContactClose />
    </div>
  );
}
