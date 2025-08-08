import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Edit3, 
  Image, 
  Palette, 
  DollarSign, 
  RotateCcw, 
  Play,
  Zap,
  Monitor,
  Smartphone
} from 'lucide-react';
import ParticleSystem from '../effects/ParticleSystem';
import DigitalGrid from '../effects/DigitalGrid';
import Button from '../ui/Button';

const InteractiveDemo = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  // État de la démo
  const [viewMode, setViewMode] = useState('desktop');
  const [demoState, setDemoState] = useState({
    title: 'Boulangerie Moderne',
    subtitle: 'Artisan boulanger depuis 1985',
    heroImage: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800',
    primaryColor: '#E94560',
    secondaryColor: '#0F3460',
    products: [
      { name: 'Pain de campagne', price: 3.50 },
      { name: 'Croissant', price: 1.20 },
      { name: 'Éclair au chocolat', price: 2.80 }
    ]
  });

  const [activeControl, setActiveControl] = useState(null);
  const [isResetting, setIsResetting] = useState(false);

  // Images disponibles pour la démo
  const availableImages = [
    'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1586947/pexels-photo-1586947.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=800'
  ];

  const resetDemo = () => {
    setIsResetting(true);
    setTimeout(() => {
      setDemoState({
        title: 'Boulangerie Moderne',
        subtitle: 'Artisan boulanger depuis 1985',
        heroImage: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800',
        primaryColor: '#E94560',
        secondaryColor: '#0F3460',
        products: [
          { name: 'Pain de campagne', price: 3.50 },
          { name: 'Croissant', price: 1.20 },
          { name: 'Éclair au chocolat', price: 2.80 }
        ]
      });
      setActiveControl(null);
      setIsResetting(false);
    }, 500);
  };

  const updateProduct = (index, field, value) => {
    const newProducts = [...demoState.products];
    newProducts[index] = { ...newProducts[index], [field]: value };
    setDemoState({ ...demoState, products: newProducts });
  };

  return (
    <section id="demo" className="section-padding relative overflow-hidden bg-secondary-dark">
      {/* Background Effects */}
      <DigitalGrid className="opacity-20" />
      <ParticleSystem count={60} />

      <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
        {/* Section Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: inView ? 1 : 0, 
            y: inView ? 0 : 30 
          }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-orbitron font-bold text-4xl md:text-6xl text-gradient mb-6">
            DÉMO INTERACTIVE
          </h2>
          <p className="font-inter text-lg text-gray-300 max-w-3xl mx-auto">
            Testez l'interface d'administration en temps réel. Modifiez le contenu et voyez les changements instantanément !
          </p>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mt-6"
            initial={{ width: 0 }}
            animate={{ width: inView ? 96 : 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        {/* Demo Container */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Controls Panel */}
          <motion.div
            className="lg:col-span-1 space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ 
              opacity: inView ? 1 : 0, 
              x: inView ? 0 : -50 
            }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-glass rounded-lg p-6 border-neon">
              <h3 className="font-orbitron font-bold text-xl text-blue-400 mb-6 flex items-center">
                <Monitor className="w-5 h-5 mr-2" />
                CONTRÔLES
              </h3>

              {/* Title Control */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Edit3 className="w-4 h-4 inline mr-1" />
                  Titre principal
                </label>
                <input
                  type="text"
                  value={demoState.title}
                  onChange={(e) => setDemoState({ ...demoState, title: e.target.value })}
                  className="w-full px-3 py-2 bg-primary-dark border border-electric-blue rounded text-white focus:border-neon-red transition-colors cursor-text"
                  onFocus={() => setActiveControl('title')}
                  onBlur={() => setActiveControl(null)}
                />
              </div>

              {/* Subtitle Control */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Sous-titre
                </label>
                <input
                  type="text"
                  value={demoState.subtitle}
                  onChange={(e) => setDemoState({ ...demoState, subtitle: e.target.value })}
                  className="w-full px-3 py-2 bg-primary-dark border border-electric-blue rounded text-white focus:border-neon-red transition-colors cursor-text"
                  onFocus={() => setActiveControl('subtitle')}
                  onBlur={() => setActiveControl(null)}
                />
              </div>

              {/* Image Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Image className="w-4 h-4 inline mr-1" />
                  Image d'en-tête
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {availableImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Option ${index + 1}`}
                      className={`w-full h-16 object-cover rounded cursor-pointer border-2 transition-all ${
                        demoState.heroImage === img 
                          ? 'border-neon-red shadow-glow-neon' 
                          : 'border-electric-blue hover:border-purple-400'
                      }`}
                      onClick={() => setDemoState({ ...demoState, heroImage: img })}
                    />
                  ))}
                </div>
              </div>

              {/* Color Controls */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Palette className="w-4 h-4 inline mr-1" />
                  Couleur principale
                </label>
                <div className="flex space-x-2">
                  {['#E94560', '#0F3460', '#533483', '#F39C12', '#27AE60'].map((color) => (
                    <motion.div
                      key={color}
                      className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                        demoState.primaryColor === color ? 'border-white' : 'border-gray-600'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setDemoState({ ...demoState, primaryColor: color })}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>
              </div>

              {/* Reset Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={resetDemo}
                disabled={isResetting}
                className="w-full cursor-pointer"
              >
                <RotateCcw className={`w-4 h-4 mr-2 ${isResetting ? 'animate-spin' : ''}`} />
                {isResetting ? 'Reset...' : 'Reset Demo'}
              </Button>
            </div>
          </motion.div>

          {/* Preview Panel */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ 
              opacity: inView ? 1 : 0, 
              x: inView ? 0 : 50 
            }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="space-y-6">
              {/* View Mode Switcher */}
              <div className="flex justify-center">
                <div className="bg-glass rounded-lg p-2 border-neon flex space-x-2">
                  <button
                    onClick={() => setViewMode('desktop')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all cursor-pointer ${
                      viewMode === 'desktop'
                        ? 'bg-neon-red text-white'
                        : 'text-gray-400 hover:text-white hover:bg-electric-blue/20'
                    }`}
                  >
                    <Monitor className="w-5 h-5" />
                    <span>Desktop</span>
                  </button>
                  <button
                    onClick={() => setViewMode('mobile')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all cursor-pointer ${
                      viewMode === 'mobile'
                        ? 'bg-neon-red text-white'
                        : 'text-gray-400 hover:text-white hover:bg-electric-blue/20'
                    }`}
                  >
                    <Smartphone className="w-5 h-5" />
                    <span>Mobile</span>
                  </button>
                </div>
              </div>

              {/* Preview Container */}
              <div className={`relative ${
                viewMode === 'mobile' ? 'max-w-sm mx-auto' : ''
              }`}>
                <AnimatePresence mode="wait">
                  {viewMode === 'mobile' ? (
                    /* Mobile Frame */
                    <motion.div
                      key="mobile-frame"
                      className="relative"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Phone Shadow */}
                      <div className="absolute inset-0 bg-black/20 rounded-[3rem] blur-xl transform translate-y-4 scale-105"></div>
                      
                      {/* Phone Frame */}
                      <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl">
                        {/* Screen Bezel */}
                        <div className="bg-black rounded-[2.5rem] p-1">
                          {/* Screen */}
                          <div className="bg-white rounded-[2.2rem] overflow-hidden relative">
                            {/* Status Bar */}
                            <div className="absolute top-0 left-0 right-0 h-8 bg-black z-20 flex items-center justify-between px-6">
                              <div className="flex items-center space-x-1">
                                <div className="text-white text-xs font-medium">9:41</div>
                              </div>
                              <div className="flex items-center space-x-1">
                                <div className="w-4 h-2 border border-white rounded-sm">
                                  <div className="w-3 h-1 bg-white rounded-sm m-0.5"></div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Dynamic Island */}
                            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-full z-30"></div>
                            
                            {/* Content */}
                            <div className="pt-10">
                              <MobilePreview demoState={demoState} activeControl={activeControl} />
                            </div>
                            
                            {/* Home Indicator */}
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-black rounded-full opacity-60"></div>
                          </div>
                        </div>
                        
                        {/* Side Buttons */}
                        <div className="absolute left-0 top-20 w-1 h-8 bg-gray-700 rounded-r-full"></div>
                        <div className="absolute left-0 top-32 w-1 h-12 bg-gray-700 rounded-r-full"></div>
                        <div className="absolute left-0 top-48 w-1 h-12 bg-gray-700 rounded-r-full"></div>
                        <div className="absolute right-0 top-32 w-1 h-16 bg-gray-700 rounded-l-full"></div>
                      </div>
                    </motion.div>
                  ) : (
                    /* Desktop Frame */
                    <motion.div
                      key="desktop-frame"
                      className="relative"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Monitor Shadow */}
                      <div className="absolute inset-0 bg-black/20 rounded-2xl blur-2xl transform translate-y-6 scale-105"></div>
                      
                      {/* Monitor Frame */}
                      <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-4 shadow-2xl">
                        {/* Screen Bezel */}
                        <div className="bg-black rounded-xl p-2">
                          {/* Screen */}
                          <div className="bg-glass rounded-lg overflow-hidden border border-electric-blue/30 shadow-inner">
                            <DesktopPreview demoState={demoState} activeControl={activeControl} />
                          </div>
                        </div>
                        
                        {/* Monitor Stand */}
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-lg"></div>
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-48 h-2 bg-gradient-to-b from-gray-800 to-gray-900 rounded-full"></div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Demo Stats */}
        <motion.div
          className="mt-6 grid grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: inView ? 1 : 0, 
            y: inView ? 0 : 20 
          }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="bg-glass rounded-lg p-4 text-center border-neon">
            <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gradient">48h</div>
            <div className="text-sm text-gray-400">Réponse garantie</div>
          </div>
          <div className="bg-glass rounded-lg p-4 text-center border-neon">
            <Play className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gradient">2 sem</div>
            <div className="text-sm text-gray-400">Livraison max</div>
          </div>
          <div className="bg-glass rounded-lg p-4 text-center border-neon">
            <Monitor className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gradient">100%</div>
            <div className="text-sm text-gray-400">Responsive</div>
          </div>
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ 
          opacity: inView ? 1 : 0, 
          y: inView ? 0 : 30 
        }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <p className="font-inter text-lg text-gray-300 mb-6">
          Impressionnant ? C'est exactement ce que vous aurez avec votre site !
        </p>
        <Button
          variant="primary"
          size="lg"
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="cursor-pointer"
        >
          🚀 CRÉER MON SITE MAINTENANT
        </Button>
      </motion.div>
    </section>
  );
};

