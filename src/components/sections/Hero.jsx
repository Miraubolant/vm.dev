import React from 'react';
import { motion } from 'framer-motion';
import ParticleSystem from '../effects/ParticleSystem';
import DigitalGrid from '../effects/DigitalGrid';
import AnimatedText from '../ui/AnimatedText';
import Button from '../ui/Button';
import { HERO_CONTENT } from '../../utils/constants';
import GlitchText from '../ui/GlitchText';

const Hero = () => {
  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <DigitalGrid className="opacity-30" />
      <ParticleSystem count={60} />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Title */}
          <motion.h1 
            className="font-orbitron font-black text-4xl md:text-6xl lg:text-7xl mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <AnimatedText 
              text="Besoin d'un site Web ?"
              className="text-gradient"
              speed={35}
              delay={200}
              showCursor={true}
              cursorColor="bg-gradient-to-r from-red-500 to-orange-500"
            />
          </motion.h1>

          {/* Animated Subtitle */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.4 }}
          >
            <h2 className="font-orbitron font-bold text-2xl md:text-4xl text-blue-300 mb-4">
              <AnimatedText 
                text={HERO_CONTENT.subtitle}
                speed={45}
                delay={2000}
                showCursor={false}
               cursorColor="bg-white"
               className="text-white"
              />
            </h2>
          </motion.div>

          {/* Tagline */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.4 }}
          >
            <p className="font-orbitron font-medium text-lg md:text-xl text-gradient mb-4 max-w-4xl mx-auto">
              {HERO_CONTENT.tagline}
            </p>
          </motion.div>

          {/* Description */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.3, duration: 0.4 }}
          >
            <p className="font-inter text-lg text-gray-300 max-w-2xl mx-auto">
              {HERO_CONTENT.description}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.6, duration: 0.4 }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={scrollToDemo}
              className="cursor-pointer"
            >
              ⚡ LANCER LA DÉMO
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={scrollToPortfolio}
              className="cursor-pointer"
            >
              🎯 VOIR MES PROJETS
            </Button>
          </motion.div>
        </motion.div>

      </div>

      {/* Gradient Overlays */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary-dark to-transparent" />
    </section>
  );
};

export default Hero;