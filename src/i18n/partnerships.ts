/**
 * BlueKioskTech — Partenariats (Phase 2, lot L3.1).
 * Source unique FR/EN de cette section : messages commerciaux honnêtes et
 * orientés découverte. Aucune promesse de revenu, d'exclusivité ou de déploiement.
 * L'envoi des messages est assuré par le logiciel courriel du visiteur,
 * et non par un formulaire serveur (prévu pour une autre étape).
 */
import type { Locale } from './ui';

export const partnershipCopy = {
  fr: {
    teaser: {
      eyebrow: 'Partenariats',
      headline: 'Développons des services utiles, ensemble.',
      intro: 'BlueKioskTech échange avec des exploitants de stations-service, de centres sportifs et d’autres établissements pour étudier des opportunités de collaboration.',
      tags: ['Stations-service', 'Centres sportifs', 'Autres établissements'],
      action: 'Explorer les partenariats',
      subline: 'Projets pilotes à l’étude · Modalités à définir avec les partenaires',
    },
    meta: {
      title: 'Devenir partenaire — Projets pilotes et collaborations',
      description: 'Vous exploitez une station-service ou un centre sportif ? Découvrez les projets MatMatic et VUCS et échangez avec BlueKioskTech sur un partenariat potentiel.',
    },
    hero: {
      eyebrow: 'Partenariats BlueKioskTech',
      title: 'Explorons ensemble le prochain service en libre-service de votre établissement.',
      intro: 'BlueKioskTech échange avec des exploitants de stations-service et de centres sportifs pour évaluer comment MatMatic ou VUCS pourrait enrichir les services offerts à leur clientèle, selon les réalités de chaque établissement.',
      primary: 'Proposer mon établissement',
      secondary: 'Découvrir nos projets',
      status: 'Recherche de partenaires exploratoires',
      visualLabel: '2 PROJETS',
      visualHeading: 'Un partenariat se construit sur le terrain.',
      visualSubtitle: 'Échanger • Évaluer • Construire',
      matmaticLabel: 'MatMatic',
      vucsLabel: 'VUCS',
      matmaticImageAlt: 'Simulation de la borne verte MatMatic à proximité d’un tunnel de lavage automobile.',
      vucsImageAlt: 'Simulation de la borne noire et dorée VUCS dans une salle de sport.',
      note: 'Aucune installation ni condition financière n’est confirmée à ce stade.',
    },
    audiences: {
      eyebrow: 'À qui s’adressent nos projets ?',
      title: 'Des concepts pour différents lieux du quotidien.',
      intro: 'MatMatic vise les stations-service et centres de lavage ; VUCS s’adresse aux centres sportifs. Chaque opportunité sera évaluée en fonction du site et du stade de développement du projet.',
      matmaticImageAlt: 'Prototype de design MatMatic vert lime destiné au nettoyage de tapis automobiles.',
      vucsImageAlt: 'Borne conceptuelle VUCS noire et dorée dans un centre sportif.',
      otherImageAlt: 'Deux professionnels se serrent la main pour symboliser une future collaboration commerciale.',
      items: [
        { number: '01', key: 'matmatic', category: 'Stations-service', name: 'MatMatic', detail: 'Étudier l’intégration d’un service de nettoyage en libre-service des tapis automobiles dans une station-service.', status: 'Pilote en préparation', action: 'Explorer MatMatic' },
        { number: '02', key: 'vucs', category: 'Centres sportifs', name: 'VUCS', detail: 'Explorer l’intérêt d’une solution automatisée d’hygiène des gourdes réutilisables auprès des utilisateurs de centres sportifs.', status: 'Développement et validation', action: 'Explorer VUCS' },
        { number: '03', key: 'other', category: 'Autres établissements', name: 'Collaborations futures', detail: 'Vous connaissez un besoin concret en matière d’hygiène ou de nettoyage ? Nous pouvons en discuter pour de futurs concepts.', status: 'Échanges exploratoires', action: 'Nous contacter' },
      ],
    },
    value: {
      eyebrow: 'Pourquoi engager la discussion ?',
      title: 'Un service complémentaire, pensé avec vos contraintes.',
      intro: 'Avant d’envisager un pilote, nous souhaitons comprendre la fréquentation, l’espace disponible et les exigences d’exploitation de votre site.',
      items: [
        { title: 'Service complémentaire', body: 'Explorer une expérience utile pour votre clientèle, puis mesurer l’intérêt réel avant toute implantation.' },
        { title: 'Intégration sur place', body: 'Examiner l’emplacement, le cheminement des visiteurs, les utilités disponibles et les conditions d’entretien.' },
        { title: 'Collaboration transparente', body: 'Clarifier les rôles, la maintenance et les modalités d’un pilote éventuel avant tout engagement.' },
      ],
    },
    process: {
      eyebrow: 'Notre démarche',
      title: 'Quatre étapes avant toute décision.',
      steps: [
        { title: 'Premier échange', body: 'Comprendre votre type d’établissement et votre intérêt.' },
        { title: 'Évaluation du site', body: 'Étudier la faisabilité et les contraintes d’emplacement.' },
        { title: 'Proposition de pilote', body: 'Définir un scénario et des modalités à discuter, si le projet est pertinent.' },
        { title: 'Validation mutuelle', body: 'Décider ensemble des prochaines démarches et d’un éventuel accord.' },
      ],
      disclaimer: 'Les étapes décrivent une démarche envisagée. Aucun rendement, exclusivité, calendrier ou déploiement n’est garanti.',
    },
    contact: {
      eyebrow: 'Parlons de votre établissement',
      title: 'Parlons de votre établissement et de son potentiel.',
      intro: 'Présentez votre station-service ou votre centre sportif, le secteur où il se trouve et le projet qui vous intéresse. Nous étudierons ensemble la pertinence d’un premier échange.',
      stationAction: 'Présenter ma station-service',
      fitnessAction: 'Présenter mon centre sportif',
      generalAction: 'Autre demande',
      alternative: 'Voir la page contact',
      method: 'Chaque bouton ouvre notre formulaire de contact avec le projet présélectionné. Aucun partenariat n’est conclu par l’envoi d’une demande.',
      emailSubject: 'BlueKioskTech — Intérêt pour un partenariat',
      draft: 'Bonjour BlueKioskTech,\n\nJe souhaite discuter d’un partenariat potentiel.\n\nType d’établissement : {kind}\nNom de l’établissement : \nVille / secteur : \nNom et fonction du contact : \nProjet d’intérêt : \n\nMerci.',
      stationType: 'Station-service',
      fitnessType: 'Centre sportif',
      otherType: 'Autre établissement',
    },
  },
  en: {
    teaser: {
      eyebrow: 'Partnerships',
      headline: 'Let’s explore useful services together.',
      intro: 'BlueKioskTech welcomes discussions with gas station operators, fitness centres and other businesses to explore potential collaboration opportunities.',
      tags: ['Gas stations', 'Fitness centres', 'Other businesses'],
      action: 'Explore partnerships',
      subline: 'Pilot projects under consideration · Terms to be discussed together',
    },
    meta: {
      title: 'Partnerships — Pilot projects and collaboration',
      description: 'Operate a gas station or fitness centre? Discover MatMatic and VUCS and contact BlueKioskTech to discuss potential partnerships.',
    },
    hero: {
      eyebrow: 'BlueKioskTech Partnerships',
      title: 'Let’s explore your location’s next self-service opportunity.',
      intro: 'BlueKioskTech welcomes discussions with gas station and fitness centre operators to explore how MatMatic or VUCS might complement their customer experience, based on each site’s operating needs.',
      primary: 'Introduce my business',
      secondary: 'Explore our projects',
      status: 'Exploring potential partners',
      visualLabel: '2 PROJECTS',
      visualHeading: 'Partnerships begin with dialogue.',
      visualSubtitle: 'Discuss • Assess • Develop',
      matmaticLabel: 'MatMatic',
      vucsLabel: 'VUCS',
      matmaticImageAlt: 'Concept image of the lime-green MatMatic kiosk beside an automatic car wash tunnel.',
      vucsImageAlt: 'Concept image of a black-and-gold VUCS kiosk in a fitness centre.',
      note: 'No installation or financial terms have been confirmed at this stage.',
    },
    audiences: {
      eyebrow: 'Who are these projects for?',
      title: 'Concepts for different everyday spaces.',
      intro: 'MatMatic focuses on gas stations and car wash locations, while VUCS targets fitness centres. Each opportunity would be assessed against site needs and the project’s development stage.',
      matmaticImageAlt: 'Lime-green MatMatic car mat cleaning design prototype.',
      vucsImageAlt: 'Black-and-gold VUCS kiosk concept in a fitness centre.',
      otherImageAlt: 'Two business professionals shaking hands to symbolize a potential future collaboration.',
      items: [
        { number: '01', key: 'matmatic', category: 'Gas stations', name: 'MatMatic', detail: 'Explore the potential integration of a self-service car floor mat cleaning concept at a gas station.', status: 'Pilot in preparation', action: 'Explore MatMatic' },
        { number: '02', key: 'vucs', category: 'Fitness centres', name: 'VUCS', detail: 'Explore interest in an automated reusable-bottle hygiene concept among fitness-centre users.', status: 'Development and validation', action: 'Explore VUCS' },
        { number: '03', key: 'other', category: 'Other businesses', name: 'Future collaborations', detail: 'See an unmet hygiene or cleaning need? We welcome discussion of potential future concepts.', status: 'Exploratory discussions', action: 'Contact us' },
      ],
    },
    value: {
      eyebrow: 'Why start a conversation?',
      title: 'A complementary service shaped by your site’s needs.',
      intro: 'Before discussing a pilot, we want to understand your visitor traffic, available space and operational requirements.',
      items: [
        { title: 'Complementary service', body: 'Explore a potentially useful customer experience, then assess actual interest before deployment.' },
        { title: 'On-site requirements', body: 'Review placement, customer flow, available utilities and maintenance requirements.' },
        { title: 'Transparent collaboration', body: 'Clarify responsibilities, maintenance and possible pilot terms before any commitment.' },
      ],
    },
    process: {
      eyebrow: 'Our approach',
      title: 'Four steps before any decision.',
      steps: [
        { title: 'Initial discussion', body: 'Learn about your location and your interest.' },
        { title: 'Site assessment', body: 'Review feasibility and placement requirements.' },
        { title: 'Pilot proposal', body: 'Consider a scenario and terms for discussion when appropriate.' },
        { title: 'Mutual confirmation', body: 'Agree on any next steps and potential written agreement.' },
      ],
      disclaimer: 'These steps describe an intended process. Returns, exclusivity, schedules and installations are not guaranteed.',
    },
    contact: {
      eyebrow: 'Tell us about your business',
      title: 'Let’s explore what could work at your location.',
      intro: 'Tell us about your gas station or fitness centre, its location and the project you are interested in. We can determine together whether an initial conversation makes sense.',
      stationAction: 'Introduce my gas station',
      fitnessAction: 'Introduce my fitness centre',
      generalAction: 'Other inquiry',
      alternative: 'Visit the contact page',
      method: 'Each button opens our inquiry form with the relevant project preselected. Sending an inquiry does not establish a partnership.',
      emailSubject: 'BlueKioskTech — Partnership inquiry',
      draft: 'Hello BlueKioskTech,\n\nI would like to discuss a potential partnership.\n\nBusiness type: {kind}\nBusiness name: \nCity / area: \nContact name and role: \nProject of interest: \n\nThank you.',
      stationType: 'Gas station',
      fitnessType: 'Fitness centre',
      otherType: 'Other business',
    },
  },
} as const;

export function partnershipTranslation(locale: Locale) {
  return partnershipCopy[locale];
}
