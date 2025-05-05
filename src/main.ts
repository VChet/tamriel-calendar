import { createApp } from "vue";
import VWave from "v-wave";
import head from "./plugins/head";
import { i18n } from "./plugins/i18n";
import router from "./plugins/router";
import "./assets/global.scss";
import App from "./App.vue";

createApp(App)
  .use(i18n)
  .use(router)
  .use(head)
  .use(VWave, {})
  .mount("#app");
