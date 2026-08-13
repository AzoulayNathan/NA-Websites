import React from 'react';
import { motion } from 'framer-motion';
import { SHOWROOM_SLUG } from '@/lib/projects';
import { getWorkCategoryUi } from '@/lib/themeTokens';
import { useI18n } from '@/i18n';

const ORDER = [
  SHOWROOM_SLUG,
  'local-business',
  'product-brand',
  'saas-web-app',
  'signature-concept',
];

const TERRITORY_KEY = {
  [SHOWROOM_SLUG]: 'showroom',
  'local-business': 'artisans',
  'product-brand': 'brand',
  'saas-web-app': 'saas',
  'signature-concept': 'signature',
};

function territoryTitle(slug, t) {
  if (slug === SHOWROOM_SLUG) return t('work.showroom');
  return t(`categories.${slug}`);
}

export default function WorkTerritorySwitcher({ active, onSelect }) {
  const { t } = useI18n();

  return (
    <div className="work-territory-panel relative">
      <div className="flex items-baseline justify-between gap-4 mb-5 px-0.5">
        <p className="text-[11px] uppercase tracking-[0.22em] text-deep-green font-medium m-0">
          {t('work.territoryLabel')}
        </p>
        <span className="hidden sm:block text-[10px] uppercase tracking-[0.18em] text-olive">
          {t('work.territoryHint')}
        </span>
      </div>

      <div
        className="work-territory-rail flex gap-0 overflow-x-auto pb-2 -mx-0.5 snap-x snap-mandatory scrollbar-thin"
        role="tablist"
        aria-label={t('work.territoryLabel')}
      >
        {ORDER.map((slug) => {
          const isActive = active === slug;
          const ui = getWorkCategoryUi(slug);
          const isShowroom = slug === SHOWROOM_SLUG;
          const isArtisans = slug === 'local-business';
          const title = territoryTitle(slug, t);
          const metaKey =
            slug === SHOWROOM_SLUG
              ? 'work.showroomMeta'
              : `categoriesMeta.${slug}`;

          return (
            <button
              key={slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              data-territory={TERRITORY_KEY[slug]}
              onClick={() => onSelect(slug)}
              className={`work-territory-segment group relative flex-shrink-0 snap-start text-left border border-olive/25 transition-all duration-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive ${
                isShowroom ? 'min-w-[200px] lg:flex-[1.2]' : 'min-w-[168px] lg:flex-1'
              } ${isArtisans ? 'min-w-[200px] lg:flex-[1.05]' : ''} ${
                isActive ? 'z-20 shadow-lg border-olive/40' : 'z-10 border-olive/20 hover:border-olive/35'
              }`}
              style={{
                backgroundColor: isActive ? ui.activeBg : ui.idleBg,
                transform: 'skewX(-4deg)',
              }}
            >
              <span className="block skew-x-[4deg] px-5 py-6 md:py-8 md:px-6">
                {isActive && (
                  <motion.div
                    layoutId="work-territory-seam"
                    className={`absolute top-0 left-0 right-0 h-[3px] ${ui.accentBar}`}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                <span className="work-territory-motif pointer-events-none" aria-hidden />
                <p className="text-[10px] uppercase tracking-[0.2em] text-ink mb-2 font-medium">
                  {t(metaKey)}
                </p>
                <p
                  className={`text-[13px] md:text-[14px] uppercase tracking-[0.12em] leading-snug font-medium ${
                    isActive ? 'text-ink' : 'text-deep-green'
                  }`}
                >
                  {title}
                </p>

              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
