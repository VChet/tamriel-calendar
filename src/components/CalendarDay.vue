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
    small?: boolean;
  }>(),
  { small: false, active: false }
);

const classList = computed<Record<string, boolean>>(() => {
  const key = "calendar-day";
  return {
    [key]: true,
    [`${key}--current`]: dayjs(props.day).isToday(),
    [`${key}--active`]: props.active,
    [`${key}--small`]: props.small
  };
});
</script>
<style lang="scss">
.calendar-day {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  font-size: 14px;
  border-radius: 50%;
  &--small {
    width: 15px;
    height: 15px;
    font-size: 10px;
  }
  &--current {
    color: #fff;
    background-color: var(--color-highlight);
  }
  &--active {
    border: 2px solid var(--color-highlight);
  }
}
</style>
