import { execSync } from "node:child_process";
import process from "node:process";
import { fileURLToPath, URL } from "node:url";
import Vue from "@vitejs/plugin-vue";
import namedPort from "named-port";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import VueRouter from "vue-router/vite";
import type { TreeNode } from "vue-router/unplugin";
import PWA_OPTIONS from "./src/constants/pwa-options";

const commitHash = execSync("git rev-parse --short HEAD").toString().trimEnd();
const commitDate = execSync("git log -1 --format=%cd --date=\"format:%Y, %b %d\"").toString().trimEnd();

const BRACKETS_REGEX = /[-[\]]+/g;
const SPACE_REGEX = /\s+/;
function getRouteName(node: TreeNode): string {
  if (!node.parent) return "";

  const { rawSegment } = node.value;
  const parentName = getRouteName(node.parent);
  if (rawSegment === "index") return parentName;

  const name = rawSegment
    .replace(BRACKETS_REGEX, " ") // replace -[] with space
    .split(SPACE_REGEX)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  if (!parentName) { return name; }
  return `${parentName} ${name}`;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({ dts: "./src/types/typed-router.ts", getRouteName }),
    Vue(),
    VitePWA(PWA_OPTIONS)
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
    port: namedPort(process.env.npm_package_name!, { min: 7000, max: 10000 })
  }
});
