/**
 * BlueKioskTech — Vérification locale du correctif consolidé.
 * Aucun réseau ni courriel réel : globalThis.fetch est remplacé par une simulation.
 * Exécuter à la racine du projet : node tests/test_contact_securite_consolide.mjs
 */
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const file = pathToFileURL(resolve('api/contact.js')).href;
const host = 'bluekiosktech-coming-soon-audit123.vercel.app';
const origin = `https://${host}`;
const testEmail = 'controle@example.org';
Object.assign(process.env, {
  CONTACT_FORM_ENABLED: 'true',
  VERCEL_ENV: 'preview',
  VERCEL_URL: host,
  TURNSTILE_SECRET_KEY: 'FAKE_LOCAL_ONLY',
  EMAILJS_SERVICE_ID: 'FAKE_LOCAL',
  EMAILJS_CONTACT_TEMPLATE_ID: 'FAKE_CONTACT',
  EMAILJS_ACK_TEMPLATE_ID: 'FAKE_ACK',
  EMAILJS_PUBLIC_KEY: 'FAKE_PUBLIC',
  EMAILJS_PRIVATE_KEY: 'FAKE_PRIVATE',
  CONTACT_RATE_SALT: 'FAKE_LOCAL_ONLY_SEED',
  CONTACT_PREVIEW_TEST_EMAIL: testEmail,
});

let siteverify = { success: true, hostname: host, action: 'bkt_contact' };
let emailjsFail = false;
let calls = [];
const originalFetch = globalThis.fetch;
globalThis.fetch = async (target, init) => {
  const url = String(target);
  if (url.includes('challenges.cloudflare.com/turnstile/v0/siteverify')) {
    calls.push({ type: 'siteverify', content: JSON.parse(init.body) });
    return new Response(JSON.stringify(siteverify), { status: 200, headers: {'content-type':'application/json'} });
  }
  if (url.includes('api.emailjs.com/api/v1.0/email/send')) {
    const content = JSON.parse(init.body);
    calls.push({ type: 'emailjs', content });
    if (emailjsFail) return new Response('rejected', { status: 400 });
    return new Response('OK', { status: 200 });
  }
  throw new Error(`Network call not mocked: ${url}`);
};

const { POST, GET } = await import(file);
function payload(overrides = {}) {
  return {
    mode: 'partner', locale: 'fr', name: 'Personne Test', email: testEmail,
    phone: '', organization: 'Entreprise Test', role: 'Responsable', city: 'Montréal',
    project: 'matmatic', businessType: 'gas_station', sites: '1', goal: 'pilot',
    message: 'Bonjour, ceci est uniquement une demande simulée de partenariat.',
    website: '', consent: true, turnstileToken: 'MOCK_TURNSTILE_TOKEN',
    ...overrides,
  };
}
let ipSuffix = 1;
function request(body, requestOrigin=origin) {
  return new Request(`${origin}/api/contact`, {
    method: 'POST',
    headers: {
      'origin': requestOrigin,
      'content-type': 'application/json',
      'x-vercel-forwarded-for': `192.0.2.${ipSuffix++}`,
    },
    body: JSON.stringify(body),
  });
}
async function check(name, expected, input=payload(), requestOrigin=origin) {
  calls = [];
  const response = await POST(request(input, requestOrigin));
  const data = await response.json();
  assert.equal(response.status, expected, `${name}: ${JSON.stringify(data)}`);
  console.log('OK:', name, `(${expected})`);
  return { data, called: [...calls] };
}
try {
  assert.equal((await GET()).status,405);
  process.env.CONTACT_FORM_ENABLED='false';
  await check('Désactivé : aucune émission possible',503);
  process.env.CONTACT_FORM_ENABLED='true';
  await check('Origine non approuvée bloquée',403,payload(),'https://tiers.example.org');
  await check('Recipient Preview arbitraire bloqué',403,payload({email:'autre@example.org'}));
  const tempKey = process.env.EMAILJS_PRIVATE_KEY;
  delete process.env.EMAILJS_PRIVATE_KEY;
  await check('Clé privée absente : échec sécurisé',503);
  process.env.EMAILJS_PRIVATE_KEY=tempKey;
  await check('Consentement obligatoire',400,payload({consent:false}));
  await check('Jeton Turnstile obligatoire',400,payload({turnstileToken:''}));
  siteverify = { success:false, 'error-codes':['invalid-input-response'] };
  for(let j=0;j<4;j++) {
    const r=await check('Jeton rejeté sans épuiser quota email '+(j+1),403,payload());
    assert.equal(r.called.filter(c=>c.type==='emailjs').length,0);
  }
  siteverify={ success:true, hostname:'autre.vercel.app', action:'bkt_contact' };
  await check('Nom d’hôte Siteverify incorrect',403);
  siteverify={ success:true, hostname:host, action:'diagnostic' };
  await check('Action Turnstile non Contact refusée',403);
  siteverify={ success:true, hostname:host, action:'bkt_contact' };
  const r1=await check('Partenariat FR validé / deux appels EmailJS simulés',200);
  assert.equal(r1.data.ok,true);
  assert.equal(r1.data.acknowledgment,true);
  const sent=r1.called.filter(c=>c.type==='emailjs').map(c=>c.content);
  assert.equal(sent.length,2);
  assert.equal(sent[0].template_id,'FAKE_CONTACT');
  assert.equal(sent[1].template_id,'FAKE_ACK');
  assert.equal(sent[0].accessToken, 'FAKE_PRIVATE');
  assert.equal(sent[1].template_params.recipient_email, testEmail);
  assert.equal(sent[0].template_params.bkt_organization, 'Entreprise Test');
  assert.equal(sent[0].template_params.bkt_locale, 'FR');
  const r2=await check('Contact général EN validé / deux appels simulés',200,payload({
    mode:'general',locale:'en',organization:'',role:'',city:'',project:'',businessType:'',sites:'',goal:''
  }));
  assert.equal(r2.data.acknowledgment,true);
  assert.equal(r2.called.filter(c=>c.type==='emailjs').length,2);
  assert.equal(r2.called.find(c=>c.type==='emailjs').content.template_params.bkt_locale,'EN');
  emailjsFail=true;
  const r3=await check('Refus par EmailJS traité sans faux succès',502);
  assert.equal(r3.data.ok,false);
  console.log('\nAUDIT LOCAL VALIDÉ — AUCUN APPEL RESEAU / COURRIEL RÉEL.');
} finally {
  globalThis.fetch=originalFetch;
  process.env.CONTACT_FORM_ENABLED='false';
}
