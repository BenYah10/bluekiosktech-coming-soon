/**
 * BlueKioskTech — tests hors réseau, étape 1.8.3.20.
 * Aucune connexion Cloudflare ou EmailJS n'est effectuée.
 * Vérifie la désactivation, les origines strictes et le hostname Siteverify.
 */
import assert from 'node:assert/strict';
import { POST } from '../api/contact.js';

const originalFetch = globalThis.fetch;
const originalEnv = { ...process.env };
const preview = 'bluekiosktech-coming-soon-534kr6oyd.vercel.app';
const baseline = {
  CONTACT_FORM_ENABLED: 'true',
  CONTACT_ALLOW_LOCAL_TESTS: 'false',
  VERCEL_ENV: 'preview',
  VERCEL_URL: preview,
  TURNSTILE_SECRET_KEY: 'DEMO_ONLY_NOT_REAL',
  EMAILJS_SERVICE_ID: 'DEMO_ONLY',
  EMAILJS_PUBLIC_KEY: 'DEMO_ONLY',
  EMAILJS_PRIVATE_KEY: 'DEMO_ONLY',
  EMAILJS_CONTACT_TEMPLATE_ID: 'DEMO_ONLY',
  EMAILJS_ACK_TEMPLATE_ID: 'DEMO_ONLY',
  CONTACT_RATE_SALT: 'DEMO_ONLY',
  CONTACT_PREVIEW_TEST_EMAIL: 'test-preview@example.com',
};
Object.assign(process.env, baseline);
let reportedHostname = preview;
let emailCalls = 0;
let turnstileCalls = 0;
let fetchCalls = 0;

globalThis.fetch = async (url) => {
  fetchCalls++;
  if (String(url).includes('turnstile')) {
    turnstileCalls++;
    return new Response(
  JSON.stringify({
    success: true,
    hostname: reportedHostname,
    action: 'bkt_contact',
  }),
  { status: 200 }
);
  }
  if (String(url).includes('emailjs')) {
    emailCalls++;
    return new Response('OK', { status: 200 });
  }
  throw Error(`Unexpected network: ${url}`);
};

let sequence = 0;
const request = (origin, body = {}) => new Request('https://test.invalid/api/contact', {
  method:'POST',
  headers: { 'origin': origin, 'content-type': 'application/json' },
  body: JSON.stringify({
    mode: 'general', locale: 'fr',
    name: 'Client Test', email: 'test-preview@example.com',
    message: 'Ce test est purement fictif et sans envoi reel.',
    consent: true, website: '', turnstileToken: 'TOKEN_FICTIF', ...body,
  }),
});
const post = async (origin, body) => {
  const res = await POST(request(origin, body));
  return { status: res.status, body: await res.json() };
};
const logs = [];
try {
  process.env.CONTACT_FORM_ENABLED = 'false';
  let a = await post(`https://${preview}`);
  assert.equal(a.status, 503);
  assert.equal(a.body.code, 'disabled');
  assert.equal(fetchCalls, 0);
  logs.push('OK: envois bloques par defaut (503)');
  process.env.CONTACT_FORM_ENABLED = 'true';

  a = await post('https://an-other-deployment.vercel.app');
  assert.equal(a.status, 403);
  assert.equal(a.body.code, 'origin');
  assert.equal(fetchCalls, 0);
  logs.push('OK: origine Vercel etrangere refusee (403)');

  a = await post(`https://${preview}`, { turnstileToken:'' });
  assert.equal(a.status, 400);
  assert.equal(a.body.code, 'challenge');
  assert.equal(fetchCalls, 0);
  logs.push('OK: jeton obligatoire (400)');

  a = await post(`https://${preview}`);
  assert.equal(a.status, 200);
  assert.deepEqual(a.body, {ok:true, acknowledgment:true});
  assert.equal(emailCalls, 2);
  logs.push('OK: origine + hostname Preview exacts, deux appels EmailJS simules');

  reportedHostname = 'example.com';
  a = await post(`https://${preview}`);
  assert.equal(a.status, 403);
  assert.equal(a.body.code, 'challenge_invalid');
  assert.equal(emailCalls, 2);
  logs.push('OK: reponse demo example.com refusee, zero appel EmailJS supplementaire');
  // Staging : autorise uniquement dans l'environnement Preview.
  const staging = 'staging.bluekiosktech.ca';

  reportedHostname = staging;
  const emailsBeforeStaging = emailCalls;
  a = await post(`https://${staging}`);

  assert.equal(a.status, 200);
  assert.deepEqual(a.body, { ok: true, acknowledgment: true });
  assert.equal(emailCalls, emailsBeforeStaging + 2);
  logs.push('OK: Staging accepte en Preview, deux emails simules');

  // Production : Staging doit etre refuse avant tout appel externe.
  process.env.VERCEL_ENV = 'production';
  const callsBeforeProduction = fetchCalls;
  const emailsBeforeProduction = emailCalls;

  a = await post(`https://${staging}`);

  assert.equal(a.status, 403);
  assert.equal(a.body.code, 'origin');
  assert.equal(fetchCalls, callsBeforeProduction);
  assert.equal(emailCalls, emailsBeforeProduction);
  logs.push('OK: Staging refuse en Production, aucun appel externe');


  process.env.VERCEL_ENV = 'production';
  reportedHostname = preview;
  a = await post(`https://${preview}`);
  assert.equal(a.status, 403);
  assert.equal(a.body.code, 'origin');
  logs.push('OK: origine Preview refusee en environnement Production');

  process.env.VERCEL_ENV = 'preview';
  process.env.VERCEL_URL = 'site-inconnu.vercel.app';
  a = await post(`https://${preview}`);
  assert.equal(a.status, 403);
  logs.push('OK: un nom de projet Vercel etranger est refuse');

  assert.equal(turnstileCalls, 3);
  console.log(logs.join('\n'));
  console.log('TESTS LOCAUX REUSSIS — AUCUN COURRIEL REEL ENVOYE.');
} catch(e) {
  console.error('ECHEC TESTS :',e);
  process.exitCode = 1;
} finally {
  globalThis.fetch = originalFetch;
  for (const k of Object.keys(process.env)) if (!(k in originalEnv)) delete process.env[k];
  Object.assign(process.env, originalEnv);
}
