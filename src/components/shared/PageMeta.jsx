import { useEffect } from 'react';
import { useI18n } from '@/i18n';
import { siteConfig } from '@/lib/siteConfig';

function setMeta(attr, key, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export default function PageMeta({
  title = '',
  description = '',
  titleKey = '',
  descriptionKey = '',
  image = '/og/na-websites.svg',
  noindex = false,
  type = 'website',
}) {
  const { t, lang } = useI18n();

  useEffect(() => {
    const resolvedTitle = titleKey ? t(titleKey) : title;
    const resolvedDescription = descriptionKey ? t(descriptionKey) : description;
    const pageTitle = resolvedTitle
      ? `${resolvedTitle} — ${siteConfig.name}`
      : `${siteConfig.name} — ${siteConfig.tagline}`;
    const pageDescription = resolvedDescription || siteConfig.description;
    const canonical = `${siteConfig.url}${window.location.pathname}`;

    document.title = pageTitle;
    document.documentElement.lang = lang;
    setMeta('name', 'description', pageDescription);
    setMeta('name', 'robots', noindex ? 'noindex,nofollow' : 'index,follow');
    setMeta('property', 'og:title', pageTitle);
    setMeta('property', 'og:description', pageDescription);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:image', `${siteConfig.url}${image}`);
    setMeta('name', 'twitter:card', 'summary_large_image');

    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonical);
  }, [title, description, titleKey, descriptionKey, image, noindex, type, t, lang]);

  return null;
}
