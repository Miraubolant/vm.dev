import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: 'Marie Dubois',
      role: 'Directrice Marketing',
      company: 'Restaurant Le Gourmet',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'Victor a transformé notre présence en ligne ! Site livré en 10 jours, interface admin ultra-simple. Nos réservations ont augmenté de 300% !',
      project: 'Site vitrine + réservations'
    },
    {
      id: 2,
      name: 'Thomas Martin',
      role: 'CEO',
      company: 'Boutique Mode Élégance',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'E-commerce parfait ! Formation incluse, je gère tout seul maintenant. Paiements Stripe, gestion stock... Tout fonctionne parfaitement.',
      project: 'E-commerce complet'
    },
    {
      id: 3,
      name: 'Sophie Laurent',
      role: 'Avocate Associée',
      company: 'Cabinet Juridis',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'Professionnel, réactif, efficace. Site corporate livré en temps record avec prise de RDV automatisée. Mes clients adorent !',
      project: 'Site professionnel'
    },
    {
      id: 4,
      name: 'Pierre Moreau',
      role: 'Agent Immobilier',
      company: 'Agence Premium',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'Plateforme immobilière avec recherche avancée et visite 360°. Mes ventes ont doublé grâce à cette solution innovante !',
      project: 'Plateforme immobilière'
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="bg-glass rounded-lg p-8 border-neon relative overflow-hidden">
      <motion.h3
        className="font-orbitron font-bold text-2xl text-gradient mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        TÉMOIGNAGES CLIENTS
      </motion.h3>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="text-center"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            {/* Quote Icon */}
            <Quote className="w-12 h-12 text-neon-red mx-auto mb-6 opacity-50" />

            {/* Testimonial Text */}
            <blockquote className="font-inter text-lg text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              "{testimonials[currentIndex].text}"
            </blockquote>

            {/* Rating */}
            <div className="flex justify-center mb-4">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>

            {/* Client Info */}
            <div className="flex items-center justify-center space-x-4">
              <img
                src={testimonials[currentIndex].avatar}
                alt={testimonials[currentIndex].name}
                className="w-16 h-16 rounded-full object-cover border-2 border-electric-blue"
              />
              <div className="text-left">
                <h4 className="font-orbitron font-bold text-white">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-blue-400 text-sm">
                  {testimonials[currentIndex].role}
                </p>
                <p className="text-gray-400 text-sm">
                  {testimonials[currentIndex].company}
                </p>
                <p className="text-purple-400 text-xs mt-1">
                  {testimonials[currentIndex].project}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-electric-blue/20 hover:bg-electric-blue/40 rounded-full flex items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6 text-blue-400" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-electric-blue/20 hover:bg-electric-blue/40 rounded-full flex items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronRight className="w-6 h-6 text-blue-400" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
              index === currentIndex
                ? 'bg-neon-red scale-125'
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="absolute top-4 right-4">
        <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-400' : 'bg-gray-400'}`} />
      </div>
    </div>
  );
};

export default TestimonialCarousel;