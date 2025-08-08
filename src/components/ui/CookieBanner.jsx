import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings, Shield, Eye } from 'lucide-react';
import Button from './Button';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
    functional: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    setShowBanner(false);
    
    // Initialize analytics if accepted
    if (allAccepted.analytics) {
      initializeAnalytics();
    }
  };

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    setPreferences(necessaryOnly);
    localStorage.setItem('cookie-consent', JSON.stringify(necessaryOnly));
    setShowBanner(false);
  };

  const savePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    setShowBanner(false);
    setShowSettings(false);
    
    // Initialize analytics if accepted
    if (preferences.analytics) {
      initializeAnalytics();
    }
  };

  const initializeAnalytics = () => {
    // Initialize Google Analytics or other analytics tools
    console.log('Analytics initialized');
  };

  const cookieTypes = [
    {
      key: 'necessary',
      title: 'Cookies Nécessaires',
      description: 'Ces cookies sont essentiels au fonctionnement du site.',
      icon: Shield,
      required: true
    },
    {
      key: 'functional',
      title: 'Cookies Fonctionnels',
      description: 'Améliorent l\'expérience utilisateur (préférences, langue).',
      icon: Settings,
      required: false
    },
    {
      key: 'analytics',
      title: 'Cookies Analytiques',
      description: 'Nous aident à comprendre comment vous utilisez le site.',
      icon: Eye,
      required: false
    },
    {
      key: 'marketing',
      title: 'Cookies Marketing',
      description: 'Utilisés pour personnaliser les publicités.',
      icon: Cookie,
      required: false
    }
  ];

  return (
    <AnimatePresence>
      {showBanner && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Cookie Banner */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 bg-glass border-t border-electric-blue p-6"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-7xl mx-auto">
              {!showSettings ? (
                // Main Banner
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0 lg:space-x-6">
                  <div className="flex items-start space-x-4 flex-1">
                    <Cookie className="w-8 h-8 text-neon-red flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-orbitron font-bold text-lg text-gradient mb-2">
                        🍪 Gestion des Cookies
                      </h3>
                      <p className="font-inter text-gray-300 text-sm leading-relaxed">
                        Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et personnaliser le contenu. 
                        Vous pouvez accepter tous les cookies ou personnaliser vos préférences.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowSettings(true)}
                      className="cursor-pointer"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Personnaliser
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={acceptNecessary}
                      className="cursor-pointer"
                    >
                      Nécessaires uniquement
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={acceptAll}
                      className="cursor-pointer"
                    >
                      Accepter tout
                    </Button>
                  </div>
                </div>
              ) : (
                // Settings Panel
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-orbitron font-bold text-xl text-gradient">
                      Préférences des Cookies
                    </h3>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cookieTypes.map((type) => {
                      const IconComponent = type.icon;
                      return (
                        <div
                          key={type.key}
                          className="bg-primary-dark rounded-lg p-4 border border-electric-blue/30"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <IconComponent className="w-5 h-5 text-blue-400" />
                              <h4 className="font-orbitron font-medium text-white">
                                {type.title}
                              </h4>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={preferences[type.key]}
                                onChange={(e) => !type.required && setPreferences({
                                  ...preferences,
                                  [type.key]: e.target.checked
                                })}
                                disabled={type.required}
                                className="sr-only"
                              />
                              <div className={`w-11 h-6 rounded-full transition-colors ${
                                preferences[type.key] 
                                  ? 'bg-neon-red' 
                                  : 'bg-gray-600'
                              } ${type.required ? 'opacity-50' : ''}`}>
                                <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                                  preferences[type.key] ? 'translate-x-5' : 'translate-x-0.5'
                                } mt-0.5`} />
                              </div>
                            </label>
                          </div>
                          <p className="text-gray-400 text-sm">
                            {type.description}
                            {type.required && (
                              <span className="text-yellow-400 ml-1">(Obligatoire)</span>
                            )}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-end space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => setShowSettings(false)}
                      className="cursor-pointer"
                    >
                      Annuler
                    </Button>
                    <Button
                      variant="primary"
                      onClick={savePreferences}
                      className="cursor-pointer"
                    >
                      Sauvegarder les préférences
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;