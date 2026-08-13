import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const THEME_RING = {
  local: 'hover:shadow-[0_0_56px_hsl(var(--olive)/0.4)]',
  brand: 'hover:shadow-[0_0_56px_hsl(var(--terracotta)/0.28)]',
  saas: 'hover:shadow-[0_0_56px_hsl(var(--sky-blue)/0.38)]',
  signature: 'hover:shadow-[0_0_56px_hsl(var(--sky-blue)/0.22)]',
  default: 'hover:shadow-[0_0_56px_hsl(var(--olive)/0.35)]',
};

export default function NABubbleCTA({
  to = '',
  href = '',
  onClick = null,
  label,
  sublabel = '',
  idleLabel = 'NA',
  theme = 'default',
  className = '',
  size = 'lg',
  variant = 'default',
}) {
  const isReveal = variant === 'reveal';

  const sizeClasses = isReveal
    ? 'w-[min(280px,78vw)] h-[min(248px,68vw)] text-[11px]'
    : size === 'sm'
      ? 'w-[140px] h-[140px] text-[10px]'
      : 'w-[min(220px,52vw)] h-[min(220px,52vw)] text-[11px]';

  const defaultInner = (
    <>
      <span
        className="absolute inset-2 rounded-full border border-quartz/20 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500 pointer-events-none"
        aria-hidden
      />
      <span
        className="absolute inset-0 rounded-full bg-gradient-to-br from-olive/25 via-quartz/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        aria-hidden
      />
      <span className="relative z-10 flex flex-col items-center justify-center gap-1 px-6 text-center">
        <span className="w-8 h-px bg-quartz/30 group-hover:scale-x-150 transition-transform duration-400 origin-center" aria-hidden />
        <span className="font-serif text-[18px] md:text-[22px] font-light text-quartz tracking-tight leading-tight group-hover:translate-y-[-2px] transition-transform duration-400">
          {label}
        </span>
        {sublabel && (
          <span className="text-[9px] uppercase tracking-[0.2em] text-quartz/85 max-w-[12rem] leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-400 overflow-hidden">
            {sublabel}
          </span>
        )}
        <span
          className="text-quartz text-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400"
          aria-hidden
        >
          →
        </span>
      </span>
    </>
  );

  const revealInner = (
    <>
      <span
        className="na-bubble-halo absolute -inset-4 md:-inset-6 rounded-[50%] pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-500"
        aria-hidden
      />
      <span
        className="absolute inset-3 rounded-[48%] border border-quartz/15 opacity-40 group-hover:opacity-70 scale-95 group-hover:scale-100 transition-all duration-500 pointer-events-none"
        aria-hidden
      />
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[38%] bg-gradient-to-b from-transparent via-quartz/35 to-transparent pointer-events-none na-bubble-seam transition-all duration-500 group-hover:h-[48%] group-hover:via-quartz/55"
        aria-hidden
      />
      <span className="relative z-10 flex flex-col items-center justify-center gap-2 px-8 text-center min-h-[120px]">
        <span
          className="font-serif text-[2.5rem] md:text-[3rem] font-light text-quartz/90 tracking-tight leading-none transition-all duration-500 md:opacity-100 md:group-hover:opacity-0 md:group-hover:scale-90 max-md:hidden"
          aria-hidden
        >
          {idleLabel}
        </span>
        <span className="flex flex-col items-center gap-2 md:opacity-0 md:max-h-0 md:group-hover:opacity-100 md:group-hover:max-h-32 opacity-100 max-h-32 transition-all duration-500 overflow-hidden">
          <span className="w-10 h-px bg-quartz/25" aria-hidden />
          <span className="font-serif text-[17px] md:text-[20px] font-light text-quartz tracking-tight leading-snug max-w-[11rem]">
            {label}
          </span>
          {sublabel && (
            <span className="text-[9px] uppercase tracking-[0.18em] text-quartz/75 max-w-[10rem] leading-relaxed">
              {sublabel}
            </span>
          )}
        </span>
        <span
          className="text-quartz/80 text-base md:opacity-0 md:translate-x-0 md:group-hover:opacity-100 md:group-hover:translate-x-1 opacity-80 translate-x-0.5 transition-all duration-500"
          aria-hidden
        >
          →
        </span>
      </span>
    </>
  );

  const bubbleClass = cn(
    'group relative inline-flex items-center justify-center overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olive/50',
    isReveal
      ? 'rounded-[48%] bg-gradient-to-br from-deep-green via-[#243d34] to-olive/90 border border-olive/50 transition-transform duration-500 ease-out hover:scale-[1.06] active:scale-[1.03]'
      : 'rounded-full bg-deep-green border border-olive/40 transition-transform duration-500 ease-out hover:scale-[1.05]',
    THEME_RING[theme] || THEME_RING.default,
    sizeClasses,
    className,
  );

  const inner = isReveal ? revealInner : defaultInner;

  if (to) return <Link to={to} className={bubbleClass}>{inner}</Link>;
  if (href) return <a href={href} className={bubbleClass}>{inner}</a>;
  return (
    <button type="button" onClick={onClick} className={bubbleClass}>
      {inner}
    </button>
  );
}
