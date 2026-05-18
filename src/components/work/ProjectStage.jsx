import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectVisualFrame from '../shared/ProjectVisualFrame';
import StudioCTA from '../shared/StudioCTA';
import { usePreview } from '@/lib/PreviewContext';
import { useI18n } from '@/i18n';
import { projects } from '@/lib/projects';

// Local Business layout: 70/30 horizontal feature + slim secondary
function LocalStage({ categoryProjects }) {
  const [featured, ...rest] = categoryProjects;
  if (!featured) return null;
  return (
    <div className="space-y-4">
      {/* Main feature */}
      <motion.div
        initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
        animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
        exit={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="group relative bg-sand/60 rounded-sm overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[320px] md:min-h-[400px]">
          <div className="md:col-span-8 relative">
            <ProjectVisualFrame project={featured} className="w-full h-full min-h-[220px] md:min-h-0" />
          </div>
          <div className="md:col-span-4 p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[9px] tracking-[0.25em] text-olive/35">{featured.number}</span>
                <div className="h-[1px] flex-1 bg-olive/10" />
              </div>
              <h3 className="font-serif text-[26px] md:text-[34px] leading-[1.1] font-light text-ink mb-3 group-hover:translate-x-1 transition-transform duration-500">
                {featured.title}
              </h3>
              <p className="text-[13px] text-ink/45 font-light leading-relaxed">{featured.microLine}</p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {featured.tags.map(tag => (
                  <span key={tag} className="text-[9px] uppercase tracking-[0.1em] px-2 py-1 border border-olive/10 text-ink/25 rounded-sm">{tag}</span>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <StudioCTA to="/contact" variant="primary">Start a similar project</StudioCTA>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Secondary rows */}
      {rest.map((p, i) => (
        <motion.div
          key={p.slug}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.12 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="group relative bg-quartz/70 border border-olive/6 rounded-sm overflow-hidden grid grid-cols-12"
        >
          <div className="col-span-4 relative h-28 md:h-36">
            <ProjectVisualFrame project={p} className="w-full h-full" revealDelay={0.1} />
          </div>
          <div className="col-span-8 p-6 flex flex-col justify-center">
            <h3 className="font-serif text-[20px] font-light text-ink mb-1 group-hover:translate-x-1 transition-transform duration-400">{p.title}</h3>
            <p className="text-[12px] text-ink/40 font-light">{p.microLine}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function BrandStage({ categoryProjects }) {
  const { openPreview } = usePreview();
  const { t } = useI18n();
  const [featured, second, ...rest] = categoryProjects;
  if (!featured) return null;

  return (
    <motion.div className="space-y-4">
      <motion.div
        initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
        animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="group relative bg-sand/50 rounded-sm overflow-hidden cursor-pointer"
        onClick={() => openPreview(featured)}
      >
        <motion.div className="grid grid-cols-1 md:grid-cols-12 min-h-[340px]">
          <motion.div className="md:col-span-8 relative min-h-[220px]">
            <ProjectVisualFrame project={featured} className="w-full h-full" />
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 340" preserveAspectRatio="none">
              <line x1="-20" y1="340" x2="820" y2="0" stroke="#B5523B" strokeWidth="1" opacity="0.15" />
            </svg>
          </motion.div>
          <motion.div className="md:col-span-4 p-8 md:p-10 flex flex-col justify-between">
            <motion.div>
              <h3 className="font-serif text-[28px] md:text-[36px] font-light text-ink mb-3">{featured.title}</h3>
              <p className="text-[13px] text-ink/45 font-light">{featured.microLine}</p>
            </motion.div>
            <StudioCTA onClick={() => openPreview(featured)} variant="primary">
              {t('work.viewVisual')}
            </StudioCTA>
          </motion.div>
        </motion.div>
      </motion.div>
      {second && (
        <motion.div
          className="group grid grid-cols-12 gap-0 border border-olive/8 rounded-sm overflow-hidden cursor-pointer"
          onClick={() => openPreview(second)}
        >
          <motion.div className="col-span-5 min-h-[140px]">
            <ProjectVisualFrame project={second} className="w-full h-full" />
          </motion.div>
          <motion.div className="col-span-7 p-6 flex flex-col justify-center">
            <h3 className="font-serif text-[22px] font-light text-ink">{second.title}</h3>
            <p className="text-[12px] text-ink/40 mt-1">{second.microLine}</p>
          </motion.div>
        </motion.div>
      )}
      {rest.map((p, i) => (
        <motion.div
          key={p.slug}
          className="flex items-center gap-4 py-3 border-t border-olive/8 cursor-pointer group"
          onClick={() => openPreview(p)}
        >
          <span className="text-[9px] text-ink/25">{p.number}</span>
          <h3 className="font-serif text-[18px] font-light text-ink/75 group-hover:translate-x-1 transition-transform">
            {p.title}
          </h3>
        </motion.div>
      ))}
    </motion.div>
  );
}

// SaaS layout: asymmetric 12-col, feature 7, secondary 5, data labels
function SaasStage({ categoryProjects }) {
  const [featured, second, ...rest] = categoryProjects;
  if (!featured) return null;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Feature — 7/12 */}
        {featured && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
            animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
            exit={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-7 group bg-quartz/80 border border-olive/6 rounded-sm overflow-hidden"
          >
            <div className="relative h-52 md:h-64">
              <ProjectVisualFrame project={featured} className="w-full h-full" />
            </div>
            <div className="p-7 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[9px] tracking-[0.25em] text-ink/25">{featured.number}</span>
                <div className="h-[1px] flex-1 bg-sky-blue/15" />
                <span className="text-[9px] uppercase tracking-[0.12em] text-sky-blue/50">{featured.category}</span>
              </div>
              <h3 className="font-serif text-[24px] md:text-[30px] leading-[1.1] font-light text-ink mb-2 group-hover:translate-x-1 transition-transform duration-500">
                {featured.title}
              </h3>
              <p className="text-[13px] text-ink/40 font-light mb-5">{featured.microLine}</p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {featured.tags.map(tag => (
                  <span key={tag} className="text-[9px] uppercase tracking-[0.1em] px-2 py-1 border border-sky-blue/12 text-ink/25 rounded-sm">{tag}</span>
                ))}
              </div>
              <StudioCTA to="/contact" variant="theme">Discuss this type of project</StudioCTA>
            </div>
          </motion.div>
        )}

        {/* Secondary — 5/12, offset down */}
        {second && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5 group bg-white/50 border border-sky-blue/10 rounded-sm overflow-hidden md:mt-12"
          >
            <div className="relative h-44 md:h-52">
              <ProjectVisualFrame project={second} className="w-full h-full" revealDelay={0.15} />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[9px] tracking-[0.25em] text-ink/20">{second.number}</span>
                <div className="h-[1px] flex-1 bg-sky-blue/10" />
              </div>
              <h3 className="font-serif text-[22px] font-light text-ink mb-2 group-hover:translate-x-1 transition-transform duration-400">{second.title}</h3>
              <p className="text-[12px] text-ink/38 font-light">{second.microLine}</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Archive line for rest */}
      {rest.map((p, i) => (
        <motion.div
          key={p.slug}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
          className="group flex items-center gap-6 py-4 px-3 border-t border-sky-blue/8 hover:bg-sky-blue/4 transition-colors duration-300"
        >
          <span className="text-[9px] tracking-[0.2em] text-ink/20">{p.number}</span>
          <h3 className="font-serif text-[18px] font-light text-ink/70 group-hover:translate-x-1 transition-transform duration-300">{p.title}</h3>
          <p className="text-[12px] text-ink/30 font-light flex-1">{p.microLine}</p>
        </motion.div>
      ))}
    </div>
  );
}

// Signature layout: stacked cinematic bands
function SignatureStage({ categoryProjects }) {
  const [featured, second, ...rest] = categoryProjects;
  if (!featured) return null;
  return (
    <div className="space-y-3">
      {/* First — full-width cinematic band */}
      {featured && (
        <motion.div
          initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
          animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
          exit={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="group relative bg-deep-green rounded-sm overflow-hidden"
        >
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-blue/8 via-transparent to-transparent pointer-events-none group-hover:opacity-150 transition-opacity duration-700" />
          <div className="relative h-52 md:h-72">
            <ProjectVisualFrame project={featured} className="w-full h-full" />
            {/* Light leak */}
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: '200%', opacity: [0, 0.35, 0] }}
              transition={{ delay: 0.9, duration: 2.4, ease: 'easeInOut' }}
              className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-transparent via-sky-blue/8 to-transparent pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-green/80 via-deep-green/20 to-transparent" />
          </div>
          <div className="relative -mt-14 px-8 md:px-12 pb-10 z-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[9px] tracking-[0.25em] text-quartz/25">{featured.number}</span>
              <div className="h-[1px] flex-1 bg-quartz/8" />
              <span className="text-[9px] uppercase tracking-[0.15em] text-sky-blue/50">{featured.category}</span>
            </div>
            <h3 className="font-serif text-[32px] md:text-[48px] leading-[1.05] font-light text-quartz mb-3">
              {featured.title}
            </h3>
            <p className="text-[14px] text-quartz/40 font-light max-w-sm mb-6">{featured.microLine}</p>
            <StudioCTA to="/contact" variant="dark">Start a signature project</StudioCTA>
          </div>
        </motion.div>
      )}

      {/* Second — floating card over glow */}
      {second && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="group relative bg-deep-green/80 border border-sky-blue/8 rounded-sm overflow-hidden grid grid-cols-1 md:grid-cols-12"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-sky-blue/5 to-transparent pointer-events-none" />
          <div className="md:col-span-7 relative h-44 md:h-52">
            <ProjectVisualFrame project={second} className="w-full h-full" revealDelay={0.15} />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-deep-green/50 pointer-events-none" />
          </div>
          <div className="md:col-span-5 p-7 flex flex-col justify-center relative z-10">
            <span className="text-[9px] tracking-[0.25em] text-quartz/25 mb-2">{second.number}</span>
            <h3 className="font-serif text-[24px] md:text-[30px] leading-[1.1] font-light text-quartz mb-2 group-hover:translate-x-1 transition-transform duration-500">
              {second.title}
            </h3>
            <p className="text-[13px] text-quartz/38 font-light">{second.microLine}</p>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {second.tags.map(tag => (
                <span key={tag} className="text-[9px] uppercase tracking-[0.1em] px-2 py-1 border border-quartz/8 text-quartz/25 rounded-sm">{tag}</span>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {rest.map((p, i) => (
        <motion.div
          key={p.slug}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.25 + i * 0.08, duration: 0.5 }}
          className="group flex items-center gap-6 py-4 px-3 border-t border-quartz/6 hover:bg-quartz/5 transition-colors duration-300"
        >
          <span className="text-[9px] tracking-[0.2em] text-quartz/20">{p.number}</span>
          <h3 className="font-serif text-[18px] font-light text-quartz/70 group-hover:translate-x-1 transition-transform duration-300">{p.title}</h3>
          <p className="text-[12px] text-quartz/28 font-light flex-1">{p.microLine}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default function ProjectStage({ categorySlug }) {
  const categoryProjects = projects.filter(p => p.categorySlug === categorySlug);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={categorySlug}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {categorySlug === 'local-business' && <LocalStage categoryProjects={categoryProjects} />}
        {categorySlug === 'product-brand' && <BrandStage categoryProjects={categoryProjects} />}
        {categorySlug === 'saas-web-app' && <SaasStage categoryProjects={categoryProjects} />}
        {categorySlug === 'signature-concept' && <SignatureStage categoryProjects={categoryProjects} />}
      </motion.div>
    </AnimatePresence>
  );
}