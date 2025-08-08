import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md', color = 'primary' }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'w-4 h-4';
      case 'lg': return 'w-8 h-8';
      case 'xl': return 'w-12 h-12';
      default: return 'w-6 h-6';
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'white': return 'border-white border-t-transparent';
      case 'blue': return 'border-electric-blue border-t-transparent';
      case 'red': return 'border-neon-red border-t-transparent';
      default: return 'border-cyber-purple border-t-transparent';
    }
  };

  return (
    <motion.div
      className={`${getSizeClasses()} border-2 rounded-full ${getColorClasses()}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }}
    />
  );
};

export default LoadingSpinner;