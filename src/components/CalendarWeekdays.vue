<template>
  <ul class="calendar-weekdays">
    <li v-for="day in days" :key="day">
      {{ day }}
    </li>
  </ul>
</template>
<script setup lang="ts">
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
dayjs.extend(localeData);

const days = dayjs.weekdaysShort(true);
</script>
<style lang="scss">
.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;
  place-items: center;
  margin-bottom: 0.625rem;
  li {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-beige-medium);
    text-transform: capitalize;
    opacity: 0.4;
    &:nth-last-child(-n + 2) {
      color: var(--color-red);
      opacity: 0.8;
    }
  }
}
</style>
