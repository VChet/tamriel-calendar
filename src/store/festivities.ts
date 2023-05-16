import { createGlobalState } from "@vueuse/core";
import holidaysJson from "@/assets/holidays.json";
import summoningDaysJson from "@/assets/summoningDays.json";
import birthsignsJson from "@/assets/birthsigns.json";
import { Birthsign } from "@/types/festivity";
import { Holiday, SummoningDay } from "@/classes/Festivity";

export const useFestivitiesStore = createGlobalState(() => {
  const holidays: Map<string, Holiday> = new Map();
  holidaysJson.forEach((day) => {
    holidays.set(day.date, new Holiday(day));
  });
  const summoningDays: Map<string, SummoningDay> = new Map();
  summoningDaysJson.forEach((day) => {
    summoningDays.set(day.date, new SummoningDay(day));
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
