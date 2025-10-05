// api/waitlist.js — Vercel Serverless Function (Node)
const sg = require("@sendgrid/mail");

// ===== ENV =====
const {
  SENDGRID_API_KEY,
  FROM_EMAIL = "noreply@bluekiosk.tech",
  INTERNAL_NOTIFY = "info@bluekiosk.tech",
} = process.env;

if (SENDGRID_API_KEY) {
  sg.setApiKey(SENDGRID_API_KEY);
}

// Domaines “perso” à bloquer (adresse pro exigée)
const BLOCKED = new Set([
  "gmail.com","googlemail.com","yahoo.com","ymail.com","aol.com",
  "outlook.com","hotmail.com","live.com","msn.com","icloud.com","me.com",
  "protonmail.com","pm.me","gmx.com","mail.com","yopmail.com","mailinator.com",
  "orange.fr","wanadoo.fr","free.fr","sfr.fr","laposte.net","bbox.fr","neuf.fr",
  "hotmail.fr","outlook.fr","live.fr"
]);

function isBusinessEmail(email) {
  const m = (email || "").toLowerCase().match(/^[^@\s]+@([^@\s]+)$/);
  if (!m) return false;
  return !BLOCKED.has(m[1]);
}

// Parse application/x-www-form-urlencoded (form POST)
function parseForm(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (c) => (data += c));
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
    const email = (body.Email || "").trim();
    const lang = (body.Lang || "fr").toLowerCase();
    const bot = (body["bot-field"] || "").trim(); // honeypot

    // Anti-bot : on redirige quand même vers success (pas d'info utile pour un bot)
    if (bot) {
      res.statusCode = 303;
      res.setHeader("Location", `/success.html?lang=${encodeURIComponent(lang)}&ok=1`);
      res.setHeader("Cache-Control", "no-store");
      return res.end();
    }

    // Validation (format + adresse pro)
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !isBusinessEmail(email)) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      return res.end(
        lang === "fr"
          ? "Merci d’utiliser une adresse professionnelle (ex. nom@entreprise.com)."
          : "Please use a business email (e.g., name@company.com)."
      );
    }

    if (!SENDGRID_API_KEY) {
      // Configuration manquante : on trace et on renvoie 500
      console.error("[waitlist] Missing SENDGRID_API_KEY");
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      return res.end("Server error");
    }

    // 1) Notification interne
    await sg.send({
      to: INTERNAL_NOTIFY,
      from: FROM_EMAIL,
      subject: `[Waitlist] ${email}`,
      text: `Nouveau prospect\nEmail: ${email}\nLang: ${lang}\nSource: bluekiosktech.ca`,
    });

    // 2) Accusé de réception prospect
    await sg.send({
      to: email,
      from: FROM_EMAIL,
      subject: lang === "fr" ? "Bienvenue sur la liste d’attente" : "You’re on the waitlist",
      text:
        lang === "fr"
          ? "Merci ! Nous vous préviendrons dès le déploiement dans votre zone."
          : "Thanks! We’ll notify you when we launch in your area.",
    });

    // Redirection vers la page de succès
    res.statusCode = 303;
    res.setHeader("Location", `/success.html?lang=${encodeURIComponent(lang)}&ok=1`);
    res.setHeader("Cache-Control", "no-store");
    return res.end();
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.end("Server error");
  }
};
