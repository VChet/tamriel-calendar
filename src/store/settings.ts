import dayjs from "dayjs";
import { createGlobalState, useStorage } from "@vueuse/core";
import { useRegisterSW } from "virtual:pwa-register/vue";
import { ref } from "vue";
import type { RouteRecordName } from "vue-router";
import { useFestivitiesStore } from "./festivities";
import { i18n } from "@/main";
import tamrielEn from "@/constants/tamriel-en";
import tamrielRu from "@/constants/tamriel-ru";
import type { Day } from "@/classes/Day";

function getDayJSLocaleData(locale: string) {
  switch (locale) {
    case "ru": return tamrielRu;
    case "en": default: return tamrielEn;
  }
}

export const useSettingsStore = createGlobalState(() => {
  const settings = useStorage("settings", {
    locale: "en",
    onboarding: false
  });

  async function setLocale(locale: string) {
    const { setFestivitiesData } = useFestivitiesStore();

    dayjs.locale(getDayJSLocaleData(locale));
    i18n.global.locale.value = locale;
    document.querySelector("html")?.setAttribute("lang", locale);
    settings.value.locale = locale;
    await setFestivitiesData(locale);
  }

  const { needRefresh, updateServiceWorker } = useRegisterSW({ immediate: true });
  const selectedCalendar = ref<RouteRecordName | null | undefined>(null);
  const selectedDay = ref<Day | null>(null);

  return {
    settings,
    setLocale,

    selectedCalendar,
    selectedDay,

    needRefresh,
    updateServiceWorker
  };
});
