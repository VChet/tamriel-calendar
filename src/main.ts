import { createApp } from "vue";
import VWave from "v-wave";
import { createI18n } from "vue-i18n";
import messages from "@/constants/messages";
import { useSettingsStore } from "@/store/settings";
import router from "./router";
import App from "./App.vue";
import "./assets/global.scss";

export const i18n = createI18n({
  locale: "en",
  fallbackLocale: "ru",
  legacy: false,
  messages
});

const { settings, setLocale } = useSettingsStore();
setLocale(settings.value.locale);

createApp(App)
  .use(i18n)
  .use(router)
  .use(VWave, {})
  .mount("#app");
