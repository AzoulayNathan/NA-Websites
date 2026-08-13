import { Toaster } from '@/components/ui/toaster';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { I18nProvider } from '@/i18n';
import { PreviewProvider } from '@/lib/PreviewContext';
import ScrollToTop from '@/components/shared/ScrollToTop';
import PageNotFound from './lib/PageNotFound';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Work from './pages/Work';
import ProjectDetail from './pages/ProjectDetail';
import Services from './pages/Services';
import Process from './pages/Process';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <I18nProvider>
        <PreviewProvider>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/work/:slug" element={<ProjectDetail />} />
              <Route path="/services" element={<Services />} />
              <Route path="/process" element={<Process />} />
              <Route path="/about" element={<About />} />
              <Route path="/freelance" element={<Navigate to="/process#work-together" replace />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Toaster />
        </PreviewProvider>
      </I18nProvider>
    </Router>
  );
}

export default App;
