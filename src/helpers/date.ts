import dayjs, { type Dayjs, type WeekdayNames } from "dayjs";
import isToday from "dayjs/plugin/isToday";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import localeData from "dayjs/plugin/localeData";
import type { DataEntry } from "@/types/event";

dayjs.extend(isToday);
dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.extend(weekOfYear);
dayjs.extend(localeData);

export const currentDay = (): Dayjs => dayjs();
// Use function to reload locale
export const weekdaysShort = (): WeekdayNames => dayjs.weekdaysShort(true);

export function isValidDate(value: string): boolean {
  return dayjs(value).isValid();
}

export function isValidMonthIndex(value: string, format = "MM"): boolean {
  return dayjs(value, format, true).isValid();
}

export function isCurrentDay(value: Dayjs): boolean {
  return value.isToday();
}
export function isCurrentWeek(value: Dayjs): boolean {
  return value.isSame(currentDay(), "week");
}
export function isCurrentMonth(value: Dayjs): boolean {
  return value.isSame(currentDay(), "month");
}
export function isCurrentYear(value: Dayjs): boolean {
  return value.isSame(currentDay(), "year");
}

export function composeMonthDayFromDataEntry(value: DataEntry["date"]): string {
  return dayjs(value, "MM/DD").format("D MMMM");
}
export function composeMonthNameFromDataEntry(value: DataEntry["date"]): string {
  return dayjs(value, "MM").format("MMMM");
}
export function composeDataEntryDate(value: Dayjs): string {
  return value.format("MM/DD");
}
export function composeCommitDate(value: string): string {
  return dayjs(value).locale("en").format("YYYY, MMM DD");
}

export function composeWeekdayName(value: Dayjs): string {
  return value.format("dddd");
}
export function composeDayName(value: Dayjs): string {
  return value.format("D");
}
export function composeMonthName(value: Dayjs): string {
  return value.format("MMMM");
}
export function composeYearName(value: Dayjs): string {
  return value.format("YYYY");
}
