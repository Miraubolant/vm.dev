import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GlitchText = ({ 
  text, 
  className = '', 
  glitchIntensity = 'medium',
  triggerOnHover = false 
}) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (!triggerOnHover) {
      const interval = setInterval(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200);
      }, 3000 + Math.random() * 2000);

      return () => clearInterval(interval);
    }
  }, [triggerOnHover]);

  const getGlitchVariants = () => {
    const intensity = {
      low: { x: [-1, 1], y: [-1, 1] },
      medium: { x: [-2, 2], y: [-2, 2] },
      high: { x: [-4, 4], y: [-4, 4] }
    };

    return intensity[glitchIntensity] || intensity.medium;
  };

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => triggerOnHover && setIsGlitching(true)}
      onMouseLeave={() => triggerOnHover && setIsGlitching(false)}
    >
      {/* Main text */}
      <motion.span
        className="relative z-10"
        animate={isGlitching ? {
          x: getGlitchVariants().x,
          y: getGlitchVariants().y,
        } : { x: 0, y: 0 }}
        transition={{ 
          duration: 0.1, 
          repeat: isGlitching ? 3 : 0,
          repeatType: 'reverse'
        }}
      >
        {text}
      </motion.span>

      {/* Glitch layers */}
      {isGlitching && (
        <>
          <motion.span
            className="absolute top-0 left-0 text-red-500 opacity-70 mix-blend-multiply"
            animate={{ x: [-2, 2], y: [1, -1] }}
            transition={{ duration: 0.1, repeat: 3, repeatType: 'reverse' }}
          >
            {text}
          </motion.span>
          <motion.span
            className="absolute top-0 left-0 text-blue-500 opacity-70 mix-blend-multiply"
            animate={{ x: [2, -2], y: [-1, 1] }}
            transition={{ duration: 0.1, repeat: 3, repeatType: 'reverse' }}
          >
            {text}
          </motion.span>
        </>
      )}
    </motion.span>
  );
};

export default GlitchText;