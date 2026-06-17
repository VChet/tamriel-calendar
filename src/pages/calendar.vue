<template>
  <main class="calendar-view">
    <swipe-navigator :tabs />

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
import { watch } from "vue";
import { RouterLink, RouterView, useRouter, type RouteLocationRaw } from "vue-router";
import { useSettingsStore } from "@/store/settings";
import type { RouteNamedKeys } from "@/types/router";
import CommonHeader from "@/components/common-header.vue";
import SwipeNavigator from "@/components/swipe-navigator.vue";

definePage({
  meta: { titleToken: "router.calendar" },
  redirect: { name: "Calendar Week" },
  beforeEnter(to) {
    const { selectedCalendar } = useSettingsStore();
    if (selectedCalendar.value && to.name !== selectedCalendar.value) {
      return { name: selectedCalendar.value } as RouteLocationRaw;
    }
  }
});

const router = useRouter();
const { settings, selectedCalendar } = useSettingsStore();

const tabs = ["Calendar Week", "Calendar Month", "Calendar Year"] as const satisfies readonly RouteNamedKeys[];
watch(router.currentRoute, ({ name }) => {
  if (tabs.includes(name)) selectedCalendar.value = name;
});
</script>
<style lang="scss">
.calendar-view {
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
