import { ref } from "vue";
import { createGlobalState, useStorage } from "@vueuse/core";
import type { RouteRecordName } from "vue-router";
import dayjs from "dayjs";
import { useRegisterSW } from "virtual:pwa-register/vue";
import tamrielEn from "@/constants/tamriel-en";
import tamrielRu from "@/constants/tamriel-ru";
import { i18n } from "@/main";
import { useEventsStore } from "./events";
import type { Day } from "@/classes/Day";

function getDayJSLocaleData(locale: string): ILocale {
  switch (locale) {
    case "ru": return tamrielRu;
    case "en": default: return tamrielEn;
  }
}

export const useSettingsStore = createGlobalState(() => {
  const settings = useStorage("settings", {
    locale: "en",
    onboarding: false
  }, localStorage, { mergeDefaults: true });

  async function setLocale(locale: string): Promise<void> {
    const { setEventsData } = useEventsStore();

    dayjs.locale(getDayJSLocaleData(locale));
    i18n.global.locale.value = locale;
    document.querySelector("html")?.setAttribute("lang", locale);
    settings.value.locale = locale;
    await setEventsData(locale);
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
