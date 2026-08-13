import { createContext, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Legacy name kept intentionally because the original showroom components
 * already call `openPreview`. In the cleaned portfolio, opening a project
 * navigates to its dedicated case-study page instead of displaying a modal.
 * This preserves the original visual interactions without duplicating project UI.
 */
const PreviewContext = createContext(null);

export function PreviewProvider({ children }) {
  const navigate = useNavigate();

  const openPreview = useCallback(
    (project) => {
      if (!project?.slug) return;
      navigate(`/work/${project.slug}`);
    },
    [navigate],
  );

  const closePreview = useCallback(() => navigate(-1), [navigate]);

  return (
    <PreviewContext.Provider value={{ openPreview, closePreview }}>
      {children}
    </PreviewContext.Provider>
  );
}

export function usePreview() {
  const ctx = useContext(PreviewContext);
  if (!ctx) throw new Error('usePreview must be used within PreviewProvider');
  return ctx;
}
