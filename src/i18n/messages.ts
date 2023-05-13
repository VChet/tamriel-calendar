import type { I18nOptions } from "vue-i18n";

const messages: I18nOptions["messages"] = {
  en: {
    calendar: "Calendar",
    birthsigns: "Birthsigns",
    settings: "Settings",
    week: "Week",
    month: "Month",
    year: "Year",
    settingsPage: {
      design: "Original design by",
      update: "Update app",
      appVersion: "App version"
    }
  },
  ru: {
    calendar: "Календарь",
    birthsigns: "Знаки рождения",
    settings: "Настройки",
    week: "Неделя",
    month: "Месяц",
    year: "Год",
    settingsPage: {
      design: "Оригинальный дизайн",
      update: "Обновить приложение",
      appVersion: "Версия приложения"
    }
  }
};

export default messages;
