<template>
  <section class="month-view">
    <div v-for="month in months" :key="month.value" class="month">
      <div class="month__title">
        <div>{{ month.monthName }}</div>
        <div>{{ month.yearName }}</div>
      </div>
      <CalendarWeekdays />
      <ul class="month__days">
        <li v-for="(day, index) in month.days" :key="index" :style="day.styles">
          <RouterLink v-if="day.hasFestivity" :to="festivityLink(day)">
            <CalendarDay :day="day.value" :festivity="day.hasFestivity" />
          </RouterLink>
          <CalendarDay v-else :day="day.value" />
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
import { Day } from "@/classes/Day";

const current = dayjs();
const months = new Array(6).fill(0).map((_, index) => new Month(current.add(index, "month")));

function festivityLink(day: Day) {
  if (day.holiday) {
    return { name: "Festivity", query: { type: "holiday", date: day.holiday.date } };
  } else if (day.summoningDay) {
    return { name: "Festivity", query: { type: "summoningDay", date: day.summoningDay.date } };
  } else {
    return {};
  }
}
</script>
<style lang="scss">
.month-view {
  display: flex;
  flex-direction: column;
  gap: 30px;
  .month {
    &__title {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 15px;
      div {
        font-size: 18px;
        font-weight: bold;
      }
    }
    &__days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 16px;
      place-items: center;
    }
  }
}
</style>
