import { createApp } from "vue";
import VWave from "v-wave";
import {
  SCROLL_RESTORATION_CAPTURE_DEFAULT,
  SCROLL_RESTORATION_RESTORE_DEFAULT,
  ScrollRestoration
} from "vue-router/experimental";
import head from "./plugins/head";
import { i18n } from "./plugins/i18n";
import router from "./plugins/router";
import "./assets/global.scss";
import App from "./App.vue";

createApp(App)
  .use(i18n)
  .use(ScrollRestoration, {
    router,
    capture: SCROLL_RESTORATION_CAPTURE_DEFAULT,
    restore: SCROLL_RESTORATION_RESTORE_DEFAULT
  })
  .use(router)
  .use(head)
  .use(VWave, {})
  .mount("#app");
