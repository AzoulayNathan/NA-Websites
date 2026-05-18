import React from 'react';
import { motion } from 'framer-motion';
import { categories } from '@/lib/projects';
import { useI18n } from '@/i18n';

const miniTextures = {
  local: (
    <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 200 100" preserveAspectRatio="xMidYMid slice">
      <circle cx="40" cy="72" r="2.5" fill="#3F5A4F"/>
      <circle cx="110" cy="68" r="1.8" fill="#3F5A4F"/>
      <path d="M 0 72 Q 100 66 200 70" fill="none" stroke="#3F5A4F" strokeWidth="0.8"/>
    </svg>
  ),
  saas: (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="sw-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1F3D33" strokeWidth="0.3"/>
        </pattern>
      </defs>
      <rect width="200" height="100" fill="url(#sw-grid)" opacity="0.15"/>
      <rect x="30" y="30" width="60" height="35" rx="1" fill="none" stroke="#AFC8D1" strokeWidth="0.5" opacity="0.4"/>
    </svg>
  ),
  brand: (
    <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 200 100" preserveAspectRatio="xMidYMid slice">
      <line x1="0" y1="80" x2="200" y2="40" stroke="#B5523B" strokeWidth="0.6" opacity="0.35"/>
      <rect x="24" y="28" width="90" height="44" fill="none" stroke="#3F5A4F" strokeWidth="0.5" opacity="0.4"/>
    </svg>
  ),
  signature: (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="sw-glow" cx="40%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#AFC8D1" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#AFC8D1" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="200" height="100" fill="url(#sw-glow)"/>
      <line x1="100" y1="0" x2="100" y2="100" stroke="#F6F3ED" strokeWidth="0.4" opacity="0.08"/>
    </svg>
  ),
};

export default function CategorySwitcher({ active, onSelect }) {
  const { t } = useI18n();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-olive/8">
      {categories.map((cat) => {
        const isActive = active === cat.slug;
        const isDark = cat.theme === 'signature';

        return (
          <button
            key={cat.slug}
            onClick={() => onSelect(cat.slug)}
            className={`group relative text-left py-7 md:py-10 px-6 md:px-8 transition-all duration-500 overflow-hidden ${
              isActive
                ? isDark ? 'bg-deep-green' : 'bg-sand/70'
                : isDark ? 'bg-deep-green/40 hover:bg-deep-green/60' : 'bg-quartz hover:bg-sand/40'
            }`}
            style={{ minHeight: '100px' }}
          >
            {/* Mini texture preview */}
            <div className={`absolute inset-0 transition-opacity duration-400 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}>
              {miniTextures[cat.theme]}
            </div>

            {/* Active top seam draw */}
            {isActive && (
              <motion.div
                layoutId="cat-bar"
                className={`absolute top-0 left-0 right-0 h-[2px] ${
                  cat.theme === 'saas' || cat.theme === 'signature'
                    ? 'bg-sky-blue'
                    : cat.theme === 'brand'
                      ? 'bg-terracotta'
                      : 'bg-olive'
                }`}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              />
            )}

            <p className={`relative text-[9px] uppercase tracking-[0.25em] mb-3 transition-colors ${
              isActive
                ? isDark ? 'text-quartz/35' : 'text-olive/50'
                : isDark ? 'text-quartz/20' : 'text-ink/20'
            }`}>
              {cat.meta}
            </p>

            <h3 className={`relative text-[12px] md:text-[14px] uppercase tracking-[0.18em] font-medium transition-all duration-400 ${
              isActive
                ? isDark ? 'text-quartz translate-x-1' : 'text-ink translate-x-1'
                : isDark ? 'text-quartz/35' : 'text-ink/35'
            }`}>
              {t(`categories.${cat.slug}`, cat.fullLabel)}
            </h3>

            {isActive && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                className={`relative mt-4 h-[1px] w-10 origin-left ${isDark ? 'bg-quartz/15' : 'bg-olive/25'}`}
                transition={{ duration: 0.4, delay: 0.1 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}