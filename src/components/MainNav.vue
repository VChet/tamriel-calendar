<template>
  <footer v-if="router.currentRoute.value.name !== 'Onboarding'" class="main-nav">
    <nav>
      <ul>
        <li>
          <router-link
            v-wave
            :to="{ name: 'Calendar' }"
            class="nav-tab"
            :class="{ 'nav-tab--active': isCalendarTab }"
          >
            <icon-calendar />
            {{ $t("calendar") }}
          </router-link>
        </li>
        <li>
          <router-link
            v-wave
            :to="{ name: 'Birthsigns' }"
            class="nav-tab"
            :class="{ 'nav-tab--active': isBirthsignsTab }"
          >
            <icon-comet />
            {{ $t("birthsigns") }}
          </router-link>
        </li>
        <li>
          <router-link
            v-wave
            :to="{ name: 'Settings' }"
            class="nav-tab"
            :class="{ 'nav-tab--active': isSettingsTab }"
          >
            <icon-settings />
            {{ $t("settings") }}
          </router-link>
        </li>
      </ul>
    </nav>
  </footer>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useSettingsStore } from "@/store/settings";
import IconCalendar from "./icons/IconCalendar.vue";
import IconComet from "./icons/IconComet.vue";
import IconSettings from "./icons/IconSettings.vue";

const router = useRouter();
const { settings } = useSettingsStore();
if (!settings.value.onboarding) router.push({ name: "Onboarding" });

const isCalendarTab = computed(() =>
  ["Calendar", "Week", "Month", "Year", "Holiday", "SummoningDay"].some(
    (name) => router.currentRoute.value.name === name
  )
);
const isBirthsignsTab = computed(() =>
  ["Birthsigns", "Birthsign"].some((name) => router.currentRoute.value.name === name)
);
const isSettingsTab = computed(() => router.currentRoute.value.name === "Settings");
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
    grid-template-columns: repeat(3, 1fr);
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
