import { createGlobalState } from "@vueuse/core";
import holidaysJson from "@/assets/holidays.json";
import summoningDaysJson from "@/assets/summoningDays.json";
import birthsignsJson from "@/assets/birthsigns.json";
import { Birthsign, Festivity } from "@/types/festivity";

export const useFestivitiesStore = createGlobalState(() => {
  const holidays: Map<string, Festivity> = new Map();
  holidaysJson.forEach((day) => {
    holidays.set(day.date, day);
  });
  const summoningDays: Map<string, Festivity> = new Map();
  summoningDaysJson.forEach((day) => {
    summoningDays.set(day.date, day);
  });
  const birthsigns: Map<string, Birthsign> = new Map();
  birthsignsJson.forEach((sign) => {
    birthsigns.set(sign.month, sign);
  });

  return {
    holidays,
    summoningDays,
    birthsigns
  };
});
