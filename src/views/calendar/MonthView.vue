<template>
  <section class="month-view">
    <div v-for="month in months" :key="month.value" class="month">
      <div class="month__title">
        <div>{{ month.monthName }}</div>
        <div>{{ month.yearName }}</div>
      </div>
      <calendar-weekdays />
      <ul class="month__days">
        <li v-for="(day, index) in month.days" :key="index" :style="day.styles">
          <RouterLink v-if="day.hasFestivity" :to="festivityLink(day)">
            <calendar-day :day="day.value" :festivity="day.hasFestivity" />
          </RouterLink>
          <calendar-day v-else :day="day.value" />
        </li>
      </ul>
    </div>
  </section>
</template>
<script setup lang="ts">
import dayjs from "dayjs";
import CalendarDay from "@/components/CalendarDay.vue";
import CalendarWeekdays from "@/components/CalendarWeekdays.vue";
import { Month } from "@/classes/Month";
import type { Day } from "@/classes/Day";

const current = dayjs();
const months = Array.from({ length: 6 }).fill(0).map((_, index) => new Month(current.add(index, "month")));

function festivityLink(day: Day) {
  if (day.holiday) {
    return { name: "Holiday", query: { date: day.holiday.date } };
  } else if (day.summoningDay) {
    return { name: "SummoningDay", query: { date: day.summoningDay.date } };
  } else {
    return {};
  }
}
</script>
<style lang="scss">
.month-view {
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
  .month {
    &__title {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 1.875rem;
      div {
        font-family: Literata, serif;
        font-size: 1.125rem;
        font-weight: 600;
      }
    }
    &__days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 1rem;
      place-items: center;
      .calendar-day--festivity {
        cursor: pointer;
        @media (hover: hover) {
          &:hover:not(.calendar-day--current) {
            color: var(--color-red);
          }
        }
      }
    }
  }
}
</style>
