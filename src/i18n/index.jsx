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
  const readStoredLang = () => {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  };

  const initial =
    paramLang && SUPPORTED_LANGS.includes(paramLang)
      ? paramLang
      : readStoredLang() || 'en';

  const [lang, setLangState] = useState(initial);

  useEffect(() => {
    if (paramLang && SUPPORTED_LANGS.includes(paramLang) && paramLang !== lang) {
      setLangState(paramLang);
    }
  }, [paramLang, lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* private mode / blocked storage */
    }
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
      raw: (key) => getNested(dict, key) ?? getNested(en, key),
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
  const tags = Array.isArray(copy.tags) && copy.tags.length ? copy.tags : project.tags;
  const type = copy.type || project.type;
  return {
    shortPitch: copy.shortPitch || project.shortPitch,
    microLine: copy.microLine || project.microLine,
    category: t(`categories.${project.categorySlug}`, project.category),
    ctaLabel: t('cta.viewVisual'),
    tags,
    type,
  };
}
