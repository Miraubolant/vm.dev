import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ExternalLink, 
  Github, 
  Filter,
  Zap,
  Smartphone,
  ShoppingCart,
  Building,
  Palette,
  Code2
} from 'lucide-react';
import ParticleSystem from '../effects/ParticleSystem';
import DigitalGrid from '../effects/DigitalGrid';
import Button from '../ui/Button';
import LazyImage from '../ui/LazyImage';

const Portfolio = () => {
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

  const [activeFilter, setActiveFilter] = useState('all');

  // Sur mobile, toujours visible. Sur desktop, dépend du scroll
  const isVisible = isMobile || inView;
  const projects = [
    {
      id: 1,
      title: 'Restaurant Le Gourmet',
      category: 'restaurant',
      image: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Site vitrine avec système de réservation et menu interactif',
      tech: ['React', 'Node.js', 'MongoDB'],
      liveUrl: '#',
      githubUrl: '#',
      features: ['Réservation en ligne', 'Menu dynamique', 'Interface admin']
    },
    {
      id: 2,
      title: 'Boutique Mode Élégance',
      category: 'ecommerce',
      image: 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'E-commerce complet avec paiement sécurisé et gestion stock',
      tech: ['Next.js', 'Stripe', 'PostgreSQL'],
      liveUrl: '#',
      githubUrl: '#',
      features: ['Paiement Stripe', 'Gestion stock', 'Dashboard vendeur']
    },
    {
      id: 3,
      title: 'Cabinet Avocat Juridis',
      category: 'corporate',
      image: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Site professionnel avec prise de rendez-vous et blog juridique',
      tech: ['WordPress', 'PHP', 'MySQL'],
      liveUrl: '#',
      githubUrl: '#',
      features: ['Prise RDV', 'Blog juridique', 'Espace client']
    },
    {
      id: 4,
      title: 'Agence Immobilière Premium',
      category: 'corporate',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Plateforme immobilière avec recherche avancée et visite virtuelle',
      tech: ['Vue.js', 'Laravel', 'Redis'],
      liveUrl: '#',
      githubUrl: '#',
      features: ['Recherche avancée', 'Visite 360°', 'CRM intégré']
    },
    {
      id: 5,
      title: 'Fitness Club Energy',
      category: 'service',
      image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Site de salle de sport avec planning cours et suivi membre',
      tech: ['React', 'Firebase', 'Stripe'],
      liveUrl: '#',
      githubUrl: '#',
      features: ['Planning cours', 'Suivi membre', 'Paiement abonnement']
    },
    {
      id: 6,
      title: 'Artisan Boulanger Tradition',
      category: 'restaurant',
      image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Site artisan avec commande en ligne et click & collect',
      tech: ['Shopify', 'JavaScript', 'API'],
      liveUrl: '#',
      githubUrl: '#',
      features: ['Commande en ligne', 'Click & Collect', 'Catalogue produits']
    }
  ];

  const filters = [
    { key: 'all', label: 'Tous les projets', icon: Filter },
    { key: 'restaurant', label: 'Restaurant', icon: Zap },
    { key: 'ecommerce', label: 'E-commerce', icon: ShoppingCart },
    { key: 'corporate', label: 'Corporate', icon: Building },
    { key: 'service', label: 'Service', icon: Smartphone }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const ProjectCard = ({ project, index }) => {
    return (
      <motion.div
        className="bg-glass rounded-lg overflow-hidden border-neon glow-hover group cursor-pointer"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        layout
        whileHover={{ y: -10, scale: 1.02 }}
      >
        {/* Project Image */}
        <div className="relative overflow-hidden h-48">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Overlay Actions */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex space-x-2">
              <Button
                variant="primary"
                size="sm"
                className="flex-1 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Voir
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer"
              >
                <Github className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6">
          <h3 className="font-orbitron font-bold text-xl text-gradient mb-2 group-hover:text-red-300 transition-colors">
            {project.title}
          </h3>
          <p className="font-inter text-gray-300 text-sm mb-4 leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-electric-blue/20 text-blue-300 text-xs rounded-full border border-electric-blue/30"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Features */}
          <div className="space-y-1">
            {project.features.map((feature, idx) => (
              <div key={idx} className="flex items-center text-xs text-gray-400">
                <div className="w-1 h-1 bg-neon-red rounded-full mr-2" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="portfolio" className="section-padding relative overflow-hidden bg-secondary-dark">
      {/* Background Effects */}
      <DigitalGrid className="opacity-20" />
      <ParticleSystem count={60} />

      <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
        {/* Section Title */}
        <motion.div
          className="text-center mb-8 md:mb-12 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: isVisible ? 1 : 0, 
            y: isVisible ? 0 : 30 
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h2 className="font-orbitron font-bold text-3xl sm:text-4xl md:text-6xl text-gradient mb-4 md:mb-6">
            PORTFOLIO DIGITAL
          </h2>
          <p className="font-inter text-base md:text-lg text-gray-300 max-w-3xl mx-auto px-2">
            Découvrez mes créations : sites vitrines, e-commerce, applications web sur-mesure
          </p>
          <motion.div
            className="w-16 md:w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mt-4 md:mt-6"
            initial={{ width: 0 }}
            animate={{ width: isVisible ? (window.innerWidth < 768 ? 64 : 96) : 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isVisible ? 1 : 0, 
            y: isVisible ? 0 : 20 
          }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {filters.map((filter) => {
            const IconComponent = filter.icon;
            return (
              <motion.button
                key={filter.key}
                className={`flex items-center px-3 md:px-4 py-2 rounded-lg font-orbitron font-medium transition-all cursor-pointer text-sm md:text-base ${
                  activeFilter === filter.key
                    ? 'bg-neon-red text-white shadow-glow-neon'
                    : 'bg-glass text-gray-300 hover:text-white hover:bg-electric-blue/20 border-neon'
                }`}
                onClick={() => setActiveFilter(filter.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconComponent className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">{filter.label}</span>
                <span className="sm:hidden">{filter.key === 'all' ? 'Tous' : filter.key === 'restaurant' ? 'Resto' : filter.key === 'ecommerce' ? 'Shop' : filter.key === 'corporate' ? 'Corp' : 'Service'}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Portfolio Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: isVisible ? 1 : 0, 
            y: isVisible ? 0 : 30 
          }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="bg-glass rounded-lg p-6 text-center border-neon">
            <div className="text-3xl font-bold text-gradient mb-2">50+</div>
            <div className="text-sm text-gray-400">Projets réalisés</div>
          </div>
          <div className="bg-glass rounded-lg p-6 text-center border-neon">
            <div className="text-3xl font-bold text-gradient mb-2">100%</div>
            <div className="text-sm text-gray-400">Clients satisfaits</div>
          </div>
          <div className="bg-glass rounded-lg p-6 text-center border-neon">
            <div className="text-3xl font-bold text-gradient mb-2">48h</div>
            <div className="text-sm text-gray-400">Réponse garantie</div>
          </div>
          <div className="bg-glass rounded-lg p-6 text-center border-neon">
            <div className="text-3xl font-bold text-gradient mb-2">24/7</div>
            <div className="text-sm text-gray-400">Support disponible</div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: isVisible ? 1 : 0, 
            y: isVisible ? 0 : 30 
          }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="cursor-pointer"
          >
            🚀 CRÉER VOTRE PROJET
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;