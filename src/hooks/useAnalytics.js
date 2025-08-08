import { useEffect } from 'react';

export const useAnalytics = () => {
  useEffect(() => {
    // Check if analytics cookies are accepted
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) return;

    const preferences = JSON.parse(consent);
    if (!preferences.analytics) return;

    // Initialize Google Analytics (replace with your GA4 ID)
    const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href
    });

    // Track page views
    const trackPageView = (url, title) => {
      gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
        page_title: title
      });
    };

    // Track events
    const trackEvent = (action, category, label, value) => {
      gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    };

    // Track scroll depth
    let maxScroll = 0;
    const trackScrollDepth = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
        maxScroll = scrollPercent;
        trackEvent('scroll', 'engagement', `${scrollPercent}%`, scrollPercent);
      }
    };

    // Track time on page
    const startTime = Date.now();
    const trackTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (timeSpent > 30) { // Only track if user spent more than 30 seconds
        trackEvent('time_on_page', 'engagement', 'seconds', timeSpent);
      }
    };

    // Track form interactions
    const trackFormInteraction = (formName, action) => {
      trackEvent(action, 'form', formName);
    };

    // Track button clicks
    const trackButtonClick = (buttonName, section) => {
      trackEvent('click', 'button', `${section}_${buttonName}`);
    };

    // Track section views
    const trackSectionView = (sectionName) => {
      trackEvent('view', 'section', sectionName);
    };

    // Add event listeners
    window.addEventListener('scroll', trackScrollDepth, { passive: true });
    window.addEventListener('beforeunload', trackTimeOnPage);

    // Expose tracking functions globally
    window.trackEvent = trackEvent;
    window.trackPageView = trackPageView;
    window.trackFormInteraction = trackFormInteraction;
    window.trackButtonClick = trackButtonClick;
    window.trackSectionView = trackSectionView;

    // Track initial page load
    trackEvent('page_load', 'navigation', window.location.pathname);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', trackScrollDepth);
      window.removeEventListener('beforeunload', trackTimeOnPage);
    };

  }, []);

  // Return tracking functions for components to use
  return {
    trackEvent: (action, category, label, value) => {
      if (window.gtag) {
        window.trackEvent(action, category, label, value);
      }
    },
    trackPageView: (url, title) => {
      if (window.gtag) {
        window.trackPageView(url, title);
      }
    },
    trackFormInteraction: (formName, action) => {
      if (window.gtag) {
        window.trackFormInteraction(formName, action);
      }
    },
    trackButtonClick: (buttonName, section) => {
      if (window.gtag) {
        window.trackButtonClick(buttonName, section);
      }
    },
    trackSectionView: (sectionName) => {
      if (window.gtag) {
        window.trackSectionView(sectionName);
      }
    }
  };
};