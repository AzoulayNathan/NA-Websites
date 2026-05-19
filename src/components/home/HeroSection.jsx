import React from 'react';
import { motion } from 'framer-motion';
import { getProject } from '@/lib/projects';
import { useI18n } from '@/i18n';
import StudioCTA from '../shared/StudioCTA';

const EASE = [0.22, 1, 0.36, 1];

const HERO_ITEMS = [
  { slug: 'dropdrop', role: 'dominant', labelKey: 'product-brand' },
  { slug: 'plumber-template-01', role: 'satellite', labelKey: 'local-business' },
  { slug: 'dreams', role: 'satellite', labelKey: 'signature-concept' },
  { slug: 'volta-mare-energy', role: 'satellite', labelKey: 'product-brand' },
  { slug: 'side-a-sound', role: 'satellite', labelKey: 'saas-web-app' },
];

function PreviewTile({ item, index, t }) {
  const project = getProject(item.slug);
  if (!project) return null;

  const isDark = project.theme === 'signature';
  const label = t(`heroCategory.${item.labelKey}`);

  const layout =
    item.role === 'dominant'
      ? 'relative z-10 col-span-12 md:col-span-7 md:col-start-3 md:row-span-2 min-h-[200px] md:min-h-[min(52vh,340px)] md:shadow-[0_24px_48px_-12px_rgba(31,61,51,0.12)] md:-translate-y-1'
      : index === 1
        ? 'relative z-20 col-span-6 md:col-span-4 md:col-start-1 md:row-start-1 min-h-[120px] md:min-h-[140px] md:-translate-y-3 md:translate-x-0'
        : index === 2
          ? 'relative z-20 col-span-6 md:col-span-4 md:col-start-9 md:row-start-1 min-h-[120px] md:min-h-[140px] md:-translate-y-1'
          : index === 3
            ? 'relative z-[15] col-span-6 md:col-span-4 md:col-start-1 md:row-start-2 min-h-[120px] md:min-h-[150px] md:translate-y-2'
            : 'relative z-[15] col-span-12 md:col-span-4 md:col-start-9 md:row-start-2 min-h-[120px] md:min-h-[150px] md:translate-y-4';

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: item.role === 'dominant' ? 0.72 : 0.88 + (index - 1) * 0.1,
        duration: 0.75,
        ease: EASE,
      }}
      className={`group overflow-hidden rounded-sm border ${layout} ${
        isDark ? 'border-sky-blue/12' : 'border-olive/10'
      }`}
    >
      <img
        src={project.coverImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
      />
      <div
        className={`absolute inset-0 ${
          isDark
            ? 'bg-gradient-to-t from-deep-green/92 via-deep-green/35 to-transparent'
            : 'bg-gradient-to-t from-quartz/85 via-quartz/15 to-transparent'
        }`}
      />
      <div className="absolute inset-0 pointer-events-none">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: item.role === 'dominant' ? 1.05 : 1.15 + index * 0.06, duration: 0.45 }}
          className={`absolute top-3 left-3 text-[8px] uppercase tracking-[0.22em] ${
            isDark ? 'text-sky-blue/55' : 'text-olive/55'
          }`}
        >
          {label}
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2 + index * 0.05, duration: 0.55, ease: EASE }}
          className={`absolute bottom-0 left-0 right-0 h-px origin-left ${
            isDark ? 'bg-sky-blue/25' : 'bg-olive/20'
          }`}
        />
      </div>
      <div className="absolute bottom-3 left-3 right-3">
        <p
          className={`font-serif font-light leading-tight ${
            item.role === 'dominant' ? 'text-[21px] md:text-[28px]' : 'text-[15px] md:text-[17px]'
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

      <div className="absolute left-[38%] top-[12%] bottom-[12%] w-px bg-olive/8 origin-top hidden lg:block" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 w-full pt-28 pb-16 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          <div className="lg:col-span-5 lg:pr-4">
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
              transition={{ delay: 1.2, duration: 0.65 }}
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

          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-[9px] uppercase tracking-[0.3em] text-olive/35 mb-4 hidden lg:block"
            >
              {t('hero.showroom')}
            </motion.p>

            <div className="relative lg:min-h-[420px]">
              <svg
                className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none text-olive/10"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <line x1="22" y1="18" x2="50" y2="42" stroke="currentColor" strokeWidth="0.2" />
                <line x1="78" y1="20" x2="52" y2="44" stroke="currentColor" strokeWidth="0.2" />
              </svg>

              <div className="grid grid-cols-12 grid-rows-[auto_auto] gap-2 md:gap-3 lg:gap-y-4 lg:gap-x-2 auto-rows-min">
                {HERO_ITEMS.map((item, i) => (
                  <PreviewTile key={item.slug} item={item} index={i} t={t} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
