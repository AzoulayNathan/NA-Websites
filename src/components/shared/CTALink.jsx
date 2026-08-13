import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CTALink({ to, children, variant = 'primary', className = '' }) {
  const base = 'group inline-flex items-center gap-2 transition-all duration-300';

  if (variant === 'primary') {
    return (
      <Link
        to={to}
        className={`${base} text-[13px] uppercase tracking-[0.15em] font-medium text-ink ${className}`}
      >
        <span className="relative">
          {children}
          <span className="absolute -bottom-1 left-0 h-[1px] bg-olive w-0 group-hover:w-full transition-all duration-400 origin-left" />
        </span>
        <ArrowRight className="w-3.5 h-3.5 text-olive group-hover:translate-x-1 transition-transform duration-300" />
      </Link>
    );
  }

  return (
    <Link
      to={to}
      className={`${base} text-[13px] uppercase tracking-[0.12em] text-ink/50 hover:text-ink/80 ${className}`}
    >
      {children}
    </Link>
  );
}