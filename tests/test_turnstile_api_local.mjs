/**
 * BlueKioskTech — Test d'intégration local de l'API /api/contact (sans courriel réel).
 *
 * 1) Appelle VRAIMENT l'API Cloudflare Siteverify avec sa clé de test publique.
 * 2) Vérifie le succès et la marque metadata.result_with_testing_key.
 * 3) Modifie uniquement, EN MÉMOIRE ET DANS CE TEST, hostname example.com -> localhost.
 * 4) Simule les deux appels EmailJS et vérifie les modèles et destinataires.
 * 5) N'altère ni api/contact.js ni .env.local, ni Vercel, ni le compte EmailJS.
 *
 * À exécuter depuis la racine du projet Astro: node tests/test_turnstile_api_local.mjs
 */
import assert from 'node:assert/strict';

const TURNSTILE_ENDPOINT = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';
const DUMMY_SECRET = '1x0000000000000000000000000000000AA';
const DUMMY_TOKEN = 'XXXX.DUMMY.TOKEN.XXXX';

// Variables fictives dans le processus de test seulement, sans lecture des secrets réels.
Object.assign(process.env, {
  CONTACT_FORM_ENABLED: 'true',
  CONTACT_ALLOW_LOCAL_TESTS: 'true',
  TURNSTILE_SECRET_KEY: DUMMY_SECRET,
  EMAILJS_SERVICE_ID: 'test-service',
  EMAILJS_PUBLIC_KEY: 'test-public-key',
  EMAILJS_CONTACT_TEMPLATE_ID: 'test-contact-template',
  EMAILJS_ACK_TEMPLATE_ID: 'test-ack-template',
  CONTACT_RATE_SALT: 'test-salt-not-for-production',
});
delete process.env.EMAILJS_PRIVATE_KEY;

const nativeFetch = globalThis.fetch;
const interceptedEmailCalls = [];
let verifiedByCloudflare = false;
let testHostAdapted = false;

globalThis.fetch = async (input, init) => {
  const url = String(input);
  if (url === TURNSTILE_ENDPOINT) {
    const actualResponse = await nativeFetch(input, init);
    if (!actualResponse.ok) throw new Error(`Cloudflare HTTP ${actualResponse.status}`);
    const verdict = await actualResponse.json();
    assert.equal(verdict.success, true, 'La verification reelle Cloudflare a echoue');
    assert.equal(verdict.metadata?.result_with_testing_key, true,
      'Il ne s agit pas des cles de test Cloudflare attendues');
    verifiedByCloudflare = true;
    // La clé de test retourne hostname:example.com ; l'API a raison de rejeter
    // ce hostname en fonctionnement normal. Adaptation en mémoire pour vérifier
    // le RESTE du parcours sécurisé sans affaiblir la fonction de production.
    assert.ok(['example.com', 'localhost'].includes(verdict.hostname),
      `Hostname de test inattendu: ${verdict.hostname}`);
    testHostAdapted = verdict.hostname === 'example.com';
    return new Response(JSON.stringify({ ...verdict, hostname: 'localhost' }), {
      status: actualResponse.status,
      headers: { 'content-type': 'application/json' },
    });
  }
  if (url === EMAILJS_ENDPOINT) {
    // AUCUNE requête réseau ne part vers EmailJS.
    const json = JSON.parse(String(init?.body || '{}'));
    interceptedEmailCalls.push(json);
    return new Response('OK (simulation)', { status: 200 });
  }
  throw new Error(`Appel réseau inattendu bloqué: ${url}`);
};

const { POST } = await import('../api/contact.js');
const requestBody = {
  mode: 'partner', locale: 'fr', name: 'Visiteur Test', email: 'contact-test@example.com',
  message: 'Message de verification de la securite locale sans aucun envoi de courriel.',
  consent: true, website: '', turnstileToken: DUMMY_TOKEN,
  organization: 'Station de test', city: 'Montreal', role: 'Responsable',
  project: 'matmatic', businessType: 'gas_station', goal: 'pilot', sites: '1',
};
try {
  const response = await POST(new Request('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: { origin: 'http://localhost:3000', 'content-type': 'application/json' },
    body: JSON.stringify(requestBody),
  }));
  const result = await response.json();
  assert.equal(verifiedByCloudflare, true, 'Cloudflare n a pas ete contacte');
  assert.equal(response.status, 200, `L API a retourne ${response.status}: ${JSON.stringify(result)}`);
  assert.deepEqual(result, { ok: true, acknowledgment: true });
  assert.equal(interceptedEmailCalls.length, 2, 'Deux emails simules attendus');
  assert.equal(interceptedEmailCalls[0].template_id, 'test-contact-template');
  assert.equal(interceptedEmailCalls[0].template_params.bkt_project, 'MatMatic — tapis automobiles');
  assert.equal(interceptedEmailCalls[1].template_id, 'test-ack-template');
  assert.equal(interceptedEmailCalls[1].template_params.recipient_email, 'contact-test@example.com');
  console.log('VALIDATION API LOCALE — REUSSIE');
  console.log('Cloudflare Siteverify: vraie verification avec cle de test -> OK');
  console.log('Nom d hote adapte en memoire pour test:', testHostAdapted ? 'example.com -> localhost' : 'localhost');
  console.log('API /api/contact:', response.status, JSON.stringify(result));
  console.log('EmailJS: 2 appels SIMULES, aucun courriel reel envoye');
  console.log('Fichiers et variables Vercel: inchanges');
} catch (error) {
  console.error('TEST NON VALIDE:', error.message);
  process.exitCode = 1;
} finally {
  globalThis.fetch = nativeFetch;
}
