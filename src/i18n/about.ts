/**
 * BlueKioskTech — dictionnaire autonome de la page « À propos » (Phase 2, L3.2).
 * Ne modifie pas ui.ts : mise à jour ciblée, sans risque pour les sections validées.
 * Toute chaîne visible de cette page est maintenue ici en français et en anglais.
 */
import type { Locale } from './ui';

export const aboutPage = {
  fr: {
    metadata: {
      title: 'À propos — Startup québécoise en hygiène',
      description: 'Découvrez BlueKioskTech, startup québécoise derrière MatMatic et VUCS : deux concepts en libre-service pour l’hygiène et le nettoyage.',
    },
    hero: {
      eyebrow: 'BlueKioskTech · Notre entreprise',
      title: 'L’innovation au service de l’hygiène et de la propreté.',
      intro: 'Nous développons des concepts de machines automatisées en libre-service pour rendre les gestes de nettoyage plus simples, accessibles et autonomes.',
      primary: 'Notre démarche',
      secondary: 'Devenir partenaire',
      note: 'Québec, Canada · Projets en développement',
      visualEyebrow: 'Notre raison d’être',
      visualTitle: 'Des solutions concrètes pour les lieux du quotidien.',
      visualFooter: 'Innovation · Libre-service · Proximité',
    },
    purpose: {
      eyebrow: 'Qui nous sommes',
      title: 'Une startup, une ambition durable.',
      lead: 'BlueKioskTech réunit une même ambition autour de deux domaines complémentaires : l’hygiène et le nettoyage d’accessoires utilisés au quotidien.',
      detail: 'Notre objectif est de concevoir des services pratiques et compréhensibles, qui puissent s’intégrer aux établissements fréquentés par le public. Nous développons nos concepts progressivement, en confrontant nos idées aux besoins réels des utilisateurs et des exploitants.',
      pillarIntro: 'Les trois principes qui orientent nos décisions',
    },
    method: {
      eyebrow: 'Notre méthode',
      title: 'De l’idée au terrain, étape par étape.',
      intro: 'Chaque projet est étudié selon sa valeur d’usage, sa faisabilité et les conditions nécessaires à une implantation responsable.',
      steps: [
        { id: '01', title: 'Comprendre', body: 'Identifier un besoin concret et les difficultés rencontrées par les utilisateurs.' },
        { id: '02', title: 'Concevoir', body: 'Définir une expérience en libre-service intuitive et un concept d’équipement adapté.' },
        { id: '03', title: 'Valider', body: 'Évaluer les hypothèses techniques et commerciales et préparer des essais pilotes.' },
        { id: '04', title: 'Collaborer', body: 'Échanger avec des exploitants et partenaires pour étudier des implantations pertinentes.' },
      ],
      disclaimer: 'Cette démarche décrit nos objectifs de développement ; elle ne constitue pas une annonce de machines fabriquées, certifiées ou déjà installées.',
    },
    initiatives: {
      eyebrow: 'Nos projets',
      title: 'Deux initiatives, une même direction.',
      intro: 'Nous faisons avancer deux concepts distincts sous une identité d’entreprise commune.',
      matmaticDetail: 'Concept de nettoyage automatisé des tapis automobiles en libre-service, destiné notamment aux stations-service.',
      matmaticImageAlt: 'Prototype conceptuel MatMatic vert et inox, machine de nettoyage des tapis automobiles.',
      vucsDetail: 'Concept de désinfection automatisée des gourdes réutilisables, notamment pour les centres sportifs.',
      vucsImageAlt: 'Borne VUCS noire et dorée avec une gourde d’eau bleue dans une salle de sport.',
      view: 'Découvrir le projet',
      note: 'Les rendus et les caractéristiques des équipements sont susceptibles d’évoluer pendant leur développement.',
    },
    partner: {
      eyebrow: 'Construire ensemble',
      title: 'Une innovation de proximité se développe avec ses partenaires.',
      intro: 'Vous gérez une station-service, un centre sportif ou un autre établissement ? Nous souhaitons échanger sur les besoins de votre clientèle et les possibilités de collaboration.',
      action: 'Explorer les partenariats',
      alternate: 'Nous contacter',
    },
  },
  en: {
    metadata: {
      title: 'About — Québec Self-service Hygiene Startup',
      description: 'Meet BlueKioskTech, the Québec startup developing MatMatic and VUCS, two self-service concepts for hygiene and cleaning.',
    },
    hero: {
      eyebrow: 'BlueKioskTech · Our company',
      title: 'Innovation for everyday hygiene and cleanliness.',
      intro: 'We develop automated self-service machine concepts designed to make everyday cleaning easier, more accessible and more independent.',
      primary: 'Our approach',
      secondary: 'Become a partner',
      note: 'Québec, Canada · Projects in development',
      visualEyebrow: 'Our purpose',
      visualTitle: 'Practical solutions for everyday spaces.',
      visualFooter: 'Innovation · Self-service · Local focus',
    },
    purpose: {
      eyebrow: 'Who we are',
      title: 'One startup, a long-term ambition.',
      lead: 'BlueKioskTech brings together two complementary areas under one ambition: hygiene and the cleaning of everyday accessories.',
      detail: 'Our goal is to design useful, intuitive services that can fit into places people visit every day. We develop our concepts progressively, testing our assumptions against the needs of both users and business operators.',
      pillarIntro: 'Three principles that guide our decisions',
    },
    method: {
      eyebrow: 'How we work',
      title: 'From idea to real-world testing, step by step.',
      intro: 'Each project is assessed for user value, feasibility and the conditions required for responsible implementation.',
      steps: [
        { id: '01', title: 'Understand', body: 'Identify a practical need and the friction people encounter.' },
        { id: '02', title: 'Design', body: 'Define an intuitive self-service experience and an equipment concept suited to the context.' },
        { id: '03', title: 'Validate', body: 'Assess technical and commercial assumptions and prepare pilot testing.' },
        { id: '04', title: 'Collaborate', body: 'Engage operators and partners to explore suitable implementation opportunities.' },
      ],
      disclaimer: 'This process describes our development objectives; it does not imply that equipment has already been manufactured, certified or installed.',
    },
    initiatives: {
      eyebrow: 'Our projects',
      title: 'Two initiatives, one direction.',
      intro: 'We are advancing two distinct concepts under one corporate identity.',
      matmaticDetail: 'An automated self-service car floor mat cleaning concept intended particularly for gas stations.',
      matmaticImageAlt: 'Conceptual green-and-stainless-steel MatMatic car floor mat cleaning machine.',
      vucsDetail: 'An automated reusable-bottle sanitization concept intended particularly for fitness centres.',
      vucsImageAlt: 'Black-and-gold VUCS kiosk with a blue reusable water bottle in a fitness centre.',
      view: 'Explore the project',
      note: 'Equipment visuals and specifications may evolve as development progresses.',
    },
    partner: {
      eyebrow: 'Let’s collaborate',
      title: 'Local innovation moves forward with the right partners.',
      intro: 'Do you operate a gas station, fitness centre or another business? We welcome conversations about your customers’ needs and potential collaboration opportunities.',
      action: 'Explore partnerships',
      alternate: 'Contact us',
    },
  },
} as const;

export function aboutTranslation(locale: Locale) {
  return aboutPage[locale];
}
