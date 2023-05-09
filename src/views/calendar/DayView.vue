<template>
  <section>
    <CalendarWeekdays />
    <ul class="days">
      <li v-for="(day, index) in days" :key="index">
        <CalendarDay :day="day" />
      </li>
    </ul>
    <div class="current-day">
      <div class="current-day__day">{{ currentDay.format("D") }}</div>
      <div class="current-day__month">{{ currentDay.format("MMMM") }}</div>
      <div class="current-day__weekday">{{ currentDay.format("dddd") }}</div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import dayjs from "dayjs";
import CalendarDay from "@/components/CalendarDay.vue";
import CalendarWeekdays from "@/components/CalendarWeekdays.vue";

const currentDay = dayjs();

const week = ref(currentDay.startOf("week"));
const days = computed(() => {
  const arr = [];
  for (let i = 0; i < 7; i++) {
    arr.push(week.value.add(i, "day"));
  }
  return arr;
});
</script>
<style lang="scss" scoped>
.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
}
.current-day {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 35px;
  gap: 15px;
  &__day {
    font-size: 36px;
    font-weight: bold;
  }
  &__month {
    font-size: 30px;
    font-weight: bold;
  }
  &__weekday {
    color: #a49d8b;
    text-transform: capitalize;
  }
}
</style>
