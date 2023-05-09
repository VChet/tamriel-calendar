import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA, type VitePWAOptions } from "vite-plugin-pwa";
import { fileURLToPath, URL } from "node:url";

const pwaOptions: Partial<VitePWAOptions> = {
  base: "/",
  strategies: "injectManifest",
  srcDir: "src",
  filename: "sw.ts",
  manifest: {
    name: "Tamriel Calendar",
    short_name: "Tamriel Calendar",
    description: "Календарь с системой исчисления принятой во вселенной The Elder Scrolls"
  },
  workbox: { sourcemap: true }
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA(pwaOptions)],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
});
