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
    festivityPage: {
      summoningDay: "Daedra Summoning Day"
    },
    settingsPage: {
      language: "Language",
      code: "GitHub code",
      design: "Original design by Serafima S",
      update: "Update",
      appVersion: "App version",
      tgChannel: "Telegram channel",
      tgChannelUrl: "https://t.me/tamriel_calendar"
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
    festivityPage: {
      summoningDay: "День вызова даэдра"
    },
    settingsPage: {
      language: "Язык",
      code: "Код на GitHub",
      design: "Оригинальный дизайн Serafima S",
      update: "Обновить",
      appVersion: "Версия приложения",
      tgChannel: "Канал в Telegram",
      tgChannelUrl: "https://t.me/tamriel_calendar_ru"
    }
  }
};

export default messages;
