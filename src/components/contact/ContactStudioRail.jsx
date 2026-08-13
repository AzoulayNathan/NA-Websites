import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useI18n } from '@/i18n';

const MAILTO =
  'mailto:nathanazoulay.pro@gmail.com?subject=NA%20Websites%20%E2%80%94%20Project%20brief';
const STUDIO_URL = 'https://na-studio.pages.dev/';

const THEME_ATTR = {
  local: 'local',
  brand: 'brand',
  saas: 'saas',
  signature: 'signature',
  freelance: 'freelance',
  unsure: 'neutral',
  '': 'neutral',
};

function RailMotif({ theme }) {
  if (theme === 'local') {
    return (
      <svg className="studio-rail-motif-svg" viewBox="0 0 80 120" aria-hidden>
        <path
          className="studio-rail-motif-path"
          d="M8 95 Q28 72 48 78 T78 62"
          fill="none"
          strokeWidth="1"
        />
        <circle className="studio-rail-motif-marker" cx="48" cy="76" r="3" />
      </svg>
    );
  }
  if (theme === 'brand') {
    return (
      <svg className="studio-rail-motif-svg" viewBox="0 0 80 120" aria-hidden>
        <line className="studio-rail-motif-launch" x1="4" y1="108" x2="76" y2="18" />
      </svg>
    );
  }
  if (theme === 'saas') {
    return (
      <svg className="studio-rail-motif-svg studio-rail-motif-svg--saas" viewBox="0 0 80 120" aria-hidden>
        <circle className="studio-rail-motif-node" cx="22" cy="42" r="2" />
        <circle className="studio-rail-motif-node" cx="42" cy="58" r="1.75" />
        <circle className="studio-rail-motif-node" cx="58" cy="36" r="2" />
        <circle className="studio-rail-motif-node" cx="34" cy="78" r="1.5" />
      </svg>
    );
  }
  if (theme === 'signature') {
    return <div className="studio-rail-motif-glow" aria-hidden />;
  }
  if (theme === 'freelance') {
    return (
      <svg className="studio-rail-motif-svg" viewBox="0 0 80 120" aria-hidden>
        <path d="M10 88 H46 Q58 88 64 72 L72 54" fill="none" stroke="#B08A52" strokeWidth="1" opacity="0.7" />
        <circle cx="46" cy="88" r="2" fill="#3F5A4F" opacity="0.5" />
      </svg>
    );
  }
  return null;
}

export default function ContactStudioRail({ selectedType = '' }) {
  const { t, raw } = useI18n();
  const commitments = raw('contact.expectItems') || [];
  const themeKey = THEME_ATTR[selectedType] ?? 'neutral';
  const themeAttr = ['local', 'brand', 'saas', 'signature', 'freelance'].includes(selectedType)
    ? selectedType
    : themeKey;

  return (
    <aside
      className="studio-rail lg:sticky lg:top-28"
      data-theme={themeAttr}
      aria-label={t('contact.directContact')}
    >
      <div className="studio-rail-olive" aria-hidden />
      <div className="studio-rail-sheet">
        <div className="studio-rail-texture" aria-hidden />
        <div className="studio-rail-pin" aria-hidden />
        <RailMotif theme={themeAttr === 'neutral' ? null : themeAttr} />

        <div className="studio-rail-body">
          <header className="studio-rail-head">
            <p className="studio-rail-label">{t('contact.directContact')}</p>
            <a href={MAILTO} className="studio-rail-email na-seam-hover">
              nathanazoulay.pro@gmail.com
            </a>
          </header>

          <ol className="studio-rail-notes">
            {commitments.map((item, i) => (
              <li key={i} className="studio-rail-note">
                <span className="studio-rail-note-index" aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="studio-rail-note-text">{item}</p>
              </li>
            ))}
          </ol>

          <footer className="studio-rail-foot">
            <a
              href={STUDIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="studio-rail-signature group"
            >
              <span className="studio-rail-signature-text">{t('contact.studioSignature')}</span>
              <span className="studio-rail-signature-arrow" aria-hidden>
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </span>
            </a>
          </footer>
        </div>
      </div>
    </aside>
  );
}
