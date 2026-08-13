/** @returns {DOMRect | null} */
export function previewRectFromEvent(e) {
  const target = e?.currentTarget;
  if (!target) return null;
  const frame =
    target.closest?.('[data-project-frame]') ||
    target.querySelector?.('[data-project-frame]');
  if (frame?.getBoundingClientRect) return frame.getBoundingClientRect();
  if (target.getBoundingClientRect) return target.getBoundingClientRect();
  const img = target.querySelector?.('img');
  return img?.getBoundingClientRect?.() ?? null;
}

export function openPreviewWithRect(openPreview, project, e) {
  openPreview(project, previewRectFromEvent(e));
}
