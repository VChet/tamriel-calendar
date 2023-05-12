<template>
  <section class="year-view">
    <div v-for="year in years" :key="year.value" class="year">
      <h1 class="year__title">{{ year.value }}</h1>
      <ul class="year__months">
        <li v-for="month in year.months" :key="month.value" class="month">
          <h2 class="month__title" :class="{ 'month__title--current': month.isCurrent }">
            {{ dayjs().month(month.value).format("MMMM") }}
          </h2>
          <ul class="month__days">
            <li v-for="(day, dayIndex) in month.days" :key="dayIndex" class="day" :style="day.styles">
              <CalendarDay :day="day.value" small />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import CalendarDay from "@/components/CalendarDay.vue";
import { Year } from "@/classes/Year";

const current = dayjs();
const years = [new Year(current), new Year(current.add(1, "year"))];
</script>

<style lang="scss">
.year-view {
  display: flex;
  flex-direction: column;
  gap: 30px;
  .year {
    &__title {
      margin-bottom: 30px;
      font-size: 24px;
      font-weight: bold;
    }
    &__months {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px 15px;
    }
    .month {
      &__title {
        margin-bottom: 12px;
        font-size: 12px;
        font-weight: bold;
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
