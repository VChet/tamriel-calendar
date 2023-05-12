import dayjs from "dayjs";
import { useStorage } from "@vueuse/core";
import { i18n } from "@/main";
import tamrielEn from "@/assets/tamriel-en";
import tamrielRu from "@/assets/tamriel-ru";

export const settings = useStorage("settings", { locale: "en" });

function getDayJSLocaleData(locale: string) {
  switch (locale) {
    case "en":
      return tamrielEn;
    case "ru":
      return tamrielRu;
  }
}
export function setLocale(locale: string) {
  dayjs.locale(getDayJSLocaleData(locale));
  i18n.global.locale.value = locale;
  settings.value.locale = locale;
}
