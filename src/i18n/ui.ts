/**
 * BlueKioskTech — source unique des traductions et des routes FR/EN.
 * Ne pas placer de chaînes traduisibles directement dans les composants.
 * Les chemins français/anglais peuvent différer tout en ciblant la même page.
 */
export type Locale = 'fr' | 'en';
export type RouteId = 'home' | 'solutions' | 'matmatic' | 'vucs' | 'about' | 'partners' | 'contact';

const paths: Record<Locale, Record<RouteId, string>> = {
  fr: {
    home: '/',
    solutions: '/solutions/',
    matmatic: '/solutions/matmatic/',
    vucs: '/solutions/vucs/',
    about: '/a-propos/',
    partners: '/partenariats/',
    contact: '/contact/',
  },
  en: {
    home: '/en/',
    solutions: '/en/solutions/',
    matmatic: '/en/solutions/matmatic/',
    vucs: '/en/solutions/vucs/',
    about: '/en/about/',
    partners: '/en/partnerships/',
    contact: '/en/contact/',
  },
};

export function pathFor(locale: Locale, route: RouteId): string {
  return paths[locale][route];
}

export const ui = {
  fr: {
    nav: {
      home: 'Accueil', solutions: 'Nos solutions', about: 'À propos',
      partners: 'Partenariats', contact: 'Contact', primary: 'Devenir partenaire',
      mobile: 'Ouvrir le menu', close: 'Fermer le menu',
      language: 'Choisir la langue', navigationLabel: 'Navigation principale', mobileNavigation: 'Navigation mobile',
    },
    metadata: {
      title: 'BlueKioskTech | Innovation, hygiène et propreté en libre-service',
      description: 'Découvrez BlueKioskTech, une startup québécoise qui développe des solutions automatisées en libre-service pour l’hygiène et le nettoyage.',
    },
    home: {
      eyebrow: 'Innovation · Hygiène · Propreté',
      headline: 'Des solutions intelligentes pour un quotidien plus propre.',
      lead: 'BlueKioskTech développe des projets de machines automatisées en libre-service pour rendre l’hygiène et le nettoyage plus accessibles et pratiques.',
      cta: 'Découvrir nos solutions', secondaryCta: 'En savoir plus',
      visualCaption: 'Une vision commune, plusieurs innovations en développement',
      heroImageAlt: 'Illustration conceptuelle de deux environnements : une station-service et un centre sportif',
      heroImageNote: 'Visuel conceptuel',
      // Carrousel Hero : textes descriptifs et commandes accessibles.
      heroCarouselLabel: 'Nos concepts MatMatic et VUCS',
      heroCarouselRole: 'carrousel',
      heroCarouselControlsLabel: 'Commandes des images du carrousel',
      heroCarouselShowSlide: 'Afficher le visuel',
      heroCarouselPause: 'Mettre le défilement en pause',
      heroCarouselPlay: 'Reprendre le défilement',
      heroSlides: {
        matmaticPrimary: {
          name: 'MatMatic — tunnel de lavage',
          alt: 'Prototype conceptuel MatMatic vert et inox à côté d’un tunnel de lavage automobile automatique.',
        },
        vucsPrimary: {
          name: 'VUCS — centre sportif',
          alt: 'Prototype conceptuel VUCS noir et doré dans un gym moderne, avec une gourde d’eau réutilisable bleue.',
        },
        matmaticSecondary: {
          name: 'MatMatic — autre perspective',
          alt: 'Autre angle du prototype MatMatic devant un tunnel de lavage automatique en station-service.',
        },
        vucsSecondary: {
          name: 'VUCS — fontaine d’eau',
          alt: 'Prototype VUCS et gourde d’eau bleue près d’une fontaine d’eau dans un centre sportif.',
        },
      },
      pillars: [
        { title: 'Innovation', body: 'Des concepts conçus pour répondre à des besoins concrets.' },
        { title: 'Libre-service', body: 'Des expériences que nous voulons simples et autonomes.' },
        { title: 'Propreté', body: 'De nouvelles façons d’entretenir les objets du quotidien.' },
        { title: 'Partenariats locaux', body: 'Des collaborations envisagées avec des établissements de proximité.' },
      ],
      projectsEyebrow: 'Nos projets en développement',
      projectsTitle: 'Deux solutions, une même vision.',
      projectsLead: 'Deux projets complémentaires, développés autour de l’hygiène, du nettoyage et des services automatisés en libre-service.',
      projectsAllLink: 'Voir tous nos projets',
      projectsDisclaimer: 'Illustrations conceptuelles — caractéristiques et modèles définitifs en cours de validation.',
      aboutEyebrow: 'À propos de BlueKioskTech',
      aboutTitle: 'Une startup québécoise tournée vers les services de demain.',
      aboutText: 'Nous explorons des solutions automatisées en libre-service destinées aux espaces accessibles au public, autour de l’hygiène, du nettoyage et de l’entretien.',
      aboutLink: 'Découvrir notre mission',
      companyAbout: {
        eyebrow: 'À propos de BlueKioskTech',
        title: 'Une startup québécoise, une vision tournée vers la propreté.',
        description: 'BlueKioskTech développe des concepts de machines automatisées en libre-service, avec l’ambition de simplifier l’hygiène, le nettoyage et l’entretien au quotidien.',
        progressLabel: 'Québec · Projets en développement',
        action: 'Découvrir notre entreprise',
        visualTopline: 'BLUEKIOSKTECH / NOTRE DÉMARCHE',
        visualCaption: 'Concevoir. Valider. Collaborer.',
        values: [
          {
            label: '01', title: 'Notre mission',
            body: 'Rendre les services d’hygiène et de nettoyage plus accessibles, pratiques et autonomes dans les lieux fréquentés au quotidien.',
          },
          {
            label: '02', title: 'Notre vision',
            body: 'Développer progressivement un portefeuille de solutions en libre-service adaptées aux besoins des utilisateurs et des établissements.',
          },
          {
            label: '03', title: 'Notre approche',
            body: 'Partir de besoins concrets, valider nos concepts sur le terrain et construire des collaborations transparentes avec les partenaires.',
          },
        ],
      },
      partnersEyebrow: 'Partenariats',
      partnersTitle: 'Construisons ensemble des environnements plus propres.',
      partnersText: 'Vous exploitez une station-service, un centre sportif ou un autre établissement ? Parlons des possibilités de collaboration.',
      partnersLink: 'Échanger avec notre équipe',
    },
    project: {
      matmatic: {
        name: 'MatMatic', subtitle: 'Nettoyage automatisé des tapis automobiles',
        description: 'Projet de machine de nettoyage en libre-service destiné notamment aux stations-service.',
        status: 'Pilote en préparation', link: 'Découvrir MatMatic',
        category: 'Entretien automobile', visualNote: 'Illustration conceptuelle',
      },
      vucs: {
        name: 'VUCS', subtitle: 'Hygiène des gourdes réutilisables',
        description: 'Projet de solution automatisée de désinfection des gourdes réutilisables, notamment pour les centres sportifs.',
        status: 'Développement et validation', link: 'Découvrir VUCS',
        category: 'Hygiène des gourdes', visualNote: 'Illustration conceptuelle',
      },
    },
    pages: {
      solutions: {
        label: 'Nos solutions',
        title: 'Nos projets en développement',
        intro: 'Deux concepts en libre-service pour répondre à des besoins d’hygiène et de nettoyage.',
        // Titre/meta SEO dédiés : ne pas modifier le H1 visible déjà validé.
        seoTitle: 'MatMatic et VUCS — Concepts en libre-service',
        seoDescription: 'Découvrez MatMatic pour les tapis automobiles et VUCS pour les gourdes réutilisables : deux concepts automatisés en libre-service développés par BlueKioskTech.',
      },
      matmatic: { label: 'MatMatic', title: 'Un projet de nettoyage des tapis automobiles en libre-service', intro: 'Nous préparons un projet pilote dans des stations-service du Grand Montréal. Les caractéristiques et les modalités de partenariat sont en cours de validation.' },
      vucs: { label: 'VUCS', title: 'Simplifier l’hygiène des gourdes réutilisables', intro: 'Un concept de solution automatisée destiné notamment aux centres sportifs, actuellement en développement et validation.' },
      about: { label: 'Notre entreprise', title: 'L’innovation au service de l’hygiène et de la propreté', intro: 'BlueKioskTech est une startup québécoise qui développe des concepts de services automatisés en libre-service. Notre mission est de rendre l’hygiène et le nettoyage du quotidien plus accessibles.' },
      partners: { label: 'Partenariats', title: 'Développons des collaborations de proximité', intro: 'Nous recherchons des échanges avec des exploitants et établissements souhaitant étudier la participation à des projets pilotes. Les conditions restent à définir ensemble.' },
      contact: { label: 'Contact', title: 'Parlons de votre projet', intro: 'Pour un renseignement ou une proposition de partenariat, communiquez avec BlueKioskTech par courriel.' },
    },
    general: {
      contactUs: 'Nous contacter', website: 'Visiter le site dédié à VUCS',
      conceptNote: 'Visuels conceptuels — projets en développement',
      originalSite: 'Le site VUCS demeure accessible indépendamment.',
      back: 'Retour aux solutions',
      email: 'info@bluekiosk.tech',
      footerLine: 'Solutions automatisées en libre-service · Montréal, Québec',
      rights: 'Tous droits réservés.',
    },
  },
  en: {
    nav: {
      home: 'Home', solutions: 'Solutions', about: 'About',
      partners: 'Partnerships', contact: 'Contact', primary: 'Become a partner',
      mobile: 'Open menu', close: 'Close menu',
      language: 'Choose language', navigationLabel: 'Main navigation', mobileNavigation: 'Mobile navigation',
    },
    metadata: {
      title: 'BlueKioskTech | Self-service innovation for hygiene and cleaning',
      description: 'Discover BlueKioskTech, a Québec startup developing automated self-service solutions for hygiene and cleaning.',
    },
    home: {
      eyebrow: 'Innovation · Hygiene · Cleaning',
      headline: 'Smarter solutions for a cleaner everyday life.',
      lead: 'BlueKioskTech develops automated self-service machine concepts to make hygiene and cleaning more accessible and convenient.',
      cta: 'Explore our solutions', secondaryCta: 'Learn more',
      visualCaption: 'One shared vision, several innovations in development',
      heroImageAlt: 'Conceptual illustration of a gas station and a fitness centre',
      heroImageNote: 'Concept illustration',
      // Hero carousel: descriptive copy and accessible controls.
      heroCarouselLabel: 'MatMatic and VUCS concepts',
      heroCarouselRole: 'carousel',
      heroCarouselControlsLabel: 'Carousel image controls',
      heroCarouselShowSlide: 'Show slide',
      heroCarouselPause: 'Pause automatic slideshow',
      heroCarouselPlay: 'Resume automatic slideshow',
      heroSlides: {
        matmaticPrimary: {
          name: 'MatMatic — car wash tunnel',
          alt: 'Conceptual green and stainless-steel MatMatic kiosk beside an automatic car wash tunnel.',
        },
        vucsPrimary: {
          name: 'VUCS — fitness centre',
          alt: 'Conceptual black-and-gold VUCS kiosk in a modern gym, holding a blue reusable water bottle.',
        },
        matmaticSecondary: {
          name: 'MatMatic — alternate perspective',
          alt: 'Alternate view of the MatMatic kiosk in front of an automatic car wash tunnel at a service station.',
        },
        vucsSecondary: {
          name: 'VUCS — water refill station',
          alt: 'Conceptual VUCS kiosk with a blue reusable water bottle beside a drinking water station at a gym.',
        },
      },
      pillars: [
        { title: 'Innovation', body: 'Concepts developed around practical needs.' },
        { title: 'Self-service', body: 'Experiences designed to be simple and independent.' },
        { title: 'Cleanliness', body: 'New ways to clean and maintain everyday items.' },
        { title: 'Local partnerships', body: 'Exploring potential collaborations with local businesses.' },
      ],
      projectsEyebrow: 'Our projects in development',
      projectsTitle: 'Two solutions, one vision.',
      projectsLead: 'Two complementary projects focused on hygiene, cleaning and automated self-service solutions.',
      projectsAllLink: 'See all our projects',
      projectsDisclaimer: 'Conceptual illustrations — final equipment designs and specifications are still under review.',
      aboutEyebrow: 'About BlueKioskTech',
      aboutTitle: 'A Québec startup building tomorrow’s services.',
      aboutText: 'We explore automated self-service solutions for public-facing spaces, with a focus on hygiene, cleaning and everyday maintenance.',
      aboutLink: 'Learn about our mission',
      companyAbout: {
        eyebrow: 'About BlueKioskTech',
        title: 'A Québec startup with a vision for cleaner everyday spaces.',
        description: 'BlueKioskTech develops automated self-service machine concepts aimed at making everyday hygiene, cleaning and maintenance simpler.',
        progressLabel: 'Québec · Projects in development',
        action: 'Get to know our company',
        visualTopline: 'BLUEKIOSKTECH / OUR APPROACH',
        visualCaption: 'Design. Validate. Collaborate.',
        values: [
          {
            label: '01', title: 'Our mission',
            body: 'Make hygiene and cleaning services more accessible, convenient and independent in places people use every day.',
          },
          {
            label: '02', title: 'Our vision',
            body: 'Gradually build a portfolio of self-service solutions suited to the needs of users and partner facilities.',
          },
          {
            label: '03', title: 'Our approach',
            body: 'Start with real-world needs, validate our concepts in the field and build transparent partnerships with local operators.',
          },
        ],
      },
      partnersEyebrow: 'Partnerships',
      partnersTitle: 'Building cleaner environments together.',
      partnersText: 'Do you operate a gas station, fitness centre or another facility? Let’s explore potential collaborations.',
      partnersLink: 'Get in touch',
    },
    project: {
      matmatic: {
        name: 'MatMatic', subtitle: 'Automated car floor mat cleaning',
        description: 'A self-service floor mat cleaning machine concept designed particularly for gas stations.',
        status: 'Pilot in preparation', link: 'Explore MatMatic',
        category: 'Automotive care', visualNote: 'Concept illustration',
      },
      vucs: {
        name: 'VUCS', subtitle: 'Reusable water bottle hygiene',
        description: 'An automated reusable-bottle sanitization concept aimed at facilities such as fitness centres.',
        status: 'Development and validation', link: 'Explore VUCS',
        category: 'Bottle hygiene', visualNote: 'Concept illustration',
      },
    },
    pages: {
      solutions: {
        label: 'Our solutions',
        title: 'Projects in development',
        intro: 'Two self-service concepts designed to meet cleaning and hygiene needs.',
        // Dedicated SEO fields: keep the previously approved visible H1 unchanged.
        seoTitle: 'MatMatic & VUCS — Self-service Concepts',
        seoDescription: 'Discover MatMatic car mat cleaning and VUCS reusable water bottle hygiene: two automated self-service concepts being developed by BlueKioskTech.',
      },
      matmatic: { label: 'MatMatic', title: 'A self-service car floor mat cleaning concept', intro: 'We are preparing a pilot project with gas stations in Greater Montréal. Equipment specifications and partnership terms are still under evaluation.' },
      vucs: { label: 'VUCS', title: 'Making reusable-bottle hygiene more convenient', intro: 'An automated concept aimed at facilities such as fitness centres, currently in development and validation.' },
      about: { label: 'Our company', title: 'Innovation for hygiene and cleanliness', intro: 'BlueKioskTech is a Québec startup developing automated self-service concepts. Our mission is to make everyday hygiene and cleaning more accessible.' },
      partners: { label: 'Partnerships', title: 'Building local collaborations', intro: 'We welcome discussions with operators and facilities interested in exploring pilot projects. Partnership terms will be defined jointly.' },
      contact: { label: 'Contact', title: 'Let’s talk about your project', intro: 'For inquiries or partnership opportunities, contact BlueKioskTech by email.' },
    },
    general: {
      contactUs: 'Contact us', website: 'Visit the VUCS website',
      conceptNote: 'Concept visuals — projects in development',
      originalSite: 'The VUCS website remains available separately.',
      back: 'Back to solutions',
      email: 'info@bluekiosk.tech',
      footerLine: 'Automated self-service solutions · Montréal, Québec',
      rights: 'All rights reserved.',
    },
  },
} as const;

export function translation(locale: Locale) {
  return ui[locale];
}
