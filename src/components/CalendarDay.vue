<template>
  <div :class="classList">
    {{ day.format("D") }}
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";

const props = withDefaults(
  defineProps<{
    day: dayjs.Dayjs
    active?: boolean
    festivity?: boolean
    small?: boolean
  }>(),
  { small: false, festivity: false, active: false }
);

dayjs.extend(isToday);

const classList = computed<Record<string, boolean>>(() => {
  const key = "calendar-day";
  return {
    [key]: true,
    [`${key}--current`]: dayjs(props.day).isToday(),
    [`${key}--active`]: props.active,
    [`${key}--small`]: props.small,
    [`${key}--festivity`]: props.festivity
  };
});
</script>
<style lang="scss">
.calendar-day {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  font-family: Literata, serif;
  font-size: 1.125rem;
  line-height: 1;
  user-select: none;
  border: 2px solid transparent;
  border-radius: 50%;
  &--festivity {
    cursor: pointer;
    &::after {
      position: absolute;
      top: 80%;
      font-size: 1rem;
      color: var(--color-red);
      content: "✶";
    }
    &.calendar-day--active::after,
    &.calendar-day--current::after {
      top: 100%;
    }
  }
  &--small {
    width: 1rem;
    height: 1rem;
    font-size: 0.563rem;
    cursor: default;
  }
  &--current {
    color: var(--color-white);
    background-color: var(--color-red);
  }
  &--active {
    border-color: var(--color-red);
  }
}
</style>
