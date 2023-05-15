import { createGlobalState } from "@vueuse/core";
import holidaysJson from "@/assets/holidays.json";
import summoningDaysJson from "@/assets/summoningDays.json";

export const useFestivitiesStore = createGlobalState(() => {
  const holidays = new Map();
  holidaysJson.forEach((day) => {
    holidays.set(day.date, day);
  });
  const summoningDays = new Map();
  summoningDaysJson.forEach((day) => {
    summoningDays.set(day.date, day);
  });

  return {
    holidays,
    summoningDays
  };
});
