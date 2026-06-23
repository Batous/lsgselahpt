const CACHE_NAME = 'lsg-selahpt-cache-v1';
const APP_SHELL = [
  './',
  './index.html',
  './about-selahpoint.html',
  './about-sponsor.html',
  './manifest.json',
  './data/bibles/lsg.json',
  './js/pipeline2/state.js',
  './js/pipeline2/utils.js',
  './js/pipeline2/maps.js',
  './js/pipeline2/alarms.js',
  './js/pipeline2/interceptors.js',
  './js/pipeline2/engine.js',
  './js/pipeline2/init.js',
  './js/pipeline2/kb-navigator.js',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.url.includes('audio.selahpoint.uk')) return;
  event.respondWith(caches.match(req).then(cached => cached || fetch(req)));
});