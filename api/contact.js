/**
 * BlueKioskTech.ca — API de contact sécurisée (Vercel Function, Node.js).
 * Rôle: vérifier Turnstile côté serveur, contrôler les champs et les destinataires,
 * puis déclencher les deux modèles EmailJS existants sans exposer de clé privée.
 * Ne modifie jamais les modèles du site historique bluekiosk.tech.
 * IMPORTANT: le limiteur mémoire ci-dessous n'est PAS global à toutes les instances
 * Vercel ; ajouter un limiteur persistant/WAF avant un lancement à grande échelle.
 * Étape 1.8.4 : garde Preview destinataire-test, action Turnstile liée au
 * formulaire, clé EmailJS privée requise et limitation email après Siteverify.
 * Domaine Preview strict, fourni par Vercel au runtime.
 * Aucun suffixe *.vercel.app n’est accepté de manière générale.
 */
import { createHash } from 'node:crypto';

export const maxDuration = 25;
const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';
const TURNSTILE_ENDPOINT = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const MAX_BODY_BYTES = 12_000;
const MAX_MESSAGE_LENGTH = 2_000;
const RATE_WINDOW_MS = 15 * 60_000;
const rates = new Map();

const json = (status, payload) => new Response(JSON.stringify(payload), {
  status, headers: { 'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
});
const clean = (value, max) => typeof value === 'string'
  ? value.trim().replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '').slice(0, max)
  : '';
