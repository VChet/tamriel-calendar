import { ref } from "vue";
import { createGlobalState, useLocalStorage } from "@vueuse/core";
import type { RouteRecordName } from "vue-router";
import { useHead, type VueHeadClient } from "@unhead/vue";
import dayjs from "dayjs";
import { useRegisterSW } from "virtual:pwa-register/vue";
import enTamriel from "@/constants/dayjs/en_tamriel";
import ruTamriel from "@/constants/dayjs/ru_tamriel";
import { i18n } from "@/plugins/i18n";
import { useEventsStore } from "./events";
import type { Day } from "@/classes/Day";

type LocaleCode = typeof i18n.global.availableLocales[number];
type ColorTheme = "light" | "dark";
interface SettingsStore {
  locale: LocaleCode
  colorTheme: ColorTheme
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
    colorTheme: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
    onboarding: false
  }, { mergeDefaults: true });

  async function setLocale(head: VueHeadClient, localeCode: LocaleCode): Promise<void> {
    const { setEventsData } = useEventsStore();

    settings.value.locale = localeCode;
    dayjs.locale(getDayJSLocaleData(localeCode));
    i18n.global.locale.value = localeCode;
    const locale = LOCALES.find(({ code }) => code === localeCode)?.locale ?? "en_US";
    useHead({
      htmlAttrs: { lang: localeCode },
      meta: () => [{ property: "og:locale", content: locale }]
    }, { head });
    await setEventsData(localeCode);
  }

  function setColorTheme(head: VueHeadClient, theme: ColorTheme): void {
    settings.value.colorTheme = theme;
    useHead({
      htmlAttrs: { "data-theme": theme },
      meta: () => [
        { name: "color-scheme", content: theme },
        { name: "theme-color", content: theme === "light" ? "#f9f2e0" : "#1e1706" }
      ]
    }, { head });
  }

  const { needRefresh, updateServiceWorker } = useRegisterSW({ immediate: true });
  const selectedCalendar = ref<RouteRecordName | null | undefined>(null);
  const selectedDay = ref<Day | null>(null);

  return {
    LOCALES,
    settings,
    setLocale,
    setColorTheme,

    selectedCalendar,
    selectedDay,

    needRefresh,
    updateServiceWorker
  };
});
