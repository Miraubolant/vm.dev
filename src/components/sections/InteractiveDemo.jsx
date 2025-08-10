import React, { useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  // État de la démo
  const [viewMode, setViewMode] = useState(window.innerWidth < 768 ? 'mobile' : 'desktop');
  const [demoState, setDemoState] = useState({
    title: 'Agence Premium Immobilier',
    subtitle: 'Votre partenaire immobilier de confiance',
    heroImage: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
    primaryColor: '#E94560',
    secondaryColor: '#0F3460',
    products: [
      { name: 'Villa moderne 4 pièces', price: 450000 },
      { name: 'Appartement centre-ville', price: 280000 },
      { name: 'Maison avec jardin', price: 320000 }
    ]
  });

  const [activeControl, setActiveControl] = useState(null);
  const [isResetting, setIsResetting] = useState(false);

  // Sur mobile, toujours visible. Sur desktop, dépend du scroll
  const isVisible = isMobile || inView;

  // Mettre à jour le viewMode automatiquement selon la taille d'écran
  useEffect(() => {
    if (isMobile && viewMode === 'desktop') {
      setViewMode('mobile');
    }
  }, [isMobile, viewMode]);

  // Images disponibles pour la démo
  const availableImages = [
    'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800'
  ];

  const resetDemo = () => {
    setIsResetting(true);
    setTimeout(() => {
      setDemoState({
        title: 'Agence Premium Immobilier',
        subtitle: 'Votre partenaire immobilier de confiance',
        heroImage: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
        primaryColor: '#E94560',
        secondaryColor: '#0F3460',
        products: [
          { name: 'Villa moderne 4 pièces', price: 450000 },
          { name: 'Appartement centre-ville', price: 280000 },
          { name: 'Maison avec jardin', price: 320000 }
        ]
      });
      setActiveControl(null);
      setIsResetting(false);
    }, 500);
  };

  const updateProperty = (index, field, value) => {
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
            opacity: isVisible ? 1 : 0, 
            y: isVisible ? 0 : 30 
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
            animate={{ width: isVisible ? 96 : 0 }}
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
              opacity: isVisible ? 1 : 0, 
              x: isVisible ? 0 : -50 
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
                  className="w-full px-3 py-2 bg-gray-800 border border-electric-blue rounded text-white placeholder-gray-400 focus:border-neon-red focus:bg-gray-700 transition-colors cursor-text"
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
                  className="w-full px-3 py-2 bg-gray-800 border border-electric-blue rounded text-white placeholder-gray-400 focus:border-neon-red focus:bg-gray-700 transition-colors cursor-text"
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
              opacity: isVisible ? 1 : 0, 
              x: isVisible ? 0 : 50 
            }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Masquer les boutons de vue sur mobile */}
            {!isMobile && (
              <div className="flex space-x-4 mb-6">
              <motion.button
                onClick={() => setViewMode('desktop')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all cursor-pointer font-orbitron font-medium ${
                  viewMode === 'desktop'
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg scale-105'
                    : 'text-gray-400 hover:text-white hover:bg-electric-blue/30 hover:scale-102'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Monitor className="w-5 h-5" />
                <span>Desktop</span>
              </motion.button>
              <motion.button
                onClick={() => setViewMode('mobile')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all cursor-pointer font-orbitron font-medium ${
                  viewMode === 'mobile'
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg scale-105'
                    : 'text-gray-400 hover:text-white hover:bg-electric-blue/30 hover:scale-102'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Smartphone className="w-5 h-5" />
                <span>Mobile</span>
              </motion.button>
            </div>
            )}

            {/* Preview Container */}
            <div className={`relative ${
              viewMode === 'mobile' ? 'max-w-sm mx-auto' : 'max-w-6xl mx-auto'
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
          </motion.div>
        </div>

        {/* Demo Stats */}
        <motion.div
          className="mt-6 grid grid-cols-3 gap-4 mx-4 md:mx-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
           opacity: isVisible ? 1 : 0, 
           y: isVisible ? 0 : 20 
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
          opacity: isVisible ? 1 : 0, 
          y: isVisible ? 0 : 30 
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
    <div className="min-h-[600px] bg-gray-50">
      {/* Browser Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-3 border-b border-gray-700 flex items-center space-x-3 shadow-lg">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full shadow-md hover:bg-red-400 transition-all cursor-pointer hover:scale-110"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-md hover:bg-yellow-400 transition-all cursor-pointer hover:scale-110"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full shadow-md hover:bg-green-400 transition-all cursor-pointer hover:scale-110"></div>
        </div>
        <div className="flex items-center space-x-2 flex-1">
          <div className="flex-1 bg-gray-700 rounded-lg px-4 py-2 text-sm text-gray-300 font-mono border border-gray-600 flex items-center">
            <svg className="w-3 h-3 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            https://boulangerie-moderne.fr
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="w-6 h-6 bg-blue-500/20 rounded hover:bg-blue-500/30 transition-colors cursor-pointer flex items-center justify-center">
            <Monitor className="w-3 h-3 text-blue-400" />
          </div>
          <div className="w-6 h-6 bg-gray-600/20 rounded hover:bg-gray-600/30 transition-colors cursor-pointer flex items-center justify-center">
            <Smartphone className="w-3 h-3 text-gray-400" />
          </div>
          <div className="w-6 h-6 bg-gray-600/20 rounded hover:bg-gray-600/30 transition-colors cursor-pointer flex items-center justify-center">
            <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
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
          <div className="relative h-80 overflow-hidden group">
            <img
              src={demoState.heroImage}
              alt="Hero"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70 flex items-center justify-center">
              {/* Navigation overlay */}
              <div className="absolute top-4 left-0 right-0 flex justify-between items-center px-8">
                <div className="text-white font-bold text-lg opacity-90">🍞 Boulangerie</div>
                <div className="flex space-x-6 text-white/80 text-sm">
                  <span className="hover:text-white cursor-pointer transition-colors">Accueil</span>
                  <span className="hover:text-white cursor-pointer transition-colors">Produits</span>
                  <span className="hover:text-white cursor-pointer transition-colors">Contact</span>
                </div>
              </div>
              
              <div className="text-center text-white z-10">
                <motion.h1
                  className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg"
                  style={{ color: demoState.primaryColor }}
                  animate={activeControl === 'title' ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {demoState.title}
                </motion.h1>
                <motion.p
                  className="text-xl mb-6 drop-shadow-md opacity-90"
                  animate={activeControl === 'subtitle' ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {demoState.subtitle}
                </motion.p>
                <div className="flex justify-center space-x-4">
                  <button 
                    className="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white hover:bg-white/30 transition-all"
                    style={{ borderColor: demoState.primaryColor }}
                  >
                    Découvrir
                  </button>
                  <button 
                    className="px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-all shadow-lg"
                    style={{ backgroundColor: demoState.primaryColor }}
                  >
                    Commander
                  </button>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60">
                <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="p-8 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-3 text-gray-800">Nos Biens d'Exception</h2>
                <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundColor: demoState.primaryColor }}></div>
                <p className="text-gray-600 mt-4">Découvrez notre sélection de biens immobiliers premium</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {demoState.products.map((property, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-gray-100 group"
                  whileHover={{ y: -5 }}
                >
                  <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-gray-100 rounded-lg mb-4 flex items-center justify-center text-4xl">
                    {index === 0 ? '🏠' : index === 1 ? '🏢' : '🏡'}
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-gray-900 transition-colors">{property.name}</h3>
                  <div className="flex justify-between items-center">
                    <p 
                      className="text-2xl font-bold"
                      style={{ color: demoState.primaryColor }}
                    >
                      {property.price.toLocaleString()}€
                    </p>
                    <button 
                      className="px-4 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-all"
                      style={{ backgroundColor: demoState.primaryColor }}
                    >
                      Visiter
                    </button>
                  </div>
                  <div className="mt-3 flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-gray-500 text-sm ml-2">(4.9)</span>
                  </div>
                </motion.div>
              ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="p-12 text-center relative overflow-hidden" style={{ backgroundColor: `${demoState.primaryColor}15` }}>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Trouvez votre bien idéal</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">Contactez nos experts pour une estimation gratuite ou une visite personnalisée</p>
              <div className="flex justify-center space-x-4">
                <button
                  className="px-8 py-4 rounded-lg text-white font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: demoState.primaryColor }}
                >
                  📞 Estimation Gratuite
                </button>
                <button className="px-8 py-4 border-2 rounded-lg font-semibold hover:bg-gray-50 transition-all" style={{ borderColor: demoState.primaryColor, color: demoState.primaryColor }}>
                  📍 Nos Agences
                </button>
              </div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10" style={{ backgroundColor: demoState.primaryColor }}>
              <div className="w-full h-full rounded-full transform translate-x-16 -translate-y-16"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-24 h-24 opacity-10" style={{ backgroundColor: demoState.primaryColor }}>
              <div className="w-full h-full rounded-full transform -translate-x-12 translate-y-12"></div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="bg-gray-800 text-white p-6">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">🏠</div>
                <div>
                  <div className="font-bold">Premium Immobilier</div>
                  <div className="text-gray-400 text-sm">Votre partenaire depuis 1995</div>
                </div>
              </div>
              <div className="flex space-x-6 text-sm text-gray-400">
                <span>📍 15 Avenue des Champs</span>
                <span>📞 01 23 45 67 89</span>
                <span>✉️ contact@premium-immo.fr</span>
              </div>
            </div>
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
        key={`mobile-${demoState.title}-${demoState.heroImage}-${demoState.primaryColor}`}
        className="relative bg-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Mobile Hero Section */}
        <div className="relative h-64 overflow-hidden group">
          <img
            src={demoState.heroImage}
            alt="Hero"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70 flex flex-col">
            {/* Mobile Navigation */}
            <div className="flex justify-between items-center p-4 text-white">
              <div className="font-bold text-lg">🏠</div>
              <div className="w-6 h-6 flex flex-col justify-center cursor-pointer">
                <div className="w-full h-0.5 bg-white mb-1"></div>
                <div className="w-full h-0.5 bg-white mb-1"></div>
                <div className="w-full h-0.5 bg-white"></div>
              </div>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
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
        </div>

        {/* Mobile Products Section */}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Nos Biens</h2>
          <div className="space-y-3">
            {demoState.products.map((property, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all border border-gray-100 flex items-center space-x-4"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-gray-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                  {index === 0 ? '🏠' : index === 1 ? '🏢' : '🏡'}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-1">{property.name}</h3>
                  <div className="flex items-center text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-gray-500 text-xs ml-1">(4.9)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p 
                      className="text-lg font-bold"
                      style={{ color: demoState.primaryColor }}
                    >
                      {property.price.toLocaleString()}€
                    </p>
                    <button 
                      className="px-3 py-1 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-all"
                      style={{ backgroundColor: demoState.primaryColor }}
                    >
                      👁️
                    </button>
                </div>
              </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile CTA Section */}
        <div className="p-6 text-center relative overflow-hidden" style={{ backgroundColor: `${demoState.primaryColor}15` }}>
          <div className="relative z-10">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Trouvez votre bien</h3>
            <p className="text-gray-600 mb-4 text-sm">Estimation gratuite et visite personnalisée</p>
            <div className="space-y-3">
              <button
                className="w-full py-4 rounded-xl text-white font-bold hover:opacity-90 transition-all hover:scale-105 text-base shadow-lg"
                style={{ backgroundColor: demoState.primaryColor }}
              >
                📞 Estimation Gratuite
              </button>
              <button className="w-full py-3 border-2 rounded-xl font-semibold hover:bg-gray-50 transition-all text-sm" style={{ borderColor: demoState.primaryColor, color: demoState.primaryColor }}>
                📍 Nos Agences
              </button>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-20 h-20 opacity-10 rounded-full" style={{ backgroundColor: demoState.primaryColor }}>
          </div>
        </div>
        
        {/* Mobile Footer */}
        <div className="bg-gray-800 text-white p-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="text-xl">🏠</div>
              <div className="font-bold">Premium Immobilier</div>
            </div>
            <div className="text-gray-400 text-xs space-y-1">
              <div>📍 15 Avenue des Champs</div>
              <div>📞 01 23 45 67 89</div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InteractiveDemo;