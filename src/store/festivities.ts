import { createGlobalState } from "@vueuse/core";
import { ref, unref } from "vue";
import { type Birthsign, type Festivity } from "@/types/festivity";
import { Holiday, SummoningDay } from "@/classes/Festivity";

export const useFestivitiesStore = createGlobalState(() => {
  const holidays = ref<Map<string, Holiday>>(new Map());
  const summoningDays = ref<Map<string, SummoningDay>>(new Map());
  const birthsigns = ref<Map<string, Birthsign>>(new Map());

  async function setFestivitiesData(locale: string) {
    const holidaysPromise: Promise<{ default: Array<Festivity> }> = import(`@/assets/holidays/${locale}.json`);
    const summoningDaysPromise: Promise<{ default: Array<Festivity> }> = import(
      `@/assets/summoningDays/${locale}.json`
    );
    const birthsignsPromise: Promise<{ default: Array<Birthsign> }> = import(`@/assets/birthsigns/${locale}.json`);

    const data = await Promise.all([holidaysPromise, summoningDaysPromise, birthsignsPromise]);
    data[0].default.forEach((day) => holidays.value.set(day.date, new Holiday(day)));
    data[1].default.forEach((day) => summoningDays.value.set(day.date, new SummoningDay(day)));
    data[2].default.forEach((sign) => birthsigns.value.set(sign.month, sign));
  }

  return {
    holidays: unref(holidays),
    summoningDays: unref(summoningDays),
    birthsigns: unref(birthsigns),

    setFestivitiesData
  };
});
