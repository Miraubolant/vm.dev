import React from 'react';
import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import ScrollProgressBar from '../effects/ScrollProgressBar';
import FloatingActionButton from '../ui/FloatingActionButton';
import CookieBanner from '../ui/CookieBanner';
import LegalPages from '../pages/LegalPages';
import SitemapPage from '../pages/SitemapPage';
import SEOHead from '../seo/SEOHead';
import SitemapGenerator from '../seo/SitemapGenerator';
import { useAnalytics } from '../../hooks/useAnalytics';

const Layout = ({ children }) => {
  const [legalPageOpen, setLegalPageOpen] = useState(false);
  const [legalPageType, setLegalPageType] = useState('privacy');
  const [sitemapOpen, setSitemapOpen] = useState(false);
  
  // Initialize analytics
  useAnalytics();

  const openLegalPage = (type) => {
    setLegalPageType(type);
    setLegalPageOpen(true);
  };

  const openSitemap = () => {
    setSitemapOpen(true);
  };

  // Listen for custom events from sitemap
  useEffect(() => {
    const handleOpenLegal = (event) => {
      openLegalPage(event.detail);
    };

    window.addEventListener('openLegal', handleOpenLegal);
    return () => window.removeEventListener('openLegal', handleOpenLegal);
  }, []);

  return (
    <div className="min-h-screen bg-primary-dark">
      <SEOHead />
      <SitemapGenerator />
      <ScrollProgressBar />
      <Header />
      <main>{children}</main>
      <Footer onOpenLegalPage={openLegalPage} onOpenSitemap={openSitemap} />
      <FloatingActionButton />
      <CookieBanner />
      <LegalPages 
        isOpen={legalPageOpen}
        onClose={() => setLegalPageOpen(false)}
        page={legalPageType}
      />
      <SitemapPage 
        isOpen={sitemapOpen}
        onClose={() => setSitemapOpen(false)}
      />
    </div>
  );
};

export default Layout;