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
          <CalendarDay :day="day.value" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import CalendarDay from "@/components/CalendarDay.vue";
import CalendarWeekdays from "@/components/CalendarWeekdays.vue";
import { Month } from "@/classes/Month";
import dayjs from "dayjs";

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
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      div {
        font-size: 20px;
        font-weight: bold;
      }
    }
    &__days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      text-align: center;
    }
  }
}
</style>
