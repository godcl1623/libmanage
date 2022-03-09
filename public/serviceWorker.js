let CACHE_NAME = 'my-app-cache-v1';

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
//   if (event.request.method === 'POST') return;
//   if (!(event.request.url.indexOf('http') === 0)) return;
//   event.respondWith(
//     caches.match(event.request)
//       .then(response => {
//         console.log('[Service Worker] Fetching resources: ', event.request.url);
//         return response ||
//         fetch(event.request)
//           .then(response =>
//             caches.open(CACHE_NAME)
//               .then(cache => {
//                 console.log('[Service Worker] Caching new resources: ', event.request.url);
//                 cache.put(event.request, response.clone());
//                 return response;
//               })
//           )
//       })
//   );
// });

self.addEventListener('fetch', event => {
  if (event.request.method === 'POST' || event.request.method === 'PUT') return;
  if (!(event.request.url.indexOf('http') === 0)) return;
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        console.log('[Service Worker] Fetching resources: ', event.request.url);
        return response ||
        fetch(event.request)
          .then(response =>
            caches.open(CACHE_NAME)
              .then(cache => {
                console.log('[Service Worker] Caching new resources: ', event.request.url);
                cache.put(event.request, response.clone());
                return response;
              })
          )
          .catch(err => {
            const cache = caches.open(CACHE_NAME);
          })
      })
  );
});