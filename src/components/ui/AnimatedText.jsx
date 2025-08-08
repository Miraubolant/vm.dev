import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnimatedText = ({ 
  text, 
  className = '', 
  speed = 60, 
  delay = 0, 
  showCursor = true,
  cursorColor = 'bg-gradient-to-r from-red-500 to-orange-500'
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursorBlink, setShowCursorBlink] = useState(true);

  useEffect(() => {
    if (!text) return;

    const startTimer = setTimeout(() => {
      setIsTyping(true);
      let index = 0;
      
      const typingTimer = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(typingTimer);
        }
      }, speed);

      return () => clearInterval(typingTimer);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [text, speed, delay]);

  return (
    <span className={`relative inline-block ${className}`}>
      {displayText}
      {showCursor && (
        <motion.span
          className={`inline-block w-2 h-10 ml-1 ${cursorColor}`}
          animate={{ opacity: showCursorBlink ? [1, 0, 1] : 1 }}
          transition={{ 
            duration: 0.5, 
            repeat: isTyping ? 0 : Infinity,
            ease: 'easeInOut'
          }}
        />
      )}
    </span>
  );
};

export default AnimatedText;