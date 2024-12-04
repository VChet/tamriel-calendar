import { createI18n } from "vue-i18n";
import en from "@/constants/locales/en";
import ru from "@/constants/locales/ru";

export const i18n = createI18n({
  locale: "en",
  fallbackLocale: "ru",
  legacy: false,
  messages: { en, ru }
});
