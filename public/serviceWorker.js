// const currentNum = 2;
const OLD_CACHE = 'my-app-cache-v2';
const CACHE_NAME = 'my-app-cache-v1';
const _window = this || self || window;
// + String(currentNum - 1);

const urlsToCache = ['/'];

// 추가
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    for (const registration of registrations) {
      registration.update();
    }
  });
}

self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    }).then(e => self.skipWaiting())
  );
  // self.skipWaiting();
});

self.addEventListener('fetch', event => {
  if (event.request.method === 'POST' || event.request.method === 'PUT') return;
  if (!(event.request.url.indexOf('http') === 0)) return;
  event.respondWith(
    caches.match(event.request).then(response => {
      console.log('[Service Worker] Fetching resources: ', event.request.url);
      return (
        response ||
        fetch(event.request)
          .then(response =>
            caches.open(CACHE_NAME).then(cache => {
              console.log('[Service Worker] Caching new resources: ', event.request.url);
              cache.put(event.request, response.clone());
              return response;
            })
          )
          .catch(err => {
            const cache = caches.open(CACHE_NAME);
          })
      );
    })
  );
});

// 추가
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(cacheName => cacheName === OLD_CACHE)
          .map(cacheName => {
            
            console.log('Removing old cache.', cacheName);
            return caches.delete(cacheName);
          })
      )
      .then(delCacheRes => {
        if (delCacheRes[0] != null) {
          // if ('serviceWorker' in navigator) {
          //   navigator.serviceWorker.getRegistrations().then(registrations => {
          //     registrations.map(r => r.unregister());
          //   });
          //   window.location.reload(true);
          // }
          
          this.location.reload();
        }
      })
    )
  );
});