// Composant Desktop Preview
const DesktopPreview = ({ demoState, activeControl }) => {
  return (
    <div className="min-h-[500px]">
      {/* Browser Header */}
      <div className="bg-gradient-to-r from-primary-dark to-secondary-dark px-6 py-4 border-b border-electric-blue/50 flex items-center space-x-3">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg hover:bg-red-400 transition-colors cursor-pointer"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg hover:bg-yellow-400 transition-colors cursor-pointer"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg hover:bg-green-400 transition-colors cursor-pointer"></div>
        </div>
        <div className="flex-1 bg-glass rounded-lg px-4 py-2 text-sm text-gray-300 font-mono border border-electric-blue/30">
          https://boulangerie-moderne.fr
        </div>
        <div className="flex space-x-3">
          <div className="w-6 h-6 bg-electric-blue/20 rounded flex items-center justify-center">
            <Monitor className="w-4 h-4 text-blue-400" />
          </div>
          <div className="w-6 h-6 bg-gray-600/20 rounded flex items-center justify-center">
            <Smartphone className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Website Preview */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${demoState.title}-${demoState.heroImage}-${demoState.primaryColor}`}
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Hero Section */}
          <div className="relative h-80 overflow-hidden">
            <img
              src={demoState.heroImage}
              alt="Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center text-white">
                <motion.h1
                  className="text-4xl md:text-5xl font-bold mb-4"
                  style={{ color: demoState.primaryColor }}
                  animate={activeControl === 'title' ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {demoState.title}
                </motion.h1>
                <motion.p
                  className="text-xl"
                  animate={activeControl === 'subtitle' ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {demoState.subtitle}
                </motion.p>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="p-6 bg-white">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Nos Spécialités</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {demoState.products.map((product, index) => (
                <div key={index} className="border-2 rounded-xl p-6 hover:shadow-xl transition-all hover:scale-105">
                  <h3 className="font-bold text-gray-800 text-lg">{product.name}</h3>
                  <p 
                    className="text-2xl font-bold mt-2"
                    style={{ color: demoState.primaryColor }}
                  >
                    {product.price.toFixed(2)}€
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="p-8 text-center" style={{ backgroundColor: \`${demoState.primaryColor}15` }}>
            <button
              className="px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: demoState.primaryColor }}
            >
              Nous Contacter
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Composant Mobile Preview
const MobilePreview = ({ demoState, activeControl }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={\`mobile-${demoState.title}-${demoState.heroImage}-${demoState.primaryColor}`}
        className="relative bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Mobile Hero Section */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={demoState.heroImage}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <motion.h1
                className="text-2xl font-bold mb-3"
                style={{ color: demoState.primaryColor }}
                animate={activeControl === 'title' ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {demoState.title}
              </motion.h1>
              <motion.p
                className="text-base"
                animate={activeControl === 'subtitle' ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {demoState.subtitle}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Mobile Products Section */}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Nos Spécialités</h2>
          <div className="space-y-3">
            {demoState.products.map((product, index) => (
              <div key={index} className="border-2 rounded-xl p-4 flex justify-between items-center hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-gray-800">{product.name}</h3>
                <p 
                  className="text-xl font-bold"
                  style={{ color: demoState.primaryColor }}
                >
                  {product.price.toFixed(2)}€
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile CTA Section */}
        <div className="p-6 text-center" style={{ backgroundColor: \`${demoState.primaryColor}15` }}>
          <button
            className="w-full py-4 rounded-xl text-white font-bold hover:opacity-90 transition-all hover:scale-105 text-base"
            style={{ backgroundColor: demoState.primaryColor }}
          >
            Nous Contacter
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InteractiveDemo;