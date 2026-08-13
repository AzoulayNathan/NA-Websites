import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scroll only when the actual page changes.
 * Query-string changes are intentionally ignored so interactions such as
 * Contact project-type selection do not throw the visitor back to the top.
 * Hash routes still land on their intended section (legacy /freelance redirect).
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = window.requestAnimationFrame(() => {
        const target = document.getElementById(hash.slice(1));
        if (target) target.scrollIntoView({ block: 'start', behavior: 'auto' });
        else window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      });
      return () => window.cancelAnimationFrame(id);
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    return undefined;
  }, [pathname, hash]);

  return null;
}

export function scrollToTop(smooth = false) {
  window.scrollTo({ top: 0, left: 0, behavior: smooth ? 'smooth' : 'auto' });
}
