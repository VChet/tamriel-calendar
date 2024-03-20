import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import type { Festivity } from "@/types/festivity";

dayjs.extend(customParseFormat);

class FestivityBase implements Festivity {
  name: string;
  date: string;
  image: string;
  description: string;

  constructor(festivity: Festivity) {
    this.name = festivity.name;
    this.date = festivity.date;
    this.image = festivity.image;
    this.description = festivity.description;
  }

  get monthName(): string {
    return dayjs(this.date, "DD/MM").format("D MMMM");
  }
}

export class Holiday extends FestivityBase {}

export class SummoningDay extends FestivityBase {}
