import React from 'react';
import { useI18n } from '@/i18n';
import { useScrollReveal } from '@/lib/useScrollReveal';
import { SHOWROOM_SLUG } from '@/lib/projects';
import NABubbleCTA from '@/components/atelier/NABubbleCTA';

const CTA_CONFIG = {
  [SHOWROOM_SLUG]: {
    to: '/contact',
    labelKey: 'work.cta',
    theme: 'local',
  },
  'local-business': {
    to: '/contact?type=local-business',
    labelKey: 'work.ctaArtisan',
    theme: 'local',
  },
  'product-brand': {
    to: '/contact?type=product-brand',
    labelKey: 'work.ctaBrand',
    theme: 'brand',
  },
  'saas-web-app': {
    to: '/contact?type=saas-web-app',
    labelKey: 'work.ctaSaas',
    theme: 'saas',
  },
  'signature-concept': {
    to: '/contact?type=signature-concept',
    labelKey: 'work.ctaSignature',
    theme: 'signature',
  },
};

export default function WorkBubbleCTA({ activeCategory }) {
  const { t } = useI18n();
  const [ref, visible] = useScrollReveal(0.1);
  const config = CTA_CONFIG[activeCategory] || CTA_CONFIG[SHOWROOM_SLUG];
  const isDark = activeCategory === 'signature-concept';

  return (
    <section
      ref={ref}
      className={`work-bubble-cta relative py-16 md:py-24 overflow-hidden border-t ${
        isDark ? 'border-quartz/15 bg-deep-green' : 'border-olive/15 bg-sand/40'
      }`}
      id="work-bubble-cta"
      aria-labelledby="work-bubble-cta-title"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 65% 50% at 50% 40%, hsl(197 26% 75% / 0.12) 0%, transparent 65%)'
            : 'radial-gradient(ellipse 70% 55% at 50% 45%, hsl(40 33% 96% / 0.7) 0%, transparent 62%)',
        }}
        aria-hidden
      />

      <div
        className={`relative max-w-[min(1100px,100%)] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-center transition-opacity duration-700 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="md:col-span-6 text-center md:text-left z-10">
          <h2
            id="work-bubble-cta-title"
            className={`font-serif text-[clamp(1.35rem,3.2vw,2.25rem)] leading-[1.12] font-light mb-3 ${
              isDark ? 'text-quartz' : 'text-ink'
            }`}
          >
            {t('work.bubbleCta.title')}
          </h2>
          <p
            className={`text-[14px] md:text-[15px] font-light leading-relaxed max-w-md mx-auto md:mx-0 ${
              isDark ? 'text-quartz' : 'text-deep-green'
            }`}
          >
            {t('work.bubbleCta.line')}
          </p>
        </div>

        <div className="md:col-span-6 flex justify-center md:justify-end z-10">
          <NABubbleCTA
            to={config.to}
            label={t(config.labelKey)}
            theme={config.theme}
            variant="reveal"
            className="work-bubble-cta__bubble"
          />
        </div>
      </div>
    </section>
  );
}
