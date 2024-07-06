import type { Dayjs } from "dayjs";
import { Month } from "@/classes/Month";
import { isCurrentYear } from "@/helpers/date";

export class Year {
  date: Dayjs;
  months: Month[] = [];
  constructor(date: Dayjs) {
    this.date = date;
    this.months = [];
    let current = date.startOf("year");
    while (current <= date.endOf("year")) {
      this.months.push(new Month(current));
      current = current.add(1, "month");
    }
  }

  get index(): number {
    return this.date.year();
  }
  get isCurrent(): boolean {
    return isCurrentYear(this.date);
  }
}
