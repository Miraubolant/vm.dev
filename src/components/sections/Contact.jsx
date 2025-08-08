import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Zap,
  Shield,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';
import ParticleSystem from '../effects/ParticleSystem';
import DigitalGrid from '../effects/DigitalGrid';
import Button from '../ui/Button';
import NotificationToast from '../ui/NotificationToast';
import { useNotification } from '../../hooks/useNotification';
import { useAnalytics } from '../../hooks/useAnalytics';

const Contact = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const { notifications, showNotification, hideNotification } = useNotification();
  const { trackFormInteraction, trackEvent } = useAnalytics();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // Track form submission
    trackFormInteraction('contact_form', 'submit');

    // Simulation d'envoi
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      showNotification('Message envoyé avec succès ! Réponse sous 48h garantie.', 'success');
      trackEvent('form_success', 'contact', 'contact_form');
      reset();
    } catch (error) {
      setSubmitStatus('error');
      showNotification('Erreur lors de l\'envoi. Veuillez réessayer.', 'error');
      trackEvent('form_error', 'contact', 'contact_form');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'victor@mirault.dev',
      description: 'Réponse sous 2h garantie'
    },
    {
      icon: Phone,
      label: 'Téléphone',
      value: '+33 6 43 51 76 80',
      description: 'Disponible 9h-19h'
    },
    {
      icon: MapPin,
      label: 'Localisation',
      value: 'France, Remote',
      description: 'Intervention nationale'
    },
    {
      icon: Clock,
      label: 'Disponibilité',
      value: '7j/7 - 24h/24',
      description: 'Support prioritaire'
    }
  ];

  const projectTypes = [
    { value: 'vitrine', label: 'Site Vitrine' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'webapp', label: 'Application Web' },
    { value: 'mobile', label: 'App Mobile' },
    { value: 'refonte', label: 'Refonte' },
    { value: 'autre', label: 'Autre' }
  ];

  const budgetRanges = [
    { value: '1000-3000', label: '1 000€ - 3 000€' },
    { value: '3000-5000', label: '3 000€ - 5 000€' },
    { value: '5000-10000', label: '5 000€ - 10 000€' },
    { value: '10000+', label: '10 000€+' }
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <DigitalGrid className="opacity-20" />
      <ParticleSystem count={60} />

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
            CONTACT DIRECT
          </h2>
          <p className="font-inter text-lg text-gray-300 max-w-3xl mx-auto">
            Prêt à transformer votre idée en réalité digitale ? Parlons de votre projet !
          </p>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mt-6"
            initial={{ width: 0 }}
            animate={{ width: inView ? 96 : 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="bg-glass rounded-lg p-8 border-neon"
            initial={{ opacity: 0, x: -50 }}
            animate={{ 
              opacity: inView ? 1 : 0, 
              x: inView ? 0 : -50 
            }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="font-orbitron font-bold text-2xl text-gradient mb-6 flex items-center">
              <Zap className="w-6 h-6 mr-2" />
              BRIEF EXPRESS
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    {...register('name', { required: 'Le nom est requis' })}
                    className="w-full px-4 py-3 bg-primary-dark border border-electric-blue rounded-lg text-white focus:border-neon-red focus:ring-1 focus:ring-neon-red transition-colors cursor-text"
                    placeholder="Votre nom"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    {...register('email', { 
                      required: 'L\'email est requis',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Email invalide'
                      }
                    })}
                    className="w-full px-4 py-3 bg-primary-dark border border-electric-blue rounded-lg text-white focus:border-neon-red focus:ring-1 focus:ring-neon-red transition-colors cursor-text"
                    placeholder="votre@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Project Type & Budget */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Type de projet *
                  </label>
                  <select
                    {...register('projectType', { required: 'Sélectionnez un type' })}
                    className="w-full px-4 py-3 bg-primary-dark border border-electric-blue rounded-lg text-white focus:border-neon-red focus:ring-1 focus:ring-neon-red transition-colors cursor-pointer"
                  >
                    <option value="">Choisir...</option>
                    {projectTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.projectType && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.projectType.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Budget estimé
                  </label>
                  <select
                    {...register('budget')}
                    className="w-full px-4 py-3 bg-primary-dark border border-electric-blue rounded-lg text-white focus:border-neon-red focus:ring-1 focus:ring-neon-red transition-colors cursor-pointer"
                  >
                    <option value="">Choisir...</option>
                    {budgetRanges.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Décrivez votre projet *
                </label>
                <textarea
                  {...register('message', { required: 'Le message est requis' })}
                  rows={5}
                  className="w-full px-4 py-3 bg-primary-dark border border-electric-blue rounded-lg text-white focus:border-neon-red focus:ring-1 focus:ring-neon-red transition-colors resize-none cursor-text"
                  placeholder="Décrivez votre projet, vos objectifs, vos contraintes..."
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    ENVOI EN COURS...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    ENVOYER LE BRIEF
                  </>
                )}
              </Button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  className="bg-green-500/20 border border-green-500 rounded-lg p-4 flex items-center text-green-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Message envoyé ! Réponse sous 2h garantie.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  className="bg-red-500/20 border border-red-500 rounded-lg p-4 flex items-center text-red-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Erreur d'envoi. Réessayez ou contactez-moi directement.
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ 
              opacity: inView ? 1 : 0, 
              x: inView ? 0 : 50 
            }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Contact Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <motion.div
                    key={info.label}
                    className="bg-glass rounded-lg p-6 border-neon glow-hover cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: inView ? 1 : 0, 
                      y: inView ? 0 : 20 
                    }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-neon-red/20 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-neon-red" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-orbitron font-bold text-lg text-gradient mb-1">
                          {info.label}
                        </h4>
                        <p className="font-inter text-white font-medium mb-1">
                          {info.value}
                        </p>
                        <p className="font-inter text-gray-400 text-sm">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Guarantees */}
            <motion.div
              className="bg-glass rounded-lg p-6 border-neon"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: inView ? 1 : 0, 
                y: inView ? 0 : 20 
              }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <h4 className="font-orbitron font-bold text-xl text-gradient mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                GARANTIES
              </h4>
              <div className="space-y-3">
                <div className="flex items-center text-green-400">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Réponse sous 2h garantie</span>
                </div>
                <div className="flex items-center text-green-400">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Livraison sous 2 semaines max</span>
                </div>
                <div className="flex items-center text-green-400">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Formation incluse</span>
                </div>
                <div className="flex items-center text-green-400">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Support illimité offert</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Notifications */}
      {notifications.map((notification) => (
        <NotificationToast
          key={notification.id}
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          isVisible={notification.isVisible}
          onClose={() => hideNotification(notification.id)}
        />
      ))}
    </section>
  );
};

export default Contact;