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
  strategies: "injectManifest",
  srcDir: "src",
  filename: "sw.ts",
  includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
  manifest,
  workbox: { sourcemap: true }
};

export default pwaOptions;
