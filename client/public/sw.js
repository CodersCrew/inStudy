const CACHE_NAME = 'static-cache';
const urlsToCache = [
  '/',
  '/index.html',
  '/inicjatywy',
  '/rejestracja',
  '/favicon.ico',
  '/views',
];

self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(caches.open(CACHE_NAME)
    .then((cache) => {
      console.log('before');
      return cache.addAll(urlsToCache);
    }));
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating Service Worker ...', event);
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((res) => {
        if (res) {
          return res;
        }
        return fetch(event.request);
      }),
  );
});
