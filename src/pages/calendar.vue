<template>
  <main ref="swipeContainerElement" class="calendar-view">
    <template v-if="isSwiping && ['left', 'right'].includes(direction)">
      <div v-if="direction === 'right' && currentTabIndex > 0" :class="arrowClassList">
        <icon-chevron-left />
      </div>
      <div v-if="direction === 'left' && currentTabIndex < tabs.length - 1" :class="arrowClassList">
        <icon-chevron-right />
      </div>
    </template>
    <common-header search>
      <ul class="tabs">
        <li>
          <router-link :to="{ name: 'Calendar Week' }" replace class="tabs__tab" active-class="tabs__tab--active">
            {{ $t("week") }}
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Calendar Month' }" replace class="tabs__tab" active-class="tabs__tab--active">
            {{ $t("month") }}
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Calendar Year' }" replace class="tabs__tab" active-class="tabs__tab--active">
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
import { RouterLink, RouterView, useRouter } from "vue-router";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-vue";
import { useSettingsStore } from "@/store/settings";
import type { RouteNamedKeys } from "@/types/router";
import CommonHeader from "@/components/common-header.vue";

definePage({
  meta: { titleToken: "router.calendar" },
  redirect: { name: "Calendar Week" },
  beforeEnter(to, _from, next) {
    const { selectedCalendar } = useSettingsStore();
    if (selectedCalendar.value && to.name !== selectedCalendar.value) {
      next({ name: selectedCalendar.value });
    } else {
      next();
    }
  }
});

const router = useRouter();
const { settings, selectedCalendar } = useSettingsStore();

const tabs = ["Calendar Week", "Calendar Month", "Calendar Year"] as const satisfies readonly RouteNamedKeys[];
function navigateToTab(tabIndex: number): void {
  const name = tabs[tabIndex];
  router.replace({ name });
}
const currentTabIndex = computed(() => tabs.indexOf(router.currentRoute.value.name));
const swipeContainerRef = useTemplateRef("swipeContainerElement");
const { isSwiping, direction } = useSwipe(swipeContainerRef, {
  onSwipeEnd: (_: TouchEvent, swipeDirection: UseSwipeDirection) => {
    if (swipeDirection === "right" && currentTabIndex.value > 0) {
      navigateToTab(currentTabIndex.value - 1);
    } else if (swipeDirection === "left" && currentTabIndex.value < tabs.length - 1) {
      navigateToTab(currentTabIndex.value + 1);
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
  if (tabs.includes(name)) selectedCalendar.value = name;
});
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
