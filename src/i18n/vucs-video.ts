/** Textes FR/EN du film conceptuel VUCS (lot L6). */
import type { Locale } from './ui';

const translations = {
  fr: {
    readyText: 'Découvrez en vidéo le parcours d’utilisation imaginé pour VUCS, un concept de désinfection automatisée de gourdes en libre-service.',
    simulationNotice: 'Vidéo conceptuelle illustrative. Le dispositif et ses performances ne sont pas présentés comme validés ou commercialisés.',
    playerLabel: 'Vidéo de présentation conceptuelle VUCS',
    unsupported: 'Votre navigateur ne prend pas en charge la vidéo.',
    videoCaption: 'Simulation visuelle du concept VUCS — projet en développement.',
  },
  en: {
    readyText: 'Watch the proposed VUCS user journey, a self-service automated reusable water bottle sanitization concept.',
    simulationNotice: 'Illustrative concept video. The equipment and its performance are not presented as validated or commercially available.',
    playerLabel: 'VUCS concept presentation video',
    unsupported: 'Your browser does not support video playback.',
    videoCaption: 'VUCS concept visualization — project in development.',
  },
} as const;

export function vucsVideoTranslation(locale: Locale) {
  return translations[locale === 'en' ? 'en' : 'fr'];
}
