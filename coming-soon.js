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

    // Page success
    "success.title": "Merci — votre inscription est confirmée.",
    "success.lead1": "Nous avons bien reçu votre demande pour rejoindre la liste d’attente. Vous recevrez un e-mail dès l’ouverture du déploiement dans votre zone.",
    "success.lead2": "En attendant, suivez nos mises à jour et invitez votre gym, bureau ou campus à manifester son intérêt.",
    "success.back": "← Retour à l’accueil",

    // Feedback (si tu l’utilises)
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

    // Success page
    "success.title": "Thanks — your subscription is confirmed.",
    "success.lead1": "We’ve received your request to join the waitlist. You’ll get an email when deployment opens in your area.",
    "success.lead2": "Meanwhile, follow our updates and invite your gym, office or campus to express interest.",
    "success.back": "← Back to home",

    // Feedback (if used)
    "feedback.msg": "Your feedback is crucial to finalize our prototype.",
    "feedback.cta": "Give feedback"
  }
};

let currentLang =
  localStorage.getItem("lang") ||
  (navigator.language && navigator.language.startsWith("fr") ? "fr" : "en");

function applyI18n(lang){
  const dict = I18N[lang] || I18N.en;


  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const k = el.getAttribute("data-i18n");
    if (dict[k] != null) el.innerHTML = dict[k];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{
    const k = el.getAttribute("data-i18n-placeholder");
    if (dict[k]) el.setAttribute("placeholder", dict[k]);
  });

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

  document.getElementById("lang-fr")?.classList.toggle("is-active", lang==="fr");
  document.getElementById("lang-en")?.classList.toggle("is-active", lang==="en");
  document.getElementById("lang-fr")?.setAttribute("aria-pressed", String(lang==="fr"));
  document.getElementById("lang-en")?.setAttribute("aria-pressed", String(lang==="en"));

  localStorage.setItem("lang", lang);
  currentLang = lang;

  // si le champ caché existe, on le met à jour aussi
  const hiddenLang = document.getElementById("waitlist-lang");
  if (hiddenLang) hiddenLang.value = lang;
}

