import dayjs from "dayjs";
import { createGlobalState, useStorage } from "@vueuse/core";
import { useRegisterSW } from "virtual:pwa-register/vue";
import { i18n } from "@/main";
import tamrielEn from "@/assets/tamriel-en";
import tamrielRu from "@/assets/tamriel-ru";
import { useFestivitiesStore } from "./festivities";

export const settings = useStorage("settings", { locale: "en" });

export const useSettingsStore = createGlobalState(() => {
  const { needRefresh, updateServiceWorker } = useRegisterSW({ immediate: true });

  return {
    needRefresh,
    updateServiceWorker
  };
});

function getDayJSLocaleData(locale: string) {
  switch (locale) {
    case "en":
      return tamrielEn;
    case "ru":
      return tamrielRu;
  }
}
export function setLocale(locale: string) {
  const { setFestivitiesData } = useFestivitiesStore();

  dayjs.locale(getDayJSLocaleData(locale));
  i18n.global.locale.value = locale;
  settings.value.locale = locale;
  setFestivitiesData(locale);
}
