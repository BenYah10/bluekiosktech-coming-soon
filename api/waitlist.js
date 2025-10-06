// api/waitlist.js — Vercel Serverless Function (Node.js)
// Reçoit le formulaire, valide, envoie 2 emails via SendGrid (interne + accusé HTML),
// puis redirige vers /success.html

const sg = require("@sendgrid/mail");

const {
  SENDGRID_API_KEY,
  FROM_EMAIL = "do-no-reply@bluekiosk.tech",
  INTERNAL_NOTIFY = "info@bluekiosk.tech",
  // Optionnel : si vous avez un domaine custom pour servir le logo
  SITE_ORIGIN = "https://www.bluekiosktech.ca",
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

// -------- Email HTML (prospect) --------
function emailHtmlAck({
  lang, company, actLabel, address, nAudience, message
}) {
  const isFr = lang === "fr";
  const LOGO = `${SITE_ORIGIN}/images/logo-ca.png`;

  const t = isFr
    ? {
        hello: "Bonjour,",
        thanks1: "Merci pour votre intérêt pour BlueKioskTech.",
        thanks2: `Nous avons bien reçu vos informations pour ${company}.`,
        next: "Nous vous contacterons pour la suite (déploiement, logistique, tarifs).",
        recap: "Récapitulatif",
        activity: "Activité",
        audience: "Nb d’adhérents/employés/étudiants",
        addressL: "Adresse",
        messageL: "Message",
        regards: "— L’équipe BlueKioskTech",
        visit: "Nos sites",
        follow: "Réseaux sociaux",
        site1: "bluekiosktech.ca",
        site2: "bluekiosktech.blog",
        site3: "bluekiosk.tech",
        instagram: "Instagram",
        facebook: "Facebook"
      }
    : {
        hello: "Hello,",
        thanks1: "Thanks for your interest in BlueKioskTech.",
        thanks2: `We’ve received your information for ${company}.`,
        next: "We’ll contact you next about deployment, logistics and pricing.",
        recap: "Summary",
        activity: "Activity",
        audience: "Members/Employees/Students",
        addressL: "Address",
        messageL: "Message",
        regards: "— BlueKioskTech team",
        visit: "Our websites",
        follow: "Social",
        site1: "bluekiosktech.ca",
        site2: "bluekiosktech.blog",
        site3: "bluekiosk.tech",
        instagram: "Instagram",
        facebook: "Facebook"
      };

  // style inline (compat clients mail)
  return `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <title>BlueKioskTech</title>
  </head>
  <body style="margin:0; padding:0; background:#f6f9fc; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; color:#0f172a;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f9fc;">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 8px 30px rgba(2,6,23,.08);">
            <tr>
              <td align="center" style="padding:20px 16px; background:#0b1020;">
                <img src="${LOGO}" alt="BlueKioskTech" width="150" style="display:block; height:auto;" />
              </td>
            </tr>
            <tr>
              <td style="padding:24px 20px 8px; font-size:16px; line-height:1.6; color:#0f172a;">
                <p style="margin:0 0 10px 0;">${t.hello}</p>
                <p style="margin:0 0 10px 0;">${t.thanks1} ${t.thanks2}</p>
                <p style="margin:0 0 0 0;">${t.next}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 20px 8px;">
                <hr style="border:none; border-top:1px solid #e5e7eb; margin:0;">
              </td>
            </tr>
            <tr>
              <td style="padding:12px 20px 8px;">
                <h3 style="margin:0 0 8px 0; font-size:16px; color:#0f172a;">${t.recap} :</h3>
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-size:14px; color:#111827;">
                  <tr>
                    <td style="padding:6px 0; width:180px; color:#6b7280;">${t.activity}:</td>
                    <td style="padding:6px 0;">${actLabel}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0; color:#6b7280;">${t.addressL}:</td>
                    <td style="padding:6px 0;">${address}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0; color:#6b7280;">${t.audience}:</td>
                    <td style="padding:6px 0;">${nAudience}</td>
                  </tr>
                  ${message ? `
                  <tr>
                    <td style="padding:6px 0; color:#6b7280; vertical-align:top;">${t.messageL}:</td>
                    <td style="padding:6px 0; white-space:pre-wrap;">${escapeHtml(message)}</td>
                  </tr>` : ``}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 20px 18px; font-size:14px; color:#0f172a;">
                <p style="margin:8px 0 0 0;">${t.regards}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 20px 6px; background:#f8fafc; font-size:13px; color:#374151;">
                <strong style="display:block; margin-bottom:6px;">${t.visit}</strong>
                <a href="https://www.bluekiosktech.ca" style="color:#0284c7; text-decoration:none;">${t.site1}</a> &nbsp;•&nbsp;
                <a href="https://www.bluekiosktech.blog" style="color:#0284c7; text-decoration:none;">${t.site2}</a> &nbsp;•&nbsp;
                <a href="https://www.bluekiosk.tech" style="color:#0284c7; text-decoration:none;">${t.site3}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:0 20px 20px; background:#f8fafc; font-size:13px; color:#374151;">
                <strong style="display:block; margin:10px 0 6px 0;">${t.follow}</strong>
                <a href="https://www.instagram.com/bluekiosktech" style="color:#0284c7; text-decoration:none;">${t.instagram}</a> &nbsp;•&nbsp;
                <a href="https://www.facebook.com/bluekiosktech" style="color:#0284c7; text-decoration:none;">${t.facebook}</a>
              </td>
            </tr>
          </table>
          <div style="font-size:11px; color:#6b7280; margin-top:10px;">
            © ${new Date().getFullYear()} BlueKioskTech — Transactional message
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;");
}

// --------- Handler ---------
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

    // 1) Email interne (notification lead) — texte simple
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

    // 2) Accusé de réception prospect — HTML + texte fallback
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
            `— L’équipe BlueKioskTech\n` +
            `Sites: bluekiosktech.ca | bluekiosktech.blog | bluekiosk.tech\n` +
            `Instagram: @bluekiosktech  •  Facebook: /bluekiosktech\n`
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
            `— BlueKioskTech team\n` +
            `Sites: bluekiosktech.ca | bluekiosktech.blog | bluekiosk.tech\n` +
            `Instagram: @bluekiosktech  •  Facebook: /bluekiosktech\n`
          );

    const htmlAck = emailHtmlAck({
      lang,
      company,
      actLabel: lang === "fr" ? act.fr : act.en,
      address,
      nAudience,
      message
    });

    await sg.send({
      to: email,
      from: FROM_EMAIL,
      subject: subjectAck,
      text: textAck,   // fallback texte
      html: htmlAck,   // version HTML pro
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
