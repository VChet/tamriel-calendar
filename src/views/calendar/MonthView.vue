<template>
  <section class="month-view">
    <button v-show="isPreviousMonthAvailable" v-wave class="month-view__previous" @click="prependMonth">
      {{ $t("calendarPage.previousMonth") }}
    </button>
    <transition-group name="fade">
      <div v-for="month in months" :key="month.value" class="month">
        <div class="month__title">
          <div>{{ month.monthName }}</div>
          <div>{{ month.yearName }}</div>
        </div>
        <calendar-weekdays />
        <ul class="month__days">
          <li v-for="(day, index) in month.days" :key="index" :style="day.styles">
            <router-link v-if="day.hasEvent" :to="eventLink(day)">
              <calendar-day :day="day.value" :event="day.hasEvent" />
            </router-link>
            <calendar-day v-else v-wave :day="day.value" />
          </li>
        </ul>
      </div>
    </transition-group>
  </section>
</template>
<script setup lang="ts">
import { computed, reactive } from "vue";
import { useInfiniteScroll } from "@vueuse/core";
import dayjs, { type Dayjs } from "dayjs";
import CalendarDay from "@/components/CalendarDay.vue";
import CalendarWeekdays from "@/components/CalendarWeekdays.vue";
import { Month } from "@/classes/Month";
import type { Day } from "@/classes/Day";

const current = dayjs();
const months = reactive([new Month(current)]);

const isPreviousMonthAvailable = computed<boolean>(() => {
  const previousMonth = months[0].days[0].value.subtract(1, "month");
  return previousMonth.month() !== current.month();
});
function prependMonth() {
  const firstMonth: Dayjs = months[0].days[0].value;
  months.unshift(new Month(firstMonth.subtract(1, "month")));
}

const nextMonth = computed<Dayjs>(() => {
  const lastMonth = months.at(-1)!.days.at(-1)!.value;
  return lastMonth.add(1, "month");
});
function appendMonth() {
  months.push(new Month(nextMonth.value));
}
function canLoadMore(): boolean {
  return nextMonth.value.month() !== current.month();
}
useInfiniteScroll(window, appendMonth, { distance: 50, canLoadMore });

function eventLink(day: Day) {
  if (day.holiday) {
    return { name: "Holiday", query: { date: day.holiday.date } };
  } else if (day.summoningDay) {
    return { name: "SummoningDay", query: { date: day.summoningDay.date } };
  } else {
    return {};
  }
}
</script>
<style lang="scss">
.month-view {
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
  &__previous {
    display: block;
    padding-block: 0.75rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-white);
    cursor: pointer;
    background-color: var(--color-beige-dark);
    border: none;
    border-radius: 1.5rem;
    opacity: 0.8;
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
            color: var(--color-red);
          }
        }
      }
    }
  }
}
</style>
