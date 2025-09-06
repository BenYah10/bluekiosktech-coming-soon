// privacy.js
(function () {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const setYear = () => ($("#y").textContent = new Date().getFullYear());

  const i18n = {
    fr: {
      "privacy.title": "Politique de confidentialité",
      "privacy.meta.desc":
        "Politique de confidentialité BlueKioskTech.ca : données collectées, usage, conservation, droits RGPD/LPRPDE et contact.",
      "privacy.updated": "Dernière mise à jour : 5 sept. 2025",
      // Intro & controller
      "privacy.intro":
        "Chez <strong>BlueKioskTech.ca</strong>, nous accordons une grande importance à la protection de vos données personnelles. Cette politique explique quelles informations nous collectons, comment nous les utilisons, combien de temps nous les conservons et quels sont vos droits.",
      "privacy.controller.title": "1. Responsable du traitement",
      "privacy.controller.body":
        "Le responsable du traitement est : <strong>BlueKioskTech.ca</strong>.<br/>Contact : <a href=\"mailto:admin@bluekiosk.tech\">admin@bluekiosk.tech</a>",
      // Données
      "privacy.data.title": "2. Données collectées",
      "privacy.data.li1": "Réponses au formulaire/liste d’attente et feedback.",
      "privacy.data.li2": "Adresse e-mail (optionnelle).",
      "privacy.data.li3": "Métadonnées techniques minimales (ex. journal d’accès côté hébergeur).",
      "privacy.data.li4": "Préférence de langue (stockée localement sur votre appareil).",
      "privacy.data.note":
        "Nous ne collectons que les données que vous nous fournissez volontairement.",
      // Usage
      "privacy.usage.title": "3. Finalités d’utilisation",
      "privacy.usage.li1": "Gérer la liste d’attente et vous contacter lors du lancement.",
      "privacy.usage.li2": "Analyser vos retours pour améliorer notre prototype et nos services.",
      "privacy.usage.li3": "Mesurer l’intérêt (statistiques agrégées/anonymisées).",
      // Base légale
      "privacy.basis.title": "4. Base légale",
      "privacy.basis.li1": "Votre consentement (inscription volontaire, feedback).",
      "privacy.basis.li2": "Intérêt légitime (sécuriser nos services, prévenir les abus).",
      // Partage
      "privacy.share.title": "5. Sous-traitants & hébergement",
      "privacy.share.li1": "<strong>Hébergement :</strong> Vercel (logs d’accès techniques standard).",
      "privacy.share.li2":
        "<strong>Envoi d’e-mails :</strong> EmailJS (uniquement si vous nous écrivez via le formulaire).",
      "privacy.share.li3":
        "<strong>Stockage :</strong> Google Workspace/Sheets (données de formulaire/feedback).",
      "privacy.share.note":
        "Ces prestataires traitent les données pour notre compte et selon nos instructions, avec des garanties de sécurité appropriées.",
      // Rétention
      "privacy.retention.title": "6. Durée de conservation",
      "privacy.retention.body":
        "Nous conservons vos données jusqu’à 24 mois après la collecte, sauf demande de suppression antérieure ou obligation légale différente.",
      // Droits
      "privacy.rights.title": "7. Vos droits",
      "privacy.rights.li1": "Accès, rectification, effacement.",
      "privacy.rights.li2": "Retrait du consentement à tout moment.",
      "privacy.rights.li3": "Limitation/opposition (selon votre juridiction).",
      "privacy.rights.li4": "Plainte auprès de votre autorité de protection des données.",
      "privacy.rights.note":
        "Pour exercer vos droits : <a href=\"mailto:admin@bluekiosk.tech\">admin@bluekiosk.tech</a>",
      // Contact
      "privacy.contact.title": "8. Contact",
      "privacy.contact.body":
        "Pour toute question relative à cette politique : <a href=\"mailto:admin@bluekiosk.tech\">admin@bluekiosk.tech</a>.",
      "privacy.disclaimer":
        "Cette politique peut être mise à jour. La date en tête de page indique la dernière révision.",
      // Footer
      "footer.home": "Accueil",
      "footer.privacy": "Politique de confidentialité"
    },

    en: {
      "privacy.title": "Privacy Policy",
      "privacy.meta.desc":
        "BlueKioskTech.ca Privacy Policy: what we collect, how we use it, retention, your rights, and contact.",
      "privacy.updated": "Last updated: Sep 5, 2025",
      "privacy.intro":
        "At <strong>BlueKioskTech.ca</strong>, we care about protecting your personal data. This policy explains what we collect, how we use it, how long we keep it, and your rights.",
      "privacy.controller.title": "1. Data Controller",
      "privacy.controller.body":
        "Data controller: <strong>BlueKioskTech.ca</strong>.<br/>Contact: <a href=\"mailto:admin@bluekiosk.tech\">admin@bluekiosk.tech</a>",
      "privacy.data.title": "2. Data we collect",
      "privacy.data.li1": "Waitlist/form responses and feedback.",
      "privacy.data.li2": "Email address (optional).",
      "privacy.data.li3": "Minimal technical metadata (e.g., host access logs).",
      "privacy.data.li4": "Language preference (stored locally on your device).",
      "privacy.data.note":
        "We only collect data you voluntarily provide to us.",
      "privacy.usage.title": "3. Purposes of use",
      "privacy.usage.li1": "Manage the waitlist and contact you at launch.",
      "privacy.usage.li2": "Analyze feedback to improve our prototype and services.",
      "privacy.usage.li3": "Measure interest (aggregated/anonymous stats).",
      "privacy.basis.title": "4. Legal basis",
      "privacy.basis.li1": "Your consent (voluntary opt-in, feedback).",
      "privacy.basis.li2": "Legitimate interest (service security and abuse prevention).",
      "privacy.share.title": "5. Sub-processors & hosting",
      "privacy.share.li1": "<strong>Hosting:</strong> Vercel (standard access logs).",
      "privacy.share.li2":
        "<strong>Email sending:</strong> EmailJS (only if you contact us via the form).",
      "privacy.share.li3":
        "<strong>Storage:</strong> Google Workspace/Sheets (form/feedback data).",
      "privacy.share.note":
        "These providers process data on our behalf under our instructions, with appropriate safeguards.",
      "privacy.retention.title": "6. Retention",
      "privacy.retention.body":
        "We keep your data for up to 24 months after collection unless you request deletion earlier or a different legal retention applies.",
      "privacy.rights.title": "7. Your rights",
      "privacy.rights.li1": "Access, rectification, erasure.",
      "privacy.rights.li2": "Withdraw consent at any time.",
      "privacy.rights.li3": "Restriction/objection (where applicable).",
      "privacy.rights.li4": "Complaint to your data protection authority.",
      "privacy.rights.note":
        "To exercise your rights: <a href=\"mailto:admin@bluekiosk.tech\">admin@bluekiosk.tech</a>",
      "privacy.contact.title": "8. Contact",
      "privacy.contact.body":
        "For any question regarding this policy: <a href=\"mailto:admin@bluekiosk.tech\">admin@bluekiosk.tech</a>.",
      "privacy.disclaimer":
        "We may update this policy. The date at the top indicates the last revision.",
      "footer.home": "Home",
      "footer.privacy": "Privacy Policy"
    }
  };

  function applyI18n(lang) {
    // Texte simple (textContent)
    $$("[data-i18n]").forEach(el => {
      const k = el.getAttribute("data-i18n");
      if (i18n[lang][k]) el.textContent = i18n[lang][k];
    });
    // Texte riche (innerHTML)
    $$("[data-i18n-html]").forEach(el => {
      const k = el.getAttribute("data-i18n-html");
      if (i18n[lang][k]) el.innerHTML = i18n[lang][k];
    });
    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);
  }

  // Langue initiale
  const initLang =
    localStorage.getItem("lang") ||
    (navigator.language || "fr").toLowerCase().startsWith("fr")
      ? "fr"
      : "en";

  applyI18n(initLang);
  setYear();

  // Si tu ajoutes des boutons FR/EN sur cette page, branche-les ici :
  const btnFR = document.getElementById("lang-fr");
  const btnEN = document.getElementById("lang-en");
  if (btnFR) btnFR.addEventListener("click", () => applyI18n("fr"));
  if (btnEN) btnEN.addEventListener("click", () => applyI18n("en"));
})();
