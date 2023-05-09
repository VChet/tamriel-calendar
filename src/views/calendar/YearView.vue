<template>
  <section class="year-view">
    <div v-for="[year, data] in Object.entries(grouped)" :key="year" class="year">
      <h1 class="year__title">{{ year }}</h1>
      <ul class="year__months">
        <li v-for="(month, index) in data" :key="index" class="month">
          <h2
            class="month__title"
            :class="{ 'month__title--current': dayjs().isSame(dayjs().year(Number(year)).month(index), 'month') }"
          >
            {{ dayjs().month(index).format("MMMM") }}
          </h2>
          <ul class="month__days">
            <li v-for="(day, dayIndex) in month" :key="dayIndex" class="day" :style="dayStyle(day)">
              <CalendarDay :day="day" small />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useCalendarStore } from "@/store/calendar";
import dayjs from "dayjs";
import { storeToRefs } from "pinia";
import weekday from "dayjs/plugin/weekday";
import CalendarDay from "@/components/CalendarDay.vue";
dayjs.extend(weekday);

const store = useCalendarStore();
const { grouped } = storeToRefs(store);

const dayStyle = (day: dayjs.Dayjs) => {
  const gridColumn = day.weekday() + 2;
  return {
    gridColumnStart: gridColumn > 1 ? gridColumn - 1 : "auto"
  };
};
</script>

<style lang="scss">
.year-view {
  display: flex;
  flex-direction: column;
  gap: 30px;
  .year {
    &__title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 30px;
    }
    &__months {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px 15px;
    }
    .month {
      &__title {
        font-size: 12px;
        font-weight: bold;
        margin-bottom: 12px;
        &--current {
          color: var(--color-highlight);
        }
      }
      &__days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
      }
    }
  }
}
</style>
