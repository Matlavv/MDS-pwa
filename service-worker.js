const VERSION = "v9";
const HOST = location.protocol + "//" + location.host;
const FILECACHE = [HOST + "/pwa/css/styles.css"];

self.addEventListener("install", (e) => {
  self.skipWaiting();
  console.log("Version :", VERSION);
  console.log("Host :", FILECACHE);

  // mise en cache des fichiers souhaités
  e.waitUntil(
    (async () => {
      const cache = await caches.open(VERSION);
      // cache.add("./offline.html");
      await Promise.all(
        [...FILECACHE, "./offline.html"].map((path) => {
          return cache.add(path);
        })
      );
    })()
  );
});

self.addEventListener("activate", (e) => {
  // une fois qu'on active le service worker, on supprime les anciens caches
  e.waitUntil(
    (async () => {
      const keys = await caches.keys(); //récup toutes les clés du cache
      await Promise.all(
        keys.map((key) => {
          if (key !== VERSION) return caches.delete(key);
        })
      );
    })()
  );
});

self.addEventListener("fetch", (e) => {
  console.log("Fetch :", e.request);
  console.log("Fetch :", e.request.mode);

  // si on lit une page, afficher un truc particulier
  if (e.request.mode === "navigate") {
    e.respondWith(
      (async () => {
        try {
          // on charge la page demandée depuis la mémoire
          const preloadedResponse = await e.preloadResponse;
          // on la trouve donc on la renvoie
          if (preloadedResponse) return preloadedResponse;

          return await fetch(e.request);
        } catch (error) {
          const cache = await caches.open(VERSION);
          return await cache.match("/pwa/offline.html"); // a personnaliser
        }
      })()
    );
  }
  // pour les chargements qui ne sont pas en navigate
  else if (FILECACHE.includes(e.request.url)) {
    e.respondWith(caches.match(e.request));
  }
});
