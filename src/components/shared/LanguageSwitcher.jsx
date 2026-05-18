import React from 'react';
import { useI18n, SUPPORTED_LANGS } from '@/i18n';

const labels = { en: 'EN', fr: 'FR', es: 'ES' };

export default function LanguageSwitcher({ className = '' }) {
  const { lang, setLang, t } = useI18n();

  return (
    <div className={`flex items-center gap-1 ${className}`} role="group" aria-label={t('aria.language')}>
      {SUPPORTED_LANGS.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          className={`px-1.5 py-0.5 text-[10px] uppercase tracking-[0.15em] transition-colors duration-300 ${
            lang === code ? 'text-ink/80' : 'text-ink/30 hover:text-ink/55'
          }`}
          aria-current={lang === code ? 'true' : undefined}
        >
          {labels[code]}
        </button>
      ))}
    </div>
  );
}
