import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/lib/useScrollReveal';
import { useI18n } from '@/i18n';

export default function Footer() {
  const { t } = useI18n();
  const [ref, visible] = useScrollReveal(0.2);

  return (
    <footer ref={ref} className="bg-deep-green text-quartz">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={visible ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="h-[1px] bg-quartz/8 origin-center max-w-[1400px] mx-auto"
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={visible ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-[1px] bg-quartz/15 origin-left mb-12 md:mb-16"
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="font-serif text-2xl font-semibold">NA</span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-sky-blue font-medium">
                Websites
              </span>
            </motion.div>
            <p className="text-sm text-quartz/50 leading-relaxed max-w-xs font-light">
              {t('footer.tagline')}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-quartz/40 mb-5">{t('footer.navLabel')}</p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={visible ? { opacity: 1 } : {}}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="flex flex-col gap-3"
            >
              <Link to="/work" className="text-sm text-quartz/70 hover:text-quartz transition-colors">{t('nav.work')}</Link>
              <Link to="/process" className="text-sm text-quartz/70 hover:text-quartz transition-colors">{t('nav.process')}</Link>
              <Link to="/contact" className="text-sm text-quartz/70 hover:text-quartz transition-colors">{t('nav.contact')}</Link>
              <a
                href="https://na-studio.pages.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-quartz/40 hover:text-sky-blue transition-colors"
              >
                {t('nav.studio')}
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-quartz/40 mb-5">{t('footer.contactLabel')}</p>
            <a
              href="mailto:nathanazoulay.pro@gmail.com"
              className="text-sm text-quartz/70 hover:text-quartz transition-colors"
            >
              nathanazoulay.pro@gmail.com
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-16 pt-8 border-t border-quartz/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-[11px] text-quartz/30 tracking-wider">
            © {new Date().getFullYear()} {t('footer.rights')}
          </p>
          <p className="text-[11px] text-quartz/20 tracking-wider">
            {t('footer.meta')}
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
