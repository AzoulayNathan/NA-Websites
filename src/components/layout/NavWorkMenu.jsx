import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '@/i18n';
import { SHOWROOM_SLUG } from '@/lib/projects';

const MENU_ORDER = [
  { slug: SHOWROOM_SLUG, href: '/work', motif: null },
  { slug: 'local-business', href: '/work?category=local-business', motif: 'water' },
  { slug: 'signature-concept', href: '/work?category=signature-concept', motif: 'glow' },
  { slug: 'saas-web-app', href: '/work?category=saas-web-app', motif: 'grid' },
  { slug: 'product-brand', href: '/work?category=product-brand', motif: 'diagonal' },
];

const MOTIF_CLASS = {
  water: 'nav-motif-water',
  diagonal: 'nav-motif-diagonal',
  grid: 'nav-motif-grid',
  glow: 'nav-motif-glow',
};

export default function NavWorkMenu({ mobile = false, onNavigate }) {
  const { t } = useI18n();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const isWork = location.pathname === '/work';

  useEffect(() => {
    if (!open) return undefined;
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  const isActive = (slug) => {
    if (slug === SHOWROOM_SLUG) return isWork && !location.search.includes('category=');
    return location.search.includes(`category=${slug}`);
  };

  const labelFor = (slug) =>
    slug === SHOWROOM_SLUG ? t('nav.showroom') : t(`categories.${slug}`);

  const linkClass = (active, extra = '') =>
    `block px-4 py-2.5 text-[11px] uppercase tracking-[0.16em] transition-colors na-seam-hover ${
      active ? 'text-deep-green bg-sand/70 font-medium' : 'text-ink hover:text-deep-green hover:bg-sand/40'
    } ${extra}`;

  if (mobile) {
    return (
      <div className="flex flex-col items-center gap-3 w-full">
        <span className="text-[10px] uppercase tracking-[0.25em] text-olive">{t('nav.workTerritory')}</span>
        {MENU_ORDER.map((item) => (
          <div key={item.slug} className="flex flex-col items-center gap-1">
            <Link
              to={item.href}
              onClick={onNavigate}
              className={`font-serif text-2xl ${isActive(item.slug) ? 'text-deep-green' : 'text-ink hover:text-olive'}`}
            >
              {labelFor(item.slug)}
            </Link>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`na-seam-hover relative text-[13px] uppercase tracking-[0.15em] font-medium transition-colors flex items-center gap-1.5 ${
          isWork ? 'text-ink' : 'text-ink hover:text-deep-green'
        }`}
        data-active={isWork}
      >
        {t('nav.work')}
        <span className={`text-[9px] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden>
          ▾
        </span>
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-3 min-w-[268px] py-2 bg-quartz border border-olive/20 shadow-[0_12px_40px_rgba(26,26,24,0.08)] z-[60]"
          role="menu"
        >
          <p className="px-4 py-2 text-[9px] uppercase tracking-[0.22em] text-olive border-b border-olive/15 mb-1">
            {t('nav.workTerritory')}
          </p>
          {MENU_ORDER.map((item) => {
            const active = isActive(item.slug);
            const motif = item.motif ? MOTIF_CLASS[item.motif] : '';
            return (
              <div key={item.slug} className="relative group/menu">
                <Link
                  to={item.href}
                  role="menuitem"
                  className={`${linkClass(active)} ${motif}`}
                  data-active={active}
                  onClick={() => {
                    setOpen(false);
                    onNavigate?.();
                  }}
                >
                  {labelFor(item.slug)}
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
