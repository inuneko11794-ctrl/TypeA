// BATTLE BANK-KUN: temporary service-worker isolation test
// Keep saved application data in localStorage untouched.
// Disable Cache Storage so the page is served directly from GitHub Pages.

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(names.map((name) => caches.delete(name))))
      .then(() => self.clients.claim())
  );
});

// Intentionally no fetch handler: all requests use the normal network path.
