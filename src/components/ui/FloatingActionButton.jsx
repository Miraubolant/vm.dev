import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, MessageCircle, Phone, Mail } from 'lucide-react';

const FloatingActionButton = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

      window.removeEventListener('resize', handleResize);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const quickActions = [
    {
      icon: Mail,
      label: 'Email',
      action: () => window.open('mailto:victor@mirault.dev'),
      color: 'bg-blue-500'
    },
    {
      icon: Phone,
      label: 'Appel',
      action: () => window.open('tel:+33600000000'),
      color: 'bg-green-500'
    },
    {
      icon: MessageCircle,
      label: 'Contact',
      action: scrollToContact,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
      {/* Quick Actions Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={`absolute ${isMobile ? 'bottom-16 right-0' : 'bottom-20 right-0'} space-y-3`}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <motion.button
                  key={action.label}
                  className={`flex items-center ${isMobile ? 'justify-center w-12 h-12' : 'space-x-3 px-4 py-3'} ${action.color} text-white rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer`}
                  onClick={action.action}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent className="w-5 h-5" />
                  {!isMobile && <span className="font-medium whitespace-nowrap">{action.label}</span>}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <div className={`flex flex-col ${isMobile ? 'space-y-2' : 'space-y-3'}`}>
        {/* Scroll to Top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} bg-electric-blue text-white rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center`}
              onClick={scrollToTop}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUp className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'}`} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Menu Toggle */}
        <motion.button
          className={`${isMobile ? 'w-12 h-12' : 'w-14 h-14'} bg-neon-red text-white rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center relative overflow-hidden`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: isMenuOpen ? 45 : 0 }}
        >
          {/* Background glow effect */}
          <motion.div
            className="absolute inset-0 bg-neon-red rounded-full opacity-30"
            animate={{ scale: isMenuOpen ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.5, repeat: isMenuOpen ? Infinity : 0 }}
          />
          <MessageCircle className={`${isMobile ? 'w-5 h-5' : 'w-7 h-7'} relative z-10`} />
          
          {/* Notification badge */}
          {!isMenuOpen && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.button>
      </div>
      
      {/* Mobile overlay when menu is open */}
      {isMobile && isMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default FloatingActionButton;