import { createApp } from "vue";
import { createI18n } from "vue-i18n";

import { useRegisterSW } from "virtual:pwa-register/vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import messages from "@/i18n/messages";

import "./assets/global.scss";
import { setLocale, settings } from "@/store/settings";

const pinia = createPinia();

export const i18n = createI18n({
  locale: "en",
  fallbackLocale: "ru",
  legacy: false,
  messages
});

setLocale(settings.value.locale);

useRegisterSW({
  immediate: true,
  onRegistered(registration) {
    if (registration) {
      /* eslint-disable no-console */
      console.log("Service worker registered");
    }
  },
  onRegisterError(error) {
    /* eslint-disable no-console */
    console.error(error);
  }
});

createApp(App).use(pinia).use(i18n).use(router).mount("#app");
