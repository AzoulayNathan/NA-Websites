import React from 'react';

export default function ThemeTexture({ theme, className = '' }) {
  if (theme === 'saas') {
    return (
      <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-[0.06]">
          <defs>
            <pattern id="saas-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#1F3D33" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#saas-grid)" />
        </svg>
      </div>
    );
  }

  if (theme === 'local') {
    return (
      <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-[0.05]">
          <defs>
            <pattern id="local-dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="0.8" fill="#3F5A4F"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#local-dots)" />
        </svg>
      </div>
    );
  }

  if (theme === 'signature') {
    return (
      <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-sky-blue/5 blur-[80px]" />
      </div>
    );
  }

  return null;
}