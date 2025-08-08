import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollEffect } from '../../hooks/useScrollEffect';
import { NAVIGATION_ITEMS } from '../../utils/constants';
import { Menu, X, Code2 } from 'lucide-react';
import { useAnalytics } from '../../hooks/useAnalytics';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScrollEffect();
  const [activeSection, setActiveSection] = useState('hero');
  const { trackButtonClick } = useAnalytics();

  useEffect(() => {
    const handleSectionChange = () => {
      const sections = NAVIGATION_ITEMS.map(item => item.href.slice(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom > 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleSectionChange);
    return () => window.removeEventListener('scroll', handleSectionChange);
  }, []);

  const scrollToSection = (href) => {
    // Fermer le menu mobile d'abord
    setIsOpen(false);
    
    // Attendre que l'animation de fermeture se termine
    setTimeout(() => {
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      
      if (element) {
        // Calculer l'offset pour le header fixe
        const headerHeight = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Tracker l'événement
        trackButtonClick && trackButtonClick(`nav_${targetId}`, 'header');
      }
    }, isOpen ? 300 : 0);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Tracker l'événement
    trackButtonClick && trackButtonClick('logo_home', 'header');
  };

  // Fermer le menu si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.mobile-menu-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  // Fermer le menu lors du scroll
  useEffect(() => {
    if (isOpen && scrollY > 0) {
      setIsOpen(false);
    }
  }, [scrollY, isOpen]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-glass backdrop-blur-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.button
            className="flex items-center space-x-2"
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Code2 className="w-8 h-8 text-red-500" />
            <span className="font-orbitron font-bold text-xl text-gradient">
              VM.DEV
            </span>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {NAVIGATION_ITEMS.map((item, index) => (
                <motion.button
                  key={item.href}
                  className={`font-orbitron px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                    activeSection === item.href.slice(1)
                      ? 'text-red-400 border-b-2 border-red-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                  onClick={() => scrollToSection(item.href)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Menu de navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            className="md:hidden mobile-menu-container"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-glass rounded-lg mt-2 border border-electric-blue/30">
              {NAVIGATION_ITEMS.map((item, index) => (
                <motion.button
                  key={item.href}
                  className={`block w-full text-left px-4 py-3 text-base font-medium font-orbitron cursor-pointer transition-all duration-200 ${
                    activeSection === item.href.slice(1)
                      ? 'text-red-400 bg-red-500/20 border-l-4 border-red-400'
                      : 'text-gray-300 hover:text-white hover:bg-electric-blue/20 hover:border-l-4 hover:border-electric-blue'
                  } rounded-md border-l-4 border-transparent`}
                  onClick={() => scrollToSection(item.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-current rounded-full mr-3 opacity-60" />
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Mobile Overlay */}
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </nav>

      {/* Navigation indicator */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500"
        style={{ width: '100%' }}
      />
    </motion.header>
  );
};

export default Header;