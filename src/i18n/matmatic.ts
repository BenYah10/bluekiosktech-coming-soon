/**
 * BlueKioskTech — textes de la page Solutions MatMatic (lot L2.2).
 * Une source FR/EN isolée, dans la même architecture que about.ts et partnerships.ts.
 * Les caractéristiques encore à valider sont explicitement présentées comme des objectifs.
 */
import type { Locale } from './ui';

export const matmaticContent = {
  fr: {
    metaTitle: 'MatMatic — Nettoyage automatisé des tapis automobiles',
    metaDescription: 'Découvrez MatMatic, un concept de nettoyage automatisé des tapis automobiles en libre-service pour les stations-service et centres de lavage. Projet pilote en préparation.',
    conceptBadge: 'Concept en développement',
    imageBadge: 'Visualisation conceptuelle',
    hero: {
      eyebrow: 'MatMatic / Entretien automobile',
      title: 'Moins de corvée. Des tapis propres et secs. Tout simplement.',
      subtitle: 'MatMatic — Le concept de nettoyage automatisé des tapis automobiles en libre-service.',
      detail: 'Nous préparons une solution destinée aux stations-service et aux centres de lavage automobile. Les performances de nettoyage et de séchage restent à valider dans le cadre du projet pilote.',
      primaryAction: 'Explorer un partenariat',
      secondaryAction: 'Comprendre le concept',
      imageAlt: 'Visualisation conceptuelle d’une machine MatMatic vert lime près d’un tunnel de lavage automobile automatique.',
      imageCaption: 'MatMatic, imaginé à proximité d’un tunnel de lavage automobile',
      stage: 'Projet pilote à l’étude dans le Grand Montréal',
    },
    discovery: {
      eyebrow: '01 / Le concept',
      title: 'Un nouveau service complémentaire à l’entretien automobile.',
      intro: 'MatMatic est un concept de borne libre-service consacré au nettoyage de tapis automobiles. Notre démarche consiste à étudier un parcours simple, autonome et adapté aux environnements de stations-service.',
      tags: [
        { title: 'Tapis textiles et caoutchouc', body: 'Deux familles de tapis ciblées dans le cahier des charges; la compatibilité réelle doit être démontrée.' },
        { title: 'Paiement sans espèces', body: 'Paiement par carte ou appareil mobile envisagé pour une expérience pratique.' },
        { title: 'Conception adaptée au Québec', body: 'Conditions climatiques, exploitation et entretien à vérifier avant tout déploiement.' },
      ],
      prototypeAlt: 'Prototype visuel MatMatic vert lime et inox, avec insertion supérieure, commande sans contact et zone de récupération inférieure.',
      prototypeCaption: 'Prototype de design — forme et fonctions sujettes à validation technique',
    },
    steps: {
      eyebrow: '02 / Parcours envisagé',
      title: 'Comment MatMatic fonctionnerait-il ?',
      intro: 'Un scénario d’utilisation cible, à confirmer par les essais du fabricant et du projet pilote.',
      items: [
        { number: '01', title: 'Payer simplement', body: 'Régler la session par un moyen de paiement sans espèces, si l’intégration est validée.' },
        { number: '02', title: 'Insérer les tapis', body: 'Introduire les tapis dans la zone prévue, selon les consignes affichées sur la machine.' },
        { number: '03', title: 'Récupérer les tapis', body: 'Après le cycle automatisé, reprendre les tapis. La qualité du nettoyage et du séchage devra être mesurée.' },
      ],
      note: 'Les illustrations et étapes décrivent un usage prévu, non un équipement actuellement offert au public.',
    },
    benefits: {
      eyebrow: '03 / Pour les exploitants',
      title: 'Un service à explorer avec les stations-service.',
      intro: 'MatMatic est pensé comme un complément aux services d’entretien déjà proposés sur place, à évaluer avec les partenaires pilotes.',
      items: [
        { number: '01', title: 'Compléter les services existants', body: 'Étudier l’ajout d’un point de nettoyage des tapis près d’un tunnel de lavage ou d’autres services automobiles.' },
        { number: '02', title: 'Privilégier l’autonomie', body: 'Viser un parcours libre-service clair, avec un paiement simple et peu d’étapes.' },
        { number: '03', title: 'Mesurer avant d’étendre', body: 'Évaluer l’adoption, l’entretien, les coûts d’exploitation et la satisfaction avant toute expansion.' },
      ],
    },
    video: {
      eyebrow: '04 / Démonstration',
      title: 'Voir le concept en situation.',
      text: 'Une vidéo de présentation est en préparation pour illustrer le parcours envisagé. Elle sera identifiée comme une simulation conceptuelle tant qu’aucune démonstration réelle n’aura été validée.',
      status: 'Vidéo conceptuelle en préparation',
      imageAlt: 'Autre perspective conceptuelle de MatMatic face à un tunnel de lavage automatique.',
    },
    pilot: {
      eyebrow: '05 / Projet pilote',
      title: 'Construisons la prochaine étape avec les exploitants.',
      text: 'Nous étudions des emplacements pilotes dans des stations-service du Grand Montréal. Aucun accord d’installation n’est annoncé à ce stade. Si vous exploitez un site adapté, échangeons sur les possibilités de collaboration.',
      action: 'Discuter d’un partenariat',
      secondaryAction: 'Voir nos deux solutions',
      label: 'Étude de faisabilité et discussions partenaires en cours',
    },
    back: 'Retour à nos solutions',
  },
  en: {
    metaTitle: 'MatMatic — Automated car mat cleaning concept',
    metaDescription: 'Explore MatMatic, an automated self-service car mat cleaning concept for gas stations and car wash operators. Pilot project in preparation.',
    conceptBadge: 'Concept in development',
    imageBadge: 'Concept visualization',
    hero: {
      eyebrow: 'MatMatic / Automotive care',
      title: 'Less hassle. Clean, dry car mats. Made simple.',
      subtitle: 'MatMatic — An automated self-service car mat cleaning concept.',
      detail: 'We are developing a solution for gas stations and car wash operators. Cleaning and drying performance will need to be demonstrated during pilot testing.',
      primaryAction: 'Explore a partnership',
      secondaryAction: 'How it would work',
      imageAlt: 'Conceptual lime-green MatMatic unit beside an automatic car wash tunnel.',
      imageCaption: 'MatMatic envisioned next to an automatic car wash tunnel',
      stage: 'Pilot project being explored in Greater Montréal',
    },
    discovery: {
      eyebrow: '01 / The concept',
      title: 'A complementary approach to vehicle care.',
      intro: 'MatMatic is a proposed self-service kiosk dedicated to cleaning car floor mats. Our goal is to study an easy-to-use, independent service suited to gas station environments.',
      tags: [
        { title: 'Fabric and rubber mats', body: 'Two target mat categories in the project requirements; actual compatibility remains to be verified.' },
        { title: 'Cashless payment', body: 'Card or mobile-device payment is planned for a convenient customer experience.' },
        { title: 'Designed with Québec in mind', body: 'Climate conditions, operations and maintenance must be assessed before deployment.' },
      ],
      prototypeAlt: 'Conceptual lime-green and stainless-steel MatMatic machine featuring an upper insertion slot, contactless payment control and lower retrieval area.',
      prototypeCaption: 'Design prototype — configuration and functionality subject to technical validation',
    },
    steps: {
      eyebrow: '02 / Proposed experience',
      title: 'How would MatMatic work?',
      intro: 'A target customer journey, subject to equipment testing and pilot validation.',
      items: [
        { number: '01', title: 'Pay with ease', body: 'Pay for a session without cash, provided the payment integration is validated.' },
        { number: '02', title: 'Insert your mats', body: 'Feed the floor mats into the designated opening, following the on-machine instructions.' },
        { number: '03', title: 'Retrieve your mats', body: 'Collect the mats after the automated cycle. Cleaning and drying results will need to be measured.' },
      ],
      note: 'These illustrations and steps show the intended experience, not a service currently available to the public.',
    },
    benefits: {
      eyebrow: '03 / For operators',
      title: 'A new service opportunity to explore.',
      intro: 'MatMatic is being developed as a potential addition to existing vehicle-care services, to be evaluated with pilot partners.',
      items: [
        { number: '01', title: 'Complement existing services', body: 'Explore car mat cleaning alongside an automatic car wash or other on-site automotive services.' },
        { number: '02', title: 'Focus on self-service', body: 'Aim for a straightforward experience with simple cashless payment and minimal steps.' },
        { number: '03', title: 'Measure before scaling', body: 'Assess adoption, maintenance, operating costs and customer satisfaction before expansion.' },
      ],
    },
    video: {
      eyebrow: '04 / Demonstration',
      title: 'Picture the concept in action.',
      text: 'A presentation video is being developed to illustrate the intended experience. It will be clearly described as a concept simulation until a real-world demonstration has been validated.',
      status: 'Concept video in preparation',
      imageAlt: 'Alternative concept view of a MatMatic unit in front of an automatic car wash tunnel.',
    },
    pilot: {
      eyebrow: '05 / Pilot project',
      title: 'Explore the next step with us.',
      text: 'We are assessing potential pilot locations at gas stations in Greater Montréal. No installation agreements are being announced at this stage. If you operate a suitable location, let’s discuss potential collaboration.',
      action: 'Discuss a partnership',
      secondaryAction: 'Explore both solutions',
      label: 'Feasibility assessment and partner discussions underway',
    },
    back: 'Back to our solutions',
  },
} as const;

export function matmaticTranslation(locale: Locale) {
  return matmaticContent[locale];
}
