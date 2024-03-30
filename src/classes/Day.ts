import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import type { CSSProperties } from "vue";
import { useEventsStore } from "@/store/events";
import type { Holiday, SummoningDay } from "@/classes/Event";

const { holidays, summoningDays } = useEventsStore();

dayjs.extend(weekday);

export class Day {
  value: dayjs.Dayjs;
  constructor(day: dayjs.Dayjs) {
    this.value = day;
  }

  get holiday(): Holiday | null {
    return holidays.get(this.value.format("MM/DD")) ?? null;
  }

  get summoningDay(): SummoningDay | null {
    return summoningDays.get(this.value.format("MM/DD")) ?? null;
  }

  get isCurrent(): boolean {
    return dayjs().isSame(this.value, "day");
  }

  get hasEvent(): boolean {
    return !!this.holiday || !!this.summoningDay;
  }

  get dayName(): string {
    return this.value.format("D");
  }

  get monthName(): string {
    return this.value.format("MMMM");
  }

  get weekdayName(): string {
    return this.value.format("dddd");
  }

  get styles(): CSSProperties {
    const weekdayOffset = this.value.weekday() + 1;
    return {
      gridColumnStart: weekdayOffset > 1 ? weekdayOffset : "auto"
    };
  }
}
