import { createGlobalState } from "@vueuse/core";
import { reactive } from "vue";
import type { BaseEntry, DataEntry, NestedEntry, SingleEntry } from "@/types/event";
import { Holiday, SummoningDay } from "@/classes/Event";

export const useEventsStore = createGlobalState(() => {
  const holidays = reactive<Map<Holiday["date"], Holiday>>(new Map());
  const summoningDays = reactive<Map<SummoningDay["date"], SummoningDay>>(new Map());
  const birthsigns = reactive<Map<DataEntry["date"], DataEntry>>(new Map());

  async function setEventsData(locale: string): Promise<void> {
    const [
      holidaysData,
      holidaysImages,
      summoningDaysData,
      summoningDaysImages,
      birthsignsData,
      birthsignsImages
    ] = await Promise.all([
      import(`@/constants/strings/${locale}_holidays.json`).then((module) => module.default as NestedEntry<BaseEntry>),
      import("@/constants/mappings/holidays_images.json").then((module) => module.default as NestedEntry<string>),

      import(`@/constants/strings/${locale}_summoningDays.json`).then((module) => module.default as NestedEntry<BaseEntry>),
      import("@/constants/mappings/summoningDays_images.json").then((module) => module.default as NestedEntry<string>),

      import(`@/constants/strings/${locale}_birthsigns.json`).then((module) => module.default as SingleEntry<BaseEntry>),
      import("@/constants/mappings/birthsigns_images.json").then((module) => module.default as SingleEntry<string>)
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
    for (const month in birthsignsData) {
      const payload: DataEntry = {
        ...birthsignsData[month],
        date: month,
        image: birthsignsImages[month]
      };
      birthsigns.set(payload.date, payload);
    }
  }

  return {
    holidays,
    summoningDays,
    birthsigns,

    setEventsData
  };
});
