import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick,
  disabled = false,
  ...props 
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-red-500 to-orange-500 text-white border-neon hover:shadow-neon-pulse';
      case 'secondary':
        return 'bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white';
      case 'outline':
        return 'bg-transparent border border-purple-400 text-purple-300 hover:bg-purple-500 hover:text-white';
      default:
        return 'bg-gray-700 text-white hover:bg-gray-600';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'lg':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  return (
    <motion.button
      className={`
        font-orbitron font-medium rounded-lg cursor-pointer
        transition-all duration-300 transform
        glow-hover disabled:opacity-50 disabled:cursor-not-allowed
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;