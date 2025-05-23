<template>
  <main ref="swipeContainerElement" class="calendar-view">
    <template v-if="isSwiping && ['left', 'right'].includes(direction)">
      <div v-if="direction === 'right' && currentPageIndex > 0" :class="arrowClassList">
        <icon-chevron-left />
      </div>
      <div v-if="direction === 'left' && currentPageIndex < calendarPages.length - 1" :class="arrowClassList">
        <icon-chevron-right />
      </div>
    </template>
    <common-header search>
      <ul class="tabs">
        <li>
          <router-link :to="{ name: 'Week' }" replace class="tabs__tab" active-class="tabs__tab--active">
            {{ $t("week") }}
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Month' }" replace class="tabs__tab" active-class="tabs__tab--active">
            {{ $t("month") }}
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Year' }" replace class="tabs__tab" active-class="tabs__tab--active">
            {{ $t("year") }}
          </router-link>
        </li>
      </ul>
    </common-header>
    <router-view v-slot="{ Component }">
      <keep-alive :key="settings.locale">
        <component :is="Component" class="container" />
      </keep-alive>
    </router-view>
  </main>
</template>
<script setup lang="ts">
import { computed, useTemplateRef, watch } from "vue";
import { useSwipe, type UseSwipeDirection } from "@vueuse/core";
import { RouterLink, RouterView, useRoute, useRouter } from "vue-router";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-vue";
import { useSettingsStore } from "@/store/settings";
import CommonHeader from "@/components/common-header.vue";

const route = useRoute();
const router = useRouter();
const { settings, selectedCalendar } = useSettingsStore();

const calendarPages = route.matched[0].children.map(({ name }) => name);

const currentPageIndex = computed(() => calendarPages.indexOf(router.currentRoute.value.name ?? ""));
const swipeContainerRef = useTemplateRef("swipeContainerElement");
const { isSwiping, direction } = useSwipe(swipeContainerRef, {
  onSwipeEnd: (_: TouchEvent, swipeDirection: UseSwipeDirection) => {
    if (swipeDirection === "right" && currentPageIndex.value > 0) {
      navigateToPage(currentPageIndex.value - 1);
    } else if (swipeDirection === "left" && currentPageIndex.value < calendarPages.length - 1) {
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
  if (calendarPages.includes(name)) selectedCalendar.value = name;
});

function navigateToPage(pageIndex: number): void {
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
    width: 1.5rem;
    height: 1.5rem;
    color: #fff;
    background: #52493a;
    border-radius: 50%;
    transform: translateY(-50%);
    svg {
      width: 1.125rem;
      height: 1.125rem;
    }
    &--left {
      right: 0.625rem;
    }
    &--right {
      left: 0.625rem;
    }
  }
  .common-header__main {
    font-weight: initial;
  }
  .tabs {
    display: flex;
    gap: 1.125rem;
    justify-content: center;
    &__tab {
      display: inline-block;
      min-width: 4rem;
      padding: 0.25rem 0.75rem;
      font-size: 0.875rem;
      color: var(--color-text);
      text-align: center;
      &--active {
        font-weight: 500;
        color: var(--color-inverted-text);
        background-color: var(--color-text);
        border-radius: 1.5rem;
        opacity: 0.8;
      }
    }
  }
}
</style>
