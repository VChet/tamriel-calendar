import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import isToday from "dayjs/plugin/isToday";
import { Day } from "@/classes/Day";

dayjs.extend(weekOfYear);
dayjs.extend(isToday);

export class Week {
  value: number;
  year: number;
  days: Day[] = [];
  constructor(date: dayjs.Dayjs) {
    this.value = date.week();
    this.year = date.year();
    let current = date.startOf("week");
    while (current <= date.endOf("week")) {
      if (current.isSame(date, "month")) {
        this.days.push(new Day(current));
      }
      current = current.add(1, "day");
    }
  }

  get isCurrent(): boolean {
    return dayjs().isSame(dayjs().year(this.year).week(this.value), "week");
  }

  get currentDay(): Day | null {
    return this.days.find((day) => dayjs(day.value).isToday()) ?? null;
  }
}
