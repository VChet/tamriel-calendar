<template>
  <section>
    <calendar-weekdays />
    <ul v-if="week" class="days">
      <li v-for="(day, index) in week.days" :key="index" :style="day.styles">
        <calendar-day
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
        <div v-if="selectedDay.holiday">
          <div class="current-day__festivities-title">{{ $t("calendarPage.festivities") }}</div>
          <festivity-card :festivity="selectedDay.holiday" />
        </div>
        <div v-if="selectedDay.summoningDay">
          <div class="current-day__festivities-title">{{ $t("calendarPage.summoningDays") }}</div>
          <festivity-card :festivity="selectedDay.summoningDay" />
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import dayjs from "dayjs";
import CalendarDay from "@/components/CalendarDay.vue";
import CalendarWeekdays from "@/components/CalendarWeekdays.vue";
import FestivityCard from "@/components/FestivityCard.vue";
import { Week } from "@/classes/Week";
import { useSettingsStore } from "@/store/settings";

const { selectedDay } = useSettingsStore();

const week = reactive(new Week(dayjs()));
if (!selectedDay.value) {
  selectedDay.value = week.currentDay;
} else if (!week.days.find((day) => day.weekdayName === selectedDay.value?.weekdayName)) {
  const dayOfWeek = week.days.find((day) => dayjs(day.value).isSame(selectedDay.value?.value));
  selectedDay.value = dayOfWeek ?? week.currentDay;
}
</script>
<style lang="scss" scoped>
.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;
  place-items: center;
  .calendar-day {
    cursor: pointer;
    &:hover:not(&--current) {
      color: var(--color-red);
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
  &__festivities {
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
