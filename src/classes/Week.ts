import type { Dayjs } from "dayjs";
import { Day } from "@/classes/Day";
import { isCurrentDay, isCurrentWeek } from "@/helpers/date";

export class Week {
  date: Dayjs;
  days: Day[] = [];
  constructor(date: Dayjs) {
    this.date = date;
    let current = date.startOf("week");
    while (current <= date.endOf("week")) {
      if (current.isSame(date, "month")) {
        this.days.push(new Day(current));
      }
      current = current.add(1, "day");
    }
  }

  get index(): number {
    return this.date.week();
  }
  get year(): number {
    return this.date.year();
  }
  get isCurrent(): boolean {
    return isCurrentWeek(this.date);
  }

  get currentDay(): Day | null {
    return this.days.find((day) => isCurrentDay(day.date)) ?? null;
  }
}
