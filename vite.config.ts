import { URL, fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import Icons from "unplugin-icons/vite";
import PWA_OPTIONS from "./src/constants/pwa-options";

const commitHash = execSync("git rev-parse --short HEAD").toString().trimEnd();
const commitDate = execSync("git log -1 --format=%cI").toString().trimEnd();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    VitePWA(PWA_OPTIONS),
    VueI18nPlugin({}),
    Icons({ compiler: "vue3" })
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
