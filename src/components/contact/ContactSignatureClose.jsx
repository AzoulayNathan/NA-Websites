import React from 'react';
import { useI18n } from '@/i18n';
import { useScrollReveal } from '@/lib/useScrollReveal';
import { useMaxWidth } from '@/lib/useMaxWidth';
import NABubbleCTA from '@/components/shared/NABubbleCTA';
import { isContactBriefReady } from '@/lib/contactBriefMailto';

const BRIEF_ANCHOR_ID = 'contact-brief-anchor';

const THEME_MAP = {
  local: 'local',
  brand: 'brand',
  saas: 'saas',
  signature: 'signature',
};

export default function ContactSignatureClose({ formData, selectedType = '' }) {
  const { t } = useI18n();
  const isMobile = useMaxWidth(767);
  const [ref, visible] = useScrollReveal(isMobile ? 0 : 0.12);
  const showContent = isMobile || visible;

  const ready = isContactBriefReady(formData, t);
  const ctaLabel = ready ? t('contact.send') : t('contact.signatureClose.cta');

  const handleBubbleClick = () => {
    if (ready) {
      const form = document.getElementById('contact-brief-form');
      if (form instanceof HTMLFormElement) form.requestSubmit();
      return;
    }
    document.getElementById(BRIEF_ANCHOR_ID)?.scrollIntoView({
      behavior: isMobile ? 'auto' : 'smooth',
      block: 'start',
    });
    window.setTimeout(() => {
      document.getElementById('brief-name')?.focus({ preventScroll: true });
    }, 400);
  };

  const bubbleTheme = THEME_MAP[selectedType] || 'default';

  return (
    <section
      className="contact-signature-close relative py-16 md:py-28 border-t border-olive/12 overflow-x-hidden"
      aria-labelledby="contact-signature-close-title"
    >
      <div className="contact-signature-close-glow" aria-hidden />
      <div className="contact-signature-close-seam" aria-hidden />

      <div
        ref={ref}
        className={`contact-signature-close-grid relative max-w-[1200px] mx-auto px-5 sm:px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center min-w-0 ${
          showContent ? 'opacity-100' : 'opacity-0 md:transition-opacity md:duration-700'
        }`}
      >
        <div className="md:col-span-6 text-center md:text-left">
          <p className="contact-signature-close-eyebrow">{t('contact.signatureClose.eyebrow')}</p>
          <h2
            id="contact-signature-close-title"
            className="font-serif text-[24px] md:text-[36px] leading-[1.14] font-light text-ink"
          >
            {t('contact.signatureClose.title')}
          </h2>
          <p className="mt-5 text-[14px] md:text-[15px] text-ink/85 font-light max-w-md mx-auto md:mx-0 leading-relaxed">
            {t('contact.signatureClose.line')}
          </p>
        </div>

        <div className="md:col-span-6 flex justify-center md:justify-end">
          <NABubbleCTA
            onClick={handleBubbleClick}
            label={ctaLabel}
            variant="reveal"
            theme={bubbleTheme}
            className="contact-signature-bubble"
          />
        </div>
      </div>
    </section>
  );
}
