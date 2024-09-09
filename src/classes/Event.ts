import { composeMonthDayFromDataEntry } from "@/helpers/date";
import type { DataEntry } from "@/types/event";

class EventBase implements DataEntry {
  event: DataEntry;

  constructor(event: DataEntry) {
    this.event = event;
  }

  get name(): DataEntry["name"] {
    return this.event.name;
  }
  get description(): DataEntry["description"] {
    return this.event.description;
  }
  get date(): DataEntry["date"] {
    return this.event.date;
  }
  get image(): DataEntry["image"] {
    return this.event.image;
  }

  get monthName(): string {
    return composeMonthDayFromDataEntry(this.date);
  }
}

export class Holiday extends EventBase {}
export class SummoningDay extends EventBase {}
