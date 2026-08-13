import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '@/i18n';
import LanguageSwitcher from '../shared/LanguageSwitcher';
import NavWorkMenu from './NavWorkMenu';

export default function Navbar() {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
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

  const closeMobile = () => setIsOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled
            ? 'bg-quartz/90 backdrop-blur-md border-b border-olive/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex flex-col gap-0.5 group">
            <span className="flex items-center gap-2">
              <span className="font-serif text-xl md:text-2xl font-semibold text-ink tracking-tight">NA</span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-olive font-medium">Websites</span>
            </span>
            <span className="h-px w-8 bg-olive/30 group-hover:w-12 transition-all duration-400 origin-left" aria-hidden />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <NavWorkMenu />
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`na-seam-hover relative text-[13px] uppercase tracking-[0.15em] font-medium transition-colors ${
                  location.pathname === link.path || location.pathname.startsWith(`${link.path}/`)
                    ? 'text-ink'
                    : 'text-ink hover:text-deep-green'
                }`}
                data-active={location.pathname === link.path || location.pathname.startsWith(`${link.path}/`)}
              >
                {link.label}
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

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-quartz flex flex-col items-center justify-center gap-8 px-6 md:hidden">
          <NavWorkMenu mobile onNavigate={closeMobile} />
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={closeMobile}
              className="font-serif text-3xl text-ink hover:text-olive"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
