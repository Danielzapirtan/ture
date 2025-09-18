const CACHE_NAME = "calendar-cache-20250918-1245";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json"
];

// Install and pre-cache files
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

// Serve from cache, fallback to network
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});