import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import en from './en';
import fr from './fr';
import es from './es';

const dictionaries = { en, fr, es };
const STORAGE_KEY = 'na-websites-lang';
export const SUPPORTED_LANGS = ['en', 'fr', 'es'];

const I18nContext = createContext(null);

function getNested(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

export function I18nProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramLang = searchParams.get('lang');
  const initial =
    paramLang && SUPPORTED_LANGS.includes(paramLang)
      ? paramLang
      : localStorage.getItem(STORAGE_KEY) || 'en';

  const [lang, setLangState] = useState(initial);

  useEffect(() => {
    if (paramLang && SUPPORTED_LANGS.includes(paramLang) && paramLang !== lang) {
      setLangState(paramLang);
    }
  }, [paramLang, lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = (next) => {
    if (!SUPPORTED_LANGS.includes(next)) return;
    setLangState(next);
    const nextParams = new URLSearchParams(searchParams);
    if (next === 'en') nextParams.delete('lang');
    else nextParams.set('lang', next);
    setSearchParams(nextParams, { replace: true });
  };

  const dict = dictionaries[lang] || en;

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: (key, fallback = '') => getNested(dict, key) ?? getNested(en, key) ?? fallback,
      projectCopy: (slug) => dict.projects?.[slug] || en.projects?.[slug] || {},
    }),
    [lang, dict],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

export function useProjectText(project) {
  const { projectCopy, t } = useI18n();
  const copy = projectCopy(project.translationKey || project.slug);
  return {
    shortPitch: copy.shortPitch || project.shortPitch,
    microLine: copy.microLine || project.microLine,
    category: t(`categories.${project.categorySlug}`, project.category),
    ctaLabel: t('cta.viewVisual'),
  };
}
