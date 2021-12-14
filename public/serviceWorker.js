let CACHE_NAME = 'my-site-cache-v1';

const urlsToCache = [
  '/',
  '/main',
];

self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request)
    .then(response => {
      if (response) {
      return response;
      }
      return fetch(event.request);
    })
  );
});