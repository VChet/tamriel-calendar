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
  text-align: center;
  margin-bottom: 10px;
  li {
    text-transform: capitalize;
    font-size: 14px;
    color: #b4aea0;
    font-weight: bold;
    &:nth-last-child(-n + 2) {
      color: var(--color-highlight);
    }
  }
}
</style>
