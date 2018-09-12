var CACHE_NAME='static-cache';
var urlsToCache = [
  '/',
  '/index.html',
  '/inicjatywy',
  '/rejestracja',
  '/favicon.ico',
  '/views'
];

self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(caches.open(CACHE_NAME)
  .then(function(cache) {
      console.log('before');
      return cache.addAll(urlsToCache);
    }));
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ...', event);
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(res) {
      if(res){
         return res;
      }else{
        return fetch(event.request);
      }
    })
  );
});
