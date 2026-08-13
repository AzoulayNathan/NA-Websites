import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function StudioCTA({
  to = '',
  href = '',
  onClick = null,
  children,
  variant = 'primary',
  className = '',
  type = undefined,
}) {
  const base = 'group inline-flex items-center gap-2 transition-all duration-300 relative';

  const styles = {
    primary: 'text-[13px] uppercase tracking-[0.15em] font-medium text-ink',
    secondary: 'text-[13px] uppercase tracking-[0.12em] text-ink/40 hover:text-ink/70',
    dark: 'text-[13px] uppercase tracking-[0.15em] font-medium text-quartz',
    theme: 'text-[13px] uppercase tracking-[0.15em] font-medium text-olive',
    button: 'text-[12px] uppercase tracking-[0.15em] font-medium text-quartz bg-deep-green px-6 py-3 hover:bg-deep-green/80',
  };

  const arrowColor = {
    primary: 'text-olive',
    secondary: 'text-ink/30',
    dark: 'text-sky-blue',
    theme: 'text-olive',
    button: 'text-sky-blue',
  };

  const underlineColor = {
    primary: 'bg-olive',
    secondary: 'bg-ink/25',
    dark: 'bg-sky-blue/50',
    theme: 'bg-olive',
    button: 'bg-sky-blue/50',
  };

  const inner = (
    <>
      <span className="relative">
        {children}
        <span
          className={`absolute -bottom-1 left-0 h-[1px] ${underlineColor[variant]} w-0 group-hover:w-full transition-all duration-300 origin-left`}
        />
        {/* Internal seam expand */}
        <span className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 h-[1px] w-0 group-hover:w-1/2 bg-current opacity-10 transition-all duration-500 delay-100" />
      </span>
      <ArrowRight
        className={`w-3.5 h-3.5 ${arrowColor[variant]} group-hover:translate-x-1 transition-transform duration-300`}
      />
    </>
  );

  if (onClick || type === 'submit') {
    return (
      <button
        onClick={onClick}
        type={type || 'button'}
        className={`${base} ${styles[variant]} ${className}`}
      >
        {inner}
      </button>
    );
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${styles[variant]} ${className}`}>
        {inner}
      </a>
    );
  }
  return (
    <Link to={to} className={`${base} ${styles[variant]} ${className}`}>
      {inner}
    </Link>
  );
}