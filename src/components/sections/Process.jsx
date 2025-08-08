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
  CheckCircle,
  Clock,
  Target,
  Sparkles
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

  const stepColors = [
    'from-red-500 to-orange-500',
    'from-blue-500 to-cyan-500', 
    'from-purple-500 to-pink-500',
    'from-green-500 to-emerald-500',
    'from-yellow-500 to-orange-500',
    'from-indigo-500 to-purple-500'
  ];
  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: inView ? 1 : 0, 
        y: inView ? 0 : 50
      }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      {/* Timeline Line - Vertical for mobile, Horizontal for desktop */}
      {!isLast && (
        <>
          {/* Mobile: Vertical line */}
          <motion.div
            className="absolute left-8 top-24 w-1 h-20 bg-gradient-to-b from-electric-blue to-cyber-purple md:hidden rounded-full"
            initial={{ height: 0 }}
            animate={{ height: inView ? 80 : 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
          />
          
          {/* Desktop: Horizontal line */}
          <motion.div
            className="hidden md:block absolute top-8 left-24 w-20 h-1 bg-gradient-to-r from-electric-blue to-cyber-purple rounded-full"
            initial={{ width: 0 }}
            animate={{ width: inView ? 80 : 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
          />
        </>
      )}

      {/* Step Content */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 w-full">
        {/* Step Icon & Number */}
        <motion.div
          className="flex-shrink-0 relative z-10"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Outer glow ring */}
          <motion.div
            className={`absolute inset-0 w-16 h-16 bg-gradient-to-r ${stepColors[index]} rounded-full opacity-20 blur-md`}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          {/* Main icon container */}
          <div className={`w-16 h-16 bg-gradient-to-r ${stepColors[index]} rounded-full flex items-center justify-center relative shadow-lg`}>
            <IconComponent className="w-7 h-7 text-white drop-shadow-lg" />
            
            {/* Step number badge */}
            <div className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center text-sm font-bold text-gray-800 shadow-lg border-2 border-gray-100">
              {index + 1}
            </div>
          </div>
        </motion.div>

        {/* Step Details */}
        <motion.div
          className="flex-1 bg-glass rounded-xl p-6 border border-electric-blue/30 hover:border-electric-blue/60 transition-all duration-300 group"
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col">
            <div className="flex-1">
              {/* Step title with gradient */}
              <h3 className={`font-orbitron font-bold text-xl bg-gradient-to-r ${stepColors[index]} bg-clip-text text-transparent mb-3 group-hover:scale-105 transition-transform`}>
                {step.title}
              </h3>
              
              {/* Step description */}
              <p className="font-inter text-gray-300 leading-relaxed mb-4 group-hover:text-gray-200 transition-colors">
                {step.description}
              </p>
              
              {/* Enhanced features list */}
              <div className="space-y-2 mb-4">
                {step.features?.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center text-sm text-gray-400 group-hover:text-gray-300 transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -10 }}
                    transition={{ delay: index * 0.2 + idx * 0.1 + 0.5 }}
                  >
                    <Sparkles className="w-3 h-3 text-yellow-400 mr-2 flex-shrink-0" />
                    {feature}
                  </motion.div>
                ))}
              </div>
              
              {/* Status indicator */}
              <motion.div
                className="flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: inView ? 1 : 0 }}
                transition={{ delay: index * 0.2 + 1 }}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400 font-medium">Étape validée</span>
                </div>
                
                {/* Duration badge */}
                <div className="flex items-center gap-1 px-3 py-1 bg-blue-500/20 rounded-full">
                  <Clock className="w-3 h-3 text-blue-400" />
                  <span className="text-xs text-blue-400 font-medium">{step.duration}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Connection arrow */}
      {!isLast && (
        <motion.div
          className="flex justify-center mt-4 md:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -10 }}
          transition={{ delay: index * 0.2 + 0.8 }}
        >
          <ArrowRight className="w-6 h-6 text-electric-blue rotate-90" />
        </motion.div>
      )}
    </motion.div>
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
          <motion.h2 
            className="font-orbitron font-bold text-4xl md:text-6xl mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            PROCESSUS DIGITAL
            </span>
          </motion.h2>
          
          <motion.div
            className="flex items-center justify-center gap-2 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ delay: 0.3 }}
          >
            <Target className="w-5 h-5 text-neon-red" />
            <span className="font-orbitron text-lg text-neon-red font-medium">6 ÉTAPES OPTIMISÉES</span>
            <Target className="w-5 h-5 text-neon-red" />
          </motion.div>
          
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
        <div className="space-y-12">
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

        {/* Process Summary */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-glass to-glass/50 rounded-2xl p-8 border border-electric-blue/30 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: inView ? 1 : 0, 
            y: inView ? 0 : 30 
          }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-purple-500/5 to-blue-500/5" />
          
          <div className="relative z-10">
          <h3 className="font-orbitron font-bold text-2xl text-gradient mb-6">
            🎯 RÉSULTAT GARANTI
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="text-center p-4 bg-red-500/10 rounded-xl border border-red-500/20"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl font-bold text-neon-red mb-2">2 sem</div>
              <div className="text-gray-300 font-medium">Livraison maximum</div>
            </motion.div>
            <motion.div 
              className="text-center p-4 bg-blue-500/10 rounded-xl border border-blue-500/20"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl font-bold text-electric-blue mb-2">100%</div>
              <div className="text-gray-300 font-medium">Interface intuitive</div>
            </motion.div>
            <motion.div 
              className="text-center p-4 bg-purple-500/10 rounded-xl border border-purple-500/20"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl font-bold text-cyber-purple mb-2">∞</div>
              <div className="text-gray-300 font-medium">Autonomie totale</div>
            </motion.div>
          </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;