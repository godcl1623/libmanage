let CACHE_NAME = 'my-app-cache-v1';
const OFFLINE_URL = 'offline';

const urlsToCache = [
  '/'
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

// self.addEventListener('fetch', event => {
//   // console.log(event.request.mode)
//   // if (event.request.mode === 'navigate') {
//     event.respondWith((async () => {
//       try {
//         const preloadResponse = await event.preloadResponse;
//         if (preloadResponse) {
//           console.log(preloadResponse)
//           return preloadResponse;
//         }

//         const networkResponse = await fetch(event.request);
//         console.log(networkResponse)
//         return networkResponse;
//       } catch (err) {
//         console.log('Fetch failed; returning offline page instead.', err);

//         const cache = await caches.open(CACHE_NAME);
//         const cachedResponse = await cache.match(OFFLINE_URL);
//         return cachedResponse;
//       }
//     })());
//   // }
// });
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
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