import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import VWave from "v-wave";
import App from "./App.vue";
import router from "./router";
import messages from "@/constants/messages";
import { useSettingsStore } from "@/store/settings";
import "./assets/global.scss";

export const i18n = createI18n({
  locale: "en",
  fallbackLocale: "ru",
  legacy: false,
  messages
});

const { settings, setLocale } = useSettingsStore();
setLocale(settings.value.locale);

createApp(App).use(i18n).use(router).use(VWave, { color: "#d63d21" }).mount("#app");
