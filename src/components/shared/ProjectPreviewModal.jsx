import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useI18n, useProjectText } from '@/i18n';
import StudioCTA from './StudioCTA';

const EASE = [0.22, 1, 0.36, 1];
const STUB = {
  slug: '_',
  translationKey: '_',
  categorySlug: 'local-business',
  category: '',
  shortPitch: '',
  microLine: '',
};

export default function ProjectPreviewModal({ project, onClose }) {
  const { t } = useI18n();
  const copy = useProjectText(project || STUB);

  useEffect(() => {
    if (!project) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          key={project.slug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-8"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" aria-hidden />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.45, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-sm ${
              project.theme === 'signature' ? 'bg-deep-green' : 'bg-quartz'
            }`}
          >
            <button
              type="button"
              onClick={onClose}
              className={`absolute top-4 right-4 z-10 p-2 ${
                project.theme === 'signature'
                  ? 'text-quartz/50 hover:text-quartz'
                  : 'text-ink/40 hover:text-ink'
              }`}
              aria-label={t('preview.close')}
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative aspect-[16/10] overflow-hidden">
              {project.coverImage ? (
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover object-top"
                />
              ) : null}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
                className={`absolute bottom-0 left-0 right-0 h-[1px] origin-left ${
                  project.theme === 'signature' ? 'bg-sky-blue/30' : 'bg-olive/25'
                }`}
              />
            </div>

            <div className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`text-[9px] tracking-[0.25em] ${
                    project.theme === 'signature' ? 'text-quartz/30' : 'text-olive/40'
                  }`}
                >
                  {project.number}
                </span>
                <div
                  className={`h-px flex-1 ${
                    project.theme === 'signature' ? 'bg-quartz/10' : 'bg-olive/10'
                  }`}
                />
                <span
                  className={`text-[9px] uppercase tracking-[0.15em] ${
                    project.theme === 'signature' ? 'text-sky-blue/55' : 'text-olive/55'
                  }`}
                >
                  {copy.category}
                </span>
              </div>

              <h2
                className={`font-serif text-[28px] md:text-[40px] leading-[1.08] font-light mb-3 ${
                  project.theme === 'signature' ? 'text-quartz' : 'text-ink'
                }`}
              >
                {project.title}
              </h2>
              <p
                className={`text-[14px] font-light leading-relaxed max-w-lg mb-2 ${
                  project.theme === 'signature' ? 'text-quartz/45' : 'text-ink/45'
                }`}
              >
                {copy.shortPitch}
              </p>
              <p
                className={`text-[11px] uppercase tracking-[0.12em] mb-8 ${
                  project.theme === 'signature' ? 'text-quartz/25' : 'text-ink/28'
                }`}
              >
                {t('preview.visualOnly')}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-8">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-[9px] uppercase tracking-[0.1em] px-2 py-1 border rounded-sm ${
                      project.theme === 'signature'
                        ? 'border-quartz/10 text-quartz/30'
                        : 'border-olive/10 text-ink/30'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <StudioCTA
                to="/contact"
                variant={project.theme === 'signature' ? 'dark' : 'primary'}
              >
                {t('cta.startProject')}
              </StudioCTA>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
