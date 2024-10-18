import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import { createHead } from "@unhead/vue";
import VWave from "v-wave";
import messages from "@/constants/messages";
import { useSettingsStore } from "@/store/settings";
import router from "./router";
import "./assets/global.scss";
import App from "./App.vue";

export const i18n = createI18n({
  locale: "en",
  fallbackLocale: "ru",
  legacy: false,
  messages
});

const head = createHead();

const { settings, setLocale } = useSettingsStore();
setLocale(settings.value.locale);

createApp(App)
  .use(i18n)
  .use(router)
  .use(head)
  .use(VWave, {})
  .mount("#app");
