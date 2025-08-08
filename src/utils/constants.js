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
  { label: 'Pourquoi moi', href: '#process' },
  { label: 'Démo', href: '#demo' },
  { label: 'Stack', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
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
    description: 'Échange rapide pour comprendre vos besoins'
  },
  {
    icon: '🏗️',
    title: 'ARCHITECTURE',
    description: 'Conception technique et structure'
  },
  {
    icon: '🎨',
    title: 'DESIGN INTERFACE',
    description: 'Interface moderne et intuitive'
  },
  {
    icon: '⚡',
    title: 'DÉVELOPPEMENT',
    description: 'Code propre et optimisé'
  },
  {
    icon: '🔍',
    title: 'TESTS & SEO',
    description: 'Optimisation et référencement'
  },
  {
    icon: '🎓',
    title: 'FORMATION',
    description: 'Prise en main de votre interface'
  }
];

export const TYPING_DELAYS = {
  FAST: 50,
  NORMAL: 100,
  SLOW: 150
};