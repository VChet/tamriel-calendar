<template>
  <section class="year-view">
    <div v-for="year in years" :key="year.index" class="year">
      <h1 class="year__title">
        {{ year.index }}
      </h1>
      <ul class="year__months">
        <li v-for="month in year.months" :key="month.index" class="month">
          <h2 class="month__title" :class="{ 'month__title--current': month.isCurrent }">
            {{ month.monthName }}
          </h2>
          <ul class="month__days">
            <li v-for="day in month.days" :key="day.index" class="day" :style="day.styles">
              <calendar-day :day="day.date" small />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
</template>
<script setup lang="ts">
import { Year } from "@/classes/Year";
import { currentDay } from "@/helpers/date";
import CalendarDay from "@/components/CalendarDay.vue";

const current = currentDay();
const years = [new Year(current), new Year(current.add(1, "year"))];
</script>
<style lang="scss">
.year-view {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  .year {
    &__title {
      margin-bottom: 1.5rem;
      font-family: Literata, serif;
      font-size: 1.625rem;
      font-weight: 600;
    }
    &__months {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.25rem 1rem;
    }
    .month {
      &__title {
        margin-bottom: 0.5rem;
        font-family: Literata, serif;
        font-size: 0.75rem;
        font-weight: 500;
        &--current {
          color: var(--color-red);
        }
      }
      &__days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        place-items: center;
      }
    }
  }
}
</style>
