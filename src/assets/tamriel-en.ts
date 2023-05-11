const weekdays = ["sundas", "morndas", "tirdas", "middas", "turdas", "fredas", "loredas"];
const weekdaysShort = ["sun", "mon", "tir", "mid", "tur", "fre", "lor"];
const weekdaysMin = ["su", "mo", "ti", "mi", "tu", "fr", "lo"];
const months = [
  "Morning Star",
  "Sun's Dawn",
  "First Seed",
  "Rain's Hand",
  "Second Seed",
  "Mid Year",
  "Sun's Height",
  "Last Seed",
  "Hearthfire",
  "Frostfall",
  "Sun's Dusk",
  "Evening Star"
];
const monthsShort = [
  "mor. star",
  "sun. dawn",
  "fir. seed",
  "rain. hand",
  "sec. seed",
  "mid. year",
  "sun. height",
  "last. seed",
  "hearthfire",
  "frostfall",
  "sun. dusk",
  "even. star"
];

export default {
  name: "tamriel-en",
  weekdays,
  weekdaysShort,
  weekdaysMin,
  months,
  monthsShort,
  weekStart: 1
} as ILocale;
