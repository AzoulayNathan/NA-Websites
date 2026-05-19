import React from 'react';
import { motion } from 'framer-motion';

function LocalOverlay() {
  return (
    <svg className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" viewBox="0 0 400 64" preserveAspectRatio="none">
      <path d="M 0 48 Q 100 42 200 46 Q 300 50 400 44" fill="none" stroke="#3F5A4F" strokeWidth="0.8" opacity="0.2"/>
      <circle cx="80" cy="44" r="2" fill="#3F5A4F" opacity="0.3"/>
      <circle cx="220" cy="46" r="1.5" fill="#3F5A4F" opacity="0.2"/>
      <circle cx="340" cy="42" r="2.5" fill="none" stroke="#3F5A4F" strokeWidth="0.7" opacity="0.25"/>
    </svg>
  );
}

function SaasOverlay({ slug }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={`saas-bp-${slug}`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#1F3D33" strokeWidth="0.4"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#saas-bp-${slug})`}/>
    </svg>
  );
}

function SignatureOverlay() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-sky-blue/8 via-transparent to-deep-green/30 pointer-events-none" />
      <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-gradient-to-br from-sky-blue/6 to-transparent pointer-events-none" />
    </>
  );
}

function DrfuelOverlay() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300" preserveAspectRatio="none">
      <line x1="-20" y1="300" x2="420" y2="-20" stroke="#B5523B" strokeWidth="1.2" opacity="0.18"/>
      <line x1="-20" y1="260" x2="420" y2="-60" stroke="#B5523B" strokeWidth="0.5" opacity="0.1"/>
      <text x="320" y="260" fontSize="7" fill="#B5523B" opacity="0.3" fontFamily="monospace" letterSpacing="1">ENERGY</text>
    </svg>
  );
}

function DreamsOverlay() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-green/10 to-deep-green/40 pointer-events-none" />
      <div className="absolute top-0 left-0 w-1/3 h-2/3 bg-gradient-to-br from-sky-blue/8 to-transparent pointer-events-none" />
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-8" viewBox="0 0 400 300" preserveAspectRatio="none">
        <line x1="200" y1="0" x2="200" y2="300" stroke="#F6F3ED" strokeWidth="0.5" opacity="0.06"/>
      </svg>
    </>
  );
}

function getOverlay(project) {
  if (!project) return null;
  switch (project.slug) {
    case 'drfuel': return <DrfuelOverlay />;
    case 'dreams': return <DreamsOverlay />;
    default:
      if (project.theme === 'local') return <LocalOverlay />;
      if (project.theme === 'saas') return <SaasOverlay slug={project.slug} />;
      if (project.theme === 'signature') return <SignatureOverlay />;
      return null;
  }
}

function getAssetSrc(project) {
  if (!project) return null;
  if (project.coverVideo) return { type: 'video', src: project.coverVideo };
  if (project.coverImage) return { type: 'image', src: project.coverImage };
  if (project.desktopScreenshot) return { type: 'image', src: project.desktopScreenshot };
  return null;
}

export default function ProjectVisualFrame({
  project,
  className = '',
  revealDelay = 0,
  variant = 'default',
  interactive = true,
}) {
  const asset = getAssetSrc(project);
  const isDark = project?.theme === 'signature' || project?.slug === 'drfuel' || project?.slug === 'dreams';
  const fallbackBg = isDark ? '#1F3D33' : '#E8DFC9';

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
        viewport={{ once: true, margin: '-5%' }}
        transition={{ duration: 1.1, delay: revealDelay, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-full"
      >
        {asset?.type === 'video' ? (
          <video
            src={asset.src}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover object-top"
          />
        ) : asset?.type === 'image' ? (
          <img
            src={asset.src}
            alt={project?.title || ''}
            className={`w-full h-full object-cover object-top ${interactive ? 'group-hover:scale-[1.02] transition-transform duration-700' : ''}`}
          />
        ) : (
          <div className="w-full h-full" style={{ backgroundColor: fallbackBg }} />
        )}

        {/* Project-specific overlay */}
        {getOverlay(project)}
      </motion.div>
    </div>
  );
}