export const SECTIONS = {
  HERO: 'hero',
  ABOUT: 'about',
  DEMO: 'demo',
  PORTFOLIO: 'portfolio',
  PROCESS: 'process',
  CONTACT: 'contact'
};

export const NAVIGATION_ITEMS = [
  { label: 'Accueil', href: '#hero' },
  { label: 'À propos', href: '#about' },
  { label: 'Démo', href: '#demo' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Processus', href: '#process' },
  { label: 'Contact', href: '#contact' }
];

export const HERO_CONTENT = {
  name: 'VICTOR MIRAULT',
  subtitle: 'SITES AUTONOMES EXPRESS',
  tagline: 'VOTRE SITE + INTERFACE SIMPLE + FORMATION = AUTONOMIE TOTALE',
  description: 'Développeur français spécialisé dans l\'autonomie digitale'
};

export const ABOUT_PILLARS = [
  {
    icon: '⚡',
    title: 'EXPRESS',
    subtitle: 'Réponse sous 48h garantie',
    counter: 48,
    unit: 'h'
  },
  {
    icon: '🎯',
    title: 'AUTONOME',
    subtitle: 'Interface simple pour vous',
    counter: 100,
    unit: '%'
  },
  {
    icon: '🇫🇷',
    title: 'FRANCE',
    subtitle: 'Disponible 7j/7, livraison 2 semaines max',
    counter: 24,
    unit: 'h/24'
  }
];

export const PROCESS_STEPS = [
  {
    icon: '📋',
    title: 'BRIEF EXPRESS',
    description: 'Échange rapide pour comprendre vos besoins et définir les objectifs',
    duration: '1-2h',
    features: ['Analyse des besoins', 'Définition des objectifs', 'Choix des technologies']
  },
  {
    icon: '🏗️',
    title: 'ARCHITECTURE',
    description: 'Conception technique et structure de votre solution',
    duration: '1 jour',
    features: ['Architecture technique', 'Base de données', 'Sécurité']
  },
  {
    icon: '🎨',
    title: 'DESIGN INTERFACE',
    description: 'Interface moderne et intuitive adaptée à vos utilisateurs',
    duration: '2-3 jours',
    features: ['Design responsive', 'UX optimisée', 'Identité visuelle']
  },
  {
    icon: '⚡',
    title: 'DÉVELOPPEMENT',
    description: 'Code propre et optimisé pour les performances',
    duration: '5-7 jours',
    features: ['Code optimisé', 'Fonctionnalités avancées', 'Tests unitaires']
  },
  {
    icon: '🔍',
    title: 'TESTS & SEO',
    description: 'Optimisation et référencement pour la visibilité',
    duration: '1-2 jours',
    features: ['Tests complets', 'SEO technique', 'Performance']
  },
  {
    icon: '🎓',
    title: 'FORMATION',
    description: 'Prise en main de votre interface pour l\'autonomie totale',
    duration: '2h',
    features: ['Formation personnalisée', 'Documentation', 'Support inclus']
  }
];

export const TYPING_DELAYS = {
  FAST: 50,
  NORMAL: 100,
  SLOW: 150
};