import React from 'react';
import { motion } from 'framer-motion';
import { X, Home, User, Monitor, Briefcase, Settings, Mail, FileText } from 'lucide-react';
import Button from '../ui/Button';

const SitemapPage = ({ isOpen, onClose }) => {
  const sitemapSections = [
    {
      title: 'Pages Principales',
      icon: Home,
      links: [
        { name: 'Accueil', href: '#hero', description: 'Page d\'accueil avec présentation' },
        { name: 'À propos', href: '#about', description: 'Présentation de Victor Mirault' },
        { name: 'Démo Interactive', href: '#demo', description: 'Test de l\'interface d\'administration' },
        { name: 'Portfolio', href: '#portfolio', description: 'Projets réalisés et références' },
        { name: 'Processus', href: '#process', description: 'Méthode de travail en 6 étapes' },
        { name: 'Contact', href: '#contact', description: 'Formulaire de contact et informations' }
      ]
    },
    {
      title: 'Services',
      icon: Settings,
      links: [
        { name: 'Sites Vitrine', href: '#portfolio', description: 'Création de sites de présentation' },
        { name: 'E-commerce', href: '#portfolio', description: 'Boutiques en ligne complètes' },
        { name: 'Applications Web', href: '#portfolio', description: 'Solutions web sur-mesure' },
        { name: 'Refonte de sites', href: '#contact', description: 'Modernisation de sites existants' },
        { name: 'Formation', href: '#process', description: 'Apprentissage de l\'interface' },
        { name: 'Maintenance', href: '#contact', description: 'Support technique continu' }
      ]
    },
    {
      title: 'Informations Légales',
      icon: FileText,
      links: [
        { name: 'Mentions légales', action: () => window.dispatchEvent(new CustomEvent('openLegal', { detail: 'legal' })) },
        { name: 'Politique de confidentialité', action: () => window.dispatchEvent(new CustomEvent('openLegal', { detail: 'privacy' })) },
        { name: 'Conditions Générales de Vente', action: () => window.dispatchEvent(new CustomEvent('openLegal', { detail: 'terms' })) },
        { name: 'Politique des Cookies', action: () => window.dispatchEvent(new CustomEvent('openLegal', { detail: 'cookies' })) }
      ]
    },
    {
      title: 'Contact & Réseaux',
      icon: Mail,
      links: [
        { name: 'Email', href: 'mailto:victor@mirault.dev', external: true },
        { name: 'Téléphone', href: 'tel:+33600000000', external: true },
        { name: 'GitHub', href: 'https://github.com/victormirault', external: true },
        { name: 'LinkedIn', href: 'https://linkedin.com/in/victormirault', external: true },
        { name: 'Twitter', href: 'https://twitter.com/victormirault', external: true }
      ]
    }
  ];

  const handleLinkClick = (link) => {
    if (link.action) {
      link.action();
      onClose();
    } else if (link.external) {
      window.open(link.href, '_blank');
    } else if (link.href.startsWith('#')) {
      const element = document.querySelector(link.href);
      if (element) {
        const headerHeight = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-glass rounded-lg border-neon max-w-6xl w-full max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-electric-blue/30">
          <div className="flex items-center space-x-3">
            <Home className="w-6 h-6 text-neon-red" />
            <h1 className="font-orbitron font-bold text-2xl text-gradient">
              PLAN DU SITE
            </h1>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sitemapSections.map((section, sectionIndex) => {
              const IconComponent = section.icon;
              return (
                <motion.div
                  key={section.title}
                  className="bg-primary-dark rounded-lg p-6 border border-electric-blue/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: sectionIndex * 0.1 }}
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-neon-red/20 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-neon-red" />
                    </div>
                    <h2 className="font-orbitron font-bold text-lg text-blue-400">
                      {section.title}
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <motion.button
                        key={link.name}
                        onClick={() => handleLinkClick(link)}
                        className="w-full text-left p-3 rounded-lg bg-glass hover:bg-electric-blue/20 transition-all cursor-pointer group border border-transparent hover:border-electric-blue/30"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: sectionIndex * 0.1 + linkIndex * 0.05 }}
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-orbitron font-medium text-white group-hover:text-blue-300 transition-colors">
                              {link.name}
                            </h3>
                            {link.description && (
                              <p className="text-gray-400 text-sm mt-1 group-hover:text-gray-300 transition-colors">
                                {link.description}
                              </p>
                            )}
                          </div>
                          {link.external && (
                            <div className="text-gray-500 group-hover:text-blue-400 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Site Stats */}
          <motion.div
            className="mt-8 bg-glass rounded-lg p-6 border-neon text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="font-orbitron font-bold text-xl text-gradient mb-4">
              STATISTIQUES DU SITE
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-2xl font-bold text-neon-red mb-1">6</div>
                <div className="text-gray-400 text-sm">Sections principales</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-electric-blue mb-1">15+</div>
                <div className="text-gray-400 text-sm">Pages de contenu</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyber-purple mb-1">100%</div>
                <div className="text-gray-400 text-sm">Responsive design</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-digital-orange mb-1">A+</div>
                <div className="text-gray-400 text-sm">Performance SEO</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-electric-blue/30 flex justify-between items-center">
          <p className="text-gray-400 text-sm">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
          <Button
            variant="primary"
            onClick={onClose}
            className="cursor-pointer"
          >
            Fermer
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SitemapPage;