# BlueKioskTech — Site corporatif FR/EN

Site corporatif bilingue de **BlueKioskTech**, développé avec **Astro**, pour présenter l'entreprise, ses deux concepts **MatMatic** et **VUCS**, et faciliter les prises de contact et les propositions de partenariat.

> **Statut au 27 octobre 2026 : préproduction.** Le nouveau site Astro est en préparation sur la branche `corporate-preview`. Le site *Coming Soon* demeure en production sur `bluekiosktech.ca` jusqu'à une décision explicite de lancement. Une Preview Vercel ne constitue pas une validation de production.

## Présentation

BlueKioskTech développe des concepts de solutions automatisées en libre-service :

- **MatMatic** — concept de machine de nettoyage automatisé des tapis de voiture, notamment destiné aux stations-service et installations de lavage automobile.
- **VUCS** — concept de système automatisé de désinfection de gourdes réutilisables, notamment destiné aux centres sportifs et autres lieux collectifs.

Les projets sont présentés selon leur stade réel de développement. La présence d'une solution sur ce site ne signifie **ni installation confirmée, ni disponibilité commerciale, ni engagement de livraison ou de partenariat**.

## Technologies et architecture

| Élément | Technologie / principe |
| --- | --- |
| Interface | Astro `^6.0.0`, composants `.astro`, HTML, CSS et TypeScript |
| Langues | Français et anglais, routes dédiées et contenus localisés |
| Médias | Images optimisées, notamment WebP ; vidéos à intégrer ultérieurement |
| Hébergement prévu | Vercel |
| Gestion de versions | Git / GitHub |
| Formulaire | Fonction serveur `api/contact.js` et service EmailJS |
| Protection anti-robots | Cloudflare Turnstile, validation côté serveur |
| Configuration sensible | Variables d'environnement Vercel, jamais dans Git |

Arborescence principale :

```text
.
├── api/                    # Fonctions serveur (contact, diagnostics de test)
├── public/                 # Assets publics : identité visuelle et images
├── src/
│   ├── components/         # Composants Astro réutilisables
│   ├── config/             # Configuration applicative
│   ├── i18n/               # Textes et contenus localisés
│   ├── layouts/            # Mises en page
│   ├── pages/              # Routes FR/EN
│   └── styles/             # Styles du site
├── tests/                  # Scripts de tests techniques
├── astro.config.mjs
├── package.json
├── package-lock.json
└── tsconfig.json
```

## Pages et routes

| Page | Français | English |
| --- | --- | --- |
| Accueil | `/` | `/en/` |
| Solutions | `/solutions/` | `/en/solutions/` |
| MatMatic | `/solutions/matmatic/` | `/en/solutions/matmatic/` |
| VUCS | `/solutions/vucs/` | `/en/solutions/vucs/` |
| À propos | `/a-propos/` | `/en/about/` |
| Partenariats | `/partenariats/` | `/en/partnerships/` |
| Contact | `/contact/` | `/en/contact/` |

Les liens, libellés et interactions FR/EN font partie des critères de recette avant lancement.

## Développement local

### Prérequis

- Git et Node.js, avec une version compatible avec le projet (consulter `.nvmrc` et les exigences de `package.json`).
- npm.
- Accès aux variables d'environnement de développement **uniquement si un test fonctionnel en a besoin**.

Depuis la racine du projet :

```powershell
npm ci
npm run dev
```

Le terminal indique l'URL locale du serveur Astro (généralement un port `4321` ou voisin, selon la disponibilité).

Pour préparer une compilation de contrôle :

```powershell
npm run build
```

> Les commandes npm supplémentaires doivent être vérifiées directement dans le champ `scripts` de `package.json` avant d'être ajoutées à cette documentation. La réussite d'un build n'atteste pas à elle seule du bon fonctionnement des API ni des formulaires sur Vercel.

## Formulaire de contact et sécurité

Les parcours contact et partenariat couvrent notamment MatMatic et VUCS, en français et en anglais.

- L'envoi doit passer par l'API serveur prévue pour le contact et respecter les validations applicatives.
- Cloudflare Turnstile doit être **validé côté serveur** ; l'état visuel « Succès ! » du widget ne suffit pas.
- EmailJS sert à la notification interne et, lorsque le parcours l'autorise, à l'accusé de réception de l'expéditeur.
- Les protections d'origine, de limitation des requêtes et les restrictions propres aux environnements doivent être vérifiées lors de la recette Preview.
- Les pages et points d'entrée de diagnostic sont destinés aux essais et doivent être supprimés ou rendus inaccessibles en Production, selon les conclusions de l'audit.
- Les clés de test publiques/documentées de Turnstile ne doivent jamais remplacer les secrets réels de validation en Production.

