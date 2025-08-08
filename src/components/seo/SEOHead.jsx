import { useEffect } from 'react';

const SEOHead = ({ 
  title = "Victor Mirault - Développeur Web Freelance | Sites Autonomes Express",
  description = "Développeur web français spécialisé dans l'autonomie digitale. Sites vitrine, e-commerce, applications web. Réponse 48h, livraison 2 semaines max, formation incluse.",
  keywords = "développeur web, freelance, sites web, e-commerce, applications web, React, Vue.js, formation, autonomie digitale, France",
  ogImage = "/og-image.jpg",
  canonicalUrl = "https://victormirault.dev"
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name, content, property = false) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'Victor Mirault');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:site_name', 'Victor Mirault - Développeur Web', true);
    updateMetaTag('og:locale', 'fr_FR', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
    updateMetaTag('twitter:creator', '@victormirault');

    // Additional SEO tags
    updateMetaTag('theme-color', '#E94560');
    updateMetaTag('msapplication-TileColor', '#1A1A2E');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Language
    document.documentElement.setAttribute('lang', 'fr');

    // Structured data (JSON-LD)
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Victor Mirault",
      "jobTitle": "Développeur Web Freelance",
      "description": "Développeur web français spécialisé dans l'autonomie digitale",
      "url": canonicalUrl,
      "email": "victor@mirault.dev",
      "telephone": "+33 6 XX XX XX XX",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "FR",
        "addressLocality": "France"
      },
      "sameAs": [
        "https://github.com/victormirault",
        "https://linkedin.com/in/victormirault",
        "https://twitter.com/victormirault"
      ],
      "knowsAbout": [
        "Développement Web",
        "React",
        "Vue.js",
        "Node.js",
        "E-commerce",
        "Applications Web"
      ],
      "offers": {
        "@type": "Service",
        "name": "Développement Web",
        "description": "Sites vitrine, e-commerce, applications web avec formation incluse",
        "provider": {
          "@type": "Person",
          "name": "Victor Mirault"
        }
      }
    };

    let jsonLd = document.querySelector('script[type="application/ld+json"]');
    if (!jsonLd) {
      jsonLd = document.createElement('script');
      jsonLd.setAttribute('type', 'application/ld+json');
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, ogImage, canonicalUrl]);

  return null;
};

export default SEOHead;