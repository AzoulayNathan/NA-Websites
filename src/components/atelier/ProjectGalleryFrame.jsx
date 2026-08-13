import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useI18n } from '@/i18n';
import { usePreview } from '@/lib/PreviewContext';
import { assetErrorFallbacks } from '@/lib/projectAssets';
import { getProjectCta } from '@/lib/projectCta';
import {
  buildVisualSources,
  getLayoutClass,
  getMobileSource,
  categoryToRoomType,
} from '@/lib/projectFrames';

function FrameImage({ src, alt, slug, className = '', kenBurns = false }) {
  const [current, setCurrent] = useState(src);
  const fallbacks = useMemo(() => assetErrorFallbacks(slug, src), [slug, src]);

  const onError = useCallback(() => {
    const next = fallbacks.find((f) => f !== current);
    if (next) setCurrent(next);
  }, [fallbacks, current]);

  useEffect(() => {
    setCurrent(src);
  }, [src]);

  return (
    <img
      src={current}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={onError}
      className={cn('w-full h-full object-cover object-top', kenBurns && 'project-gallery-frame__ken-burns', className)}
    />
  );
}

export default function ProjectGalleryFrame({
  project = null,
  slug: slugProp = '',
  images = null,
  frames = null,
  layout = 'default',
  roomType: roomTypeProp = '',
  accentTheme = '',
  className = '',
  interactive = false,
  onActivate = null,
  onOpen = null,
  showTitle = false,
  showCta = false,
  ctaLabel: ctaLabelProp = '',
}) {
  const { t } = useI18n();
  const { openPreview } = usePreview();
  const reduced = useReducedMotion();
  const frameRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const [focused, setFocused] = useState(false);

  const slug = project?.slug || slugProp;
  const roomType = roomTypeProp || categoryToRoomType(project?.categorySlug);
  const sources = useMemo(
    () => buildVisualSources(project, images || frames),
    [project, images, frames],
  );
  const singleSource = sources.length <= 1;
  const mobileSrc = project ? getMobileSource(project) : null;
  const cta = project ? getProjectCta(project, t) : null;
  const ctaLabel = ctaLabelProp || cta?.label || t('cta.viewPreview');

  const cycleMs = useMemo(() => 3200 + ((slug?.length || 0) % 4) * 400, [slug]);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '80px', threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || singleSource || (hovered && !reduced)) return undefined;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % sources.length);
    }, hovered ? cycleMs * 2 : cycleMs);
    return () => window.clearInterval(id);
  }, [inView, singleSource, hovered, sources.length, cycleMs, reduced]);

  const handleOpen = useCallback(
    (e) => {
      if (!interactive || !project) return;
      e?.stopPropagation?.();
      const rect = frameRef.current?.getBoundingClientRect() ?? null;
      if (onOpen) onOpen(project, rect);
      else if (onActivate) onActivate();
      else openPreview(project, rect);
    },
    [interactive, project, onOpen, onActivate, openPreview],
  );

  const alt = project
    ? `${project.title} — ${project.type || t('preview.visualOnly')}`
    : slug || t('preview.visualOnly');

  const layoutClass = getLayoutClass(layout);
  const active = hovered || focused;

  return (
    <div
      ref={frameRef}
      data-project-frame
      data-room-type={roomType}
      data-work-cursor="view"
      className={cn(
        'project-gallery-frame group/frame relative overflow-hidden bg-sand/40',
        'border border-olive/20 transition-all duration-500 ease-out',
        `project-gallery-frame--${roomType}`,
        accentTheme && `project-gallery-frame--theme-${accentTheme}`,
        interactive && 'cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive',
        active && interactive && 'project-gallery-frame--active scale-[1.02] border-olive/45 shadow-md',
        layoutClass,
        className,
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onClick={interactive ? handleOpen : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOpen(e);
              }
            }
          : undefined
      }
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `${t('preview.openInspection')}: ${project?.title || slug}` : undefined}
    >
      <div
        className={cn(
          'project-gallery-frame__visual absolute inset-0 overflow-hidden',
          active && 'project-gallery-frame__visual--mask',
        )}
      >
        {sources.map((src, i) => (
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{ duration: reduced ? 0.2 : 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <FrameImage
              src={src}
              alt={alt}
              slug={slug}
              kenBurns={singleSource && !hovered && !reduced}
            />
          </motion.div>
        ))}
        {singleSource && (
          <div className="project-gallery-frame__annotation pointer-events-none" aria-hidden />
        )}
      </div>

      {roomType === 'artisans' && mobileSrc && (
        <div className="project-gallery-frame__mobile-inset pointer-events-none" aria-hidden>
          <FrameImage src={mobileSrc} alt="" slug={slug} className="rounded-sm" />
        </div>
      )}

      {roomType === 'brand' && (
        <span className="project-gallery-frame__vitrine-strip pointer-events-none" aria-hidden />
      )}

      {roomType === 'saas' && (
        <span className="project-gallery-frame__ui-tag pointer-events-none">UI</span>
      )}

      {roomType === 'signature' && (
        <span className="project-gallery-frame__seam-reveal pointer-events-none" aria-hidden />
      )}

      <span className="project-gallery-frame__border-seam pointer-events-none" aria-hidden />

      {sources.length > 1 && (
        <div className="absolute bottom-3 left-3 flex gap-1.5 z-10 pointer-events-none">
          {sources.map((_, i) => (
            <span
              key={i}
              className={cn(
                'h-0.5 w-5 transition-all duration-300',
                i === index ? 'bg-olive w-7' : 'bg-ink/25',
              )}
            />
          ))}
        </div>
      )}

      {(showTitle || showCta) && project && (
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-ink/70 to-transparent pointer-events-none">
          {showTitle && (
            <p
              className={cn(
                'font-serif text-xl font-light text-quartz transition-transform duration-300',
                active && 'translate-x-1',
              )}
            >
              {project.title}
            </p>
          )}
          {showCta && (
            <span
              data-work-cursor="open"
              className="project-gallery-frame__cta inline-block mt-2 text-[10px] uppercase tracking-[0.16em] text-quartz font-medium opacity-80 group-hover/frame:opacity-100"
            >
              {ctaLabel} →
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export { ProjectGalleryFrame };
