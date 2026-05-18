import { Toaster } from '@/components/ui/toaster';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientInstance } from '@/lib/query-client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { I18nProvider } from '@/i18n';
import { PreviewProvider } from '@/lib/PreviewContext';
import PageNotFound from './lib/PageNotFound';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Work from './pages/Work';
import Process from './pages/Process';
import Contact from './pages/Contact';

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <I18nProvider>
          <PreviewProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/work" element={<Work />} />
                <Route path="/process" element={<Process />} />
                <Route path="/contact" element={<Contact />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Toaster />
          </PreviewProvider>
        </I18nProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
