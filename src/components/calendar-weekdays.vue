<template>
  <ul class="calendar-weekdays">
    <li v-for="day in days" :key="day">
      {{ day }}
    </li>
  </ul>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useBreakpoints } from "@vueuse/core";
import { weekdaysLong, weekdaysShort } from "@/helpers/date";

const breakpoints = useBreakpoints({ wide: 768 });
const isLarge = breakpoints.greaterOrEqual("wide");
const days = computed(() => isLarge.value ? weekdaysLong() : weekdaysShort());
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
    color: var(--color-primary);
    text-transform: capitalize;
    opacity: 0.4;
    &:nth-last-child(-n + 2) {
      color: var(--color-accent);
      opacity: 0.8;
    }
  }
}
</style>
