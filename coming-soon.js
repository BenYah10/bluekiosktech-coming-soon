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
    "waitlist.redirect": "Vous serez transféré pour remplir notre formulaire de liste d’attente.",

    // Champs B2B (lead.html)
    "lead.company": "Nom de la compagnie",
    "lead.activity": "Activité",
    "lead.activity.placeholder": "Choisir…",
    "lead.activity.gym": "Gym",
    "lead.activity.complex": "Complexe sportif",
    "lead.activity.office": "Entreprise (bureaux)",
    "lead.activity.campus": "Campus",
    "lead.activity.university": "Université",
    "lead.activity.hospital": "Hôpitaux",
    "lead.machines": "Nb. de machines prévues", // conservé si jamais utile ailleurs
    "lead.audience": "Nb d’adhérents/employés/étudiants",
    "lead.address": "Adresse",
    "lead.message": "Message (500 mots max)",
    "lead.submit": "Envoyer & rejoindre la liste d’attente",

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

    // Feedback
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
    "waitlist.redirect": "You will be redirected to fill out our waitlist form.",

    // B2B fields (lead.html)
    "lead.company": "Company name",
    "lead.activity": "Activity",
    "lead.activity.placeholder": "Choose…",
    "lead.activity.gym": "Gym",
    "lead.activity.complex": "Sports complex",
    "lead.activity.office": "Office (company)",
    "lead.activity.campus": "Campus",
    "lead.activity.university": "University",
    "lead.activity.hospital": "Hospitals",
    "lead.machines": "Planned machines",
    "lead.audience": "Members/Employees/Students count",
    "lead.address": "Address",
    "lead.message": "Message (max 500 words)",
    "lead.submit": "Send & join the waitlist",

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

    // Feedback
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

  const frBtn = document.getElementById("lang-fr");
  const enBtn = document.getElementById("lang-en");
  frBtn?.classList.toggle("is-active", lang==="fr");
  enBtn?.classList.toggle("is-active", lang==="en");
  frBtn?.setAttribute("aria-pressed", String(lang==="fr"));
  enBtn?.setAttribute("aria-pressed", String(lang==="en"));

  localStorage.setItem("lang", lang);
  currentLang = lang;

  const hiddenLang = document.getElementById("waitlist-lang");
  if (hiddenLang) hiddenLang.value = lang;

  const lp = document.getElementById("link-privacy") ||
             document.querySelector('a[data-i18n="footer.privacy"]');
  if (lp) {
    try {
      const u = new URL(lp.getAttribute("href"), window.location.href);
      u.searchParams.set("lang", lang);
      lp.setAttribute("href", u.toString());
    } catch(e) {}
  }
}

// --- domaines publics à refuser (adresse pro requise) ---
const BLOCKED_DOMAINS = new Set([
  "gmail.com","googlemail.com","yahoo.com","ymail.com","aol.com",
  "outlook.com","hotmail.com","live.com","msn.com","icloud.com","me.com",
  "protonmail.com","pm.me","gmx.com","mail.com",
  "yopmail.com","mailinator.com","guerrillamail.com","10minutemail.com",
  "tempmail.com","discard.email","sharklasers.com",
  "orange.fr","wanadoo.fr","free.fr","sfr.fr","laposte.net","bbox.fr","neuf.fr",
  "hotmail.fr","outlook.fr","live.fr"
]);

function isBusinessEmail(email){
  const m = (email||"").toLowerCase().match(/^[^\s@]+@([^@\s]+)$/);
  return !!(m && !BLOCKED_DOMAINS.has(m[1]));
}
function wordCount(s=""){ return (s.trim().match(/\S+/g) || []).length; }

function showError(out, emailInput, msg){
  if (out) out.textContent = msg;
  if (emailInput){
    emailInput.setAttribute("aria-invalid","true");
    emailInput.focus();
  }
}
function clearError(out, emailInput){
  if (out) out.textContent = "";
  if (emailInput) emailInput.removeAttribute("aria-invalid");
}

