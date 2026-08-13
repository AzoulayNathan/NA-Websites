import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useI18n } from '@/i18n';
import { getEnrichedProject } from '@/lib/projects';


const HERO_PROJECTS = [
  { slug: 'atelier-nova-habitat', className: 'left-[4%] top-[7%] w-[42%] h-[54%]', rotate: -1.5 },
  { slug: 'dropdrop', className: 'right-[5%] top-[5%] w-[37%] h-[42%]', rotate: 1.2 },
  { slug: 'questline', className: 'left-[33%] bottom-[5%] w-[39%] h-[43%]', rotate: -0.8 },
  { slug: 'dreams', className: 'right-[3%] bottom-[8%] w-[25%] h-[32%]', rotate: 1.8 },
].map((item) => ({ ...item, project: getEnrichedProject(item.slug) })).filter((item) => item.project);

function WorkGalleryMap({ reduced }) {
  return (
    <svg
      className="work-gallery-map absolute inset-0 w-full h-full"
      viewBox="0 0 480 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: reduced ? 0.35 : 0.5 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <path
          d="M40 260 L120 200 L200 240 L280 180 L360 220 L440 160"
          stroke="#3F5A4F"
          strokeWidth="1"
          strokeOpacity="0.35"
          strokeDasharray="4 6"
        />
        <path d="M80 80 L200 120 L320 60 L400 100" stroke="#1F3D33" strokeWidth="1.5" strokeOpacity="0.2" />
        <path d="M60 200 L60 40" stroke="#3F5A4F" strokeWidth="1" strokeOpacity="0.25" />
        <path d="M420 40 L420 280" stroke="#3F5A4F" strokeWidth="1" strokeOpacity="0.25" />
        <rect x="100" y="140" width="88" height="64" stroke="#1F3D33" strokeWidth="1" strokeOpacity="0.18" transform="skewX(-8)" />
        <rect x="220" y="100" width="72" height="52" stroke="#3F5A4F" strokeWidth="1" strokeOpacity="0.22" transform="skewX(-6)" />
        <rect x="300" y="160" width="96" height="70" stroke="#1F3D33" strokeWidth="1" strokeOpacity="0.15" transform="skewX(-10)" />
        <circle cx="120" cy="200" r="4" fill="#3F5A4F" fillOpacity="0.4" />
        <circle cx="280" cy="180" r="4" fill="#3F5A4F" fillOpacity="0.4" />
        <circle cx="360" cy="220" r="4" fill="#1F3D33" fillOpacity="0.35" />
      </motion.g>
      <motion.path
        d="M0 280 L480 240"
        stroke="#3F5A4F"
        strokeWidth="2"
        strokeOpacity="0.45"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduced ? 0 : 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

function SeamReveal({ children, delay = 0, className = '', as: Tag = 'div', reduced }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={reduced ? { opacity: 0 } : { clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
        animate={reduced ? { opacity: 1 } : { clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
        transition={{ duration: reduced ? 0.3 : 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {React.createElement(Tag, { className }, children)}
      </motion.div>
    </div>
  );
}

export default function WorkGalleryHero() {
  const { t } = useI18n();
  const reduced = useReducedMotion();

  return (
    <section className="work-gallery-entrance relative pt-28 md:pt-36 pb-8 md:pb-12 overflow-hidden bg-quartz">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          background:
            'linear-gradient(135deg, #F6F3ED 0%, #E8DFC9 42%, #F6F3ED 100%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-0 right-0 w-[55%] h-full na-diagonal-clip opacity-30"
        style={{ background: 'linear-gradient(160deg, transparent 20%, rgba(63,90,79,0.08) 100%)' }}
        aria-hidden
      />

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end">
          <div className="lg:col-span-5 z-10">
            <SeamReveal delay={0.05} reduced={reduced}>
              <p className="text-eyebrow text-deep-green mb-4">{t('work.label')}</p>
            </SeamReveal>
            <SeamReveal delay={0.15} reduced={reduced}>
              <h1 className="font-serif text-[38px] sm:text-[48px] md:text-[56px] lg:text-[62px] leading-[1.06] font-light text-ink">
                {t('work.titleLine1')}
                <br />
                {t('work.titleLine2')}
              </h1>
            </SeamReveal>
            <SeamReveal delay={0.28} reduced={reduced}>
              <p className="mt-5 text-[15px] md:text-[16px] font-light leading-relaxed text-ink max-w-md">
                {t('work.sub')}
              </p>
            </SeamReveal>
          </div>

          <div className="lg:col-span-7 relative min-h-[250px] sm:min-h-[300px] md:min-h-[330px]">
            <div className="absolute inset-0 border border-olive/15 na-diagonal-clip bg-sand/40 overflow-hidden">
              <WorkGalleryMap reduced={!!reduced} />
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(-12deg, transparent, transparent 28px, rgba(31,61,51,0.04) 28px, rgba(31,61,51,0.04) 29px)',
                }}
                aria-hidden
              />

              <div className="absolute inset-3 md:inset-4">
                {HERO_PROJECTS.map(({ project, className, rotate }, i) => (
                  <motion.div
                    key={project.slug}
                    className={`absolute ${className}`}
                    style={{ rotate, zIndex: 10 + i }}
                    initial={reduced ? false : { opacity: 0, y: 14, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: reduced ? 0.2 : 0.7, delay: 0.28 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={`/work/${project.slug}`}
                      className="group block relative w-full h-full overflow-hidden bg-quartz border border-olive/25 shadow-[0_10px_30px_rgba(31,61,51,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
                      aria-label={`${project.title} — open case study`}
                    >
                      <img
                        src={project.coverImage || project.desktopScreenshot}
                        alt={project.title}
                        loading={i < 2 ? 'eager' : 'lazy'}
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.025]"
                      />
                      <span className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink/70 to-transparent" aria-hidden />
                      <span className="absolute left-3 bottom-2.5 right-3 text-[8px] sm:text-[9px] uppercase tracking-[0.15em] text-quartz truncate">
                        {project.title}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <motion.div
          className="work-hero-rail mt-10 md:mt-12 h-[3px] bg-olive/20 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: reduced ? 0.2 : 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        />
      </div>
    </section>
  );
}
