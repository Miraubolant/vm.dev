import React from 'react';
import { motion } from 'framer-motion';
import { useTypingEffect } from '../../hooks/useTypingEffect';

const AnimatedText = ({ 
  text, 
  className = '', 
  speed = 100, 
  delay = 0,
  showCursor = true,
  cursorColor = 'bg-red-500'
}) => {
  const { displayText, isTyping } = useTypingEffect(text, speed, delay);

  return (
    <span className={`${className} relative`}>
      {displayText}
      {showCursor && (
        <motion.span
          className={`inline-block w-0.5 h-6 ${cursorColor} ml-1`}
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ 
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}
    </span>
  );
};

export default AnimatedText;