import { createGlobalState } from "@vueuse/core";
import { reactive } from "vue";
import type { Birthsign, Festivity } from "@/types/festivity";
import { Holiday, SummoningDay } from "@/classes/Festivity";

export const useFestivitiesStore = createGlobalState(() => {
  const holidays = reactive<Map<string, Holiday>>(new Map());
  const summoningDays = reactive<Map<string, SummoningDay>>(new Map());
  const birthsigns = reactive<Map<string, Birthsign>>(new Map());

  async function setFestivitiesData(locale: string) {
    const [holidaysData, summoningDaysData, birthsignsData] = await Promise.all([
      import(`@/assets/holidays/${locale}.json`).then((module) => module.default as Festivity[]),
      import(`@/assets/summoningDays/${locale}.json`).then((module) => module.default as Festivity[]),
      import(`@/assets/birthsigns/${locale}.json`).then((module) => module.default as Birthsign[])
    ]);

    holidaysData.forEach((day) => holidays.set(day.date, new Holiday(day)));
    summoningDaysData.forEach((day) => summoningDays.set(day.date, new SummoningDay(day)));
    birthsignsData.forEach((sign) => birthsigns.set(sign.month, sign));
  }

  return {
    holidays,
    summoningDays,
    birthsigns,

    setFestivitiesData
  };
});