const isValidEmail = (mail) => mail.length <= 180 && /^[^\s@<>\r\n]+@[^\s@<>\r\n]+\.[^\s@<>\r\n]+$/.test(mail);
const allowed = (value, options) => options.includes(value);
const labels = {
  fr: {
    general: 'Contact général', partnership: 'Proposition de partenariat',
    matmatic: 'MatMatic — tapis automobiles', vucs: 'VUCS — gourdes réutilisables',
    other: 'Autre collaboration', gas_station: 'Station-service',
    fitness_centre: 'Centre sportif / gym', other_business: 'Autre établissement',
    pilot: 'Explorer une participation au projet pilote', info: 'Obtenir des renseignements',
    future: 'Discuter d’une implantation future',
  },
  en: {
    general: 'General inquiry', partnership: 'Partnership opportunity',
    matmatic: 'MatMatic — car floor mats', vucs: 'VUCS — reusable bottles',
    other: 'Other collaboration', gas_station: 'Gas station',
    fitness_centre: 'Fitness centre / gym', other_business: 'Other business',
    pilot: 'Explore joining a pilot project', info: 'Request more information',
    future: 'Discuss a future installation',
  },
};
function rateLimit(id, max, now = Date.now()) {
  // Contrôle de confort sur une instance active, pas un quota global garanti.
  if (rates.size > 2000) rates.clear();
  const entry = rates.get(id);
  if (!entry || now - entry.start > RATE_WINDOW_MS) {
    rates.set(id, { start: now, count: 1 });
    return false;
  }
  entry.count += 1;
  return entry.count > max;
}
function hash(text) {
  return createHash('sha256').update((process.env.CONTACT_RATE_SALT || 'contact') + ':' + text).digest('hex');
}
function previewHostname() {
  // VERCEL_URL est fourni par Vercel et identifie le déploiement en cours.
  // Il ne provient JAMAIS du navigateur ou du corps de la requête.
  if (process.env.VERCEL_ENV !== 'preview') return null;
  const host = process.env.VERCEL_URL || '';
  // Précaution supplémentaire : le nom doit appartenir à notre projet,
  // avec un sous-domaine concret, jamais « *.vercel.app » en général.
  return /^bluekiosktech-coming-soon-[a-z0-9-]+\.vercel\.app$/.test(host) ? host : null;
}
function originHostname(request) {
  const origin = request.headers.get('origin') || '';
  if (origin === 'https://bluekiosktech.ca') return 'bluekiosktech.ca';
  if (origin === 'https://www.bluekiosktech.ca') return 'www.bluekiosktech.ca';
  // Préproduction permanente : autorisée uniquement sur Vercel Preview.
  // La comparaison exacte empêche d'accepter des domaines similaires.
  if (
    process.env.VERCEL_ENV === 'preview' &&
    origin === 'https://staging.bluekiosktech.ca'
  ) {
    return 'staging.bluekiosktech.ca';
  }
  if (process.env.CONTACT_ALLOW_LOCAL_TESTS === 'true' &&
    /^http:\/\/(?:localhost|127\.0\.0\.1):\d+$/.test(origin)) {
    return new URL(origin).hostname;
  }
  const preview = previewHostname();
  if (preview && origin === `https://${preview}`) return preview;
  return null;
}
async function fetchTimed(url, options, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try { return await fetch(url, { ...options, signal: controller.signal }); }
  finally { clearTimeout(timeout); }
}
async function emailjs(templateId, templateParams) {
  const data = {
    service_id: process.env.EMAILJS_SERVICE_ID,
    template_id: templateId,
    user_id: process.env.EMAILJS_PUBLIC_KEY,
    template_params: templateParams,
  };
  // Optionnel ; ne JAMAIS ajouter cette clé dans src/ ou dans une variable PUBLIC_*.
  data.accessToken = process.env.EMAILJS_PRIVATE_KEY;
  const response = await fetchTimed(EMAILJS_ENDPOINT, {
    // Requête serveur-vers-serveur : ne pas fabriquer un en-tête Origin.
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }, 6500);
if (!response.ok) {
  console.error('[BlueKioskTech][EmailJS] Envoi refuse', {
    status: response.status,
    template: templateId === process.env.EMAILJS_CONTACT_TEMPLATE_ID
      ? 'notification_interne'
      : 'accuse_reception'
  });
}

return response.ok;
}
function validate(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null;
  if (body.consent !== true) return null;
  if (clean(body.website, 200)) return null;
  const mode = body.mode === 'partner' ? 'partner' : body.mode === 'general' ? 'general' : null;
  const locale = allowed(body.locale, ['fr', 'en']) ? body.locale : null;
  const name = clean(body.name, 101), email = clean(body.email, 181);
  const message = clean(body.message, MAX_MESSAGE_LENGTH + 1);
  if (!mode || !locale || name.length < 2 || name.length > 100 || !isValidEmail(email)
      || message.length < 10 || message.length > MAX_MESSAGE_LENGTH) return null;
  const phone = clean(body.phone, 41), organization = clean(body.organization, 141);
  const role = clean(body.role, 91), city = clean(body.city, 121);
  if (phone.length > 40 || organization.length > 140 || role.length > 90 || city.length > 120) return null;
  const project = clean(body.project, 25), businessType = clean(body.businessType, 25);
  const goal = clean(body.goal, 25), sites = clean(body.sites, 12);
  if (mode === 'partner' && (!organization || !city ||
    !allowed(project, ['matmatic', 'vucs', 'other']) ||
    !allowed(businessType, ['gas_station', 'fitness_centre', 'other']) ||
    !allowed(goal, ['pilot', 'info', 'future']))) return null;
  if (sites && !allowed(sites, ['1', '2-5', '6+'])) return null;
  return { mode, locale, name, email, message, phone, organization, role, city, project,
    businessType, goal, sites };
}
function paramsFrom(data) {
  const fr = data.locale === 'fr';
  const l = labels[data.locale];
  const isPartner = data.mode === 'partner';
  const title = isPartner
    ? (data.project === 'matmatic' ? (fr ? 'Partenariat MatMatic' : 'MatMatic partnership')
      : data.project === 'vucs' ? (fr ? 'Partenariat VUCS' : 'VUCS partnership')
      : (fr ? 'Autre partenariat' : 'Other partnership'))
    : l.general;
  const projectName = data.project === 'matmatic' ? 'MatMatic' : data.project === 'vucs' ? 'VUCS' : 'BlueKioskTech';
  const location = [data.organization, data.city].filter(Boolean).join(' — ');
  const main = {
    title, from_name: 'BlueKioskTech', reply_to: data.email,
    bkt_corporate: true, bkt_partner: isPartner ? 'yes' : '',
    bkt_request_label: title, bkt_request_kind: isPartner ? l.partnership : l.general,
    bkt_project: isPartner ? l[data.project] : (fr ? 'Non applicable' : 'Not applicable'),
    bkt_locale: data.locale.toUpperCase(),
    bkt_submitted_at: new Date().toLocaleString(fr ? 'fr-CA' : 'en-CA', {timeZone:'America/Toronto'}),
    bkt_name: data.name, bkt_email: data.email, bkt_phone: data.phone,
    bkt_organization: isPartner ? data.organization : '',
    bkt_role: isPartner ? data.role : '', bkt_city: isPartner ? data.city : '',
    bkt_business_type: isPartner ? l[data.businessType === 'other' ? 'other_business' : data.businessType] : '',
    bkt_sites: isPartner ? data.sites : '', bkt_goal: isPartner ? l[data.goal] : '',
    bkt_message: data.message,
  };
  const receipt = {
    confirmation_corporate: true, recipient_email: data.email,
    confirmation_subject: fr
      ? (isPartner ? `Réception de votre demande | ${projectName}` : 'Votre demande à BlueKioskTech')
      : (isPartner ? `${projectName} inquiry received` : 'Your BlueKioskTech inquiry'),
    confirmation_title: fr ? 'Votre demande a bien été reçue' : 'We have received your inquiry',
    confirmation_greeting: fr ? `Bonjour ${data.name},` : `Hello ${data.name},`,
    confirmation_intro: fr
      ? (data.project === 'matmatic'
        ? 'Nous vous remercions d’avoir communiqué avec BlueKioskTech.ca et de l’intérêt que vous portez à MatMatic, notre projet de nettoyage automatisé des tapis automobiles en libre-service.'
        : data.project === 'vucs'
        ? 'Nous vous remercions d’avoir communiqué avec BlueKioskTech.ca et de l’intérêt que vous portez à VUCS, notre projet de solution automatisée pour l’hygiène des gourdes réutilisables.'
        : 'Nous vous remercions d’avoir communiqué avec BlueKioskTech.ca et de l’intérêt que vous portez à nos solutions en libre-service.')
      : (data.project === 'matmatic'
        ? 'Thank you for contacting BlueKioskTech.ca and for your interest in MatMatic, our automated self-service car floor mat cleaning concept.'
        : data.project === 'vucs'
        ? 'Thank you for contacting BlueKioskTech.ca and for your interest in VUCS, our automated reusable water bottle hygiene concept.'
        : 'Thank you for contacting BlueKioskTech.ca and for your interest in our self-service solutions.'),
    confirmation_analysis: fr
      ? (isPartner ? `Votre demande de partenariat${location ? ` concernant ${location}` : ''} a bien été transmise à notre équipe. Nous examinerons les renseignements fournis pour évaluer les possibilités de collaboration et les prochaines étapes envisageables.`
        : 'Votre message a bien été transmis à notre équipe. Nous en prendrons connaissance pour évaluer la suite à lui donner.')
      : (isPartner ? `Your partnership inquiry${location ? ` regarding ${location}` : ''} has been submitted to our team. We will review the information to assess potential collaboration opportunities and possible next steps.`
        : 'Your message has been submitted to our team. We will review the information to determine possible next steps.'),
    confirmation_commitment: fr
      ? 'Ce courriel confirme uniquement la transmission de votre demande. Il ne constitue ni une réservation, ni une offre commerciale, ni un engagement d’installation.'
      : 'This message confirms only that your inquiry was submitted. It is not a reservation, a commercial offer, or a commitment to install equipment.',
    confirmation_updates: fr
      ? 'Aucune démarche supplémentaire n’est nécessaire pour le moment. Si des précisions sont nécessaires, nous pourrons communiquer avec vous à l’adresse indiquée.'
      : 'No further action is required at this stage. If additional information is needed, we may contact you using the address provided.',
    confirmation_thanks: fr ? `Nous vous remercions de votre intérêt pour ${isPartner ? projectName : 'BlueKioskTech'}.`
      : `Thank you for your interest in ${isPartner ? projectName : 'BlueKioskTech'}.`,
    confirmation_closing: fr ? 'Cordialement,' : 'Kind regards,',
    confirmation_team: fr ? 'L’équipe BlueKioskTech' : 'The BlueKioskTech team',
    confirmation_footer: fr
      ? 'Courriel automatique lié à une demande sur BlueKioskTech.ca. Contact : info@bluekiosk.tech.'
      : 'Automatic acknowledgment of an inquiry submitted on BlueKioskTech.ca. Contact: info@bluekiosk.tech.',
  };
  return { main, receipt };
}

