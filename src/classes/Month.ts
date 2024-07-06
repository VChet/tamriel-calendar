import type { Dayjs } from "dayjs";
import { Week } from "@/classes/Week";
import type { Day } from "@/classes/Day";
import { composeMonthName, composeYearName, isCurrentMonth } from "@/helpers/date";

export class Month {
  date: Dayjs;
  weeks: Week[] = [];
  constructor(date: Dayjs) {
    this.date = date;
    let current = date.startOf("month");
    while (current <= date.endOf("month")) {
      this.weeks.push(new Week(current));
      current = current.add(1, "week").startOf("week");
    }
  }

  get index(): number {
    return this.date.month();
  }
  get year(): number {
    return this.date.year();
  }
  get isCurrent(): boolean {
    return isCurrentMonth(this.date);
  }

  get monthName(): string {
    return composeMonthName(this.date);
  }
  get yearName(): string {
    return composeYearName(this.date);
  }

  get days(): Day[] {
    return this.weeks.flatMap((week) => week.days);
  }
}
