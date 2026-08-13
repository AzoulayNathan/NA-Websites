import React from 'react';
import { useScrollReveal } from '@/lib/useScrollReveal';
import RevealText from '../shared/RevealText';
import { useI18n } from '@/i18n';

const CONSTELLATION = [
  { x: '8%', y: '12%', size: 'lg' },
  { x: '62%', y: '8%', size: 'md' },
  { x: '28%', y: '38%', size: 'sm' },
  { x: '78%', y: '42%', size: 'md' },
  { x: '14%', y: '68%', size: 'md' },
  { x: '48%', y: '72%', size: 'lg' },
  { x: '82%', y: '78%', size: 'sm' },
];

const SIZE_CLASS = {
  lg: 'text-[22px] md:text-[32px]',
  md: 'text-[18px] md:text-[24px]',
  sm: 'text-[16px] md:text-[20px]',
};

export default function Deliverables() {
  const { t, raw } = useI18n();
  const deliverables = raw('deliverables.items') || [];
  const [ref, visible] = useScrollReveal(0.08);

  return (
    <section
      className="py-20 md:py-28 border-t border-olive/10 relative overflow-hidden na-diagonal-clip"
      style={{
        background:
          'linear-gradient(135deg, hsl(var(--sand) / 0.55) 0%, hsl(var(--quartz)) 45%, hsl(var(--deep-green) / 0.1) 100%)',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative">
        <RevealText as="p" className="text-eyebrow mb-3">
          {t('process.deliverablesLabel')}
        </RevealText>
        <RevealText as="h2" delay={0.06} className="font-serif text-[26px] md:text-[40px] leading-[1.12] font-light text-ink mb-10 max-w-xl">
          {t('process.deliverablesTitle')}
        </RevealText>

        <div ref={ref} className="relative min-h-[420px] md:min-h-[520px]">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none text-olive/25"
            aria-hidden
          >
            <line x1="12%" y1="18%" x2="30%" y2="42%" stroke="currentColor" strokeWidth="0.5" />
            <line x1="65%" y1="14%" x2="50%" y2="40%" stroke="currentColor" strokeWidth="0.5" />
            <line x1="32%" y1="44%" x2="18%" y2="72%" stroke="currentColor" strokeWidth="0.5" />
            <line x1="80%" y1="46%" x2="52%" y2="76%" stroke="currentColor" strokeWidth="0.5" />
            <line x1="16%" y1="72%" x2="48%" y2="76%" stroke="currentColor" strokeWidth="0.5" />
          </svg>

          {deliverables.map((d, i) => {
            const pos = CONSTELLATION[i % CONSTELLATION.length];
            return (
              <div
                key={d.item}
                className={`absolute max-w-[200px] md:max-w-[240px] transition-all duration-700 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}
                style={{
                  left: pos.x,
                  top: pos.y,
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <p className={`font-serif font-light text-ink leading-tight mb-1 ${SIZE_CLASS[pos.size]}`}>
                  {d.item}
                </p>
                <p className="text-caption text-ink/70 text-[12px] leading-snug">{d.detail}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
