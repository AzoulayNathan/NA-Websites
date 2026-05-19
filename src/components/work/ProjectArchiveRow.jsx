import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePreview } from '@/lib/PreviewContext';
import { useProjectText } from '@/i18n';

const accentMap = {
  local: '#3F5A4F',
  brand: '#B5523B',
  saas: '#AFC8D1',
  signature: '#AFC8D1',
};

export default function ProjectArchiveRow({ project, index }) {
  const { openPreview } = usePreview();
  const copy = useProjectText(project);
  const [hovered, setHovered] = useState(false);
  const isDark = project.theme === 'signature';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => openPreview(project)}
      onKeyDown={(e) => e.key === 'Enter' && openPreview(project)}
      role="button"
      tabIndex={0}
      className={`group relative border-t transition-colors duration-300 cursor-pointer ${
        isDark ? 'border-quartz/6' : 'border-olive/8'
      } ${hovered ? (isDark ? 'bg-deep-green/40' : 'bg-sand/25') : 'bg-transparent'}`}
    >
      {/* Thin line draw on hover */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0 h-[1px] origin-left"
        style={{ backgroundColor: accentMap[project.theme] || '#3F5A4F', opacity: 0.2 }}
      />

      <div className="grid grid-cols-12 gap-3 md:gap-6 items-center py-5 md:py-6 px-2 md:px-3">
        {/* Number */}
        <div className="col-span-1">
          <span className={`text-[9px] tracking-[0.2em] transition-colors ${
            hovered ? (isDark ? 'text-quartz/50' : 'text-olive/65') : (isDark ? 'text-quartz/20' : 'text-olive/25')
          }`}>
            {project.number}
          </span>
        </div>

        {/* Title */}
        <div className="col-span-4 md:col-span-4">
          <h3 className={`font-serif text-[17px] md:text-[21px] font-light transition-all duration-400 ${
            hovered
              ? (isDark ? 'text-quartz translate-x-1.5' : 'text-ink translate-x-1.5')
              : (isDark ? 'text-quartz/70' : 'text-ink/75')
          }`}>
            {project.title}
          </h3>
        </div>

        {/* Type — hidden mobile */}
        <div className="hidden md:block md:col-span-2">
          <span className={`text-[11px] font-light ${isDark ? 'text-quartz/28' : 'text-ink/28'}`}>
            {copy.type}
          </span>
        </div>

        {/* Micro line */}
        <div className="col-span-5 md:col-span-4">
          <p className={`text-[12px] md:text-[13px] font-light line-clamp-1 transition-colors ${
            isDark ? 'text-quartz/32' : 'text-ink/32'
          }`}>
            {copy.microLine}
          </p>
        </div>

        {/* Status / CTA */}
        <div className="col-span-2 md:col-span-1 flex justify-end">
          <span
            className={`text-[9px] uppercase tracking-[0.1em] transition-all duration-300 ${
              hovered ? 'opacity-100' : 'opacity-0'
            } ${isDark ? 'text-quartz/30' : 'text-ink/30'}`}
          >
            →
          </span>
        </div>
      </div>

      {/* Thumbnail on hover — desktop */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.95 }}
        transition={{ duration: 0.3 }}
        className="hidden lg:block absolute right-16 top-1/2 -translate-y-1/2 w-20 h-13 overflow-hidden rounded-sm pointer-events-none"
        style={{ height: '52px' }}
      >
        {project.coverImage && (
          <img src={project.coverImage} alt="" className="w-full h-full object-cover object-top" />
        )}
      </motion.div>
    </motion.div>
  );
}