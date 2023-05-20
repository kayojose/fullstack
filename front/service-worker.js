const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js'
];

self.addEventListener('install', function(event) {
  // Realiza a instalação do service worker e armazena os recursos em cache
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Verifica se o recurso está em cache
        if (response) {
          return response;
        }

        // Caso contrário, faz uma requisição à rede
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', function(event) {
  // Remove caches antigos que não são mais necessários
  event.waitUntil(
    caches.keys()
      .then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName) {
            return cacheName !== CACHE_NAME;
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      })
  );
});