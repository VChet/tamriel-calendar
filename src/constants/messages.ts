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
    search: "Search",
    cancel: "Cancel",
    onboardingPage: {
      welcome: "Welcome!",
      description: "The Tamriel Calendar is a system of timekeeping adopted in the Empire of Tamriel",
      continue: "Continue"
    },
    calendarPage: {
      events: "Events",
      summoningDays: "Daedra Summoning Days",
      previousMonth: "Previous month"
    },
    eventPage: {
      summoningDay: "Daedra Summoning Day"
    },
    settingsPage: {
      language: "Language",
      design: "Original design by Serafima S",
      update: "Update",
      appVersion: "Version",
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
    search: "Поиск",
    cancel: "Отменить",
    onboardingPage: {
      welcome: "Добро пожаловать!",
      description: "Календарь Тамриэля — система времяисчисления, принятая в Империи Тамриэль",
      continue: "Продолжить"
    },
    calendarPage: {
      events: "Праздники",
      summoningDays: "Дни вызова даэдра",
      previousMonth: "Предыдущий месяц"
    },
    eventPage: {
      summoningDay: "День вызова даэдра"
    },
    settingsPage: {
      language: "Язык",
      design: "Оригинальный дизайн Serafima S",
      update: "Обновить",
      appVersion: "Версия",
      tgChannel: "Канал в Telegram",
      tgChannelUrl: "https://t.me/tamriel_calendar_ru"
    }
  }
};

export default messages;
