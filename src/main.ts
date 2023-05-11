import { createApp } from "vue";
import { locale } from "dayjs";
import { useRegisterSW } from "virtual:pwa-register/vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./assets/global.scss";
import tamrielEn from "@/assets/tamriel-en";

const pinia = createPinia();

locale(tamrielEn);

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

createApp(App).use(pinia).use(router).mount("#app");
