import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FileText, 
  Building, 
  Palette, 
  Zap, 
  Search, 
  GraduationCap,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import ParticleSystem from '../effects/ParticleSystem';
import DigitalGrid from '../effects/DigitalGrid';
import { PROCESS_STEPS } from '../../utils/constants';

const ProcessStep = ({ step, index, inView, isLast }) => {
  const icons = {
    '📋': FileText,
    '🏗️': Building,
    '🎨': Palette,
    '⚡': Zap,
    '🔍': Search,
    '🎓': GraduationCap
  };

  const IconComponent = icons[step.icon] || FileText;

  return (
    <div className="relative flex items-center">
      {/* Timeline Line - Vertical for mobile, Horizontal for desktop */}
      {!isLast && (
        <>
          {/* Mobile: Vertical line */}
          <motion.div
            className="absolute left-6 top-20 w-0.5 h-24 bg-gradient-to-b from-electric-blue to-cyber-purple md:hidden"
            initial={{ height: 0 }}
            animate={{ height: inView ? 96 : 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
          />
          
          {/* Desktop: Horizontal line */}
          <motion.div
            className="hidden md:block absolute top-6 left-20 w-24 h-0.5 bg-gradient-to-r from-electric-blue to-cyber-purple"
            initial={{ width: 0 }}
            animate={{ width: inView ? 96 : 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
          />
        </>
      )}

      {/* Step Content */}
      <motion.div
        className="flex flex-col md:flex-row items-start md:items-center gap-6 w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: inView ? 1 : 0, 
          y: inView ? 0 : 50
        }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
      >
        {/* Step Icon & Number */}
        <motion.div
          className="flex-shrink-0 relative z-10"
          whileHover={{ scale: 1.1 }}
        >
          <div className="w-12 h-12 bg-glass rounded-full flex items-center justify-center border-2 border-electric-blue relative">
            <IconComponent className="w-6 h-6 text-neon-red" />
          </div>
          
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-neon-red rounded-full opacity-20"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Step number */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-neon-red rounded-full flex items-center justify-center text-xs font-bold text-white">
            {index + 1}
          </div>
        </motion.div>

        {/* Step Details */}
        <motion.div
          className="flex-1 bg-glass rounded-lg p-6 border-neon glow-hover"
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <h3 className="font-orbitron font-bold text-xl text-gradient mb-3">
                {step.title}
              </h3>
              <p className="font-inter text-gray-300 leading-relaxed mb-4">
                {step.description}
              </p>
              
              {/* Progress Indicator */}
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: inView ? 1 : 0 }}
                transition={{ delay: index * 0.2 + 1 }}
              >
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400 font-medium">Étape validée</span>
              </motion.div>
            </div>

            {/* Arrow for desktop */}
            {!isLast && (
              <motion.div
                className="hidden md:flex items-center justify-center ml-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -20 }}
                transition={{ delay: index * 0.2 + 0.8 }}
              >
                <ArrowRight className="w-6 h-6 text-electric-blue" />
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const Process = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <section id="process" className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <DigitalGrid className="opacity-20" />
      <ParticleSystem count={60} />

      <div className="relative z-10 max-w-6xl mx-auto" ref={ref}>
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
            PROCESSUS DIGITAL
          </h2>
          <p className="font-inter text-lg text-gray-300 max-w-3xl mx-auto">
            De l'idée à l'autonomie totale : découvrez ma méthode éprouvée en 6 étapes
          </p>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mt-6"
            initial={{ width: 0 }}
            animate={{ width: inView ? 96 : 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        {/* Process Timeline */}
        <div className="space-y-8 md:space-y-12">
          {/* Mobile: Vertical Layout */}
          <div className="md:hidden space-y-8">
            {PROCESS_STEPS.map((step, index) => (
              <ProcessStep
                key={step.title}
                step={step}
                index={index}
                inView={inView}
                isLast={index === PROCESS_STEPS.length - 1}
              />
            ))}
          </div>

          {/* Desktop: Horizontal Layout */}
          <div className="hidden md:block">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {PROCESS_STEPS.map((step, index) => (
                <motion.div
                  key={step.title}
                  className="relative"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ 
                    opacity: inView ? 1 : 0, 
                    y: inView ? 0 : 50 
                  }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                >
                  {/* Connection Line for Grid */}
                  {index < PROCESS_STEPS.length - 1 && (
                    <motion.div
                      className="absolute top-6 -right-4 w-8 h-0.5 bg-gradient-to-r from-electric-blue to-cyber-purple hidden xl:block"
                      initial={{ width: 0 }}
                      animate={{ width: inView ? 32 : 0 }}
                      transition={{ duration: 0.8, delay: index * 0.15 + 0.5 }}
                    />
                  )}

                  {/* Step Card */}
                  <motion.div
                    className="bg-glass rounded-lg p-6 border-neon glow-hover h-full"
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Icon & Number */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-neon-red/20 rounded-full flex items-center justify-center">
                          {React.createElement(
                            {
                              '📋': FileText,
                              '🏗️': Building,
                              '🎨': Palette,
                              '⚡': Zap,
                              '🔍': Search,
                              '🎓': GraduationCap
                            }[step.icon] || FileText,
                            { className: "w-6 h-6 text-neon-red" }
                          )}
                        </div>
                        <motion.div
                          className="absolute inset-0 bg-neon-red rounded-full opacity-20"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                      <div className="w-8 h-8 bg-electric-blue rounded-full flex items-center justify-center text-sm font-bold text-white">
                        {index + 1}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="font-orbitron font-bold text-lg text-gradient mb-3">
                      {step.title}
                    </h3>
                    <p className="font-inter text-gray-300 text-sm leading-relaxed mb-4">
                      {step.description}
                    </p>

                    {/* Status */}
                    <motion.div
                      className="flex items-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: inView ? 1 : 0 }}
                      transition={{ delay: index * 0.15 + 1 }}
                    >
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-green-400 font-medium">Validé</span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Process Summary */}
        <motion.div
          className="mt-16 bg-glass rounded-lg p-8 border-neon text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: inView ? 1 : 0, 
            y: inView ? 0 : 30 
          }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <h3 className="font-orbitron font-bold text-2xl text-gradient mb-6">
            RÉSULTAT GARANTI
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl font-bold text-neon-red mb-2">2 sem</div>
              <div className="text-gray-300">Livraison maximum</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl font-bold text-electric-blue mb-2">100%</div>
              <div className="text-gray-300">Interface intuitive</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl font-bold text-cyber-purple mb-2">∞</div>
              <div className="text-gray-300">Autonomie totale</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;