<template>
  <section>
    <calendar-weekdays />
    <ul v-if="week" class="days">
      <li v-for="day in week.days" :key="day.index" :style="day.styles">
        <calendar-day
          v-wave
          :day="day.date"
          :active="selectedDay?.dayName === day.dayName"
          :event="day.hasEvent"
          @click="selectedDay = day"
        />
      </li>
    </ul>
    <div v-if="selectedDay" class="current-day">
      <div class="current-day__day">
        {{ selectedDay.dayName }}
      </div>
      <div class="current-day__month">
        {{ selectedDay.monthName }}
      </div>
      <div class="current-day__weekday">
        {{ selectedDay.weekdayName }}
      </div>
      <section v-if="selectedDay.hasEvent" class="current-day__events">
        <div v-if="selectedDay.holiday">
          <div class="current-day__events-title">
            {{ $t("calendarPage.events") }}
          </div>
          <event-card :event="selectedDay.holiday" />
        </div>
        <div v-if="selectedDay.summoningDay">
          <div class="current-day__events-title">
            {{ $t("calendarPage.summoningDays") }}
          </div>
          <event-card :event="selectedDay.summoningDay" />
        </div>
      </section>
    </div>
  </section>
</template>
<script setup lang="ts">
import { onBeforeMount, reactive } from "vue";
import CalendarDay from "@/components/CalendarDay.vue";
import CalendarWeekdays from "@/components/CalendarWeekdays.vue";
import EventCard from "@/components/EventCard.vue";
import { Week } from "@/classes/Week";
import { useSettingsStore } from "@/store/settings";
import { currentDay } from "@/helpers/date";

const { selectedDay } = useSettingsStore();

const week = reactive(new Week(currentDay()));
function setCurrentDay(): void {
  selectedDay.value = week.currentDay;
}
function updateCurrentDay() {
  const currentDay = week.days.find(({ date }) => date.isSame(selectedDay.value!.date))!;
  selectedDay.value = currentDay;
}
onBeforeMount(() => { selectedDay.value ? updateCurrentDay() : setCurrentDay(); });
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
        color: var(--color-red);
      }
    }
  }
}
.current-day {
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
      color: var(--color-red);
    }
  }
}
</style>
