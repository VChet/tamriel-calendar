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
    <day-data v-if="selectedDay" :selected-day />
  </section>
</template>
<script setup lang="ts">
import { onBeforeMount, reactive } from "vue";
import { Week } from "@/classes/Week";
import { currentDay } from "@/helpers/date";
import { useSettingsStore } from "@/store/settings";
import CalendarDay from "@/components/CalendarDay.vue";
import CalendarWeekdays from "@/components/CalendarWeekdays.vue";
import DayData from "@/components/DayData.vue";

const { selectedDay } = useSettingsStore();

const week = reactive(new Week(currentDay()));
function setCurrentDay(): void {
  selectedDay.value = week.currentDay;
}
function updateCurrentDay(): void {
  const weekCurrentDay = week.days.find(({ date }) => date.isSame(selectedDay.value!.date))!;
  selectedDay.value = weekCurrentDay;
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
</style>
