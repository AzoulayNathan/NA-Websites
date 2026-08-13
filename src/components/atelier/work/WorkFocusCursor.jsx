import React, { useEffect, useRef, useState } from 'react';
import { useI18n } from '@/i18n';

const WORD_MAP = {
  view: 'cursorView',
  open: 'cursorOpen',
  trace: 'cursorTrace',
  focus: 'cursorFocus',
};

function resolveWord(target) {
  if (!target) return null;
  if (document.body.dataset.inspectionOpen) return null;

  const zone = target.closest('.work-gallery-zone');
  if (!zone) return null;

  if (target.closest('.project-gallery-frame__cta, [data-work-cursor="open"]')) return 'open';
  if (target.closest('[data-project-frame]')) return 'focus';

  const explicit = target.closest('[data-work-cursor]');
  if (explicit?.dataset.workCursor) return explicit.dataset.workCursor;

  const interactive = target.closest(
    'button, a[href], [role="button"], [data-preview-trigger]',
  );
  if (interactive && zone.contains(interactive)) return 'open';

  if (target.closest('.work-room-path')) return 'trace';

  if (target.closest('.work-gallery-zone .group, .work-gallery-zone article')) return 'focus';

  return 'view';
}

export default function WorkFocusCursor() {
  const { t } = useI18n();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [word, setWord] = useState('view');
  const posRef = useRef({ x: 0, y: 0 });
  const displayRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mqFine = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (mqReduce.matches || !mqFine.matches) return undefined;

    setEnabled(true);
    document.body.classList.add('work-focus-cursor-active');

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      const hit = document.elementFromPoint(e.clientX, e.clientY);
      const next = resolveWord(hit);
      if (next) {
        setVisible(true);
        setWord(next);
      } else {
        setVisible(false);
      }
    };

    const onLeave = () => setVisible(false);

    const tick = () => {
      const lerp = 0.22;
      displayRef.current.x += (posRef.current.x - displayRef.current.x) * lerp;
      displayRef.current.y += (posRef.current.y - displayRef.current.y) * lerp;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${displayRef.current.x}px, ${displayRef.current.y}px) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      document.body.classList.remove('work-focus-cursor-active');
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ringRef}
      className="work-focus-cursor fixed top-0 left-0 z-[90] pointer-events-none"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden
    >
      <div className="relative flex items-center justify-center w-[52px] h-[52px] rounded-full border border-olive bg-quartz/90 backdrop-blur-[2px] shadow-sm transition-opacity duration-150">
        <span className="text-[7px] uppercase tracking-[0.18em] text-deep-green font-semibold">
          {t(`work.${WORD_MAP[word] || WORD_MAP.view}`)}
        </span>
      </div>
    </div>
  );
}
