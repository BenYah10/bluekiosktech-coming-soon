// ====== i18n ======
// ====== i18n ======
const I18N = {
  fr: {
    "meta.title": "BlueKioskTech.ca – Site en construction",
    "meta.desc": "BlueKioskTech.ca développe des stations de désinfection en libre-service (99,99%). Gyms d’abord, puis bureaux et campus. Rejoignez la liste d’attente.",
    "og.title": "BlueKioskTech.ca – Clean-tech & Hygiène, bientôt dispo",
    "og.desc": "Des stations de désinfection 99,99% en libre-service. Gyms en priorité, bureaux et campus ensuite.",
    "hero.title": "Le futur de l’hygiène clean-tech arrive.",
    "hero.subtitle": "Nous construisons un réseau de stations de désinfection en libre-service (99,99%). Gyms d’abord, puis bureaux et campus.",
    "waitlist.placeholder": "vous@exemple.com",
    "waitlist.cta": "Rejoindre la liste d’attente",
    "waitlist.disclaimer": "Zéro spam. Nous vous écrirons uniquement au lancement.",

    // KPIs & cartes
    "kpi.1": "Germes éliminés",
    "kpi.2": "Cycle complet",
    "kpi.3": "24/7, sans friction",
    "card.1.t": "Gyms en priorité",
    "card.1.p": "Déploiement prévu dans les salles de sport pour sécuriser votre hydratation.",
    "card.2.t": "Bureaux & Campus",
    "card.2.p": "Deuxième phase : espaces de travail, campus et cégeps.",
    "card.3.t": "Clean-tech durable",
    "card.3.p": "Réutiliser sa gourde, c’est réduire le plastique et améliorer l’hygiène.",

    // Footer & statuts
    "footer.privacy": "Politique de confidentialité",
    "footer.copy": "© <span id=\"year\"></span> BlueKiosk.tech — Tous droits réservés.",
    "status.ok": "Merci ! Vous êtes bien inscrit(e).",
    "status.err": "Oups… Une erreur est survenue. Réessayez plus tard.",

    // >>> Ajoutés : bloc feedback <<<
    "feedback.msg": "Votre avis nous est crucial pour finaliser notre prototype.",
    "feedback.cta": "Donner votre avis"
  },

  en: {
    "meta.title": "BlueKioskTech.ca – Coming soon",
    "meta.desc": "We’re building self-service disinfection stations (99.99%). Gyms first, then offices and campuses. Join the waitlist.",
    "og.title": "BlueKioskTech.ca – Clean-tech & Hygiene, coming soon",
    "og.desc": "Self-service 99.99% disinfection stations. Gyms first, then offices and campuses.",
    "hero.title": "The future of clean-tech hygiene is arriving.",
    "hero.subtitle": "We’re building a network of self-service disinfection stations (99.99%). Gyms first, then offices and campuses.",
    "waitlist.placeholder": "you@example.com",
    "waitlist.cta": "Join the waitlist",
    "waitlist.disclaimer": "No spam. We’ll only contact you at launch.",

    // KPIs & cards
    "kpi.1": "Germs eliminated",
    "kpi.2": "Full cycle",
    "kpi.3": "24/7, frictionless",
    "card.1.t": "Gyms first",
    "card.1.p": "Initial rollout in gyms to secure hydration where it matters most.",
    "card.2.t": "Offices & Campuses",
    "card.2.p": "Phase two expands to workplaces, campuses and cégeps.",
    "card.3.t": "Sustainable clean-tech",
    "card.3.p": "Reuse bottles safely—less plastic, better hygiene.",

    // Footer & status
    "footer.privacy": "Privacy policy",
    "footer.copy": "© <span id=\"year\"></span> BlueKiosk.tech — All rights reserved.",
    "status.ok": "Thanks! You’re on the list.",
    "status.err": "Oops… Something went wrong. Please try again later.",

    // >>> Added: feedback block <<<
    "feedback.msg": "Your feedback is crucial to finalize our prototype.",
    "feedback.cta": "Give feedback"
  }
};


let currentLang =
  localStorage.getItem("lang") ||
  (navigator.language && navigator.language.startsWith("fr") ? "fr" : "en");

function applyI18n(lang){
  const dict = I18N[lang] || I18N.en;
  // text nodes
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const k = el.getAttribute("data-i18n");
    if (dict[k] != null) el.innerHTML = dict[k];
  });
  // placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{
    const k = el.getAttribute("data-i18n-placeholder");
    if (dict[k]) el.setAttribute("placeholder", dict[k]);
  });
  // <title> + meta/og/twitter
  document.title = dict["meta.title"] || document.title;
  const md = document.querySelector('meta[name="description"]');
  if (md && dict["meta.desc"]) md.setAttribute("content", dict["meta.desc"]);
  ["og:description","twitter:description"].forEach(p=>{
    const m = document.querySelector(`meta[property="${p}"], meta[name="${p}"]`);
    if (m && dict["og.desc"]) m.setAttribute("content", dict["og.desc"]);
  });
  ["og:title","twitter:title"].forEach(p=>{
    const m = document.querySelector(`meta[property="${p}"], meta[name="${p}"]`);
    if (m && dict["og.title"]) m.setAttribute("content", dict["og.title"]);
  });

  // switch state
  document.getElementById("lang-fr")?.classList.toggle("is-active", lang==="fr");
  document.getElementById("lang-en")?.classList.toggle("is-active", lang==="en");
  document.getElementById("lang-fr")?.setAttribute("aria-pressed", String(lang==="fr"));
  document.getElementById("lang-en")?.setAttribute("aria-pressed", String(lang==="en"));

  localStorage.setItem("lang", lang);
  currentLang = lang;
}

document.addEventListener("DOMContentLoaded", ()=>{
  // lang setup
  applyI18n(currentLang);
  document.getElementById("lang-fr")?.addEventListener("click", ()=>applyI18n("fr"));
  document.getElementById("lang-en")?.addEventListener("click", ()=>applyI18n("en"));

  // year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // ===== EmailJS waitlist (facultatif) =====
  // ➜ remplace par tes IDs EmailJS (ou commente ces 3 lignes pour désactiver)
  const EMAILJS = {
    USER_ID: "YOUR_EMAILJS_PUBLIC_KEY",
    SERVICE_ID: "YOUR_EMAILJS_SERVICE_ID",
    TEMPLATE_ID: "YOUR_EMAILJS_TEMPLATE_ID"
  };

  const form = document.getElementById("waitlist");
  const out = document.getElementById("wl-done");

  if (form){
    try { emailjs.init(EMAILJS.USER_ID); } catch(e) {}

    form.addEventListener("submit", async (e)=>{
      e.preventDefault();
      out.textContent = ""; // reset

      const email = (document.getElementById("email")?.value || "").trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        out.textContent = currentLang==="fr" ? "Email invalide." : "Invalid email.";
        return;
      }

      // Si EmailJS non configuré, fallback mailto
      if (!EMAILJS.USER_ID || !EMAILJS.SERVICE_ID || !EMAILJS.TEMPLATE_ID){
        window.location.href = `mailto:admin@bluekiosk.tech?subject=Waitlist&body=${encodeURIComponent(email)}`;
        out.textContent = currentLang==="fr" ? "Merci !" : "Thanks!";
        form.reset();
        return;
      }

      try{
        await emailjs.send(EMAILJS.SERVICE_ID, EMAILJS.TEMPLATE_ID, { email });
        out.textContent = I18N[currentLang]["status.ok"];
        form.reset();
      }catch(err){
        console.error(err);
        out.textContent = I18N[currentLang]["status.err"];
      }
    });
  }
});
