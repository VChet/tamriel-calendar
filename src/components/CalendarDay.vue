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
  font-size: 0.875rem;
  user-select: none;
  border: 2px solid transparent;
  border-radius: 50%;

  @media (width >= 768px) {
    width: 40px;
    height: 40px;
  }
  &--festivity {
    cursor: pointer;
    &::after {
      position: absolute;
      top: 60%;
      font-size: 1rem;
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
    font-size: 0.625rem;
    cursor: default;

    @media (width >= 768px) {
      width: 24px;
      height: 24px;
    }
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
