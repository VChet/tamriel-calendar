<template>
  <footer v-if="router.currentRoute.value.name !== 'Onboarding'" class="main-nav">
    <nav>
      <ul>
        <li v-for="{ key, title, pages, iconComponent } in tabs" :key>
          <router-link
            v-wave
            :to="{ name: pages[0] }"
            class="nav-tab"
            :class="{ 'nav-tab--active': pages.includes(currentRoute) }"
          >
            <component :is="iconComponent" />
            {{ title }}
          </router-link>
        </li>
      </ul>
    </nav>
  </footer>
</template>
<script setup lang="ts">
import { computed, type Component } from "vue";
import { useI18n } from "vue-i18n";
import { RouterLink, useRouter } from "vue-router";
import { IconMoon2 } from "@tabler/icons-vue";
import { useSettingsStore } from "@/store/settings";
import IconCalendar from "./icons/IconCalendar.vue";
import IconComet from "./icons/IconComet.vue";
import IconSettings from "./icons/IconSettings.vue";

interface TabEntry {
  key: string
  title: string
  pages: string[]
  iconComponent: Component
}

const router = useRouter();
const { t } = useI18n();
const { settings } = useSettingsStore();
if (!settings.value.onboarding) router.push({ name: "Onboarding" });

const currentRoute = computed(() => router.currentRoute.value.name?.toString() ?? "");

const tabs = computed<readonly TabEntry[]>(() => [
  {
    key: "calendar",
    title: t("router.calendar"),
    pages: ["Calendar", "Week", "Month", "Year", "Holiday", "SummoningDay"],
    iconComponent: IconCalendar
  },
  {
    key: "moonPhase",
    title: t("router.moonPhase"),
    pages: ["Moon Phase"],
    iconComponent: IconMoon2
  },
  {
    key: "birthsigns",
    title: t("router.birthsigns"),
    pages: ["Birthsigns", "Birthsign"],
    iconComponent: IconComet
  },
  {
    key: "settings",
    title: t("router.settings"),
    pages: ["Settings"],
    iconComponent: IconSettings
  }
]);
</script>
<style lang="scss">
.main-nav {
  position: sticky;
  bottom: 0;
  width: 100%;
  background-color: var(--color-beige);
  border-top: var(--divider);
  opacity: 0.94;
  ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: start;
    justify-content: space-between;
    .nav-tab {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      align-items: center;
      justify-content: center;
      padding: 0.625rem 1rem;
      font-size: 0.688rem;
      font-weight: bold;
      color: var(--color-beige-dark);
      text-align: center;
      white-space: nowrap;
      opacity: 0.6;
      @media (width >= 768px) {
        flex-direction: row;
      }
      &--active {
        color: var(--color-red);
        opacity: 1;
      }
    }
  }
}
</style>
