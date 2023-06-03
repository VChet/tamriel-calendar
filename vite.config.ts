import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA, type VitePWAOptions } from "vite-plugin-pwa";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import { fileURLToPath, URL } from "node:url";
import { execSync } from "node:child_process";

const pwaOptions: Partial<VitePWAOptions> = {
  base: "/",
  strategies: "injectManifest",
  srcDir: "src",
  filename: "sw.ts",
  includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
  manifest: {
    name: "Tamriel Calendar",
    short_name: "Tamriel Calendar",
    description: "Calendar with the system of timekeeping used in The Elder Scrolls universe",
    theme_color: "#f9f2e0",
    background_color: "#f9f2e0",
    icons: [
      {
        src: "icon-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "icon-512x512.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      }
    ]
  },
  workbox: { sourcemap: true }
};

const commitHash = execSync("git rev-parse --short HEAD").toString();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA(pwaOptions), VueI18nPlugin({})],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  define: {
    "import.meta.env.__COMMIT_HASH__": JSON.stringify(commitHash)
  }
});
