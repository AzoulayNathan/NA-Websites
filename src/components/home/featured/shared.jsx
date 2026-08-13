import { useState, useEffect, useCallback, useMemo } from 'react';
import { getProject, enrichProject } from '@/lib/projects';
import { assetErrorFallbacks } from '@/lib/projectAssets';

export const EASE = [0.22, 1, 0.36, 1];

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const go = () => setReduced(mq.matches);
    go();
    mq.addEventListener('change', go);
    return () => mq.removeEventListener('change', go);
  }, []);
  return reduced;
}

export function useFeaturedProject(slug) {
  return useMemo(() => enrichProject(getProject(slug)), [slug]);
}

export function projectFrames(project) {
  if (!project) return [];
  return [project.desktopScreenshot, project.coverImage, project.mobileScreenshot].filter(Boolean);
}

export function SceneImage({ src, slug, alt, className = '', onClick = null }) {
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
      onClick={onClick}
      className={className}
    />
  );
}
