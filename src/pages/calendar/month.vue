<template>
  <section class="month-view">
    <button v-show="isPreviousMonthAvailable" v-wave class="month-view__previous" @click="prependMonth">
      {{ $t("calendarPage.previousMonth") }}
    </button>
    <transition-group name="fade">
      <div v-for="month in months" :key="month.index" class="month">
        <div class="month__title">
          <div>{{ month.monthName }}</div>
          <div>{{ month.yearName }}</div>
        </div>
        <calendar-weekdays />
        <ul class="month__days">
          <li v-for="day in month.days" :key="day.index" :style="day.styles">
            <router-link v-if="day.hasEvent" :to="composeEventLink(day)">
              <calendar-day :day="day.date" :event="day.hasEvent" />
            </router-link>
            <calendar-day v-else v-wave :day="day.date" />
          </li>
        </ul>
      </div>
    </transition-group>
  </section>
</template>
<script setup lang="ts">
import { computed, reactive } from "vue";
import { useInfiniteScroll } from "@vueuse/core";
import type { RouterLinkProps } from "vue-router";
import type { Dayjs } from "dayjs";
import { Month } from "@/classes/Month";
import { currentDay } from "@/helpers/date";
import type { Day } from "@/classes/Day";
import CalendarDay from "@/components/calendar-day.vue";
import CalendarWeekdays from "@/components/calendar-weekdays.vue";

const current = currentDay();
const months = reactive(Array.from({ length: 3 }, (_, index) => new Month(current.add(index, "month"))));

const isPreviousMonthAvailable = computed<boolean>(() => {
  const previousMonth = months[0].days[0].date.subtract(1, "month");
  return previousMonth.month() !== current.month();
});
function prependMonth(): void {
  const firstMonth: Dayjs = months[0].days[0].date;
  months.unshift(new Month(firstMonth.subtract(1, "month")));
}

const nextMonth = computed<Dayjs>(() => {
  const lastMonth = months.at(-1)!.days.at(-1)!.date;
  return lastMonth.add(1, "month");
});
function appendMonth(): void {
  months.push(new Month(nextMonth.value));
}
function canLoadMore(): boolean {
  return nextMonth.value.month() !== current.month();
}
useInfiniteScroll(document, appendMonth, { distance: 150, canLoadMore });

function composeEventLink(day: Day): RouterLinkProps["to"] {
  if (day.holiday) {
    return { name: "Holiday", query: { date: day.holiday.date } };
  } else if (day.summoningDay) {
    return { name: "Summoning Day", query: { date: day.summoningDay.date } };
  }
  return {};
}
</script>
<style lang="scss">
.month-view {
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
  &__previous {
    display: block;
    align-self: center;
    width: 100%;
    padding-block: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-inverted-text);
    cursor: pointer;
    background-color: var(--color-text);
    border: none;
    border-radius: 1.5rem;
    opacity: 0.8;
    @media (width >= 768px) {
      max-width: 50%;
    }
  }
  .fade {
    &-enter-active,
    &-leave-active {
      transition: opacity 0.5s ease;
    }
    &-enter-from,
    &-leave-to {
      opacity: 0;
    }
    &-enter-to,
    &-leave-from {
      opacity: 1;
    }
  }
  .month {
    &__title {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 1.875rem;
      div {
        font-family: Literata, serif;
        font-size: 1.125rem;
        font-weight: 600;
      }
    }
    &__days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 1rem;
      place-items: center;
      .calendar-day--event {
        cursor: pointer;
        @media (hover: hover) {
          &:hover:not(.calendar-day--current) {
            color: var(--color-accent);
          }
        }
      }
    }
  }
}
</style>
