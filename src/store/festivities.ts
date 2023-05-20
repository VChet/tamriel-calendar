import { createGlobalState } from "@vueuse/core";
import { reactive } from "vue";
import { type Birthsign, type Festivity } from "@/types/festivity";
import { Holiday, SummoningDay } from "@/classes/Festivity";

export const useFestivitiesStore = createGlobalState(() => {
  const holidays = reactive<Map<string, Holiday>>(new Map());
  const summoningDays = reactive<Map<string, SummoningDay>>(new Map());
  const birthsigns = reactive<Map<string, Birthsign>>(new Map());

  async function setFestivitiesData(locale: string) {
    const holidaysPromise: Promise<{ default: Array<Festivity> }> = import(`@/assets/holidays/${locale}.json`);
    const summoningDaysPromise = import(`@/assets/summoningDays.json`);
    const birthsignsPromise: Promise<{ default: Array<Birthsign> }> = import(`@/assets/birthsigns/${locale}.json`);

    const data = await Promise.all([holidaysPromise, summoningDaysPromise, birthsignsPromise]);
    data[0].default.forEach((day) => holidays.set(day.date, new Holiday(day)));
    data[1].default.forEach((day) => summoningDays.set(day.date, new SummoningDay(day)));
    data[2].default.forEach((sign) => birthsigns.set(sign.month, sign));
  }

  return {
    holidays,
    summoningDays,
    birthsigns,

    setFestivitiesData
  };
});
