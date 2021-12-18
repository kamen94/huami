let timestamp = "1623219867",
    VERSION = "precache-v" + timestamp,
    RUNTIME = "runtime-v" + timestamp;
const PRECACHE_URLS = ["/"];
self.addEventListener("install", (e => {
        e.waitUntil(caches.open(VERSION).then((e => e.addAll(PRECACHE_URLS))).then(self.skipWaiting()))
    })),
    self.addEventListener("activate", (e => {
        const t = [VERSION, RUNTIME];
        e.waitUntil(caches.keys().then((e => e.filter((e => !t.includes(e))))).then((e => Promise.all(e.map((e => caches.delete(e)))))).then((() => self.clients.claim())))
    })),
    self.addEventListener("fetch", (e => {
        e.request.url.startsWith(self.location.origin) && e.respondWith(caches.match(e.request).then((t => t || caches.open(RUNTIME).then((t => fetch(e.request).then((s => t.put(e.request, s.clone()).then((() => s)))))))))
    }));