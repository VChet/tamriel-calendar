import type { I18nOptions } from "vue-i18n";

const messages: I18nOptions["messages"] = {
  en: {
    calendar: "Calendar",
    birthsigns: "Birthsigns",
    settings: "Settings",
    week: "Week",
    month: "Month",
    year: "Year",
    back: "Back",
    onboardingPage: {
      welcome: "Welcome!",
      description: "The Tamriel Calendar is a system of timekeeping adopted in the Empire of Tamriel",
      continue: "Continue"
    },
    calendarPage: {
      festivities: "Festivities",
      summoningDays: "Daedra Summoning Days"
    },
    settingsPage: {
      language: "Language",
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
    back: "Назад",
    onboardingPage: {
      welcome: "Добро пожаловать!",
      description: "Календарь Тамриэля — система времяисчисления, принятая в Империи Тамриэль",
      continue: "Продолжить"
    },
    calendarPage: {
      festivities: "Праздники",
      summoningDays: "Дни вызова даэдра"
    },
    settingsPage: {
      language: "Язык",
      design: "Оригинальный дизайн",
      update: "Обновить приложение",
      appVersion: "Версия приложения"
    }
  }
};

export default messages;
