self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('portfolio-store').then((cache) => cache.addAll([
      '/',
      '/index.html',
      '/style.css',
      '/images/logo.png',
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});