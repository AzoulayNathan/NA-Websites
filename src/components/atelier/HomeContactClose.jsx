import React from 'react';
import { useI18n } from '@/i18n';
import { useScrollReveal } from '@/lib/useScrollReveal';
import RevealText from '@/components/shared/RevealText';
import NABubbleCTA from './NABubbleCTA';

export default function HomeContactClose() {
  const { t } = useI18n();
  const [ref, visible] = useScrollReveal(0.1);

  return (
    <section className="home-contact-close relative py-20 md:py-28 border-t border-olive/10 bg-sand/35 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 75% 50%, hsl(var(--quartz) / 0.5) 0%, transparent 65%)',
        }}
        aria-hidden
      />

      <div
        ref={ref}
        className="relative max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center"
      >
        <div className="md:col-span-6 text-center md:text-left">
          <RevealText as="p" className="text-[10px] uppercase tracking-[0.28em] text-olive/70 mb-5">
            {t('contactClose.eyebrow')}
          </RevealText>
          <RevealText as="h2" delay={0.06} className="font-serif text-[26px] md:text-[40px] leading-[1.12] font-light text-ink">
            {t('contactClose.title')}
          </RevealText>
          <RevealText as="p" delay={0.12} className="mt-5 text-[14px] md:text-[15px] text-ink/80 font-light max-w-md mx-auto md:mx-0 leading-relaxed">
            {t('contactClose.body')}
          </RevealText>
        </div>

        <div
          className={`md:col-span-6 flex justify-center md:justify-end transition-opacity duration-700 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <NABubbleCTA
            to="/contact"
            label={t('contactClose.cta')}
            variant="reveal"
            theme="local"
            className="na-bubble-cta-reveal"
          />
        </div>
      </div>
    </section>
  );
}
