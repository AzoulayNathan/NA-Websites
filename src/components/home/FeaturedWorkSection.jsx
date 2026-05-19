import React from 'react';
import { motion } from 'framer-motion';
import { getProject, enrichProject } from '@/lib/projects';
import { useI18n, useProjectText } from '@/i18n';
import { useScrollReveal } from '@/lib/useScrollReveal';
import { usePreview } from '@/lib/PreviewContext';
import RevealText from '../shared/RevealText';
import ProjectVisualFrame from '../shared/ProjectVisualFrame';
import StudioCTA from '../shared/StudioCTA';

function FeatureBlock({ slug, layout = 'default' }) {
  const project = enrichProject(getProject(slug));
  const stub = { slug, translationKey: slug, categorySlug: 'local-business', category: '', shortPitch: '', microLine: '' };
  const copy = useProjectText(project || stub);
  const { openPreview } = usePreview();
  const { t } = useI18n();
  const [ref, visible] = useScrollReveal(0.08);
  if (!project) return null;

  const isDark = project.theme === 'signature';
  const isLarge = layout === 'large';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => openPreview(project)}
      onKeyDown={(e) => e.key === 'Enter' && openPreview(project)}
      role="button"
      tabIndex={0}
      className={`group cursor-pointer overflow-hidden rounded-sm ${
        isDark ? 'bg-deep-green' : 'bg-sand/40'
      } ${isLarge ? 'min-h-[360px]' : 'min-h-[260px]'}`}
    >
      <motion.div className={`grid ${isLarge ? 'md:grid-cols-12' : 'grid-cols-1'} min-h-inherit`}>
        <motion.div className={`${isLarge ? 'md:col-span-7' : ''} relative min-h-[200px]`}>
          <ProjectVisualFrame project={project} className="w-full h-full min-h-[200px]" />
        </motion.div>
        <motion.div className={`${isLarge ? 'md:col-span-5' : ''} p-8 md:p-10 flex flex-col justify-between`}>
          <motion.div>
            <p className={`text-[9px] uppercase tracking-[0.2em] mb-4 ${isDark ? 'text-quartz/35' : 'text-olive/45'}`}>
              {copy.category}
            </p>
            <h3 className={`font-serif leading-[1.08] font-light mb-3 ${isLarge ? 'text-[32px] md:text-[42px]' : 'text-[26px]'} ${isDark ? 'text-quartz' : 'text-ink'}`}>
              {project.title}
            </h3>
            <p className={`text-[14px] font-light ${isDark ? 'text-quartz/45' : 'text-ink/45'}`}>{copy.microLine}</p>
          </motion.div>
          <span className={`text-[10px] uppercase tracking-[0.15em] mt-6 ${isDark ? 'text-sky-blue/50' : 'text-olive/55'}`}>
            {t('featured.viewVisual')} →
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function FeaturedWorkSection() {
  const { t } = useI18n();

  return (
    <section className="py-24 md:py-36 bg-quartz/50">
      <motion.div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <RevealText as="p" className="text-[10px] uppercase tracking-[0.25em] text-olive/40 mb-3">
          {t('featured.label')}
        </RevealText>
        <RevealText as="h2" delay={0.08} className="font-serif text-[30px] md:text-[48px] leading-[1.1] font-light text-ink mb-14">
          {t('featured.title')}
        </RevealText>

        <motion.div className="space-y-5">
          <FeatureBlock slug="dropdrop" layout="large" />
          <FeatureBlock slug="plumber-template-01" layout="large" />
          <motion.div className="grid md:grid-cols-2 gap-5">
            <FeatureBlock slug="volta-mare-energy" />
            <FeatureBlock slug="dreams" />
          </motion.div>
          <FeatureBlock slug="patch-your-path" />
        </motion.div>

        <motion.div className="mt-12 flex justify-end">
          <StudioCTA to="/work" variant="secondary">{t('featured.cta')}</StudioCTA>
        </motion.div>
      </motion.div>
    </section>
  );
}