document.addEventListener("DOMContentLoaded", ()=>{
  // i18n init + switchers
  applyI18n(currentLang);
  document.getElementById("lang-fr")?.addEventListener("click", (e)=>{ e.preventDefault(); applyI18n("fr"); });
  document.getElementById("lang-en")?.addEventListener("click", (e)=>{ e.preventDefault(); applyI18n("en"); });

  // year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // emailjs (ne servira QUE si on n'utilise pas Netlify)
  const EMAILJS = {
    USER_ID: "YOUR_EMAILJS_PUBLIC_KEY",
    SERVICE_ID: "YOUR_EMAILJS_SERVICE_ID",
    TEMPLATE_ID: "YOUR_EMAILJS_TEMPLATE_ID"
  };

  // Délégation de clic de sécurité (si le switch est ailleurs dans le DOM)
  document.addEventListener('click', (e) => {
    const t = e.target;
    if (!t) return;
    const frBtn = t.id === 'lang-fr' ? t : t.closest?.('#lang-fr');
    const enBtn = t.id === 'lang-en' ? t : t.closest?.('#lang-en');
    if (frBtn) { e.preventDefault?.(); applyI18n('fr'); }
    if (enBtn) { e.preventDefault?.(); applyI18n('en'); }
  });

  // dans coming-soon.js (côté index), après avoir déterminé la langue courante `lang`
const lp = document.getElementById("link-privacy");
if (lp) {
    const u = new URL(lp.getAttribute("href"), window.location.href);
    u.searchParams.set("lang", currentLang);  // <— utiliser currentLang !
    lp.setAttribute("href", u.toString());
  }


  // ====== WAITLIST FORM ======
  const form = document.getElementById("waitlist");
  const out  = document.getElementById("wl-done");
  const emailInput = document.getElementById("waitlist-email");
  const isNetlify = !!(form && form.hasAttribute("data-netlify"));

  // champs cachés
  const hiddenLang = document.getElementById("waitlist-lang");
  if (hiddenLang) hiddenLang.value = currentLang;
  const hiddenBiz  = document.getElementById("is-business"); // optionnel (pour Netlify Forms)

  // --- liste de domaines grand public à refuser (adresse pro requise) ---
  const BLOCKED_DOMAINS = new Set([
    // Global
    "gmail.com","googlemail.com","yahoo.com","ymail.com","aol.com",
    "outlook.com","hotmail.com","live.com","msn.com","icloud.com","me.com",
    "protonmail.com","pm.me","gmx.com","mail.com",
    // Disposable / temporaires
    "yopmail.com","mailinator.com","guerrillamail.com","10minutemail.com",
    "tempmail.com","discard.email","sharklasers.com",
    // FR & EU courants
    "orange.fr","wanadoo.fr","free.fr","sfr.fr","laposte.net","bbox.fr","neuf.fr",
    "hotmail.fr","outlook.fr","live.fr"
  ]);

  function isBusinessEmail(email){
    const m = (email||"").toLowerCase().match(/^[^@\s]+@([^@\s]+)$/);
    if (!m) return false;
    const domain = m[1];
    return !BLOCKED_DOMAINS.has(domain);
  }
  function showError(msg){
    if (out) out.textContent = msg;
    if (emailInput){
      emailInput.setAttribute("aria-invalid","true");
      emailInput.focus();
    }
  }
  function clearError(){
    if (out) out.textContent = "";
    if (emailInput) emailInput.removeAttribute("aria-invalid");
  }

  if (!form) return;

  if (isNetlify) {
    // Netlify Forms : on valide et on ajoute ?lang=xx, puis on laisse partir
    form.addEventListener('submit', function (e) {
      const email = (emailInput?.value || "").trim();

      // format minimal (HTML5 + pattern côté input) + filtre "pro"
      if (!isBusinessEmail(email)) {
        e.preventDefault();
        const msg = currentLang==="fr"
          ? "Merci d’utiliser une adresse professionnelle (ex. nom@entreprise.com)."
          : "Please use a business email (e.g., name@company.com).";
        showError(msg);
        if (hiddenBiz) hiddenBiz.value = "false";
        return;
      }
      clearError();
      if (hiddenBiz) hiddenBiz.value = "true";

      // propage la langue vers la page de succès
      try {
        var base = form.getAttribute('action') || './success.html';
        var sep  = base.includes('?') ? '&' : '?';
        var url  = base + sep + 'lang=' + encodeURIComponent(currentLang || 'fr');
        form.setAttribute('action', url);
      } catch(e) {}
      // Pas de preventDefault : Netlify capture le POST.
    });
    return; // pas d'EmailJS quand Netlify est actif
  }

  // Fallback (sans Netlify) : EmailJS / mailto
  try { if (EMAILJS.USER_ID) emailjs.init(EMAILJS.USER_ID); } catch(e) {}

  form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    clearError();

    const email = (emailInput?.value || "").trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && isBusinessEmail(email);
    if (!ok){
      const msg = currentLang==="fr"
        ? "Merci d’utiliser une adresse professionnelle (ex. nom@entreprise.com)."
        : "Please use a business email (e.g., name@company.com).";
      showError(msg);
      return;
    }

    // Si EmailJS non configuré, fallback mailto
    if (!EMAILJS.USER_ID || !EMAILJS.SERVICE_ID || !EMAILJS.TEMPLATE_ID){
      window.location.href = `mailto:admin@bluekiosk.tech?subject=Waitlist&body=${encodeURIComponent(email)}`;
      if (out) out.textContent = currentLang==="fr" ? "Merci !" : "Thanks!";
      form.reset();
      return;
    }

    try{
      await emailjs.send(EMAILJS.SERVICE_ID, EMAILJS.TEMPLATE_ID, { email });
      if (out) out.textContent = I18N[currentLang]["status.ok"];
      form.reset();
    }catch(err){
      console.error(err);
      if (out) out.textContent = I18N[currentLang]["status.err"];
    }
  });
});
