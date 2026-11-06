/**
 * BlueKioskTech.ca — Politique de confidentialité FR/EN
 *
 * Rôle :
 * - Centraliser le contenu des politiques de confidentialité.
 * - Maintenir la cohérence entre les versions FR et EN.
 * - Alimenter le composant PrivacyPage.astro.
 *
 * Version documentaire : V1.0
 * Date du projet : 2026-11-04
 *
 * Important :
 * - Aucun traitement de données personnelles dans ce fichier.
 * - Aucun appel API ni accès aux configurations de sécurité.
 */

import type { Locale } from './ui';

export interface PrivacyBlock {
  type: 'paragraph' | 'subheading' | 'list';
  text?: string;
  items?: string[];
}

export interface PrivacySection {
  id: string;
  title: string;
  blocks: PrivacyBlock[];
}

export interface PrivacyContent {
  title: string;
  version: string;
  draftDate: string;
  effectiveDate: string;
  sections: PrivacySection[];
}

export const privacyCopy: Record<Locale, PrivacyContent> = {
  
fr: {
  title: 'Politique de confidentialité',
  version: 'V1.0',
  draftDate: '5 novembre 2026',
  effectiveDate: '5 novembre 2026',

sections: [
  {
    id: 'purpose',
    title: '1. Objet de la politique',
    blocks: [
      {
        type: 'paragraph',
        text: 'Chez BlueKioskTech, nous accordons de l’importance à la confidentialité et à la protection des renseignements personnels des personnes qui visitent notre site Web ou communiquent avec nous.',
      },
      {
        type: 'paragraph',
        text: 'La présente politique explique comment nous recueillons, utilisons, communiquons, conservons et protégeons les renseignements personnels dans le cadre de nos activités sur le site corporatif bluekiosktech.ca.',
      },
      {
        type: 'paragraph',
        text: 'Elle s’applique notamment aux demandes de renseignements généraux, aux propositions de partenariat et aux échanges liés aux activités de BlueKioskTech, y compris ses projets actuels, tels que MatMatic et VUCS, ainsi que ses futurs projets et initiatives.',
      },
      {
        type: 'paragraph',
        text: 'Cette politique ne couvre pas nécessairement les sondages et autres activités réalisés indépendamment sur le site bluekiosk.tech, qui disposent de leurs propres modalités de confidentialité.',
      },
    ],
  },
  {
    id: 'responsibility',
    title: '2. Identité et responsable de la protection des renseignements personnels',
    blocks: [
      {
        type: 'paragraph',
        text: 'BlueKioskTech est une marque québécoise dédiée au développement de solutions automatisées en libre-service, notamment dans les domaines de l’hygiène et de la propreté.',
      },
      {
        type: 'paragraph',
        text: 'Responsable de la protection des renseignements personnels : Fondateur de BlueKioskTech.',
      },
      {
        type: 'paragraph',
        text: 'Localisation : Montréal, Québec, Canada. Courriel : info@bluekiosk.tech. Site Web : https://bluekiosktech.ca.',
      },
      {
        type: 'paragraph',
        text: 'Le responsable veille au traitement des demandes relatives à la confidentialité, à l’accès aux renseignements personnels et à leur rectification, ainsi qu’à la mise en œuvre des mesures applicables de protection des renseignements.',
      },
    ],
  },
  {
    id: 'collection',
    title: '3. Renseignements personnels recueillis',
    blocks: [
      {
        type: 'subheading',
        text: '3.1 Formulaire de contact général',
      },
      {
        type: 'paragraph',
        text: 'Lorsque vous nous transmettez une demande générale, nous recueillons notamment :',
      },
      {
        type: 'list',
        items: [
          'Votre nom;',
          'Votre adresse courriel;',
          'Votre numéro de téléphone, si vous choisissez de le fournir;',
          'Le contenu de votre message;',
          'La langue et le type de demande sélectionnés.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Le nom, l’adresse courriel et le message sont nécessaires pour transmettre une demande au moyen du formulaire.',
      },
      {
        type: 'subheading',
        text: '3.2 Demandes de partenariat',
      },
      {
        type: 'paragraph',
        text: 'Lorsque vous sélectionnez le formulaire de partenariat, nous pouvons également recueillir :',
      },
      {
        type: 'list',
        items: [
          'Le nom de votre organisation ou établissement;',
          'Votre fonction, si vous choisissez de la préciser;',
          'La ville ou le secteur de votre établissement;',
          'Le type d’établissement;',
          'Le projet qui vous intéresse, notamment MatMatic ou VUCS;',
          'Le nombre d’établissements, si vous choisissez de le préciser;',
          'L’objectif de votre démarche;',
          'Toute information supplémentaire communiquée volontairement dans votre message.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Certains de ces renseignements sont obligatoires pour nous permettre de comprendre et d’évaluer une proposition de partenariat.',
      },
      {
        type: 'paragraph',
        text: 'Nous vous invitons à ne pas transmettre de renseignements personnels sensibles ou non nécessaires à votre demande.',
      },
      {
        type: 'subheading',
        text: '3.3 Renseignements techniques et de sécurité',
      },
      {
        type: 'paragraph',
        text: 'Lors de l’utilisation du site et du formulaire, certaines données techniques peuvent être traitées, notamment :',
      },
      {
        type: 'list',
        items: [
          'L’adresse IP;',
          'Des renseignements relatifs au navigateur et à l’appareil utilisé;',
          'Des renseignements techniques liés à la requête Web;',
          'Les résultats et jetons de vérification anti-robots;',
          'Certains identifiants techniques utilisés pour limiter les soumissions abusives.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Ces renseignements peuvent être traités par les services d’hébergement et de sécurité utilisés pour exploiter le site.',
      },
    ],
  },

  {
    id: 'purposes',
    title: '4. Finalités de la collecte et de l’utilisation',
    blocks: [
      {
        type: 'paragraph',
        text: 'Nous utilisons les renseignements recueillis pour :',
      },
      {
        type: 'list',
        items: [
          'Recevoir, examiner et répondre à vos demandes;',
          'Communiquer avec vous lorsque des précisions sont nécessaires;',
          'Évaluer les possibilités de collaboration ou de partenariat concernant MatMatic, VUCS ou d’autres initiatives BlueKioskTech;',
          'Assurer le fonctionnement, la sécurité et la disponibilité du formulaire de contact;',
          'Détecter et prévenir les soumissions automatisées, frauduleuses ou abusives;',
          'Respecter nos obligations légales applicables.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Les renseignements transmis par le formulaire ne servent pas à vous inscrire automatiquement à une liste de communications publicitaires.',
      },
      {
        type: 'paragraph',
        text: 'Toute utilisation pour une finalité différente sera soumise aux exigences légales applicables, notamment en matière de consentement.',
      },
    ],
  },
  {
    id: 'consent',
    title: '5. Consentement et choix',
    blocks: [
      {
        type: 'paragraph',
        text: 'Avant d’envoyer une demande par notre formulaire, vous devez confirmer que vous acceptez l’utilisation des renseignements transmis afin de traiter votre demande et d’y répondre.',
      },
      {
        type: 'paragraph',
        text: 'Cette confirmation est présentée au moyen d’une case à cocher obligatoire.',
      },
      {
        type: 'paragraph',
        text: 'Les champs facultatifs peuvent être laissés vides.',
      },
      {
        type: 'paragraph',
        text: 'Vous pouvez communiquer avec le responsable de la protection des renseignements personnels pour poser une question concernant votre consentement ou demander son retrait, sous réserve des restrictions et obligations prévues par la loi.',
      },
      {
        type: 'paragraph',
        text: 'Le retrait du consentement peut limiter notre capacité à poursuivre le traitement de votre demande.',
      },
    ],
  },
  {
    id: 'providers',
    title: '6. Fournisseurs techniques et communication des renseignements',
    blocks: [
      {
        type: 'paragraph',
        text: 'Pour assurer le fonctionnement du site et le traitement des demandes, BlueKioskTech utilise notamment les services suivants.',
      },
      {
        type: 'subheading',
        text: 'Vercel',
      },
      {
        type: 'paragraph',
        text: 'Le site corporatif est hébergé sur Vercel. Des fonctions côté serveur sont utilisées pour recevoir et valider les demandes soumises par le formulaire.',
      },
      {
        type: 'paragraph',
        text: 'Vercel peut traiter des données techniques nécessaires à l’exploitation et à la sécurité de l’infrastructure.',
      },
      {
        type: 'subheading',
        text: 'Cloudflare Turnstile',
      },
      {
        type: 'paragraph',
        text: 'Le formulaire utilise Cloudflare Turnstile afin de réduire les soumissions automatisées et les abus.',
      },
      {
        type: 'paragraph',
        text: 'Ce service peut traiter certains renseignements techniques, notamment l’adresse IP et des signaux relatifs au navigateur ou à la connexion, aux fins de vérification de sécurité.',
      },
      {
        type: 'subheading',
        text: 'EmailJS',
      },
      {
        type: 'paragraph',
        text: 'BlueKioskTech utilise EmailJS pour acheminer les demandes reçues par le formulaire et transmettre les accusés de réception.',
      },
      {
        type: 'paragraph',
        text: 'Les renseignements nécessaires à ces opérations peuvent être communiqués à EmailJS et aux fournisseurs de messagerie intervenant dans l’acheminement.',
      },
      {
        type: 'subheading',
        text: 'Outlook / Microsoft 365',
      },
      {
        type: 'paragraph',
        text: 'Les correspondances reçues par BlueKioskTech sont consultées et gérées dans une boîte de messagerie Outlook / Microsoft 365.',
      },
      {
        type: 'paragraph',
        text: 'L’adresse publique info@bluekiosk.tech permet de joindre notre équipe et le responsable de la protection des renseignements personnels.',
      },
      {
        type: 'subheading',
        text: 'Communications hors Québec',
      },
      {
        type: 'paragraph',
        text: 'Certains fournisseurs techniques peuvent traiter, héberger ou rendre accessibles des renseignements personnels à l’extérieur du Québec, notamment aux États-Unis.',
      },
      {
        type: 'paragraph',
        text: 'BlueKioskTech doit évaluer les communications hors Québec conformément aux exigences légales applicables et mettre en place les garanties appropriées lorsque ces communications sont permises.',
      },
      {
        type: 'paragraph',
        text: 'Nous ne vendons pas les renseignements personnels recueillis au moyen du formulaire.',
      },
    ],
  },
  {
    id: 'cookies',
    title: '7. Cookies, technologies similaires et mesure d’audience',
    blocks: [
      {
        type: 'paragraph',
        text: 'Le fonctionnement du site peut impliquer des technologies techniques nécessaires à la sécurité et à la prestation des services, notamment celles utilisées par Cloudflare Turnstile.',
      },
      {
        type: 'paragraph',
        text: 'Au moment de la préparation de cette politique, notre examen du code du site corporatif n’a pas identifié d’intégration Google Analytics, de pixel publicitaire ou d’outil similaire de suivi marketing.',
      },
      {
        type: 'paragraph',
        text: 'Cette constatation ne signifie pas nécessairement qu’aucun fournisseur technique n’utilise de cookies ou d’autres mécanismes de stockage ou de sécurité.',
      },
      {
        type: 'paragraph',
        text: 'Nous réévaluerons cette section si de nouveaux outils analytiques, publicitaires ou technologies de suivi sont ajoutés au site.',
      },
    ],
  },
  {
    id: 'retention',
    title: '8. Conservation des renseignements personnels',
    blocks: [
      {
        type: 'paragraph',
        text: 'BlueKioskTech a retenu une durée cible maximale de conservation de 24 mois après le dernier échange pour les demandes générales et les propositions de partenariat terminées.',
      },
      {
        type: 'paragraph',
        text: 'Les renseignements doivent toutefois être supprimés ou anonymisés plus tôt lorsque leur conservation n’est plus nécessaire.',
      },
      {
        type: 'paragraph',
        text: 'Une conservation plus longue peut être justifiée, notamment lorsqu’une obligation légale, un litige, un dossier actif ou une autre nécessité légitime et documentée l’exige.',
      },
      {
        type: 'paragraph',
        text: 'Les renseignements conservés par les fournisseurs techniques peuvent être soumis à des durées et à des mécanismes de suppression distincts.',
      },
      {
        type: 'paragraph',
        text: 'BlueKioskTech mettra en œuvre et vérifiera ses procédures internes de conservation et de suppression afin de respecter ces principes.',
      },
    ],
  },

  {
    id: 'security',
    title: '9. Protection et sécurité',
    blocks: [
      {
        type: 'paragraph',
        text: 'BlueKioskTech utilise différentes mesures techniques destinées à protéger les renseignements transmis au moyen du site.',
      },
      {
        type: 'paragraph',
        text: 'Le formulaire comprend notamment des contrôles de validation, une vérification anti-robots et un traitement côté serveur.',
      },
      {
        type: 'paragraph',
        text: 'L’accès aux renseignements doit être limité aux personnes qui en ont besoin pour traiter les demandes et exercer leurs fonctions.',
      },
      {
        type: 'paragraph',
        text: 'Malgré les précautions prises, aucune transmission par Internet ni aucun système informatique ne peut garantir une sécurité absolue.',
      },
      {
        type: 'paragraph',
        text: 'En cas d’incident de confidentialité, BlueKioskTech appliquera les mesures requises par la législation applicable.',
      },
    ],
  },
  {
    id: 'rights',
    title: '10. Droits relatifs aux renseignements personnels',
    blocks: [
      {
        type: 'paragraph',
        text: 'Sous réserve des conditions et exceptions prévues par les lois applicables, vous pouvez notamment :',
      },
      {
        type: 'list',
        items: [
          'Demander l’accès aux renseignements personnels que nous détenons à votre sujet;',
          'Demander la rectification de renseignements inexacts, incomplets ou équivoques;',
          'Demander le retrait de votre consentement lorsque ce droit est applicable;',
          'Demander la suppression de renseignements lorsque leur conservation n’est plus justifiée;',
          'Demander, dans les circonstances prévues par la loi, la communication de certains renseignements personnels informatisés dans un format technologique structuré et couramment utilisé;',
          'Exercer les autres droits applicables, notamment ceux relatifs à la cessation de diffusion ou à la désindexation dans les situations prévues par la loi.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Pour exercer vos droits, communiquez avec : info@bluekiosk.tech.',
      },
      {
        type: 'paragraph',
        text: 'Veuillez préciser la nature de votre demande afin que nous puissions la traiter.',
      },
      {
        type: 'paragraph',
        text: 'Une vérification raisonnable de votre identité peut être nécessaire avant de communiquer ou de modifier des renseignements personnels.',
      },
      {
        type: 'paragraph',
        text: 'Les demandes écrites d’accès et de rectification seront traitées dans les délais prescrits par la loi, généralement dans les 30 jours suivant leur réception.',
      },
      {
        type: 'paragraph',
        text: 'Si vous estimez que vos droits n’ont pas été respectés, vous pouvez également vous adresser à la Commission d’accès à l’information du Québec, selon les recours applicables.',
      },
    ],
  },
  {
    id: 'external',
    title: '11. Sites Web externes',
    blocks: [
      {
        type: 'paragraph',
        text: 'Le site BlueKioskTech.ca peut contenir des liens vers des sites ou services externes.',
      },
      {
        type: 'paragraph',
        text: 'Les pratiques de confidentialité de ces sites sont régies par leurs propres politiques.',
      },
      {
        type: 'paragraph',
        text: 'Nous vous invitons à les consulter avant de leur communiquer des renseignements personnels.',
      },
    ],
  },
  {
    id: 'changes',
    title: '12. Modifications de la politique',
    blocks: [
      {
        type: 'paragraph',
        text: 'BlueKioskTech peut modifier cette politique pour refléter l’évolution de ses activités, de ses technologies ou des exigences légales.',
      },
      {
        type: 'paragraph',
        text: 'Toute modification sera publiée sur cette page avec une date de mise à jour.',
      },
      {
        type: 'paragraph',
        text: 'Lorsque la loi l’exige, les personnes concernées seront informées des modifications selon les modalités applicables.',
      },
    ],
  },
  {
    id: 'contact',
    title: '13. Nous joindre',
    blocks: [
      {
        type: 'paragraph',
        text: 'Pour toute question concernant cette politique, le traitement de vos renseignements personnels ou l’exercice de vos droits :',
      },
      {
        type: 'paragraph',
        text: 'BlueKioskTech — À l’attention du responsable de la protection des renseignements personnels.',
      },
      {
        type: 'paragraph',
        text: 'Montréal, Québec, Canada.',
      },
      {
        type: 'paragraph',
        text: 'Courriel : info@bluekiosk.tech.',
      },
      {
        type: 'paragraph',
        text: 'Site Web : https://bluekiosktech.ca.',
      },
    ],
  },

],

  },

  en: {
  title: 'Privacy Policy',
  version: 'V1.0',
  draftDate: 'November 5, 2026',
  effectiveDate: 'November 5, 2026',

sections: [
  {
    id: 'purpose',
    title: '1. Purpose of This Policy',
    blocks: [
      {
        type: 'paragraph',
        text: 'At BlueKioskTech, we value the privacy and protection of the personal information of individuals who visit our website or communicate with us.',
      },
      {
        type: 'paragraph',
        text: 'This Privacy Policy explains how we collect, use, disclose, retain, and protect personal information in connection with our activities on the corporate website bluekiosktech.ca.',
      },
      {
        type: 'paragraph',
        text: 'It applies in particular to general inquiries, partnership proposals, and communications related to BlueKioskTech’s activities, including its current projects, such as MatMatic and VUCS, as well as future projects and initiatives.',
      },
      {
        type: 'paragraph',
        text: 'This policy does not necessarily cover surveys or other activities independently conducted through bluekiosk.tech, which are subject to their own privacy arrangements.',
      },
    ],
  },
  {
    id: 'responsibility',
    title: '2. Identity and Person Responsible for the Protection of Personal Information',
    blocks: [
      {
        type: 'paragraph',
        text: 'BlueKioskTech is a Québec-based brand dedicated to developing automated self-service solutions, particularly in the fields of hygiene and cleanliness.',
      },
      {
        type: 'paragraph',
        text: 'Person Responsible for the Protection of Personal Information: Founder of BlueKioskTech.',
      },
      {
        type: 'paragraph',
        text: 'Location: Montréal, Québec, Canada. Email: info@bluekiosk.tech. Website: https://bluekiosktech.ca.',
      },
      {
        type: 'paragraph',
        text: 'The person responsible oversees the handling of privacy-related inquiries, requests for access to and correction of personal information, and the implementation of applicable personal information protection measures.',
      },
    ],
  },
  {
    id: 'collection',
    title: '3. Personal Information We Collect',
    blocks: [
      {
        type: 'subheading',
        text: '3.1 General Contact Form',
      },
      {
        type: 'paragraph',
        text: 'When you submit a general inquiry, we collect:',
      },
      {
        type: 'list',
        items: [
          'Your name;',
          'Your email address;',
          'Your telephone number, if you choose to provide it;',
          'The content of your message;',
          'Your selected language and inquiry type.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Your name, email address, and message are required to submit an inquiry through the form.',
      },
      {
        type: 'subheading',
        text: '3.2 Partnership Inquiries',
      },
      {
        type: 'paragraph',
        text: 'When you select the partnership inquiry form, we may also collect:',
      },
      {
        type: 'list',
        items: [
          'The name of your organization or business;',
          'Your job title or role, if provided;',
          'The city or area where your business is located;',
          'The type of business or establishment;',
          'The project that interests you, including MatMatic, VUCS, or other initiatives;',
          'The number of business locations, if provided;',
          'The purpose of your inquiry;',
          'Any additional information you voluntarily include in your message.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Some of this information is required to understand and assess a potential partnership.',
      },
      {
        type: 'paragraph',
        text: 'Please do not submit sensitive personal information or information that is unnecessary for your inquiry.',
      },
      {
        type: 'subheading',
        text: '3.3 Technical and Security Information',
      },
      {
        type: 'paragraph',
        text: 'When you use our website or contact form, certain technical information may be processed, including:',
      },
      {
        type: 'list',
        items: [
          'Your IP address;',
          'Information about your browser and device;',
          'Technical information associated with web requests;',
          'Anti-bot verification tokens and results;',
          'Certain technical identifiers used to limit abusive submissions.',
        ],
      },
      {
        type: 'paragraph',
        text: 'This information may be processed by our hosting and security providers to operate and protect the website.',
      },
    ],
  },

  {
    id: 'purposes',
    title: '4. Purposes of Collection and Use',
    blocks: [
      {
        type: 'paragraph',
        text: 'We use the information collected to:',
      },
      {
        type: 'list',
        items: [
          'Receive, review, and respond to inquiries;',
          'Contact you when additional information is needed;',
          'Evaluate potential collaborations or partnerships involving MatMatic, VUCS, or other BlueKioskTech initiatives;',
          'Maintain the operation, security, and availability of the contact form;',
          'Detect and prevent automated, fraudulent, or abusive submissions;',
          'Comply with applicable legal obligations.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Information submitted through the contact form is not used to automatically subscribe you to advertising or marketing communications.',
      },
      {
        type: 'paragraph',
        text: 'Any use for a different purpose will be subject to applicable legal requirements, including consent requirements where necessary.',
      },
    ],
  },
  {
    id: 'consent',
    title: '5. Consent and Your Choices',
    blocks: [
      {
        type: 'paragraph',
        text: 'Before submitting an inquiry through our contact form, you must confirm that you agree to the use of the information provided for processing and responding to your inquiry.',
      },
      {
        type: 'paragraph',
        text: 'This confirmation is obtained through a required checkbox.',
      },
      {
        type: 'paragraph',
        text: 'Optional fields may be left blank.',
      },
      {
        type: 'paragraph',
        text: 'You may contact the person responsible for the protection of personal information to ask questions about your consent or request its withdrawal, subject to applicable legal restrictions and obligations.',
      },
      {
        type: 'paragraph',
        text: 'Withdrawing consent may limit our ability to continue processing your inquiry.',
      },
    ],
  },
  {
    id: 'providers',
    title: '6. Technical Service Providers and Disclosure of Information',
    blocks: [
      {
        type: 'paragraph',
        text: 'BlueKioskTech uses the following services to operate its website and process inquiries.',
      },
      {
        type: 'subheading',
        text: 'Vercel',
      },
      {
        type: 'paragraph',
        text: 'Our corporate website is hosted on Vercel. Server-side functions are used to receive and validate contact form submissions.',
      },
      {
        type: 'paragraph',
        text: 'Vercel may process technical information required to operate and secure the hosting infrastructure.',
      },
      {
        type: 'subheading',
        text: 'Cloudflare Turnstile',
      },
      {
        type: 'paragraph',
        text: 'Our contact form uses Cloudflare Turnstile to help prevent automated submissions and abuse.',
      },
      {
        type: 'paragraph',
        text: 'This service may process technical information, including IP addresses and signals related to browsers or connections, for security verification purposes.',
      },
      {
        type: 'subheading',
        text: 'EmailJS',
      },
      {
        type: 'paragraph',
        text: 'BlueKioskTech uses EmailJS to deliver contact form inquiries and send acknowledgment emails.',
      },
      {
        type: 'paragraph',
        text: 'Information required for these operations may be disclosed to EmailJS and the email service providers involved in delivery.',
      },
      {
        type: 'subheading',
        text: 'Outlook / Microsoft 365',
      },
      {
        type: 'paragraph',
        text: 'Correspondence received by BlueKioskTech is accessed and managed through an Outlook / Microsoft 365 mailbox.',
      },
      {
        type: 'paragraph',
        text: 'Our public email address, info@bluekiosk.tech, may be used to contact our team and the person responsible for the protection of personal information.',
      },
      {
        type: 'subheading',
        text: 'Transfers Outside Québec',
      },
      {
        type: 'paragraph',
        text: 'Certain technical service providers may process, store, or make personal information accessible outside Québec, including in the United States.',
      },
      {
        type: 'paragraph',
        text: 'BlueKioskTech must assess transfers of personal information outside Québec in accordance with applicable legal requirements and implement appropriate safeguards where such transfers are permitted.',
      },
      {
        type: 'paragraph',
        text: 'We do not sell personal information collected through our contact form.',
      },
    ],
  },
  {
    id: 'cookies',
    title: '7. Cookies, Similar Technologies, and Analytics',
    blocks: [
      {
        type: 'paragraph',
        text: 'The website may use technical technologies necessary for security and service delivery, including those associated with Cloudflare Turnstile.',
      },
      {
        type: 'paragraph',
        text: 'At the time this policy was prepared, our review of the corporate website’s source code did not identify an integration with Google Analytics, advertising pixels, or similar marketing tracking tools.',
      },
      {
        type: 'paragraph',
        text: 'This finding does not necessarily mean that technical service providers do not use cookies or other storage or security mechanisms.',
      },
      {
        type: 'paragraph',
        text: 'We will reassess this section if new analytics, advertising, or tracking technologies are introduced.',
      },
    ],
  },
  {
    id: 'retention',
    title: '8. Retention of Personal Information',
    blocks: [
      {
        type: 'paragraph',
        text: 'BlueKioskTech has established a target maximum retention period of 24 months following the last communication for completed general inquiries and partnership proposals.',
      },
      {
        type: 'paragraph',
        text: 'However, personal information should be deleted or anonymized sooner when retaining it is no longer necessary.',
      },
      {
        type: 'paragraph',
        text: 'A longer retention period may be justified when required by law, a legal dispute, an active matter, or another legitimate and documented necessity.',
      },
      {
        type: 'paragraph',
        text: 'Information retained by technical service providers may be subject to separate retention periods and deletion procedures.',
      },
      {
        type: 'paragraph',
        text: 'BlueKioskTech will implement and verify its internal retention and deletion procedures to comply with these principles.',
      },
    ],
  },

  {
    id: 'security',
    title: '9. Protection and Security',
    blocks: [
      {
        type: 'paragraph',
        text: 'BlueKioskTech uses various technical measures designed to protect information submitted through the website.',
      },
      {
        type: 'paragraph',
        text: 'The contact form includes validation controls, anti-bot verification, and server-side processing.',
      },
      {
        type: 'paragraph',
        text: 'Access to personal information should be limited to individuals who need it to process inquiries and perform their responsibilities.',
      },
      {
        type: 'paragraph',
        text: 'Despite the precautions taken, no internet transmission or computer system can guarantee absolute security.',
      },
      {
        type: 'paragraph',
        text: 'In the event of a privacy incident, BlueKioskTech will take the measures required by applicable legislation.',
      },
    ],
  },
  {
    id: 'rights',
    title: '10. Your Privacy Rights',
    blocks: [
      {
        type: 'paragraph',
        text: 'Subject to the conditions and exceptions established by applicable laws, you may have the right to:',
      },
      {
        type: 'list',
        items: [
          'Request access to personal information we hold about you;',
          'Request correction of inaccurate, incomplete, or ambiguous personal information;',
          'Withdraw your consent where applicable;',
          'Request the deletion of information when its continued retention is no longer justified;',
          'Request, in circumstances provided by law, certain computerized personal information in a structured and commonly used technological format;',
          'Exercise other applicable rights, including rights relating to the cessation of dissemination or de-indexing in circumstances provided by law.',
        ],
      },
      {
        type: 'paragraph',
        text: 'To exercise your rights, please contact: info@bluekiosk.tech.',
      },
      {
        type: 'paragraph',
        text: 'Please describe your request so that we can process it appropriately.',
      },
      {
        type: 'paragraph',
        text: 'We may need to reasonably verify your identity before disclosing or modifying personal information.',
      },
      {
        type: 'paragraph',
        text: 'Written requests for access or correction will be handled within the time limits prescribed by law, generally within 30 days of receipt.',
      },
      {
        type: 'paragraph',
        text: 'If you believe your privacy rights have not been respected, you may also contact the Commission d’accès à l’information du Québec, subject to the remedies available under applicable law.',
      },
    ],
  },
  {
    id: 'external',
    title: '11. External Websites',
    blocks: [
      {
        type: 'paragraph',
        text: 'BlueKioskTech.ca may contain links to external websites or services.',
      },
      {
        type: 'paragraph',
        text: 'These external websites are governed by their own privacy policies and practices.',
      },
      {
        type: 'paragraph',
        text: 'We encourage you to review those policies before providing personal information.',
      },
    ],
  },
  {
    id: 'changes',
    title: '12. Changes to This Policy',
    blocks: [
      {
        type: 'paragraph',
        text: 'BlueKioskTech may update this Privacy Policy to reflect changes in its activities, technologies, or legal obligations.',
      },
      {
        type: 'paragraph',
        text: 'Changes will be published on this page with an updated revision date.',
      },
      {
        type: 'paragraph',
        text: 'Where required by law, affected individuals will be informed of changes in accordance with applicable requirements.',
      },
    ],
  },
  {
    id: 'contact',
    title: '13. Contact Us',
    blocks: [
      {
        type: 'paragraph',
        text: 'For questions about this Privacy Policy, the processing of your personal information, or the exercise of your privacy rights, please contact:',
      },
      {
        type: 'paragraph',
        text: 'BlueKioskTech — Attention: Person Responsible for the Protection of Personal Information.',
      },
      {
        type: 'paragraph',
        text: 'Montréal, Québec, Canada.',
      },
      {
        type: 'paragraph',
        text: 'Email: info@bluekiosk.tech.',
      },
      {
        type: 'paragraph',
        text: 'Website: https://bluekiosktech.ca.',
      },
    ],
  },

],

  },
};

export function privacyTranslation(
  locale: Locale
): PrivacyContent {
  return privacyCopy[locale];
}