import React from 'react';
import { motion } from 'framer-motion';
import { getProject, categoryLabels } from '@/lib/projects';
import { useI18n } from '@/i18n';
import StudioCTA from '../shared/StudioCTA';

const EASE = [0.22, 1, 0.36, 1];

const HERO_SLUGS = [
  { slug: 'dropdrop', size: 'dominant', labelKey: 'product-brand' },
  { slug: 'plumber-template-01', size: 'sm', labelKey: 'local-business' },
  { slug: 'dreams', size: 'md', labelKey: 'signature-concept' },
  { slug: 'volta-mare-energy', size: 'md', labelKey: 'product-brand' },
  { slug: 'questline', size: 'sm', labelKey: 'saas-web-app' },
];

function PreviewTile({ item, index }) {
  const project = getProject(item.slug);
  if (!project) return null;

  const isDark = project.theme === 'signature';
  const sizeClass =
    item.size === 'dominant'
      ? 'col-span-12 row-span-2 min-h-[220px] md:min-h-[300px]'
      : item.size === 'md'
        ? 'col-span-6 md:col-span-5 min-h-[120px] md:min-h-[150px]'
        : 'col-span-6 md:col-span-4 min-h-[100px] md:min-h-[130px]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: 0.85 + (item.size === 'dominant' ? 0 : 0.12 + index * 0.08),
        duration: 0.85,
        ease: EASE,
      }}
      className={`relative overflow-hidden rounded-sm group ${sizeClass} ${
        isDark ? 'border border-sky-blue/10' : 'border border-olive/10'
      }`}
    >
      <img
        src={project.coverImage}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
      />
      <div
        className={`absolute inset-0 ${
          isDark
            ? 'bg-gradient-to-t from-deep-green/90 via-deep-green/30 to-transparent'
            : 'bg-gradient-to-t from-quartz/80 via-transparent to-transparent'
        }`}
      />
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-3 left-3 text-[8px] uppercase tracking-[0.22em] ${
            isDark ? 'text-sky-blue/55' : 'text-olive/55'
          }`}
        >
          {categoryLabels[item.labelKey]}
        </div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.4 + index * 0.06, duration: 0.6, ease: EASE }}
          className={`absolute bottom-0 left-0 right-0 h-px origin-left ${
            isDark ? 'bg-sky-blue/25' : 'bg-olive/20'
          }`}
        />
      </div>
      <div className="absolute bottom-3 left-3 right-3">
        <p
          className={`font-serif font-light leading-tight ${
            item.size === 'dominant' ? 'text-[22px] md:text-[28px]' : 'text-[15px] md:text-[17px]'
          } ${isDark ? 'text-quartz' : 'text-ink'}`}
        >
          {project.title}
        </p>
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-quartz">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
        className="absolute left-[42%] top-[10%] bottom-[10%] w-px bg-olive/10 origin-top hidden lg:block"
      />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 w-full pt-28 pb-16 lg:py-32">
        <motion.div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-5">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.55 }}
              className="text-[10px] uppercase tracking-[0.3em] text-olive/50 mb-8"
            >
              {t('hero.eyebrow')}
            </motion.p>

            {[
              ['title1', false],
              ['title2', false],
              ['title3', true],
              ['title4', true],
            ].map(([key, muted], i) => (
              <motion.div key={key} className="overflow-hidden">
                <motion.h1
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.55 + i * 0.1, duration: 0.9, ease: EASE }}
                  className={`font-serif leading-[1.05] font-light text-[40px] md:text-[58px] lg:text-[68px] ${
                    muted ? 'text-ink/50 italic' : 'text-ink'
                  }`}
                >
                  {key === 'title2' ? (
                    <>structure<span className="text-olive not-italic">.</span></>
                  ) : key === 'title4' ? (
                    <>atmosphere<span className="text-terracotta not-italic">.</span></>
                  ) : (
                    t(`hero.${key}`)
                  )}
                </motion.h1>
              </motion.div>
            ))}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.05, duration: 0.7 }}
              className="mt-8 text-[14px] md:text-[15px] text-ink/40 leading-relaxed max-w-sm font-light"
            >
              {t('hero.body')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.25, duration: 0.65 }}
              className="mt-10 flex flex-wrap items-center gap-8"
            >
              <StudioCTA to="/work" variant="primary">
                {t('hero.ctaPrimary')}
              </StudioCTA>
              <StudioCTA to="/contact" variant="secondary">
                {t('hero.ctaSecondary')}
              </StudioCTA>
            </motion.div>
          </div>

          <div className="lg:col-span-7 lg:pl-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.5 }}
              className="text-[9px] uppercase tracking-[0.3em] text-olive/35 mb-4 hidden lg:block"
            >
              {t('hero.showroom')}
            </motion.p>
            <div className="grid grid-cols-12 gap-2 md:gap-3 auto-rows-fr">
              {HERO_SLUGS.map((item, i) => (
                <PreviewTile key={item.slug} item={item} index={i} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
