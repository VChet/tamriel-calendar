import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import type { DataEntry } from "@/types/event";

dayjs.extend(customParseFormat);

class EventBase implements DataEntry {
  name: string;
  description: string;
  date: string;
  image?: string;

  constructor(event: DataEntry) {
    this.name = event.name;
    this.description = event.description;
    this.date = event.date;
    this.image = event.image;
  }

  get monthName(): string {
    return dayjs(this.date, "MM/DD").format("D MMMM");
  }
}

export class Holiday extends EventBase {}
export class SummoningDay extends EventBase {}
