import dayjs from "dayjs";
import { Week } from "@/classes/Week";
import { Day } from "@/classes/Day";

export class Month {
  value: number;
  year: number;
  weeks: Week[] = [];
  constructor(date: dayjs.Dayjs) {
    this.value = date.month();
    this.year = date.year();
    let current = date.startOf("month");
    while (current <= date.endOf("month")) {
      this.weeks.push(new Week(current));
      current = current.add(1, "week");
    }
  }

  get isCurrent() {
    return dayjs().isSame(dayjs().year(this.year).month(this.value), "month");
  }

  get days(): Day[] {
    return this.weeks.flatMap((week) => week.days);
  }
}
