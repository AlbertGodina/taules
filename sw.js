/* Service worker de Taules × · xarxa primer, amb còpia local per treballar sense connexió */
const CACHE = 'taulesx-v2';
const FITXERS = ['./', 'index.html', 'srs.js', 'ui-srs.js', 'manifest.webmanifest',
                 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png',
                 'fonts/OpenDyslexic-Regular.woff2', 'fonts/OpenDyslexic-Bold.woff2'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.all(FITXERS.map(f => c.add(new Request(f, { cache: 'reload' })).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  if (new URL(r.url).origin !== location.origin) return;
  e.respondWith(xarxaPrimer(r));
});

async function xarxaPrimer(r) {
  const c = await caches.open(CACHE);
  const guardat = (await c.match(r, { ignoreSearch: true })) || (r.mode === 'navigate' ? await c.match('index.html') : null);
  try {
    const ctl = new AbortController();
    // Si ja tenim còpia local, no esperem més de 4 s la xarxa
    const t = guardat ? setTimeout(() => ctl.abort(), 4000) : null;
    const resp = await fetch(r.url, { cache: 'no-cache', signal: ctl.signal });
    if (t) clearTimeout(t);
    if (resp && resp.ok && resp.type === 'basic') c.put(r, resp.clone());
    return resp;
  } catch (err) {
    return guardat || Response.error();
  }
}
