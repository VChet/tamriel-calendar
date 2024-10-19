import { ref } from "vue";
import { createGlobalState, useLocalStorage } from "@vueuse/core";
import type { RouteRecordName } from "vue-router";
import dayjs from "dayjs";
import { useRegisterSW } from "virtual:pwa-register/vue";
import tamrielEn from "@/constants/tamriel-en";
import tamrielRu from "@/constants/tamriel-ru";
import { i18n } from "@/main";
import { useEventsStore } from "./events";
import type { Day } from "@/classes/Day";

type LocaleCode = "en" | "ru";
interface SettingsStore {
  locale: LocaleCode
  onboarding: boolean
}

function getDayJSLocaleData(locale: LocaleCode): ILocale {
  switch (locale) {
    case "ru": return tamrielRu;
    case "en": default: return tamrielEn;
  }
}

const LOCALES: { code: LocaleCode, locale: string, label: string }[] = [
  { code: "en", locale: "en_US", label: "English" },
  { code: "ru", locale: "ru_RU", label: "Русский" }
];

export const useSettingsStore = createGlobalState(() => {
  const settings = useLocalStorage<SettingsStore>("settings", {
    locale: "en",
    onboarding: false
  }, { mergeDefaults: true });

  async function setLocale(localeCode: LocaleCode): Promise<void> {
    const { setEventsData } = useEventsStore();

    dayjs.locale(getDayJSLocaleData(localeCode));
    i18n.global.locale.value = localeCode;
    document.querySelector("html")?.setAttribute("lang", localeCode);
    const locale = LOCALES.find(({ code }) => code === localeCode)?.locale ?? "en_US";
    document.querySelector("meta[property='og:locale']")?.setAttribute("content", locale);
    settings.value.locale = localeCode;
    await setEventsData(localeCode);
  }

  const { needRefresh, updateServiceWorker } = useRegisterSW({ immediate: true });
  const selectedCalendar = ref<RouteRecordName | null | undefined>(null);
  const selectedDay = ref<Day | null>(null);

  return {
    LOCALES,
    settings,
    setLocale,

    selectedCalendar,
    selectedDay,

    needRefresh,
    updateServiceWorker
  };
});
