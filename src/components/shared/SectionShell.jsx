import React from 'react';
import { cn } from '@/lib/utils';

export default function SectionShell({
  children,
  className = '',
  bg = 'bg-quartz',
  diagonal = false,
  fullBleed = false,
  id,
}) {
  return (
    <section
      id={id}
      className={cn(
        'na-section-full',
        bg,
        diagonal && 'na-diagonal-clip',
        fullBleed ? 'py-20 md:py-28' : 'py-16 md:py-24',
        className,
      )}
    >
      <div className={cn(fullBleed ? 'w-full' : 'max-w-[1400px] mx-auto px-6 md:px-10')}>
        {children}
      </div>
    </section>
  );
}
