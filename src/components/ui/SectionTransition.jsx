import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SectionTransition = ({ children, className = '', delay = 0 }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: inView ? 1 : 0, 
        y: inView ? 0 : 50 
      }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: 'easeOut'
      }}
    >
      {children}
    </motion.div>
  );
};

export default SectionTransition;