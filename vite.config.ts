import { execSync } from "node:child_process";
import { fileURLToPath, URL } from "node:url";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import Vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import PWA_OPTIONS from "./src/constants/pwa-options";

const commitHash = execSync("git rev-parse --short HEAD").toString().trimEnd();
const commitDate = execSync("git log -1 --format=%cI").toString().trimEnd();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    VitePWA(PWA_OPTIONS),
    VueI18nPlugin({})
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  define: {
    "import.meta.env.VITE_GIT_COMMIT_HASH": JSON.stringify(commitHash),
    "import.meta.env.VITE_GIT_COMMIT_DATE": JSON.stringify(commitDate)
  },
  server: {
    port: 7000
  }
});
