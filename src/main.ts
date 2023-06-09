import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import messages from "@/i18n/messages";
import { setLocale, settings } from "@/store/settings";
import App from "./App.vue";
import router from "./router";
import "./assets/global.scss";

export const i18n = createI18n({
  locale: "en",
  fallbackLocale: "ru",
  legacy: false,
  messages
});

setLocale(settings.value.locale);

createApp(App).use(i18n).use(router).mount("#app");
