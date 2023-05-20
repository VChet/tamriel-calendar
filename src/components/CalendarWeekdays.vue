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
import { watch, ref } from "vue";
import { settings } from "@/store/settings";
dayjs.extend(localeData);

const days = ref(dayjs.weekdaysShort(true));
watch(settings, () => (days.value = dayjs.weekdaysShort(true)));
</script>
<style lang="scss">
.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 16px;
  margin-bottom: 10px;
  text-align: center;
  li {
    font-size: 14px;
    font-weight: bold;
    color: #b4aea0;
    text-transform: capitalize;
    &:nth-last-child(-n + 2) {
      color: var(--color-highlight);
    }
  }
}
</style>
