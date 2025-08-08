import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ParticleSystem from '../effects/ParticleSystem';
import DigitalGrid from '../effects/DigitalGrid';
import { ABOUT_PILLARS } from '../../utils/constants';
import SkillsShowcase from '../ui/SkillsShowcase';
import TestimonialCarousel from '../ui/TestimonialCarousel';

const AnimatedCounter = ({ target, unit, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const increment = target / 100;
      const timer = setInterval(() => {
        start += increment;
        if (start > target) {
          start = target;
          clearInterval(timer);
        }
        setCount(Math.floor(start));
      }, 30);

      return () => clearInterval(timer);
    }
  }, [target, inView]);

  return (
    <motion.span
      className="text-4xl md:text-5xl font-bold text-gradient"
      animate={{ scale: inView ? [1, 1.1, 1] : 1 }}
      transition={{ duration: 0.5 }}
    >
      {count}{unit}
    </motion.span>
  );
};

const PillarCard = ({ pillar, index, inView }) => {
  return (
    <motion.div
      className="bg-glass rounded-lg p-8 text-center glow-hover cursor-pointer group"
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: inView ? 1 : 0, 
        y: inView ? 0 : 50 
      }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.2,
        ease: 'easeOut'
      }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      {/* Icon */}
      <motion.div
        className="text-6xl mb-4"
        whileHover={{ scale: 1.2, rotate: 10 }}
        transition={{ duration: 0.3 }}
      >
        {pillar.icon}
      </motion.div>

      {/* Title */}
      <h3 className="font-orbitron font-bold text-2xl text-red-400 mb-2 group-hover:text-red-300 transition-colors">
        {pillar.title}
      </h3>

      {/* Counter */}
      <div className="mb-4">
        <AnimatedCounter 
          target={pillar.counter} 
          unit={pillar.unit}
          inView={inView}
        />
      </div>

      {/* Subtitle */}
      <p className="font-inter text-gray-300 group-hover:text-white transition-colors">
        {pillar.subtitle}
      </p>

      {/* Animated Border */}
      <motion.div
        className="absolute inset-0 border-2 border-transparent rounded-lg"
        whileHover={{
          borderColor: 'var(--neon-red)',
          boxShadow: '0 0 20px rgba(233, 69, 96, 0.3)'
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <DigitalGrid className="opacity-30" />
      <ParticleSystem count={60} />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(15, 52, 96, 0.3) 0%, transparent 50%)',
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: inView ? 1 : 0, 
            y: inView ? 0 : 30 
          }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-orbitron font-bold text-4xl md:text-6xl text-gradient mb-6">
            POURQUOI CHOISIR VICTOR ?
          </h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto"
            initial={{ width: 0 }}
            animate={{ width: inView ? 96 : 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {ABOUT_PILLARS.map((pillar, index) => (
            <PillarCard
              key={pillar.title}
              pillar={pillar}
              index={index}
              inView={inView}
            />
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="font-inter text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Chaque projet est unique, mais ma méthode reste la même : 
            <span className="text-blue-400 font-semibold"> comprendre vos besoins</span>,
            <span className="text-purple-400 font-semibold"> créer une solution sur-mesure</span>, et
            <span className="text-red-400 font-semibold"> vous former pour l'autonomie totale</span>.
          </p>
        </motion.div>

        {/* Skills Showcase */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <SkillsShowcase />
        </motion.div>

        {/* Testimonials */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <TestimonialCarousel />
        </motion.div>

      </div>
    </section>
  );
};

export default About;