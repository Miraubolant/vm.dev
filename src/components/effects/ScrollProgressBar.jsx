import React from 'react';
import { motion } from 'framer-motion';
import { useScrollEffect } from '../../hooks/useScrollEffect';

const ScrollProgressBar = () => {
  const { scrollY } = useScrollEffect();
  
  // Calculer le pourcentage de scroll
  const scrollProgress = Math.min(
    (scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100,
    100
  );

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-neon-red via-electric-blue to-cyber-purple"
      style={{
        scaleX: scrollProgress / 100,
        transformOrigin: '0%'
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: scrollProgress / 100 }}
      transition={{ duration: 0.1 }}
    />
  );
};

export default ScrollProgressBar;