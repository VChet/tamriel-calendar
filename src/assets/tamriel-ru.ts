const weekdays = ["сандас", "морндас", "тирдас", "миддас", "турдас", "фредас", "лордас"];
const weekdaysShort = ["сан", "мор", "тир", "мид", "тур", "фре", "лор"];
const weekdaysMin = ["с", "м", "т", "м", "т", "ф", "л"];
const months = [
  "Утренней звезды",
  "Восхода солнца",
  "Первого зерна",
  "Руки дождя",
  "Второго зерна",
  "Середины года",
  "Высокого солнца",
  "Последнего зерна",
  "Огня очага",
  "Начала морозов",
  "Заката солнца",
  "Вечерней звезды"
];
const monthsShort = [
  "утр. зв.",
  "восх. солн.",
  "перв. зерн.",
  "рук. дожд.",
  "втор. зерн.",
  "сер. год.",
  "выс. солн.",
  "посл. зерн.",
  "огн. очаг.",
  "нач. мороз.",
  "зак. солн.",
  "веч. звез."
];

export default {
  name: "tamriel-ru",
  weekdays,
  weekdaysShort,
  weekdaysMin,
  months,
  monthsShort,
  weekStart: 1
} as ILocale;
