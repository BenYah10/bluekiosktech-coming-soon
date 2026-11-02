
/**
 * BlueKioskTech — configuration Astro.
 * Français : racine / ; anglais : préfixe /en/.
 * Build statique pour la vitrine.
 *
 * SEO : génération automatique du sitemap FR/EN.
 */
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Domaine actuel conservé provisoirement.
  // La normalisation www / sans www sera vérifiée avant déploiement.
  site: 'https://bluekiosktech.ca',

  trailingSlash: 'always',

  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    routing: { prefixDefaultLocale: false },
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'fr',
        locales: {
          fr: 'fr-CA',
          en: 'en-CA',
        },
      },
    }),
  ],
});
