// Keep pre-rendered pages fresh online while retaining an offline fallback.
// Astro inlines page data into HTML, so navigations must never prefer an old
// cached document over the current deployment.

const CACHE_NAME = 'tagazok-v4';
// Project sites served from other repos under the same origin; never intercepted.
const PROJECT_SITES = ['/land-screener-fr/'];
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/assets/avatar.jpeg',
];

const isCacheable = (response) =>
  response && response.status === 200 && response.type === 'basic';

const cacheResponse = async (request, response) => {
  if (isCacheable(response)) {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, response.clone());
  }
  return response;
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL).catch(() => {})),
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
    ),
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  // Only handle same-origin http(s) requests — never touch chrome-extension://
  // or other schemes (Cache.put throws on them).
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;
  // Other GitHub Pages project sites share this origin (tagazok.github.io/<repo>/)
  // and fall under this worker's "/" scope: leave their requests to the network.
  if (PROJECT_SITES.some((prefix) => url.pathname.startsWith(prefix))) return;

  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((response) => cacheResponse(request, response))
        .catch(async () => {
          const cachedPage = await caches.match(request);
          return cachedPage || caches.match('/') || Response.error();
        }),
    );
    return;
  }

  // Static assets render immediately from cache and refresh in the background.
  const networkResponse = fetch(request).then((response) => cacheResponse(request, response));
  event.respondWith(
    caches.match(request).then((cached) => cached || networkResponse),
  );
  event.waitUntil(networkResponse.catch(() => undefined));
});
