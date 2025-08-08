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
        return 'bg-gradient-to-r from-red-500 via-red-400 to-orange-500 text-white border border-red-400/30 hover:border-red-300/50 shadow-lg hover:shadow-red-500/25 hover:shadow-xl relative overflow-hidden';
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
        return 'px-8 py-4 text-lg min-h-[56px] md:min-h-[60px]';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  return (
    <motion.button
      className={`
        font-orbitron font-bold rounded-xl cursor-pointer
        transition-all duration-300 transform group
        disabled:opacity-50 disabled:cursor-not-allowed
        active:scale-95 hover:scale-105
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ 
        scale: disabled ? 1 : 1.02,
        y: disabled ? 0 : -2
      }}
      whileTap={{ 
        scale: disabled ? 1 : 0.98,
        y: disabled ? 0 : 0
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 25
      }}
      {...props}
    >
      {/* Effet de brillance animé */}
      {variant === 'primary' && !disabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: 'easeInOut'
          }}
        />
      )}
      
      {/* Contenu du bouton */}
      <span className="relative z-10 flex items-center justify-center space-x-2">
        {children}
      </span>
      
      {/* Effet de pulsation en arrière-plan */}
      {variant === 'primary' && !disabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      )}
    </motion.button>
  );
};

export default Button;