import { createApp } from "vue";
import { createHead } from "@unhead/vue";
import VWave from "v-wave";
import { useSettingsStore } from "@/store/settings";
import { i18n } from "./plugins/i18n";
import router from "./plugins/router";
import "./assets/global.scss";
import App from "./App.vue";

const head = createHead();

const { settings, setLocale } = useSettingsStore();
setLocale(settings.value.locale);

createApp(App)
  .use(i18n)
  .use(router)
  .use(head)
  .use(VWave, {})
  .mount("#app");
