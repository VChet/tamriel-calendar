import { createI18n } from "vue-i18n";
import VWave from "v-wave";
import { ViteSSG } from "vite-ssg";
import messages from "@/constants/messages";
import { useSettingsStore } from "@/store/settings";
import { afterEach, beforeEach, routerOptions } from "./router";
import "./assets/global.scss";
import App from "./App.vue";

export const i18n = createI18n({
  locale: "en",
  fallbackLocale: "ru",
  legacy: false,
  messages
});

const { settings, setLocale } = useSettingsStore();
setLocale(settings.value.locale);

export const createApp = ViteSSG(App, routerOptions, ({ app, router }) => {
  app
    .use(i18n)
    .use(VWave, {});

  router.beforeEach(beforeEach);
  router.afterEach(afterEach);
});
