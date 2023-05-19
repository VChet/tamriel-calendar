<template>
  <div :class="classList">
    {{ day.format("D") }}
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
dayjs.extend(isToday);

const props = withDefaults(
  defineProps<{
    day: dayjs.Dayjs;
    active?: boolean;
    festivity?: boolean;
    small?: boolean;
  }>(),
  { small: false, festivity: false, active: false }
);

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
  width: 35px;
  height: 35px;
  font-size: 14px;
  user-select: none;
  border: 2px solid transparent;
  border-radius: 50%;
  &--festivity {
    cursor: pointer;
    &::after {
      position: absolute;
      top: 60%;
      font-size: 16px;
      color: var(--color-highlight);
      content: "✶";
    }
    &.calendar-day--active::after,
    &.calendar-day--current::after {
      top: 100%;
    }
  }
  &--small {
    width: 16px;
    height: 16px;
    font-size: 10px;
    cursor: default;
  }
  &--current {
    color: #fff;
    background-color: var(--color-highlight);
  }
  &--active {
    border-color: var(--color-highlight);
  }
}
</style>
