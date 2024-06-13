<template>
  <main class="search-view">
    <common-header />
    <section class="container results">
      <div v-if="holidaysEntries.length" class="results__group">
        <div class="results__title">
          {{ $t("calendarPage.events") }}
        </div>
        <div class="results__list">
          <event-card v-for="holiday in holidaysEntries" :key="holiday.date" :event="holiday" />
        </div>
      </div>
      <div v-if="summoningDaysEntries.length" class="results__group">
        <div class="results__title">
          {{ $t("calendarPage.summoningDays") }}
        </div>
        <div class="results__list">
          <event-card v-for="summoningDay in summoningDaysEntries" :key="summoningDay.date" :event="summoningDay" />
        </div>
      </div>
    </section>
  </main>
</template>
<script setup lang="ts">
import CommonHeader from "../components/CommonHeader.vue";
import EventCard from "../components/EventCard.vue";
import { useSearchStore } from "@/store/search";

const { holidaysEntries, summoningDaysEntries } = useSearchStore();
</script>
<style lang="scss">
.search-view {
  .results {
    &__group {
      margin-bottom: 1rem;
    }
    &__title {
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-red);
    }
    &__list {
      display: flex;
      flex-direction: column;
      gap: .5rem;
    }
  }
}
</style>
