import type { I18nOptions } from "vue-i18n";

const messages: I18nOptions["messages"] = {
  en: {
    calendar: "Calendar",
    moonPhase: "Moon Phase",
    birthsigns: "Birthsigns",
    settings: "Settings",
    week: "Week",
    month: "Month",
    year: "Year",
    back: "Back",
    search: "Search",
    cancel: "Cancel",
    router: {
      title: "Tamriel Calendar",
      onboarding: "Onboarding",
      search: "Search",
      calendar: "@:calendar",
      moonPhase: "@:moonPhase",
      birthsigns: "@:birthsigns",
      birthsign: "Birthsign",
      holiday: "Holiday",
      summoningDay: "Summoning Day",
      settings: "Settings"
    },
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
    moonPhasePage: {
      masser: "Masser",
      secunda: "Secunda",
      phases: {
        0: "New Moon",
        1: "Waxing Crescent",
        2: "Waxing Half Moon",
        3: "Waxing Gibbous",
        4: "Full Moon",
        5: "Waning Gibbous",
        6: "Waning Half Moon",
        7: "Waning Crescent"
      }
    },
    eventPage: {
      summoningDay: "Daedra Summoning Day"
    },
    settingsPage: {
      language: "Language",
      design: "Original design by Serafima S",
      update: "Update App",
      appVersion: "Version",
      tgChannel: "Telegram channel",
      tgChannelUrl: "https://t.me/tamriel_calendar"
    }
  },
  ru: {
    calendar: "Календарь",
    moonPhase: "Фаза луны",
    birthsigns: "Знаки рождения",
    settings: "Настройки",
    week: "Неделя",
    month: "Месяц",
    year: "Год",
    back: "Назад",
    search: "Поиск",
    cancel: "Отменить",
    router: {
      title: "Календарь Тамриэля",
      onboarding: "Приветствие",
      calendar: "@:calendar",
      moonPhase: "@:moonPhase",
      birthsigns: "@:birthsigns",
      birthsign: "Знак рождения",
      holiday: "Праздник",
      summoningDay: "День вызова даэдра",
      settings: "Настройки"
    },
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
    moonPhasePage: {
      masser: "Массер",
      secunda: "Секунда",
      phases: {
        0: "Новолуние",
        1: "Растущий серп",
        2: "Растущая полулуна",
        3: "Растущая луна",
        4: "Полнолуние",
        5: "Убывающая луна",
        6: "Убывающая полулуна",
        7: "Убывающий серп"
      }
    },
    eventPage: {
      summoningDay: "День вызова даэдра"
    },
    settingsPage: {
      language: "Язык",
      design: "Оригинальный дизайн Serafima S",
      update: "Обновить приложение",
      appVersion: "Версия",
      tgChannel: "Канал в Telegram",
      tgChannelUrl: "https://t.me/tamriel_calendar_ru"
    }
  }
};

export default messages;
