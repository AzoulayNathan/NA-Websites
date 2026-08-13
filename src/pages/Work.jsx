import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { scrollToTop } from '@/components/shared/ScrollToTop';
import { motion } from 'framer-motion';
import { projects, SHOWROOM_SLUG, enrichProjects } from '@/lib/projects';
import { workHeroBg, getWorkCategoryUi } from '@/lib/themeTokens';
import WorkGalleryHero from '@/components/atelier/work/WorkGalleryHero';
import WorkTerritorySwitcher from '@/components/atelier/work/WorkTerritorySwitcher';
import WorkRoomRouter from '@/components/atelier/work/WorkRoomRouter';
import WorkProjectIndexRail from '@/components/atelier/work/WorkProjectIndexRail';
import WorkBubbleCTA from '@/components/atelier/work/WorkBubbleCTA';
import WorkFocusCursor from '@/components/atelier/work/WorkFocusCursor';
import PageMeta from '@/components/shared/PageMeta';

function sortByNumber(a, b) {
  return parseInt(a.number, 10) - parseInt(b.number, 10);
}

const VALID_CATEGORIES = new Set([
  SHOWROOM_SLUG,
  'local-business',
  'product-brand',
  'saas-web-app',
  'signature-concept',
]);

const ROOM_ATTR = {
  [SHOWROOM_SLUG]: 'showroom',
  'local-business': 'artisans',
  'product-brand': 'brand',
  'saas-web-app': 'saas',
  'signature-concept': 'signature',
};

export default function Work() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [activeCategory, setActiveCategory] = useState(() =>
    categoryParam && VALID_CATEGORIES.has(categoryParam) ? categoryParam : SHOWROOM_SLUG,
  );

  useEffect(() => {
    if (categoryParam && VALID_CATEGORIES.has(categoryParam) && categoryParam !== activeCategory) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam, activeCategory]);

  const enriched = useMemo(() => enrichProjects(projects), []);

  const indexProjects = useMemo(() => {
    if (activeCategory === SHOWROOM_SLUG) return [...enriched].sort(sortByNumber);
    return enriched.filter((p) => p.categorySlug === activeCategory).sort(sortByNumber);
  }, [activeCategory, enriched]);

  const handleCategorySelect = useCallback(
    (slug) => {
      if (slug !== activeCategory) scrollToTop();
      setActiveCategory(slug);
      const next = new URLSearchParams(searchParams);
      if (slug === SHOWROOM_SLUG) next.delete('category');
      else next.set('category', slug);
      setSearchParams(next, { replace: true });
    },
    [activeCategory, searchParams, setSearchParams],
  );

  return (
    <motion.div
      animate={{ backgroundColor: workHeroBg[activeCategory] }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen overflow-x-hidden"
      data-room={ROOM_ATTR[activeCategory]}
    >
      <PageMeta title="Work" description="Twelve selected websites, product interfaces, web apps and experimental digital experiences." />
      <WorkGalleryHero />

      <section className="relative z-10 bg-quartz/80 border-b border-olive/15 overflow-x-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-8 md:py-10">
          <WorkTerritorySwitcher active={activeCategory} onSelect={handleCategorySelect} />
        </div>
      </section>

      <WorkFocusCursor />

      <section className="max-w-[1600px] mx-auto px-6 md:px-10 mb-12 md:mb-16 work-gallery-zone work-room-path overflow-x-hidden">
        <motion.div
          key={activeCategory}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={`h-[3px] mb-8 origin-left ${getWorkCategoryUi(activeCategory).accentBar}`}
          data-work-cursor="trace"
        />
        <WorkRoomRouter categorySlug={activeCategory} onEnterTerritory={handleCategorySelect} />
      </section>

      <section className="max-w-[1600px] mx-auto px-6 md:px-10 pb-16 md:pb-20 work-gallery-zone overflow-x-hidden">
        <WorkProjectIndexRail projects={indexProjects} activeCategory={activeCategory} />
      </section>

      <WorkBubbleCTA activeCategory={activeCategory} />
    </motion.div>
  );
}
