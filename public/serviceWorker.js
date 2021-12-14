let CACHE_NAME = 'my-site-cache-v1';

const urlsToCache = [
  '/',
  '/main',
  '/offlineTest.html'
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
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // if (response) {
        //   return response;
        // }
        // return fetch(event.request);
        console.log('[Service Worker] Fetching resources: ', event.request.url);
        return response ||
        fetch(event.request)
          .then(response => caches.open(CACHE_NAME)
              .then(cache => {
                console.log('[Service Worker] Caching new resources: ', event.request.url);
                cache.put(event.request, response.clone());
                return response;
              }))
      })
  );
});