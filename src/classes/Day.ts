import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import { type CSSProperties } from "vue";
import { type Festivity } from "@/types/festivity";
import { useFestivitiesStore } from "@/store/festivities";

const { holidays, summoningDays } = useFestivitiesStore();

dayjs.extend(weekday);

export class Day {
  value: dayjs.Dayjs;
  holiday: Festivity | null;
  summoningDay: Festivity | null;
  constructor(day: dayjs.Dayjs) {
    this.value = day;
    this.holiday = holidays.get(day.format("DD/MM"));
    this.summoningDay = summoningDays.get(day.format("DD/MM"));
  }

  get isCurrent() {
    return dayjs().isSame(this.value, "day");
  }
  get hasFestivity() {
    return !!this.holiday || !!this.summoningDay;
  }

  get styles(): CSSProperties {
    const weekdayOffset = this.value.weekday() + 1;
    return {
      gridColumnStart: weekdayOffset > 1 ? weekdayOffset : "auto"
    };
  }
}
