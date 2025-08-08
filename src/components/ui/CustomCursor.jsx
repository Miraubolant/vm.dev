import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState('default');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleElementHover = (e) => {
      const element = e.target;
      
      if (element.matches('button, a, .cursor-pointer')) {
        setCursorType('pointer');
      } else if (element.matches('input, textarea, .cursor-text')) {
        setCursorType('text');
      } else if (element.matches('.cursor-code, code, pre')) {
        setCursorType('code');
      } else {
        setCursorType('default');
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleElementHover);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleElementHover);
    };
  }, []);

  const getCursorVariant = () => {
    switch (cursorType) {
      case 'pointer':
        return {
          scale: 1.5,
          backgroundColor: 'var(--neon-red)',
          mixBlendMode: 'difference'
        };
      case 'text':
        return {
          scale: 0.8,
          backgroundColor: 'var(--electric-blue)',
          borderRadius: '2px'
        };
      case 'code':
        return {
          scale: 1.2,
          backgroundColor: 'var(--digital-orange)',
          opacity: 0.8
        };
      default:
        return {
          scale: 1,
          backgroundColor: 'var(--cyber-purple)',
          opacity: 0.6
        };
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-50 mix-blend-mode-difference"
        style={{
          borderRadius: '50%',
          backgroundColor: 'var(--text-light)',
        }}
        animate={{
          x: position.x - 8,
          y: position.y - 8,
          ...getCursorVariant()
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 500,
          mass: 0.5
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-40 border border-current opacity-30"
        style={{
          borderRadius: '50%',
          borderColor: 'var(--electric-blue)',
        }}
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: cursorType === 'pointer' ? 1.5 : 1
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 300,
          mass: 0.8
        }}
      />
    </>
  );
};

export default CustomCursor;