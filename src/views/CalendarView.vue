<template>
  <main ref="swipeContainer" class="calendar-view">
    <template v-if="isSwiping && ['left', 'right'].includes(direction)">
      <div v-if="direction === 'right' && currentPageIndex > 0" :class="arrowClassList">
        <IconChevronLeft />
      </div>
      <div v-if="direction === 'left' && currentPageIndex < calendarPages.length - 1" :class="arrowClassList">
        <IconChevronRight />
      </div>
    </template>
    <header class="header">
      <ul class="tabs">
        <li>
          <RouterLink to="/week" class="tabs__tab" active-class="tabs__tab--active">{{ $t("week") }}</RouterLink>
        </li>
        <li>
          <RouterLink to="/month" class="tabs__tab" active-class="tabs__tab--active">{{ $t("month") }}</RouterLink>
        </li>
        <li>
          <RouterLink to="/year" class="tabs__tab" active-class="tabs__tab--active">{{ $t("year") }}</RouterLink>
        </li>
      </ul>
    </header>
    <RouterView class="container" />
  </main>
</template>

<script setup lang="ts">
import { useSwipe, type UseSwipeDirection } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { RouterLink, RouterView, useRoute, useRouter } from "vue-router";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-vue";
import { useSettingsStore } from "@/store/settings";

const route = useRoute();
const router = useRouter();
const { selectedCalendar, selectedDay } = useSettingsStore();

const calendarPages = route.matched[0].children.map(({ name }) => name);

const currentPageIndex = computed(() => calendarPages.indexOf(router.currentRoute.value.name ?? ""));
const swipeContainer = ref<HTMLElement | null>(null);
const { isSwiping, direction } = useSwipe(swipeContainer, {
  onSwipeEnd: (_: TouchEvent, direction: UseSwipeDirection) => {
    if (direction === "right" && currentPageIndex.value > 0) {
      navigateToPage(currentPageIndex.value - 1);
    } else if (direction === "left" && currentPageIndex.value < calendarPages.length - 1) {
      navigateToPage(currentPageIndex.value + 1);
    }
  }
});
const arrowClassList = computed<Record<string, boolean>>(() => {
  const key = "calendar-view__arrow";
  return {
    [key]: true,
    [`${key}--${direction.value}`]: !!direction.value
  };
});

watch(router.currentRoute, ({ name }) => {
  selectedCalendar.value = name;
  selectedDay.value = null;
});

function navigateToPage(pageIndex: number) {
  const name = calendarPages[pageIndex];
  router.push({ name });
}
</script>
<style lang="scss">
.calendar-view {
  &__arrow {
    position: fixed;
    top: 50vh;
    z-index: 10;
    display: grid;
    place-items: center;
    width: 24px;
    height: 24px;
    color: #fff;
    background: #52493a;
    border-radius: 50%;
    transform: translateY(-50%);
    svg {
      width: 18px;
      height: 18px;
    }
    &--left {
      right: 10px;
    }
    &--right {
      left: 10px;
    }
  }
  .tabs {
    display: flex;
    gap: 18px;
    justify-content: center;
    &__tab {
      display: inline-block;
      padding: 6px 12px;
      font-size: 14px;
      color: var(--color-text);
      &--active {
        color: #fff;
        background-color: #52493a;
        border-radius: 24px;
      }
    }
  }
}
</style>
