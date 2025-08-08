import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Shield, Eye, Scale } from 'lucide-react';
import Button from '../ui/Button';

const LegalPages = ({ isOpen, onClose, page = 'privacy' }) => {
  const [activePage, setActivePage] = useState(page);

  const pages = [
    {
      key: 'privacy',
      title: 'Politique de Confidentialité',
      icon: Shield,
      content: {
        lastUpdate: '15 Janvier 2025',
        sections: [
          {
            title: 'Collecte des données',
            content: `Nous collectons uniquement les données nécessaires au bon fonctionnement de nos services :
            • Données de contact (nom, email, téléphone) via le formulaire de contact
            • Données de navigation (cookies techniques) pour l'expérience utilisateur
            • Données analytiques anonymisées pour améliorer le site`
          },
          {
            title: 'Utilisation des données',
            content: `Vos données sont utilisées exclusivement pour :
            • Répondre à vos demandes de contact
            • Améliorer nos services
            • Respecter nos obligations légales
            Nous ne vendons jamais vos données à des tiers.`
          },
          {
            title: 'Vos droits',
            content: `Conformément au RGPD, vous disposez des droits suivants :
            • Droit d'accès à vos données
            • Droit de rectification
            • Droit à l'effacement
            • Droit à la portabilité
            Pour exercer ces droits, contactez-nous à victor@mirault.dev`
          }
        ]
      }
    },
    {
      key: 'terms',
      title: 'Conditions Générales de Vente',
      icon: FileText,
      content: {
        lastUpdate: '15 Janvier 2025',
        sections: [
          {
            title: 'Prestations',
            content: `Victor Mirault propose les services suivants :
            • Développement de sites web sur-mesure
            • Création d'applications web
            • Formation à l'utilisation des interfaces
            • Maintenance et support technique`
          },
          {
            title: 'Tarifs et paiement',
            content: `• Devis gratuit sous 48h
            • Acompte de 30% à la commande
            • Solde à la livraison
            • Paiement par virement bancaire ou PayPal
            • TVA non applicable (micro-entreprise)`
          },
          {
            title: 'Délais et livraison',
            content: `• Réponse garantie sous 48h
            • Livraison sous 2 semaines maximum
            • Formation incluse dans le prix
            • Support 30 jours offert
            • Révisions incluses selon devis`
          },
          {
            title: 'Propriété intellectuelle',
            content: `• Le client devient propriétaire du code source
            • Licence d'utilisation des frameworks tiers
            • Droit de modification et redistribution
            • Crédits développeur appréciés mais non obligatoires`
          }
        ]
      }
    },
    {
      key: 'legal',
      title: 'Mentions Légales',
      icon: Scale,
      content: {
        lastUpdate: '15 Janvier 2025',
        sections: [
          {
            title: 'Éditeur du site',
            content: `Victor Mirault
            Développeur Web Freelance
            Micro-entreprise
            SIRET : [À compléter]
            Email : victor@mirault.dev
            Téléphone : +33 6 XX XX XX XX`
          },
          {
            title: 'Hébergement',
            content: `Site hébergé par Netlify
            Netlify, Inc.
            2325 3rd Street, Suite 296
            San Francisco, CA 94107
            États-Unis`
          },
          {
            title: 'Responsabilité',
            content: `L'éditeur s'efforce d'assurer l'exactitude des informations diffusées sur ce site.
            Cependant, il ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition.
            L'utilisation des informations se fait sous la responsabilité de l'utilisateur.`
          }
        ]
      }
    },
    {
      key: 'cookies',
      title: 'Politique des Cookies',
      icon: Eye,
      content: {
        lastUpdate: '15 Janvier 2025',
        sections: [
          {
            title: 'Qu\'est-ce qu\'un cookie ?',
            content: `Un cookie est un petit fichier texte stocké sur votre appareil lors de la visite d'un site web.
            Il permet de mémoriser vos préférences et d'améliorer votre expérience de navigation.`
          },
          {
            title: 'Types de cookies utilisés',
            content: `• Cookies nécessaires : Fonctionnement du site (obligatoires)
            • Cookies fonctionnels : Préférences utilisateur (optionnels)
            • Cookies analytiques : Statistiques de visite (optionnels)
            • Cookies marketing : Personnalisation publicitaire (optionnels)`
          },
          {
            title: 'Gestion des cookies',
            content: `Vous pouvez à tout moment :
            • Accepter ou refuser les cookies via notre bannière
            • Modifier vos préférences dans les paramètres
            • Supprimer les cookies via votre navigateur
            • Désactiver les cookies dans votre navigateur`
          }
        ]
      }
    }
  ];

  const currentPage = pages.find(p => p.key === activePage);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-glass rounded-lg border-neon max-w-4xl w-full max-h-[90vh] overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-electric-blue/30">
            <div className="flex items-center space-x-4">
              {pages.map((page) => {
                const IconComponent = page.icon;
                return (
                  <button
                    key={page.key}
                    onClick={() => setActivePage(page.key)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all cursor-pointer ${
                      activePage === page.key
                        ? 'bg-neon-red text-white'
                        : 'text-gray-400 hover:text-white hover:bg-electric-blue/20'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="font-orbitron text-sm font-medium hidden md:block">
                      {page.title}
                    </span>
                  </button>
                );
              })}
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
            <motion.div
              key={activePage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <h1 className="font-orbitron font-bold text-2xl text-gradient mb-2">
                  {currentPage.title}
                </h1>
                <p className="text-gray-400 text-sm">
                  Dernière mise à jour : {currentPage.content.lastUpdate}
                </p>
              </div>

              <div className="space-y-6">
                {currentPage.content.sections.map((section, index) => (
                  <motion.div
                    key={index}
                    className="bg-primary-dark rounded-lg p-6 border border-electric-blue/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h2 className="font-orbitron font-bold text-lg text-blue-400 mb-4">
                      {section.title}
                    </h2>
                    <div className="font-inter text-gray-300 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-electric-blue/10 rounded-lg border border-electric-blue/30">
                <p className="font-inter text-sm text-gray-300">
                  <strong className="text-blue-400">Contact :</strong> Pour toute question concernant ces conditions, 
                  contactez-nous à <a href="mailto:victor@mirault.dev" className="text-neon-red hover:underline cursor-pointer">victor@mirault.dev</a>
                </p>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-electric-blue/30 flex justify-end">
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
    </AnimatePresence>
  );
};

export default LegalPages;