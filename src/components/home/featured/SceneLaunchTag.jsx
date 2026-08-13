import React from 'react';
import ProjectActionCTA from '@/components/shared/ProjectActionCTA';

/** CTA styled as a launch shelf tag — slides 4px on hover */
export default function SceneLaunchTag({ project, variant = 'theme', className = '' }) {
  return (
    <span
      className={`inline-block transition-transform duration-300 ease-out hover:translate-x-1 ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <span className="inline-flex items-center gap-2 border border-olive/30 bg-sand/90 px-4 py-2 text-[9px] uppercase tracking-[0.2em] text-deep-green shadow-sm backdrop-blur-sm">
        <ProjectActionCTA project={project} variant={variant} asLabel />
      </span>
    </span>
  );
}
