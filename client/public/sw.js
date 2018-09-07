var CACHE_NAME='my-cache';
var urlsToCache = [
  '/',
  '/index.html',
];
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('before');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (res) {
        return res;
      })
  );
});

self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ...', event);
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  console.log('[Service Worker] Fetching something ....', event);
  event.respondWith(fetch(event.request));
});
