import { useEffect } from 'react';

const SitemapGenerator = () => {
  useEffect(() => {
    // Generate sitemap data
    const sitemapData = {
      pages: [
        {
          url: 'https://victormirault.dev',
          lastmod: new Date().toISOString().split('T')[0],
          changefreq: 'weekly',
          priority: '1.0'
        },
        {
          url: 'https://victormirault.dev#about',
          lastmod: new Date().toISOString().split('T')[0],
          changefreq: 'monthly',
          priority: '0.8'
        },
        {
          url: 'https://victormirault.dev#demo',
          lastmod: new Date().toISOString().split('T')[0],
          changefreq: 'monthly',
          priority: '0.9'
        },
        {
          url: 'https://victormirault.dev#portfolio',
          lastmod: new Date().toISOString().split('T')[0],
          changefreq: 'weekly',
          priority: '0.9'
        },
        {
          url: 'https://victormirault.dev#process',
          lastmod: new Date().toISOString().split('T')[0],
          changefreq: 'monthly',
          priority: '0.7'
        },
        {
          url: 'https://victormirault.dev#contact',
          lastmod: new Date().toISOString().split('T')[0],
          changefreq: 'monthly',
          priority: '0.8'
        }
      ]
    };

    // Store sitemap data for potential server-side generation
    window.sitemapData = sitemapData;

    // Generate robots.txt content
    const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://victormirault.dev/sitemap.xml

# Disallow admin areas (if any)
Disallow: /admin/
Disallow: /.env
Disallow: /api/private/

# Allow all crawlers to access main content
Allow: /#about
Allow: /#demo
Allow: /#portfolio
Allow: /#process
Allow: /#contact`;

    window.robotsTxt = robotsTxt;

  }, []);

  return null;
};

export default SitemapGenerator;