import { createGlobalState } from "@vueuse/core";
import { ref, unref } from "vue";
import { Birthsign } from "@/types/festivity";
import { settings } from "@/store/settings";
import { Holiday, SummoningDay } from "@/classes/Festivity";

export const useFestivitiesStore = createGlobalState(() => {
  const holidays = ref<Map<string, Holiday>>(new Map());
  const summoningDays = ref<Map<string, SummoningDay>>(new Map());
  const birthsigns = ref<Map<string, Birthsign>>(new Map());

  setFestivitiesData(settings.value.locale);

  async function setFestivitiesData(locale: string) {
    const holidaysPromise = import(`@/assets/holidays.json`);
    const summoningDaysPromise = import(`@/assets/summoningDays.json`);
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
