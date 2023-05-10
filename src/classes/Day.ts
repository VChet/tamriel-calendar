import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import { type CSSProperties } from "vue";

dayjs.extend(weekday);

export class Day {
  value: dayjs.Dayjs;
  constructor(day: dayjs.Dayjs) {
    this.value = day;
  }

  get isCurrent() {
    return dayjs().isSame(this.value, "day");
  }

  get styles(): CSSProperties {
    const weekdayOffset = this.value.weekday() + 1;
    return {
      gridColumnStart: weekdayOffset > 1 ? weekdayOffset : "auto"
    };
  }
}
