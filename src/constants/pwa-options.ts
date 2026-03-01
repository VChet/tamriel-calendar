import type { ManifestOptions, VitePWAOptions } from "vite-plugin-pwa";

const manifest: Partial<ManifestOptions> = {
  name: "Tamriel Calendar",
  short_name: "Tamriel Calendar",
  id: "tamriel-calendar",
  description: "Calendar with the system of timekeeping used in The Elder Scrolls universe",
  dir: "ltr",
  orientation: "portrait",
  theme_color: "#f9f2e0",
  background_color: "#f9f2e0",
  icons: [
    { src: "icon-192x192.png", sizes: "192x192", type: "image/png" },
    { src: "icon-512x512.png", sizes: "512x512", type: "image/png" },
    { src: "icon-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" }
  ]
};

const pwaOptions: Partial<VitePWAOptions> = {
  base: "/",
  strategies: "generateSW",
  registerType: "autoUpdate",
  includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
  manifest,
  workbox: {
    sourcemap: true,
    cleanupOutdatedCaches: true,
    navigateFallback: "/index.html",
    runtimeCaching: [
      {
        urlPattern: /\.(?:png|jpe?g|svg|webp|woff2)$/,
        handler: "CacheFirst",
        options: {
          cacheName: "asset-cache",
          expiration: {
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
          }
        }
      }
    ]
  }
};

export default pwaOptions;
