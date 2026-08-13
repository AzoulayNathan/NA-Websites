import React, { useMemo } from 'react';

/** Form keys → brief-room atmosphere theme */
function normalizeTheme(selectedType) {
  if (!selectedType || selectedType === 'unsure') return 'neutral';
  if (selectedType === 'local' || selectedType === 'brand' || selectedType === 'saas' || selectedType === 'signature' || selectedType === 'freelance') {
    return selectedType;
  }
  return 'neutral';
}

export default function ContactBackgroundLayers({ selectedType = '' }) {
  const theme = useMemo(() => normalizeTheme(selectedType), [selectedType]);

  return (
    <div
      className="contact-bg-layers fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      data-theme={theme}
      aria-hidden
    >
      <div className="contact-bg-grain absolute inset-0" />
      <div className="contact-bg-base absolute inset-0" />
      <div className="contact-bg-plane contact-bg-plane--primary absolute" />
      <div className="contact-bg-plane contact-bg-plane--secondary absolute" />
      <div className="contact-bg-seam absolute" />

      {/* Artisans — service path + waterline + marker */}
      <svg className="contact-bg-motif contact-bg-motif--local absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <path className="contact-bg-path-line" d="M-40 520 Q280 480 520 500 T1240 470" fill="none" strokeWidth="1" />
        <path className="contact-bg-waterline" d="M0 580 Q400 560 800 570 T1200 555" fill="none" strokeWidth="0.75" />
        <circle className="contact-bg-marker" cx="180" cy="505" r="4" />
      </svg>

      {/* Product & Brand — launch accent */}
      <svg className="contact-bg-motif contact-bg-motif--brand absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <line className="contact-bg-launch-line" x1="-80" y1="720" x2="1280" y2="120" />
      </svg>

      {/* SaaS — grid handled in CSS; trace + nodes */}
      <div className="contact-bg-motif contact-bg-motif--saas contact-bg-saas-grid absolute inset-0" />
      <svg className="contact-bg-motif contact-bg-motif--saas absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <line className="contact-bg-trace" x1="200" y1="800" x2="900" y2="80" />
        <circle className="contact-bg-node" cx="420" cy="380" r="2.5" />
        <circle className="contact-bg-node" cx="640" cy="290" r="2" />
        <circle className="contact-bg-node" cx="780" cy="340" r="2.5" />
      </svg>


      {/* Freelance — warm connector line */}
      <svg className="contact-bg-motif contact-bg-motif--freelance absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <path className="contact-bg-freelance-path" d="M90 620 H520 Q650 620 730 520 T1110 250" fill="none" />
        <circle className="contact-bg-freelance-node" cx="520" cy="620" r="3" />
        <circle className="contact-bg-freelance-node" cx="730" cy="520" r="2.5" />
      </svg>

            {/* Signature — glow plane in CSS; terracotta punctuation */}
      <div className="contact-bg-motif contact-bg-motif--signature contact-bg-signature-glow absolute" />
      <svg className="contact-bg-motif contact-bg-motif--signature absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <line className="contact-bg-sig-seam" x1="720" y1="0" x2="680" y2="800" />
        <circle className="contact-bg-sig-accent" cx="890" cy="220" r="3" />
      </svg>
    </div>
  );
}
