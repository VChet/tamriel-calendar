import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import type { DataEntry } from "@/types/festivity";

dayjs.extend(customParseFormat);

class FestivityBase implements DataEntry {
  name: string;
  date: string;
  image: string;
  description: string;

  constructor(festivity: DataEntry) {
    this.name = festivity.name;
    this.date = festivity.date;
    this.image = festivity.image;
    this.description = festivity.description;
  }

  get monthName(): string {
    return dayjs(this.date, "MM/DD").format("D MMMM");
  }
}

export class Holiday extends FestivityBase {}
export class SummoningDay extends FestivityBase {}