export async function POST(request) {
  // Fail-closed par défaut : aucun envoi tant que l'activation n'est pas volontaire.
  if (process.env.CONTACT_FORM_ENABLED !== 'true') return json(503, {ok:false, code:'disabled'});
  const expectedHostname = originHostname(request);
  if (!expectedHostname) return json(403, {ok:false, code:'origin'});
  if (!request.headers.get('content-type')?.startsWith('application/json'))
    return json(415, {ok:false,code:'type'});
  const declaredSize = Number(request.headers.get('content-length') || 0);
  if (declaredSize > MAX_BODY_BYTES) return json(413, {ok:false,code:'size'});
  if (!process.env.TURNSTILE_SECRET_KEY || !process.env.EMAILJS_SERVICE_ID ||
      !process.env.EMAILJS_PUBLIC_KEY || !process.env.EMAILJS_CONTACT_TEMPLATE_ID ||
      !process.env.EMAILJS_ACK_TEMPLATE_ID || !process.env.EMAILJS_PRIVATE_KEY ||
      !process.env.CONTACT_RATE_SALT)
    return json(503, {ok:false,code:'config'});
  let raw;
  try { raw = await request.text(); } catch { return json(400, {ok:false,code:'body'}); }
  if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) return json(413, {ok:false,code:'size'});
  let body;
  try { body = JSON.parse(raw); } catch { return json(400, {ok:false,code:'json'}); }
  const data = validate(body);
  if (!data) return json(400, {ok:false,code:'validation'});
  // Preview : même en activant les tests, seul notre courriel-test peut recevoir
  // l'accusé de réception ; aucune soumission d'un tiers ne doit envoyer d'email.
  // La variable est réservée à Preview et ne sert jamais à l'envoi Production.
  if (process.env.VERCEL_ENV === 'preview') {
    const testEmail = clean(process.env.CONTACT_PREVIEW_TEST_EMAIL, 181).toLowerCase();
    if (!isValidEmail(testEmail) || data.email.toLowerCase() !== testEmail)
      return json(403, {ok:false,code:'preview_recipient'});
  }
  const token = clean(body.turnstileToken, 2049);
  if (!token || token.length > 2048) return json(400, {ok:false,code:'challenge'});
  // Limiteur best-effort. À compléter par une règle WAF / un quota partagé sur Vercel.
  const ip = (request.headers.get('x-vercel-forwarded-for') ||
    request.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
  // Quota IP best-effort AVANT Siteverify pour éviter l'abus du service.
  // Ne pas comptabiliser le quota d'une adresse courriel tant que le robot
  // n'a pas réussi Turnstile : sinon un attaquant peut bloquer un tiers.
  if (rateLimit('ip:' + hash(ip), 5))
    return json(429, {ok:false,code:'throttled'});
  let verification;
  try {
    const response = await fetchTimed(TURNSTILE_ENDPOINT, {
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({ secret:process.env.TURNSTILE_SECRET_KEY, response:token }),
    }, 5500);
    if (!response.ok) return json(503, {ok:false,code:'challenge_unavailable'});
    verification = await response.json();
  } catch { return json(503,{ok:false,code:'challenge_unavailable'}); }
  const targetHost = verification?.hostname;
  // On exige que Siteverify confirme exactement l'hôte de la requête
  // autorisée. Les clés Cloudflare de test retournent « example.com » :
  // elles ne peuvent donc pas permettre l'envoi de vrais courriels ici.
  // Le jeton doit provenir DU formulaire Contact et du bon domaine.
  // Un jeton du module de diagnostic (ou d'un autre widget) ne suffit pas.
  if (!verification?.success || targetHost !== expectedHostname ||
      verification?.action !== 'bkt_contact')
    return json(403, {ok:false,code:'challenge_invalid'});
  // Le quota email est appliqué seulement APRÈS validation anti-robot.
  if (rateLimit('email:' + hash(data.email.toLowerCase()), 3))
    return json(429, {ok:false,code:'throttled'});
  const { main, receipt } = paramsFrom(data);
  try {
    const accepted = await emailjs(process.env.EMAILJS_CONTACT_TEMPLATE_ID, main);
    if (!accepted) return json(502,{ok:false,code:'delivery'});
  } catch { return json(502,{ok:false,code:'delivery'}); }
  let acknowledgment = false;
  try {
    // Limite EmailJS : 1 requête / seconde. Le second message ne remet pas
    // en question l'envoi du premier (aucune nouvelle soumission automatique).
    await new Promise(resolve => setTimeout(resolve, 1300));
    acknowledgment = await emailjs(process.env.EMAILJS_ACK_TEMPLATE_ID, receipt);
  } catch { acknowledgment = false; }
  return json(200,{ok:true,acknowledgment});
}

export async function GET() {
  return json(405,{ok:false,code:'method'});
}
