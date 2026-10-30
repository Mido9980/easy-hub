const CACHE = "hub-v1";
const CORE = ["./", "./index.html", "./docs.html", "./assets/style.css", "./assets/app.js", "./assets/data.js",
  "./api/apps.json", "./api/health.json", "./manifest.webmanifest", "./icons/icon-192.png"];
self.addEventListener("install", e => e.waitUntil(caches.open(CACHE)
  .then(c => Promise.all(CORE.map(u => c.add(new Request(u, {cache:"reload"})).catch(()=>{})))).then(() => self.skipWaiting())));
self.addEventListener("activate", e => e.waitUntil(caches.keys()
  .then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x)))).then(() => self.clients.claim())));
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== location.origin) return;
  e.respondWith(fetch(r).then(res => { const c = res.clone(); caches.open(CACHE).then(x => x.put(r, c)).catch(()=>{}); return res; })
    .catch(() => caches.match(r)));
});
