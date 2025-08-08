import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter,
  ExternalLink,
  Heart,
  Zap,
  Shield,
  Clock,
  ArrowUp
} from 'lucide-react';
import ParticleSystem from '../effects/ParticleSystem';
import DigitalGrid from '../effects/DigitalGrid';
import { NAVIGATION_ITEMS } from '../../utils/constants';

const Footer = ({ onOpenLegalPage, onOpenSitemap }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      url: 'https://github.com/victormirault',
      color: 'hover:text-gray-300'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/victormirault',
      color: 'hover:text-blue-400'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      url: 'https://twitter.com/victormirault',
      color: 'hover:text-blue-300'
    }
  ];

  const services = [
    'Sites Vitrine',
    'E-commerce',
    'Applications Web',
    'Refonte de sites',
    'Formation',
    'Maintenance'
  ];

  const guarantees = [
    {
      icon: Clock,
      text: 'Réponse sous 48h'
    },
    {
      icon: Zap,
      text: 'Livraison 2 semaines max'
    },
    {
      icon: Shield,
      text: 'Support illimité offert'
    }
  ];

  return (
    <footer className="relative bg-primary-dark border-t border-electric-blue/30 overflow-hidden">
      {/* Background Effects */}
      <DigitalGrid className="opacity-10" />
      <ParticleSystem count={60} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <Code2 className="w-8 h-8 text-red-500" />
              <span className="font-orbitron font-bold text-xl text-gradient">
                VM.DEV
              </span>
            </div>
            <p className="font-inter text-gray-300 mb-6 leading-relaxed">
              Développeur français spécialisé dans l'autonomie digitale. 
              Je transforme vos idées en sites web performants avec formation incluse.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-glass rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-all cursor-pointer border border-electric-blue/30`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-orbitron font-bold text-lg text-gradient mb-6">
              NAVIGATION
            </h3>
            <ul className="space-y-3">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="font-inter text-gray-300 hover:text-white transition-colors cursor-pointer flex items-center group"
                  >
                    <span className="w-2 h-2 bg-neon-red rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-orbitron font-bold text-lg text-gradient mb-6">
              SERVICES
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service} className="font-inter text-gray-300 hover:text-white transition-colors cursor-pointer flex items-center group">
                  <span className="w-2 h-2 bg-electric-blue rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Guarantees */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="font-orbitron font-bold text-lg text-gradient mb-6">
              CONTACT
            </h3>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-3 text-neon-red" />
                <span className="font-inter text-sm">victor@mirault.dev</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 mr-3 text-electric-blue" />
                <span className="font-inter text-sm">+33 6 XX XX XX XX</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-3 text-cyber-purple" />
                <span className="font-inter text-sm">France, Remote</span>
              </div>
            </div>

            {/* Guarantees */}
            <div className="space-y-2">
              {guarantees.map((guarantee, index) => {
                const IconComponent = guarantee.icon;
                return (
                  <div key={index} className="flex items-center text-green-400">
                    <IconComponent className="w-4 h-4 mr-2" />
                    <span className="font-inter text-xs">{guarantee.text}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="border-t border-electric-blue/30 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-gray-400">
              <span className="font-inter text-sm">
                © {currentYear} Victor Mirault. Développé avec
              </span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span className="font-inter text-sm">en France</span>
            </div>

            {/* Tech Stack */}
            <div className="flex items-center space-x-4 text-gray-400">
              <span className="font-inter text-sm">Propulsé par :</span>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-electric-blue/20 text-blue-300 text-xs rounded border border-electric-blue/30">
                  React
                </span>
                <span className="px-2 py-1 bg-cyber-purple/20 text-purple-300 text-xs rounded border border-cyber-purple/30">
                  Tailwind
                </span>
                <span className="px-2 py-1 bg-neon-red/20 text-red-300 text-xs rounded border border-neon-red/30">
                  Framer Motion
                </span>
              </div>
            </div>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors cursor-pointer group"
              whileHover={{ y: -2 }}
            >
              <span className="font-inter text-sm">Retour en haut</span>
              <ArrowUp className="w-4 h-4 group-hover:animate-bounce" />
            </motion.button>
          </div>
        </motion.div>

        {/* Legal Links */}
        <motion.div
          className="mt-8 pt-6 border-t border-electric-blue/20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center space-x-6 text-gray-500">
            <button 
              onClick={() => onOpenLegalPage('legal')}
              className="font-inter text-xs hover:text-gray-300 transition-colors cursor-pointer"
            >
              Mentions légales
            </button>
            <button 
              onClick={() => onOpenLegalPage('privacy')}
              className="font-inter text-xs hover:text-gray-300 transition-colors cursor-pointer"
            >
              Politique de confidentialité
            </button>
            <button 
              onClick={() => onOpenLegalPage('terms')}
              className="font-inter text-xs hover:text-gray-300 transition-colors cursor-pointer"
            >
              CGV
            </button>
            <button 
              onClick={() => onOpenLegalPage('cookies')}
              className="font-inter text-xs hover:text-gray-300 transition-colors cursor-pointer"
            >
              Cookies
            </button>
            <button 
              onClick={onOpenSitemap}
              className="font-inter text-xs hover:text-gray-300 transition-colors cursor-pointer"
            >
              Plan du site
            </button>
          </div>
        </motion.div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric-blue to-transparent" />
    </footer>
  );
};

export default Footer;