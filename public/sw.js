const CACHE_NAME = 'gomeria-cyc-v4'; // Bumped cache
const urlsToCache = [
  // Cache empty initially. The fetch listener will cache files dynamically.
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting(); // Force new service worker activation immediately
});

self.addEventListener('activate', event => {
  // Clean up old caches
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
                  .map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // Stale-while-revalidate strategy
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request).then(networkResponse => {
        // Only cache successful GET requests
        if (event.request.method === 'GET' && networkResponse.ok) {
           const responseToCache = networkResponse.clone();
           caches.open(CACHE_NAME).then(cache => {
             cache.put(event.request, responseToCache);
           });
        }
        return networkResponse;
      }).catch(() => {
         // Fallback logic if network fails could go here
      });
      // Return cached immediately if available, while network request updates cache in background
      return cachedResponse || fetchPromise;
    })
  );
});
