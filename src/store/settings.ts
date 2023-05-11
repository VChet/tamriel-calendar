import { locale } from "dayjs";
import { defineStore } from "pinia";
import tamrielEn from "@/assets/tamriel-en";
import tamrielRu from "@/assets/tamriel-ru";

interface SettingsStore {
  dayjsLocale: "tamriel-en" | "tamriel-ru";
}

export const useSettingsStore = defineStore("settings", {
  state: (): SettingsStore => ({
    dayjsLocale: locale() as SettingsStore["dayjsLocale"]
  }),
  getters: {
    localeData: (state) => {
      switch (state.dayjsLocale) {
        case "tamriel-en":
          return tamrielEn;
        case "tamriel-ru":
          return tamrielRu;
      }
    }
  },
  actions: {
    setLocale(value: SettingsStore["dayjsLocale"]) {
      this.dayjsLocale = value;
      locale(this.localeData);
    }
  }
});
