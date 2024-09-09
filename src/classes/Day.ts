import type { CSSProperties } from "vue";
import type { Dayjs } from "dayjs";
import {
  composeDataEntryDate,
  composeDayName,
  composeMonthName,
  composeWeekdayName,
  isCurrentDay
} from "@/helpers/date";
import { useEventsStore } from "@/store/events";
import type { Holiday, SummoningDay } from "@/classes/Event";

const { holidays, summoningDays } = useEventsStore();

export class Day {
  date: Dayjs;
  constructor(date: Dayjs) {
    this.date = date;
  }

  get index(): number {
    return this.date.date();
  }

  get holiday(): Holiday | null {
    return holidays.get(composeDataEntryDate(this.date)) ?? null;
  }
  get summoningDay(): SummoningDay | null {
    return summoningDays.get(composeDataEntryDate(this.date)) ?? null;
  }

  get hasEvent(): boolean {
    return !!this.holiday || !!this.summoningDay;
  }

  get isCurrent(): boolean {
    return isCurrentDay(this.date);
  }

  get dayName(): string {
    return composeDayName(this.date);
  }
  get monthName(): string {
    return composeMonthName(this.date);
  }
  get weekdayName(): string {
    return composeWeekdayName(this.date);
  }

  get styles(): Pick<CSSProperties, "gridColumnStart"> {
    const weekdayOffset = this.date.weekday() + 1;
    return {
      gridColumnStart: weekdayOffset > 1 ? weekdayOffset : "auto"
    };
  }
}
