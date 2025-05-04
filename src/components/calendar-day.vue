<template>
  <div :class="classList">
    {{ day.format("D") }}
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import type { Dayjs } from "dayjs";
import { isCurrentDay } from "@/helpers/date";

interface Props {
  day: Dayjs
  active?: boolean
  event?: boolean
  small?: boolean
}
const props = withDefaults(defineProps<Props>(), { small: false, event: false, active: false });

const classList = computed<Record<string, boolean>>(() => {
  const key = "calendar-day";
  return {
    [key]: true,
    [`${key}--current`]: isCurrentDay(props.day),
    [`${key}--active`]: props.active,
    [`${key}--small`]: props.small,
    [`${key}--event`]: props.event
  };
});
</script>
<style lang="scss">
.calendar-day {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  font-family: Literata, serif;
  font-size: 1.125rem;
  line-height: 1;
  user-select: none;
  border: 0.125rem solid transparent;
  border-radius: 50%;
  &--event:not(.calendar-day--small) {
    cursor: pointer;
    &::after {
      position: absolute;
      top: 80%;
      font-size: 1rem;
      color: var(--color-accent);
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
    &.calendar-day--event:not(.calendar-day--current) {
      color: var(--color-accent);
    }
  }
  &--current {
    color: var(--color-inverted-text);
    background-color: var(--color-accent);
  }
  &--active {
    border-color: var(--color-accent);
  }
}
</style>
