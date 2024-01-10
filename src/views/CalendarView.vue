<template>
  <main class="calendar-view">
    <header class="header">
      <ul class="tabs">
        <li>
          <a class="button tabs__tab" href="#week">
            {{ $t("week") }}
          </a>
        </li>
        <li>
          <a class="button tabs__tab" href="#month">
            {{ $t("month") }}
          </a>
        </li>
        <li>
          <a class="button tabs__tab" href="#year">
            {{ $t("year") }}
          </a>
        </li>
      </ul>
    </header>
    <section class="container snap-container">
      <week-view id="week" />
      <month-view id="month" />
      <year-view id="year" />
    </section>
  </main>
</template>
<script setup lang="ts">
import WeekView from "@/views/calendar/WeekView.vue";
import MonthView from "@/views/calendar/MonthView.vue";
import YearView from "@/views/calendar/YearView.vue";
</script>
<style lang="scss">
.calendar-view {
  overflow-y: hidden;
  .tabs {
    display: flex;
    gap: 1.125rem;
    justify-content: center;
    &__tab {
      min-width: 4rem;
      padding: 0.25rem 0.75rem;
      font-size: 0.875rem;
      color: var(--color-beige-dark);
      background: transparent;
      &--active {
        font-weight: 500;
        color: var(--color-white);
        background-color: var(--color-beige-dark);
        border-radius: 1.5rem;
        opacity: 0.8;
      }
    }
  }
  .snap-container {
    scroll-snap-type: x mandatory;
    display: grid;
    grid-template-columns: repeat(3, 100%);
    gap: 0 3rem;
    overflow-x: scroll;
    > section {
      scroll-snap-align: start;
    }
  }
}
</style>
