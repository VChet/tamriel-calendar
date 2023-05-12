<template>
  <section>
    <CalendarWeekdays />
    <ul v-if="week" class="days">
      <li v-for="(day, index) in week.days" :key="index">
        <CalendarDay
          :day="day.value"
          :active="dayjs(day.value).isSame(selectedDay, 'day')"
          @click="selectedDay = day.value"
        />
      </li>
    </ul>
    <div v-if="selectedDay" class="current-day">
      <div class="current-day__day">{{ selectedDay.format("D") }}</div>
      <div class="current-day__month">{{ selectedDay.format("MMMM") }}</div>
      <div class="current-day__weekday">{{ selectedDay.format("dddd") }}</div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import dayjs from "dayjs";
import { Week } from "@/classes/Week";
import CalendarDay from "@/components/CalendarDay.vue";
import CalendarWeekdays from "@/components/CalendarWeekdays.vue";

const week = ref(new Week(dayjs()));
const selectedDay = ref(dayjs());
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
  gap: 15px;
  align-items: center;
  margin-top: 35px;
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
