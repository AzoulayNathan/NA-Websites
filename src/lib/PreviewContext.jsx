import React, { createContext, useContext, useState } from 'react';
import ProjectPreviewModal from '@/components/shared/ProjectPreviewModal';
import { enrichProject } from '@/lib/enrichProjects';

const PreviewContext = createContext(null);

export function PreviewProvider({ children }) {
  const [project, setProject] = useState(null);
  const openPreview = (p) => setProject(p ? enrichProject(p) : null);

  return (
    <PreviewContext.Provider value={{ openPreview, closePreview: () => setProject(null) }}>
      {children}
      <ProjectPreviewModal project={project} onClose={() => setProject(null)} />
    </PreviewContext.Provider>
  );
}

export function usePreview() {
  const ctx = useContext(PreviewContext);
  if (!ctx) throw new Error('usePreview must be used within PreviewProvider');
  return ctx;
}
