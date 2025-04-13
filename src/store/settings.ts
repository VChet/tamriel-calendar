import { ref } from "vue";
import { createGlobalState, useLocalStorage } from "@vueuse/core";
import type { RouteRecordName } from "vue-router";
import { useHead } from "@unhead/vue/legacy";
import dayjs from "dayjs";
import { useRegisterSW } from "virtual:pwa-register/vue";
import enTamriel from "@/constants/dayjs/en_tamriel";
import ruTamriel from "@/constants/dayjs/ru_tamriel";
import { i18n } from "@/plugins/i18n";
import { useEventsStore } from "./events";
import type { Day } from "@/classes/Day";

type LocaleCode = "en" | "ru";
interface SettingsStore {
  locale: LocaleCode
  onboarding: boolean
}

function getDayJSLocaleData(locale: LocaleCode): ILocale {
  switch (locale) {
    case "ru": return ruTamriel;
    case "en": default: return enTamriel;
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

    settings.value.locale = localeCode;
    dayjs.locale(getDayJSLocaleData(localeCode));
    i18n.global.locale.value = localeCode;
    const locale = LOCALES.find(({ code }) => code === localeCode)?.locale ?? "en_US";
    useHead({
      htmlAttrs: { lang: localeCode },
      meta: () => [{ property: "og:locale", content: locale }]
    });
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
