const VERSION = "v13";
const OFFLINE_URL = "/pwa/offline.html";
const FILECACHE = [
  "/pwa/css/styles.css",
  "/pwa/index.html",
  "/pwa/js/script.js",
  "/pwa/snake.js",
  OFFLINE_URL,
  "https://unpkg.com/tailwindcss@^2.0/dist/tailwind.min.css",
];

self.addEventListener("install", (event) => {
  console.log("Filecache :", FILECACHE);
  event.waitUntil(
    caches
      .open(VERSION)
      .then((cache) => {
        const cachePromises = FILECACHE.map((url) => {
          return cache.add(url).catch((err) => {
            console.error(`Échec de mise en cache de ${url}: ${err}`);
          });
        });
        return Promise.all(cachePromises);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker version " + VERSION + " is activating...");

  // Nettoyage des anciennes versions du cache
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== VERSION)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).then((response) => {
          if (
            !response ||
            response.status !== 200 ||
            (response.type !== "basic" && response.type !== "cors")
          ) {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(VERSION).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      })
      .catch(() => {
        // En cas d'échec de la récupération (hors ligne), retourne la page hors ligne pour les navigations
        if (event.request.mode === "navigate") {
          return caches.match(OFFLINE_URL);
        }
      })
  );
});
