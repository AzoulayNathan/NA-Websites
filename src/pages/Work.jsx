import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, SHOWROOM_SLUG, enrichProjects } from '@/lib/projects';
import { useI18n } from '@/i18n';
import RevealText from '../components/shared/RevealText';
import StudioCTA from '../components/shared/StudioCTA';
import CategorySwitcher from '../components/work/CategorySwitcher';
import ProjectStage from '../components/work/ProjectStage';
import ProjectArchiveRow from '../components/work/ProjectArchiveRow';

const heroBg = {
  showroom: '#F6F3ED',
  'local-business': '#F6F3ED',
  'product-brand': '#F6F3ED',
  'saas-web-app': '#F6F3ED',
  'signature-concept': '#1F3D33',
};

function sortByNumber(a, b) {
  return parseInt(a.number, 10) - parseInt(b.number, 10);
}

export default function Work() {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState(SHOWROOM_SLUG);

  const activeMeta = useMemo(() => {
    if (activeCategory === SHOWROOM_SLUG) return t('work.showroomMeta');
    const map = {
      'local-business': 'categoriesMeta.local-business',
      'product-brand': 'categoriesMeta.product-brand',
      'saas-web-app': 'categoriesMeta.saas-web-app',
      'signature-concept': 'categoriesMeta.signature-concept',
    };
    return t(map[activeCategory] || 'work.showroomMeta');
  }, [activeCategory, t]);

  const enriched = useMemo(() => enrichProjects(projects), []);

  const allCategoryProjects = useMemo(() => {
    if (activeCategory === SHOWROOM_SLUG) return [...enriched].sort(sortByNumber);
    return enriched.filter((p) => p.categorySlug === activeCategory).sort(sortByNumber);
  }, [activeCategory, enriched]);

  const isDark = activeCategory === 'signature-concept';
  const isSaas = activeCategory === 'saas-web-app';

  return (
    <motion.div
      animate={{ backgroundColor: heroBg[activeCategory] }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen"
    >
      <section className="pt-32 md:pt-40 pb-14 max-w-[1400px] mx-auto px-6 md:px-10">
        <RevealText as="p" className={`text-[10px] uppercase tracking-[0.3em] mb-4 ${isDark ? 'text-quartz/30' : 'text-olive/45'}`}>
          {t('work.label')}
        </RevealText>
        <RevealText as="h1" delay={0.1} className={`font-serif text-[40px] md:text-[64px] lg:text-[72px] leading-[1.05] font-light ${isDark ? 'text-quartz' : 'text-ink'}`}>
          {t('work.title')}
        </RevealText>
        <RevealText as="p" delay={0.2} className={`mt-4 text-[15px] font-light max-w-md ${isDark ? 'text-quartz/40' : 'text-ink/40'}`}>
          {t('work.sub')}
        </RevealText>

        <AnimatePresence mode="wait">
          <motion.p
            key={activeCategory}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.4 }}
            className={`text-[10px] tracking-[0.2em] uppercase mt-6 ${isDark ? 'text-quartz/25' : isSaas ? 'text-sky-blue/50' : 'text-olive/40'}`}
          >
            {activeMeta}
          </motion.p>
        </AnimatePresence>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className={`h-px ${isDark ? 'bg-quartz/8' : 'bg-olive/10'} origin-left mt-8`}
        />
      </section>

      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mb-14">
        <CategorySwitcher active={activeCategory} onSelect={setActiveCategory} />
      </section>

      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mb-20">
        <ProjectStage categorySlug={activeCategory} />
      </section>

      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-24">
        <div className="flex items-center gap-4 mb-6">
          <p className={`text-[10px] uppercase tracking-[0.25em] ${isDark ? 'text-quartz/25' : 'text-olive/35'}`}>
            {activeCategory === SHOWROOM_SLUG ? t('work.showroom') : t(`categories.${activeCategory}`)} — {t('work.index')}
          </p>
          <div className={`h-px flex-1 ${isDark ? 'bg-quartz/6' : 'bg-olive/8'}`} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeCategory}>
            {allCategoryProjects.map((project, i) => (
              <ProjectArchiveRow key={project.slug} project={project} index={i} />
            ))}
            <div className={`border-t ${isDark ? 'border-quartz/6' : 'border-olive/8'}`} />
          </motion.div>
        </AnimatePresence>
      </section>

      <section className={`py-20 md:py-28 border-t ${isDark ? 'bg-ink/20 border-quartz/6' : 'bg-sand/40 border-olive/6'}`}>
        <div className="max-w-[900px] mx-auto px-6 md:px-10 text-center">
          <RevealText as="h2" className={`font-serif text-[28px] md:text-[44px] leading-[1.1] font-light ${isDark ? 'text-quartz' : 'text-ink'}`}>
            {t('work.ctaTitle')}
          </RevealText>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-8">
            <StudioCTA to="/contact" variant={isDark ? 'dark' : 'primary'}>
              {t('work.cta')}
            </StudioCTA>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
