import dayjs from "dayjs";
import { createGlobalState, useStorage } from "@vueuse/core";
import { useRegisterSW } from "virtual:pwa-register/vue";
import { ref } from "vue";
import type { RouteRecordName } from "vue-router";
import { useFestivitiesStore } from "./festivities";
import { i18n } from "@/main";
import tamrielEn from "@/assets/tamriel-en";
import tamrielRu from "@/assets/tamriel-ru";
import type { Day } from "@/classes/Day";

export const settings = useStorage("settings", {
  locale: "en",
  onboarding: false
});

export const useSettingsStore = createGlobalState(() => {
  const { needRefresh, updateServiceWorker } = useRegisterSW({ immediate: true });
  const selectedCalendar = ref<RouteRecordName | null | undefined>(null);
  const selectedDay = ref<Day | null>(null);

  return {
    selectedCalendar,
    selectedDay,

    needRefresh,
    updateServiceWorker
  };
});

function getDayJSLocaleData(locale: string) {
  switch (locale) {
    case "ru":
      return tamrielRu;
    case "en":
    default:
      return tamrielEn;
  }
}
export async function setLocale(locale: string) {
  const { setFestivitiesData } = useFestivitiesStore();

  dayjs.locale(getDayJSLocaleData(locale));
  i18n.global.locale.value = locale;
  document.querySelector("html")?.setAttribute("lang", locale);
  settings.value.locale = locale;
  await setFestivitiesData(locale);
}
