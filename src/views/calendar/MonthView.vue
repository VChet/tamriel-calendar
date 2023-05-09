<template>
  <section>
    <div class="month">
      <div>{{ month.format("MMMM") }}</div>
      <div>{{ month.format("YYYY") }}</div>
    </div>
    <CalendarWeekdays />
    <ul class="days">
      <li v-for="(day, index) in days" :key="index">
        <CalendarDay :day="day" />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import CalendarDay from "@/components/CalendarDay.vue";
import CalendarWeekdays from "@/components/CalendarWeekdays.vue";
dayjs.extend(isToday);

const currentDay = dayjs();

const month = ref(currentDay.startOf("month"));
const daysInMonth = month.value.daysInMonth();
const days = computed(() => {
  const arr = [];
  const startOfWeek = month.value.startOf("week");
  for (let i = 0; i < daysInMonth; i++) {
    arr.push(startOfWeek.add(i, "day"));
  }
  return arr;
});
</script>
<style lang="scss" scoped>
.month {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  div {
    font-size: 20px;
    font-weight: bold;
  }
}
.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
}
</style>