### Variables d'environnement

Les noms suivants ont été utilisés dans les travaux de configuration. **La liste exacte et les valeurs requises doivent être recoupées avec le code et les paramètres Vercel avant le déploiement.**

```text
EMAILJS_SERVICE_ID
EMAILJS_CONTACT_TEMPLATE_ID
EMAILJS_ACK_TEMPLATE_ID
EMAILJS_PUBLIC_KEY
EMAILJS_PRIVATE_KEY
CONTACT_RATE_SALT
PUBLIC_TURNSTILE_SITE_KEY
TURNSTILE_SECRET_KEY
CONTACT_FORM_ENABLED
```

Certaines variables de test Preview peuvent également être présentes : leur portée et leur nécessité sont à auditer avant publication.

**Ne jamais** inscrire les valeurs des secrets dans le README, une capture d'écran, un commit Git, un fichier source ou un journal partagé. Les fichiers `.env*` locaux doivent être exclus du versionnement, sauf un éventuel `.env.example` constitué exclusivement de noms et de valeurs fictives.

## GitHub et environnements Vercel

Le dépôt historique conserve son nom technique :

- **GitHub** : [`BenYah10/bluekiosktech-coming-soon`](https://github.com/BenYah10/bluekiosktech-coming-soon)
- **Projet Vercel** : `bluekiosktech-coming-soon`
- **Domaine public cible** : `bluekiosktech.ca`

Stratégie de déploiement :

| Branche / environnement | Rôle | Règle |
| --- | --- | --- |
| `main` / Production | Conserve le Coming Soon jusqu'au lancement | Ne pas fusionner le site Astro avant le **Go** explicite |
| `corporate-preview` / Preview | Valide le site corporatif Astro sur un déploiement isolé | Vérifier protection, indexation, variables d'environnement et API |

Le projet Astro est préparé dans une copie Git distincte, avec conservation de l'historique du dépôt existant. Le projet Vercel existant et ses domaines doivent être conservés autant que possible, sans reconfiguration DNS inutile.

**Important :** la mise en ligne de la branche Preview peut déclencher un déploiement Preview Vercel si l'intégration Git est active. Vérifier préalablement la branche de production, les protections d'accès et les variables affectées à Preview.

### Checklist de recette Preview

- [ ] Build Vercel terminé sans erreur ; routes FR/EN accessibles.
- [ ] Identité graphique, affichage mobile, navigation, carrousel et images WebP contrôlés.
- [ ] Protection de l'accès Preview vérifiée ; pas d'indexation prématurée.
- [ ] Fonction `/api/contact` vérifiée dans son environnement de destination.
- [ ] Turnstile validé côté serveur sur les parcours autorisés ; refus des requêtes invalides.
- [ ] EmailJS : notifications internes et accusés de réception FR/EN vérifiés, sans fuite de secrets.
- [ ] Redirections, liens, statuts HTTP et messages d'erreur vérifiés.
- [ ] Absence de fonctions de diagnostic accessibles en production et de données confidentielles versionnées.
- [ ] Lighthouse et contrôles de performance réexécutés sur le site hébergé.
- [ ] Plan de retour arrière et validation Go/No-Go documentés.

Les résultats Lighthouse **locaux et ponctuels** sur l'Accueil ont été de l'ordre de Performance 99–100, Accessibilité 96–97, Best Practices 100 et SEO 100. Ces résultats ne préjugent pas des performances de la Preview ni de la Production.

## Points à finaliser avant le lancement

- Professionnaliser le **nom d'expéditeur** affiché par certains clients de messagerie dans les accusés de réception.
- Harmoniser la **réinitialisation du formulaire** après soumission avec le libellé du bandeau de confirmation (ex. « Partenariat MatMatic »).
- Auditer et retirer les éventuels outils ou pages de diagnostic devenus inutiles.
- Ajouter les vidéos MatMatic et VUCS lorsqu'elles seront prêtes, sans bloquer les tests Preview du site existant.
- Vérifier que les variables d'environnement et les règles de protection correspondent bien à chaque environnement Vercel.

## Publication et retour arrière

Aucune modification de domaine ou fusion vers `main` ne doit intervenir avant la validation explicite de la checklist Go/No-Go. Conserver le dernier commit et le déploiement de Production fonctionnel comme points de retour arrière. Les modalités concrètes de restauration seront vérifiées dans Vercel avant le lancement.

---

**BlueKioskTech — Documentation du site corporatif Astro**
Mise à jour : 27 octobre 2026 · Statut : préparation Phase 3, avant premier commit Astro.
