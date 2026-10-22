import { reactive } from "vue";
import { createGlobalState } from "@vueuse/core";
import { Holiday, SummoningDay } from "@/classes/Event";
import constellationImages from "@/constants/mappings/constellation_images.json";
import holidayImages from "@/constants/mappings/holiday_images.json";
import summoningDaysImages from "@/constants/mappings/summoningDay_images.json";
import enConstellations from "@/constants/strings/en_constellations.json";
import enHolidays from "@/constants/strings/en_holidays.json";
import enSummoningDays from "@/constants/strings/en_summoningDays.json";
import ruConstellations from "@/constants/strings/ru_constellations.json";
import ruHolidays from "@/constants/strings/ru_holidays.json";
import ruSummoningDays from "@/constants/strings/ru_summoningDays.json";
import { composeSlug } from "@/helpers/router";
import type { BaseEntry, DataEntry, NestedEntry, SingleEntry } from "@/types/event";

type LocaleCode = "en" | "ru";

const HOLIDAYS: Record<LocaleCode, NestedEntry<BaseEntry>> = {
  en: enHolidays,
  ru: ruHolidays
};
const SUMMONING_DAYS: Record<LocaleCode, NestedEntry<BaseEntry>> = {
  en: enSummoningDays,
  ru: ruSummoningDays
};
const CONSTELLATIONS: Record<LocaleCode, SingleEntry<BaseEntry>> = {
  en: enConstellations,
  ru: ruConstellations
};
const HOLIDAY_IMAGES: NestedEntry<string> = holidayImages;
const SUMMONING_DAY_IMAGES: NestedEntry<string> = summoningDaysImages;
const CONSTELLATION_IMAGES: SingleEntry<string> = constellationImages;

function getEnglishName(entry: BaseEntry | undefined, date: string): string {
  if (!entry) throw new Error(`Missing English name for entry on ${date}`);
  return entry.name;
}

export const useEventsStore = createGlobalState(() => {
  const holidays = reactive<Map<Holiday["date"], Holiday>>(new Map());
  const summoningDays = reactive<Map<SummoningDay["date"], SummoningDay>>(new Map());
  const constellations = reactive<Map<DataEntry["date"], DataEntry>>(new Map());

  function setEventsData(locale: LocaleCode): void {
    const holidaysData = HOLIDAYS[locale];
    const summoningDaysData = SUMMONING_DAYS[locale];
    const constellationsData = CONSTELLATIONS[locale];

    holidays.clear();
    summoningDays.clear();
    constellations.clear();

    for (const month in holidaysData) {
      for (const day in holidaysData[month]) {
        const payload: DataEntry = {
          ...holidaysData[month][day],
          slug: composeSlug(getEnglishName(HOLIDAYS.en[month]?.[day], `${month}/${day}`)),
          date: `${month}/${day}`,
          image: HOLIDAY_IMAGES[month]?.[day]
        };
        holidays.set(payload.date, new Holiday(payload));
      }
    }
    for (const month in summoningDaysData) {
      for (const day in summoningDaysData[month]) {
        const payload: DataEntry = {
          ...summoningDaysData[month][day],
          slug: composeSlug(getEnglishName(SUMMONING_DAYS.en[month]?.[day], `${month}/${day}`)),
          date: `${month}/${day}`,
          image: SUMMONING_DAY_IMAGES[month]?.[day]
        };
        summoningDays.set(payload.date, new SummoningDay(payload));
      }
    }
    for (const month in constellationsData) {
      const payload: DataEntry = {
        ...constellationsData[month],
        slug: composeSlug(getEnglishName(CONSTELLATIONS.en[month], month)),
        date: month,
        image: CONSTELLATION_IMAGES[month]
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
