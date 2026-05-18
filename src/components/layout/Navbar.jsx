import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/i18n';
import LanguageSwitcher from '../shared/LanguageSwitcher';

export default function Navbar() {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: t('nav.work'), path: '/work' },
    { label: t('nav.process'), path: '/process' },
    { label: t('nav.contact'), path: '/contact' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-quartz/90 backdrop-blur-md border-b border-olive/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-serif text-xl md:text-2xl font-semibold text-ink tracking-tight">NA</span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-olive font-medium">Websites</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative text-[13px] uppercase tracking-[0.15em] font-medium text-ink/70 hover:text-ink transition-colors group"
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-olive transition-all origin-left ${
                    location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
            <LanguageSwitcher />
            <a
              href="https://na-studio.pages.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] uppercase tracking-[0.12em] text-ink/40 hover:text-olive transition-colors"
            >
              {t('nav.studio')}
            </a>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <LanguageSwitcher />
            <button type="button" onClick={() => setIsOpen(!isOpen)} className="p-2" aria-label="Menu">
              <span className={`block w-5 h-px bg-ink mb-1 transition ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block w-5 h-px bg-ink mb-1 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-px bg-ink transition ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-quartz flex flex-col items-center justify-center gap-10"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={link.path} className="font-serif text-4xl text-ink hover:text-olive">
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
