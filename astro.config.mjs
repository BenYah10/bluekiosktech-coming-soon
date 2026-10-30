/**
 * BlueKioskTech — configuration Astro.
 * Français : racine / ; anglais : préfixe /en/.
 * Build statique pour la vitrine. Les futurs formulaires pourront utiliser des
 * fonctions serveur séparées, sans transformer toutes les pages en SSR.
 */
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.bluekiosktech.ca',
  trailingSlash: 'always',
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    routing: { prefixDefaultLocale: false },
  },
});
