// api/waitlist.js — Vercel Serverless Function (Node.js)
// Reçoit le formulaire, valide, envoie 2 emails via SendGrid, puis redirige vers /success.html

const sg = require("@sendgrid/mail");

const {
  SENDGRID_API_KEY,
  FROM_EMAIL = "do-no-reply@bluekiosk.tech",
  INTERNAL_NOTIFY = "info@bluekiosk.tech",
} = process.env;

if (SENDGRID_API_KEY) sg.setApiKey(SENDGRID_API_KEY);

// Domaines publics à exclure (email pro requis)
const BLOCKED = new Set([
  "gmail.com","googlemail.com","yahoo.com","ymail.com","aol.com",
  "outlook.com","hotmail.com","live.com","msn.com","icloud.com","me.com",
  "protonmail.com","pm.me","gmx.com","mail.com","yopmail.com","mailinator.com",
  "orange.fr","wanadoo.fr","free.fr","sfr.fr","laposte.net","bbox.fr","neuf.fr",
  "hotmail.fr","outlook.fr","live.fr"
]);

function isBusinessEmail(email) {
  const m = (email || "").toLowerCase().match(/^[^\s@]+@([^@\s]+)$/);
  return !!(m && !BLOCKED.has(m[1]));
}

function wordsCount(s = "") {
  return (s.trim().match(/\S+/g) || []).length;
}

// Parse application/x-www-form-urlencoded
function parseForm(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", c => (data += c));
    req.on("end", () => {
      const out = {};
      for (const part of data.split("&")) {
        if (!part) continue;
        const [k, v = ""] = part.split("=");
        out[decodeURIComponent(k)] = decodeURIComponent(v.replace(/\+/g, " "));
      }
      resolve(out);
    });
    req.on("error", reject);
  });
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Allow", "POST");
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.end("Method Not Allowed");
  }

  try {
    const body = await parseForm(req);

    const lang = (body.Lang || "fr").toLowerCase();
    const email = (body.Email || "").trim();
    const company = (body.CompanyName || "").trim();
    const activity = (body.Activity || "").trim(); // gym|sport_complex|office|campus|university|hospital
    const address = (body.Address || "").trim();
    // Nouveau champ AudienceCount (fallback sur MachineCount si form ancien)
    const audienceRaw = (body.AudienceCount || body.MachineCount || "").trim();
    const message = (body.Message || "").trim();
    const bot = (body["bot-field"] || "").trim();

    // Anti-bot : rediriger comme si OK
    if (bot) {
      res.statusCode = 303;
      res.setHeader("Location", `/success.html?lang=${encodeURIComponent(lang)}&ok=1`);
      res.setHeader("Cache-Control", "no-store");
      return res.end();
    }

    // Validations
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !isBusinessEmail(email)) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      return res.end(
        lang === "fr"
          ? "Merci d’utiliser une adresse professionnelle (ex. nom@entreprise.com)."
          : "Please use a business email (e.g., name@company.com)."
      );
    }
    if (!company) {
      res.statusCode = 400;
      return res.end(lang === "fr" ? "Le nom de la compagnie est requis." : "Company name is required.");
    }
    if (!activity) {
      res.statusCode = 400;
      return res.end(lang === "fr" ? "Sélectionnez une activité." : "Please choose an activity.");
    }
    if (!address) {
      res.statusCode = 400;
      return res.end(lang === "fr" ? "L’adresse est requise." : "Address is required.");
    }
    // Audience : obligatoire, juste un nombre (pas de min/max)
    const nAudience = audienceRaw === "" ? NaN : Number(audienceRaw);
    if (!Number.isFinite(nAudience)) {
      res.statusCode = 400;
      return res.end(
        lang === "fr"
          ? "Veuillez saisir un nombre valide pour le nombre d’adhérents/employés/étudiants."
          : "Please enter a valid number for members/employees/students."
      );
    }
    // Message 500 mots max
    const maxWords = 500;
    if (wordsCount(message) > maxWords) {
      res.statusCode = 400;
      return res.end(
        lang === "fr"
          ? `Le message doit faire ${maxWords} mots maximum.`
          : `Message must be at most ${maxWords} words.`
      );
    }

    if (!SENDGRID_API_KEY) {
      console.error("[waitlist] Missing SENDGRID_API_KEY");
      res.statusCode = 500;
      return res.end("Server error");
    }

    // Libellés lisibles pour l’activité
    const ACT_LABEL = {
      gym:         { fr: "Gym",                 en: "Gym" },
      sport_complex:{ fr: "Complexe sportif",   en: "Sports complex" },
      office:      { fr: "Bureaux d’entreprise",en: "Office" },
      campus:      { fr: "Campus",              en: "Campus" },
      university:  { fr: "Université",          en: "University" },
      hospital:    { fr: "Hôpitaux",            en: "Hospitals" }
    };
    const act = ACT_LABEL[activity] || { fr: activity, en: activity };

    // 1) Email interne (notification lead)
    const subjectInternal = `[Lead] ${company} — ${email}`;
    const textInternal =
      `Nouveau lead (BlueKioskTech)\n\n` +
      `Company: ${company}\n` +
      `Activity: ${act.en} / ${act.fr}\n` +
      `Address: ${address}\n` +
      `Audience (members/employees/students): ${nAudience}\n` +
      `Email: ${email}\n` +
      `Lang: ${lang}\n\n` +
      `Message:\n${message || "(none)"}\n`;

    await sg.send({
      to: INTERNAL_NOTIFY,
      from: FROM_EMAIL,
      subject: subjectInternal,
      text: textInternal,
    });

    // 2) Accusé de réception prospect (FR/EN)
    const subjectAck = lang === "fr" ? "Merci — vous êtes sur la liste d’attente" : "Thanks — you’re on the waitlist";

    const textAck =
      lang === "fr"
        ? (
            `Bonjour,\n\n` +
            `Merci pour votre intérêt pour BlueKioskTech. Nous avons bien reçu vos informations pour ${company}.\n` +
            `Nous vous contacterons pour la suite (déploiement, logistique, tarifs).\n\n` +
            `Récapitulatif:\n` +
            `• Activité: ${act.fr}\n` +
            `• Adresse: ${address}\n` +
            `• Nb d’adhérents/employés/étudiants: ${nAudience}\n` +
            (message ? `• Message: ${message}\n\n` : `\n`) +
            `— L’équipe BlueKioskTech`
          )
        : (
            `Hello,\n\n` +
            `Thanks for your interest in BlueKioskTech. We’ve received your information for ${company}.\n` +
            `We’ll contact you next about deployment, logistics and pricing.\n\n` +
            `Summary:\n` +
            `• Activity: ${act.en}\n` +
            `• Address: ${address}\n` +
            `• Members/Employees/Students: ${nAudience}\n` +
            (message ? `• Message: ${message}\n\n` : `\n`) +
            `— BlueKioskTech team`
          );

    await sg.send({
      to: email,
      from: FROM_EMAIL,
      subject: subjectAck,
      text: textAck,
    });

    // 3) Redirection succès (bilingue)
    res.statusCode = 303;
    res.setHeader("Location", `/success.html?lang=${encodeURIComponent(lang)}&ok=1`);
    res.setHeader("Cache-Control", "no-store");
    return res.end();
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    return res.end("Server error");
  }
};
