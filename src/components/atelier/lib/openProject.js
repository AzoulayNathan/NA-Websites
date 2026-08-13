import { previewRectFromEvent } from '@/lib/previewOpen';

export function openProjectFromEvent(openPreview, project, e) {
  openPreview(project, previewRectFromEvent(e));
}