function bindLangSwitch(){
  const fr = document.getElementById("lang-fr");
  const en = document.getElementById("lang-en");
  if (fr) fr.onclick = (e)=>{ e.preventDefault(); applyI18n("fr"); };
  if (en) en.onclick = (e)=>{ e.preventDefault(); applyI18n("en"); };
  const wrap = document.querySelector(".lang-switch");
  if (wrap){
    wrap.addEventListener("click", (e)=>{
      const btn = e.target && e.target.closest && e.target.closest("#lang-fr, #lang-en");
      if (!btn) return;
      e.preventDefault();
      applyI18n(btn.id === "lang-fr" ? "fr" : "en");
    });
  }
}

document.addEventListener("DOMContentLoaded", ()=>{
  // i18n + switchers
  applyI18n(currentLang);
  bindLangSwitch();

  // year
  const y = document.getElementById("year");
  if (y && !y.dataset.done){
    y.textContent = new Date().getFullYear();
    y.dataset.done = "1";
  }

  // ====== WAITLIST (index.html ou lead.html) ======
  const form = document.getElementById("waitlist");
  if (!form) return;

  const out  = document.getElementById("wl-done");
  const emailInput   = document.getElementById("waitlist-email");
  const audienceInput = document.getElementById("machines");  // id conservé
  const messageInput  = document.getElementById("message");   // seulement lead.html
  const hiddenLang    = document.getElementById("waitlist-lang");
  if (hiddenLang) hiddenLang.value = currentLang;

  // MODE 1: INDEX (email seul) => redirection vers lead.html
  const isIndexMinimal = !audienceInput && !messageInput;
  if (isIndexMinimal){
    form.addEventListener("submit", (e)=>{
      clearError(out, emailInput);
      const email = (emailInput?.value || "").trim();
      const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && isBusinessEmail(email);
      if (!okEmail){
        e.preventDefault();
        const msg = currentLang === "fr"
          ? "Merci d’utiliser une adresse professionnelle (ex. nom@entreprise.com)."
          : "Please use a business email (e.g., name@company.com).";
        return showError(out, emailInput, msg);
      }
      e.preventDefault();
      window.location.href = `lead.html?email=${encodeURIComponent(email)}&lang=${encodeURIComponent(currentLang)}`;
    });
    return;
  }

  // MODE 2: LEAD (formulaire B2B) => validations + POST natif vers /api/waitlist
  form.addEventListener("submit", (e)=>{
    clearError(out, emailInput);

    // Email pro
    const email = (emailInput?.value || "").trim();
    const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && isBusinessEmail(email);
    if (!okEmail){
      e.preventDefault();
      const msg = currentLang === "fr"
        ? "Merci d’utiliser une adresse professionnelle (ex. nom@entreprise.com)."
        : "Please use a business email (e.g., name@company.com).";
      return showError(out, emailInput, msg);
    }

    // Audience (obligatoire, juste un nombre — pas de min/max)
    const raw = (audienceInput?.value || "").trim();
    const n = Number(raw);
    if (raw === "" || !Number.isFinite(n)){
      e.preventDefault();
      return showError(
        out,
        emailInput,
        currentLang === "fr"
          ? "Veuillez saisir un nombre valide pour le nombre d’adhérents/employés/étudiants."
          : "Please enter a valid number for members/employees/students."
      );
    }

    // 500 mots max pour le message (inchangé)
    const maxWords = parseInt(messageInput?.dataset.maxwords || "500", 10);
    const wc = wordCount(messageInput?.value || "");
    if (wc > maxWords){
      e.preventDefault();
      return showError(
        out,
        emailInput,
        currentLang==="fr" ? `Le message doit faire ${maxWords} mots maximum.`
                           : `Message must be at most ${maxWords} words.`
      );
    }

    // POST natif vers /api/waitlist (lead.html fournit aussi MachineCount caché)
  });
});
