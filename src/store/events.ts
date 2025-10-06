import { reactive } from "vue";
import { createGlobalState } from "@vueuse/core";
import { Holiday, SummoningDay } from "@/classes/Event";
import type { BaseEntry, DataEntry, NestedEntry, SingleEntry } from "@/types/event";

export const useEventsStore = createGlobalState(() => {
  const holidays = reactive<Map<Holiday["date"], Holiday>>(new Map());
  const summoningDays = reactive<Map<SummoningDay["date"], SummoningDay>>(new Map());
  const constellations = reactive<Map<DataEntry["date"], DataEntry>>(new Map());

  async function setEventsData(locale: string): Promise<void> {
    const [
      holidaysData,
      holidaysImages,
      summoningDaysData,
      summoningDaysImages,
      constellationsData,
      constellationsImages
    ] = await Promise.all([
      import(`@/constants/strings/${locale}_holidays.json`).then((module) => module.default as NestedEntry<BaseEntry>),
      import("@/constants/mappings/holiday_images.json").then((module) => module.default as NestedEntry<string>),

      import(`@/constants/strings/${locale}_summoningDays.json`).then((module) => module.default as NestedEntry<BaseEntry>),
      import("@/constants/mappings/summoningDay_images.json").then((module) => module.default as NestedEntry<string>),

      import(`@/constants/strings/${locale}_constellations.json`).then((module) => module.default as SingleEntry<BaseEntry>),
      import("@/constants/mappings/constellation_images.json").then((module) => module.default as SingleEntry<string>)
    ]);

    for (const month in holidaysData) {
      for (const day in holidaysData[month]) {
        const payload: DataEntry = {
          ...holidaysData[month][day],
          date: `${month}/${day}`,
          image: holidaysImages[month]?.[day]
        };
        holidays.set(payload.date, new Holiday(payload));
      }
    }
    for (const month in summoningDaysData) {
      for (const day in summoningDaysData[month]) {
        const payload: DataEntry = {
          ...summoningDaysData[month][day],
          date: `${month}/${day}`,
          image: summoningDaysImages[month]?.[day]
        };
        summoningDays.set(payload.date, new SummoningDay(payload));
      }
    }
    for (const month in constellationsData) {
      const payload: DataEntry = {
        ...constellationsData[month],
        date: month,
        image: constellationsImages[month]
      };
      constellations.set(payload.date, payload);
    }
  }

  return {
    holidays,
    summoningDays,
    constellations,

    setEventsData
  };
});
