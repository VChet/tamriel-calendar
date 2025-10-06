import constellationImagesJSON from "../constants/mappings/constellation_images.json" with { type: "json" };
import holidayImagesJSON from "../constants/mappings/holiday_images.json" with { type: "json" };
import summoningDaysImagesJSON from "../constants/mappings/summoningDay_images.json" with { type: "json" };
import constellationsJSON from "../constants/strings/en_constellations.json" with { type: "json" };
import holidaysJSON from "../constants/strings/en_holidays.json" with { type: "json" };
import summoningDaysJSON from "../constants/strings/en_summoningDays.json" with { type: "json" };
import type { BaseEntry, NestedEntry, SingleEntry } from "@/types/event";

function isObject<T>(value: unknown): value is Record<string, T> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function findItemsWithoutImages(
  data: NestedEntry<BaseEntry> | SingleEntry<BaseEntry>,
  images: NestedEntry<string> | SingleEntry<string>
): BaseEntry[] {
  const result: BaseEntry[] = [];

  for (const [month, monthData] of Object.entries(data)) {
    const monthImages = images[month];

    if (isObject<BaseEntry>(monthData) && !monthData.name) {
      const daysImages = isObject<string>(monthImages) ? monthImages : {};
      for (const [day, dayData] of Object.entries(monthData)) {
        if (!daysImages[day]) { result.push(dayData); }
      }
    } else if (!images[month]) {
      result.push(monthData);
    }
  }
  return result;
}

const DATASETS = [
  { data: holidaysJSON, images: holidayImagesJSON, label: "Holidays" },
  { data: summoningDaysJSON, images: summoningDaysImagesJSON, label: "Summoning days" },
  { data: constellationsJSON, images: constellationImagesJSON, label: "Constellations" }
];

for (const { data, images, label } of DATASETS) {
  const missing = findItemsWithoutImages(data, images);
  if (missing.length) console.info(`${label} without image mappings:`, missing);
}
