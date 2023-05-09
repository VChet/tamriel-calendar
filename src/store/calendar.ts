import dayjs from "dayjs";
import { defineStore } from "pinia";

interface CalendarStore {
  calendar: dayjs.Dayjs[];
}

function getAllDaysBetween(start: dayjs.Dayjs, end: dayjs.Dayjs) {
  const days = [];
  let current = start.startOf("day");
  while (current <= end) {
    days.push(current);
    current = current.add(1, "day");
  }
  return days;
}

export const useCalendarStore = defineStore("calendar", {
  state: (): CalendarStore => ({
    calendar: getAllDaysBetween(dayjs().startOf("year"), dayjs().endOf("year"))
  }),
  getters: {
    grouped: (state) => {
      return state.calendar.reduce((acc, day) => {
        const year = day.year();
        const month = day.month();
        if (!acc[year]) {
          acc[year] = {};
        }
        if (!acc[year][month]) {
          acc[year][month] = [];
        }
        acc[year][month].push(day);
        return acc;
      }, {} as Record<number, Record<number, dayjs.Dayjs[]>>);
    }
  }
});
