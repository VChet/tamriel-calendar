import { createApp } from "vue";
import { createI18n } from "vue-i18n";
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

const { settings, setLocale } = useSettingsStore();
setLocale(settings.value.locale);

createApp(App)
  .use(i18n)
  .use(router)
  .use(VWave, {})
  .mount("#app");
