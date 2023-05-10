import dayjs from "dayjs";
import { Month } from "@/classes/Month";

export class Year {
  value: number;
  months: Month[] = [];
  constructor(date: dayjs.Dayjs) {
    this.value = date.year();
    this.months = [];
    let current = date.startOf("year");
    while (current <= date.endOf("year")) {
      this.months.push(new Month(current));
      current = current.add(1, "month");
    }
  }

  get isCurrent() {
    return dayjs().isSame(dayjs().year(this.value), "year");
  }
}
