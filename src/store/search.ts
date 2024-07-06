import { createGlobalState, useDebounceFn } from "@vueuse/core";
import { ref, watch } from "vue";
import { useEventsStore } from "./events";
import type { Holiday, SummoningDay } from "@/classes/Event";
import type { BaseEntry } from "@/types/event";

export const useSearchStore = createGlobalState(() => {
  const holidaysEntries = ref<(Holiday | SummoningDay)[]>([]);
  const summoningDaysEntries = ref<(Holiday | SummoningDay)[]>([]);
  const searchQuery = ref<string>("");
  const debouncedSearch = useDebounceFn(search, 300);
  watch(searchQuery, debouncedSearch);

  const { holidays, summoningDays } = useEventsStore();

  function search(): void {
    holidaysEntries.value = [];
    summoningDaysEntries.value = [];
    if (!searchQuery.value) { return; }
    const queryRegex = new RegExp(searchQuery.value, "i");
    const searchEntry = ({ name, description }: BaseEntry): boolean => queryRegex.test(name) || queryRegex.test(description);
    holidaysEntries.value = [...holidays.values()].filter(searchEntry);
    summoningDaysEntries.value = [...summoningDays.values()].filter(searchEntry);
  }

  return {
    searchQuery,
    holidaysEntries,
    summoningDaysEntries
  };
});
