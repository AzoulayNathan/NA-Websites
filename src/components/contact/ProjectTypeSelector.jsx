import React from 'react';
import { useI18n } from '@/i18n';

const OPTION_KEYS = ['local', 'brand', 'saas', 'signature', 'freelance'];

const BOARD_LAYOUT = {
  local: 'brief-card--local',
  brand: 'brief-card--brand',
  saas: 'brief-card--saas',
  signature: 'brief-card--signature',
  freelance: 'brief-card--freelance',
};

function CardMotif({ type, active }) {
  const stroke = type === 'signature' ? '#F6F3ED' : '#3F5A4F';
  const lit = active ? 1 : 0.35;

  if (type === 'local') {
    return (
      <svg className="brief-card-motif" viewBox="0 0 120 80" aria-hidden>
        <path d="M0 48 Q40 40 80 44" fill="none" stroke={stroke} strokeWidth="0.8" opacity={0.25 * lit + (active ? 0.35 : 0)} />
        <circle cx="36" cy="44" r="3" fill={stroke} opacity={0.2 + lit * 0.4} />
        <path d="M0 58 L120 54" fill="none" stroke="#AFC8D1" strokeWidth="0.5" opacity={active ? 0.45 : 0.12} />
      </svg>
    );
  }
  if (type === 'brand') {
    return (
      <svg className="brief-card-motif" viewBox="0 0 120 80" aria-hidden>
        <line x1="-10" y1="75" x2="130" y2="5" stroke="#B5523B" strokeWidth="0.7" opacity={active ? 0.5 : 0.15} />
      </svg>
    );
  }
  if (type === 'saas') {
    return (
      <svg className="brief-card-motif" viewBox="0 0 120 80" aria-hidden>
        <defs>
          <pattern id="brief-saas-grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M10 0 L0 0 0 10" fill="none" stroke={stroke} strokeWidth="0.4" opacity="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#brief-saas-grid)" opacity={active ? 0.35 : 0.12} />
        <circle cx="70" cy="40" r="2" fill="#AFC8D1" opacity={active ? 0.6 : 0.2} />
        <circle cx="48" cy="52" r="1.5" fill={stroke} opacity={active ? 0.5 : 0.2} />
      </svg>
    );
  }
  if (type === 'signature') {
    return (
      <svg className="brief-card-motif" viewBox="0 0 120 80" aria-hidden>
        <rect x="50" y="8" width="28" height="64" fill="#1F3D33" opacity={active ? 0.35 : 0.12} rx="1" />
        <line x1="64" y1="0" x2="64" y2="80" stroke="#F6F3ED" strokeWidth="0.6" opacity={active ? 0.2 : 0.06} />
        <circle cx="88" cy="24" r="2" fill="#B5523B" opacity={active ? 0.45 : 0.15} />
      </svg>
    );
  }
  if (type === 'freelance') {
    return (
      <svg className="brief-card-motif" viewBox="0 0 120 80" aria-hidden>
        <path d="M18 58 H78 L100 30" fill="none" stroke="#B08A52" strokeWidth="0.8" opacity={active ? 0.55 : 0.2} />
        <path d="M91 30 H100 V39" fill="none" stroke="#B08A52" strokeWidth="0.8" opacity={active ? 0.55 : 0.2} />
        <circle cx="34" cy="58" r="2.2" fill="#3F5A4F" opacity={active ? 0.5 : 0.18} />
      </svg>
    );
  }
  return (
    <svg className="brief-card-motif" viewBox="0 0 120 80" aria-hidden>
      <line x1="60" y1="10" x2="60" y2="70" stroke={stroke} strokeWidth="0.5" opacity={active ? 0.35 : 0.15} />
    </svg>
  );
}

export default function ProjectTypeSelector({ value, onChange }) {
  const { t } = useI18n();

  return (
    <div id="brief-board" className="brief-board min-w-0">
      <p id="brief-board-label" className="brief-board-label text-[11px] uppercase tracking-[0.22em] text-ink mb-6 md:mb-8 font-medium">
        {t('contact.projectTypeQuestion')}
      </p>

      <div
        className="brief-board-grid"
        role="radiogroup"
        aria-labelledby="brief-board-label"
      >
        {OPTION_KEYS.map((key) => {
          const selected = value === key;
          const isSignature = key === 'signature';

          return (
            <button
              key={key}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={`${t(`contact.types.${key}`)} — ${t(`contact.helpers.${key}`)}`}
              onClick={() => onChange(key)}
              className={`brief-card ${BOARD_LAYOUT[key]} group text-left ${selected ? 'brief-card--locked' : 'brief-card--idle'}`}
            >
              <CardMotif type={key} active={selected} />

              {selected && (
                <>
                  <span className="brief-card-seam" aria-hidden />
                  <span className="brief-card-lock" aria-hidden />
                  <span className="brief-card-badge">{t('contact.selected')}</span>
                </>
              )}

              <span className={`brief-card-title ${isSignature && selected ? 'text-quartz' : ''}`}>
                {t(`contact.types.${key}`)}
              </span>
              <span className="brief-card-desc">
                {t(`contact.helpers.${key}`)}
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
}
