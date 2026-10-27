/**
 * BlueKioskTech.ca — Diagnostic temporaire Cloudflare Turnstile, Preview uniquement.
 * Objet: effectuer une vraie validation Siteverify sans traiter le formulaire
 * et sans appeler EmailJS. Ne jamais activer cet endpoint en Production.
 * Supprimer ce fichier après la validation de préproduction.
 * Étape 1.8.3.27: diagnostic sécurisé des refus Siteverify sans exposition de secrets.
 */
export const maxDuration = 12;
const SITEVERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

const response = (status, data) => new Response(JSON.stringify(data), {
  status,
  headers: {
    'content-type':'application/json; charset=utf-8',
    'cache-control':'no-store',
    'x-content-type-options':'nosniff',
    'referrer-policy':'no-referrer',
  },
});

function allowedPreviewHost() {
  const host = process.env.VERCEL_URL || '';
  if (process.env.VERCEL_ENV !== 'preview') return null;
  return /^bluekiosktech-coming-soon-[a-z0-9-]+\.vercel\.app$/.test(host) ? host : null;
}

export async function GET() {
  const host = allowedPreviewHost();
  if (!host) return response(404,{ok:false,code:'not_found'});
  const siteKey = process.env.PUBLIC_TURNSTILE_SITE_KEY || '';
  if (!/^[-\w]{12,128}$/.test(siteKey)) return response(503,{ok:false,code:'config'});
  const html = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>BlueKioskTech — Diagnostic Turnstile Preview</title>
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
<style>body{font:16px/1.5 Arial,sans-serif;color:#1b3153;background:#f4f7fb;margin:0;padding:35px 16px}main{max-width:600px;margin:auto;background:white;padding:30px;border-radius:14px;border:1px solid #dce5f0}h1{font-size:23px}button{background:#163666;color:white;border:0;border-radius:8px;padding:13px 22px;font-weight:bold;cursor:pointer}button:disabled{opacity:.5;cursor:default}#result{white-space:pre-wrap;background:#eef4fa;padding:14px;margin-top:18px;border-radius:8px}.notice{font-size:13px;color:#475a71}</style>
</head><body><main><h1>Diagnostic Turnstile — Preview</h1>
<p>Cette page vérifie Cloudflare directement auprès du serveur, <strong>sans envoyer de courriel</strong>.</p>
<div class="cf-turnstile" data-sitekey="${siteKey}" data-callback="onTurnstileOk" data-expired-callback="onTurnstileExpired" data-error-callback="onTurnstileExpired"></div>
<p><button id="validate" disabled>Vérifier côté serveur</button></p>
<div id="result" role="status">Résolvez d'abord la vérification Cloudflare.</div>
<p class="notice">Réservé au déploiement Preview protégé. Ne soumet aucune donnée personnelle.</p></main>
<script>
let token = '';
window.onTurnstileOk = function(value){ token = value; document.getElementById('validate').disabled = false; document.getElementById('result').textContent = 'Jeton obtenu — prêt pour Siteverify.'; };
window.onTurnstileExpired = function(){token = ''; document.getElementById('validate').disabled=true; document.getElementById('result').textContent='Jeton expiré ou erreur : actualisez la vérification.';};
document.getElementById('validate').addEventListener('click',async function(){
  if (!token) return; this.disabled=true; const current=token; token='';
  document.getElementById('result').textContent='Validation en cours...';
  try { const r=await fetch(location.pathname,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({token:current}),credentials:'same-origin'});
    const d=await r.json(); document.getElementById('result').textContent= r.status+' — '+JSON.stringify(d,null,2);
  }catch(e){document.getElementById('result').textContent='Erreur de communication : '+String(e);}
  if(window.turnstile) window.turnstile.reset();
});
</script></body></html>`;
  return new Response(html,{status:200,headers:{
    'content-type':'text/html; charset=utf-8','cache-control':'no-store',
    'x-content-type-options':'nosniff','referrer-policy':'no-referrer',
    'content-security-policy':"default-src 'none'; script-src 'unsafe-inline' https://challenges.cloudflare.com; style-src 'unsafe-inline'; frame-src https://challenges.cloudflare.com; connect-src 'self' https://challenges.cloudflare.com; img-src 'self' https://challenges.cloudflare.com; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
  }});
}

export async function POST(request) {
  const host = allowedPreviewHost();
  if (!host) return response(404,{ok:false,code:'not_found'});
  if (request.headers.get('origin') !== `https://${host}`) return response(403,{ok:false,code:'origin'});
  if (!request.headers.get('content-type')?.startsWith('application/json')) return response(415,{ok:false,code:'type'});
  if (!process.env.TURNSTILE_SECRET_KEY) return response(503,{ok:false,code:'config'});
  let raw;
  try { raw=await request.text(); } catch {return response(400,{ok:false,code:'body'});}
  if (raw.length > 4000) return response(413,{ok:false,code:'size'});
  let parsed;
  try { parsed=JSON.parse(raw); } catch {return response(400,{ok:false,code:'json'});}
  if (!parsed || typeof parsed.token !== 'string' || parsed.token.length === 0 || parsed.token.length>2048)
    return response(400,{ok:false,code:'token'});
  let result;
  try {
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),6000);
    try { const res=await fetch(SITEVERIFY,{method:'POST',headers:{'content-type':'application/json'},
      body:JSON.stringify({secret:process.env.TURNSTILE_SECRET_KEY,response:parsed.token}), signal:controller.signal});
      if (!res.ok) return response(503,{ok:false,code:'upstream'});
      result=await res.json();
    } finally {clearTimeout(timer);}
  } catch {return response(503,{ok:false,code:'unavailable'});}
  // Diagnostic limité à Preview et à Vercel Authentication. N'inclure jamais
  // le jeton, la clé secrète, les en-têtes privés ou les données du formulaire.
  if (result?.success!==true || result?.hostname!==host) {
    const codes = Array.isArray(result?.['error-codes'])
      ? result['error-codes'].filter(code => typeof code === 'string').slice(0, 8)
      : [];
    return response(403, {
      ok:false,
      code:'turnstile_invalid',
      cloudflareAccepted:result?.success===true,
      cloudflareErrorCodes:codes,
      cloudflareHostname:typeof result?.hostname === 'string' ? result.hostname : null,
      expectedHostname:host,
      hostnameMatch:result?.hostname===host,
      emailSent:false,
    });
  }
  return response(200,{ok:true,code:'turnstile_verified',hostname:host,emailSent:false});
}
