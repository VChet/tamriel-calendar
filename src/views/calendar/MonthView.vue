<template>
  <section class="month-view">
    <div v-for="month in months" :key="month.value" class="month">
      <div class="month__title">
        <div>{{ dayjs().month(month.value).format("MMMM") }}</div>
        <div>{{ dayjs().month(month.value).format("YYYY") }}</div>
      </div>
      <CalendarWeekdays />
      <ul class="month__days">
        <li v-for="(day, index) in month.days" :key="index" :style="day.styles">
          <CalendarDay :day="day.value" :festivity="day.hasFestivity" />
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

const current = dayjs();
const months = new Array(6).fill(0).map((_, index) => new Month(current.add(index, "month")));
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
      text-align: center;
    }
  }
}
</style>
