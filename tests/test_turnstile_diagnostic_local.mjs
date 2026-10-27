/**
 * BlueKioskTech — Tests simulés du diagnostic Turnstile en Preview.
 * AUCUN appel Internet ni email n'est effectué.
 */
import assert from 'node:assert/strict';
import { POST, GET } from '../api/turnstile-test.js';

const expected = 'bluekiosktech-coming-soon-testing123.vercel.app';
Object.assign(process.env, {
  VERCEL_ENV: 'preview',
  VERCEL_URL: expected,
  TURNSTILE_SECRET_KEY: 'SYNTHETIC-SECRET-NEVER-USED',
  PUBLIC_TURNSTILE_SITE_KEY: 'SYNTHETIC-PUBLIC-SITE-KEY',
});
const originalFetch = globalThis.fetch;
async function call(cfreply, requestOrigin = `https://${expected}`) {
  globalThis.fetch = async url => {
    assert.equal(String(url), 'https://challenges.cloudflare.com/turnstile/v0/siteverify');
    return { ok: true, json: async () => cfreply };
  };
  try {
    const request = new Request(`https://${expected}/api/turnstile-test`, {
      method: 'POST', headers: {origin:requestOrigin, 'content-type':'application/json'},
      body:JSON.stringify({token:'synthetic-test-token'}),
    });
    const r = await POST(request);
    return {status:r.status, body:await r.json()};
  } finally {globalThis.fetch=originalFetch;}
}
try {
  let r=await call({success:false, 'error-codes':['invalid-input-secret']});
  assert.equal(r.status,403);
  assert.equal(r.body.cloudflareAccepted,false);
  assert.deepEqual(r.body.cloudflareErrorCodes,['invalid-input-secret']);
  assert.equal(r.body.cloudflareHostname,null);
  assert.equal(r.body.hostnameMatch,false);
  console.log('OK : refus Cloudflare et code erreur visibles sans exposer les clés');

  r=await call({success:true,hostname:'other-preview.vercel.app','error-codes':[]});
  assert.equal(r.status,403);
  assert.equal(r.body.cloudflareAccepted,true);
  assert.equal(r.body.cloudflareHostname,'other-preview.vercel.app');
  assert.equal(r.body.expectedHostname,expected);
  assert.equal(r.body.hostnameMatch,false);
  console.log('OK : diagnostic dun décalage de hostname');

  r=await call({success:true,hostname:expected,'error-codes':[]});
  assert.equal(r.status,200);
  assert.deepEqual(r.body,{ok:true,code:'turnstile_verified',hostname:expected,emailSent:false});
  console.log('OK : réponse valide et domaine conforme');

  r=await call({success:true,hostname:expected}, 'https://invalid.example');
  assert.equal(r.status,403);
  assert.equal(r.body.code,'origin');
  console.log('OK : origine étrangère rejetée');

  process.env.VERCEL_ENV='production';
  const resp=await GET();
  assert.equal(resp.status,404);
  console.log('OK : diagnostic inaccessible en Production');

  console.log('TESTS DIAGNOSTIC RÉUSSIS — AUCUN COURRIEL ENVOYÉ.');
} finally { globalThis.fetch=originalFetch; }
