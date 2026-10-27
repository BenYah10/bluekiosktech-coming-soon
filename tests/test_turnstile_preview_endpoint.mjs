/** Smoke tests unitaires de l'endpoint Preview sans requête réseau ni EmailJS. */
import assert from 'node:assert/strict';
import {GET, POST} from '../api/turnstile-test.js';
const backup={};
for(const key of ['VERCEL_ENV','VERCEL_URL','PUBLIC_TURNSTILE_SITE_KEY','TURNSTILE_SECRET_KEY']) backup[key]=process.env[key];
const savedFetch=globalThis.fetch;
const host='bluekiosktech-coming-soon-bpf55jj5l.vercel.app';
const req=(origin='https://'+host,token='test-token')=>new Request('https://'+host+'/api/turnstile-test',{
 method:'POST',headers:{origin,'content-type':'application/json'},body:JSON.stringify({token})});
try {
 process.env.VERCEL_ENV='production';process.env.VERCEL_URL=host;
 assert.equal((await GET()).status,404);
 assert.equal((await POST(req())).status,404);
 console.log('OK: aucun accès en production');
 process.env.VERCEL_ENV='preview';process.env.PUBLIC_TURNSTILE_SITE_KEY='0x4AAAAAAAATESTKEY';process.env.TURNSTILE_SECRET_KEY='test-secret';
 let r=await GET();assert.equal(r.status,200);assert((await r.text()).includes('sans envoyer de courriel'));
 console.log('OK: page de diagnostic visible uniquement en Preview');
 assert.equal((await POST(req('https://evil.example'))).status,403);
 assert.equal((await POST(req('https://'+host,''))).status,400);
 console.log('OK: origine et jeton obligatoires');
 globalThis.fetch=async(_url,options)=>{
  assert.equal(JSON.parse(options.body).secret,'test-secret');
  return {ok:true,json:async()=>({success:true,hostname:host})};
 };
 r=await POST(req());assert.equal(r.status,200);let data=await r.json();assert.equal(data.emailSent,false);assert.equal(data.code,'turnstile_verified');
 console.log('OK: Siteverify réussi (SIMULÉ), aucun envoi EmailJS possible');
 globalThis.fetch=async()=>({ok:true,json:async()=>({success:true,hostname:'other.example'})});
 assert.equal((await POST(req())).status,403);
 console.log('OK: réponse avec hostname différent rejetée');
 console.log('TESTS LOCAUX REUSSIS — AUCUN COURRIEL ENVOYE.');
}finally {
 globalThis.fetch=savedFetch;
 for(const [key,value] of Object.entries(backup)) { if(value===undefined) delete process.env[key]; else process.env[key]=value; }
}
