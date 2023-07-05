import dayjs from "dayjs";
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from "workbox-precaching";
import { NavigationRoute, registerRoute } from "workbox-routing";
import { CacheFirst } from "workbox-strategies";

declare let self: ServiceWorkerGlobalScope;

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("periodicsync", (event) => {
  const promiseChain = self.registration.showNotification(`${dayjs().format("dddd HH:mm:ss")} Test`);
  (event as ExtendableEvent).waitUntil(promiseChain);
});

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST);

// clean old assets
cleanupOutdatedCaches();

// to allow work offline
registerRoute(new NavigationRoute(createHandlerBoundToURL("index.html")), new CacheFirst());

// assets caching
const imageExtensions = [".png", ".jpg", ".jpeg", ".svg", ".webp"];
const fontExtensions = [".woff2"];
registerRoute(
  ({ request }) => [...imageExtensions, ...fontExtensions].some((ext) => request.url.endsWith(ext)),
  new CacheFirst()
);
