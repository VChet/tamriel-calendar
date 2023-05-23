<template>
  <section>
    <CalendarWeekdays />
    <ul v-if="week" class="days">
      <li v-for="(day, index) in week.days" :key="index">
        <CalendarDay
          :day="day.value"
          :active="selectedDay?.dayName === day.dayName"
          :festivity="day.hasFestivity"
          @click="selectedDay = day"
        />
      </li>
    </ul>
    <div v-if="selectedDay" class="current-day">
      <div class="current-day__day">{{ selectedDay.dayName }}</div>
      <div class="current-day__month">{{ selectedDay.monthName }}</div>
      <div class="current-day__weekday">{{ selectedDay.weekdayName }}</div>
      <section v-if="selectedDay.hasFestivity" class="current-day__festivities">
        <div v-if="selectedDay.holiday" class="current-day__festivities">
          <div class="current-day__festivities-title">{{ $t("calendarPage.festivities") }}</div>
          <FestivityCard :festivity="selectedDay.holiday" />
        </div>
        <div v-if="selectedDay.summoningDay" class="current-day__festivities">
          <div class="current-day__festivities-title">{{ $t("calendarPage.summoningDays") }}</div>
          <FestivityCard :festivity="selectedDay.summoningDay" />
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import dayjs from "dayjs";
import CalendarDay from "@/components/CalendarDay.vue";
import CalendarWeekdays from "@/components/CalendarWeekdays.vue";
import FestivityCard from "@/components/FestivityCard.vue";
import { Week } from "@/classes/Week";
import { useSettingsStore } from "@/store/settings";

const { selectedDay } = useSettingsStore();

const week = ref(new Week(dayjs()));
if (!selectedDay.value) {
  selectedDay.value = week.value.currentDay;
} else if (!week.value.days.find((day) => day.weekdayName === selectedDay.value?.weekdayName)) {
  const dayOfWeek = week.value.days.find((day) => dayjs(day.value).isSame(selectedDay.value?.value));
  selectedDay.value = dayOfWeek ?? week.value.currentDay;
}
</script>
<style lang="scss" scoped>
.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 16px;
  text-align: center;
  .calendar-day {
    cursor: pointer;
    &:hover:not(&--current) {
      color: var(--color-highlight);
    }
  }
}
.current-day {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  &__day {
    margin-bottom: 26px;
    font-size: 70px;
    font-weight: bold;
  }
  &__month {
    margin-bottom: 16px;
    font-size: 26px;
    font-weight: bold;
  }
  &__weekday {
    font-size: 16px;
    color: #a49d8b;
    text-transform: capitalize;
  }
  &__festivities {
    margin-top: 30px;
    &-title {
      margin-bottom: 8px;
      font-weight: bold;
      color: #d21a02;
    }
  }
}
</style>
