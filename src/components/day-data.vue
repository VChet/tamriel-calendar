<template>
  <div class="day-data">
    <div class="day-data__day">
      {{ selectedDay.dayName }}
    </div>
    <div class="day-data__month">
      {{ selectedDay.monthName }}
    </div>
    <div class="day-data__weekday">
      {{ selectedDay.weekdayName }}
    </div>
    <section v-if="selectedDay.hasEvent" class="day-data__events">
      <div v-if="selectedDay.holiday">
        <div class="day-data__events-title">
          {{ $t("calendarPage.events") }}
        </div>
        <event-card :event="selectedDay.holiday" />
      </div>
      <div v-if="selectedDay.summoningDay">
        <div class="day-data__events-title">
          {{ $t("calendarPage.summoningDays") }}
        </div>
        <event-card :event="selectedDay.summoningDay" />
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import type { Day } from "@/classes/Day";
import EventCard from "@/components/event-card.vue";

defineProps<{ selectedDay: Day }>();
</script>
<style lang="scss" scoped>
.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;
  place-items: center;
  .calendar-day {
    cursor: pointer;
    @media (hover: hover) {
      &:hover:not(&--current) {
        color: var(--color-accent);
      }
    }
  }
}
.day-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.5rem;
  &__day {
    font-family: Literata, serif;
    font-size: 5.625rem;
    font-weight: bold;
  }
  &__month {
    margin-bottom: 0.625rem;
    font-family: Literata, serif;
    font-size: 1.625rem;
    font-weight: 600;
  }
  &__weekday {
    font-weight: 500;
    color: #a49d8b;
    text-transform: capitalize;
  }
  &__events {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin-top: 2.25rem;
    &-title {
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-accent);
    }
  }
}
</style>
