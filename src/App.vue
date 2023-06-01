<template>
  <RouterView />
  <footer v-if="router.currentRoute.value.name !== 'Onboarding'" class="main-nav">
    <nav>
      <ul>
        <li>
          <RouterLink :to="{ name: 'Calendar' }" class="nav-tab" :class="{ 'nav-tab--active': isCalendarTab }">
            <IconCalendarEvent />
            {{ $t("calendar") }}
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'Birthsigns' }" class="nav-tab" :class="{ 'nav-tab--active': isBirthsignsTab }">
            <IconComet />
            {{ $t("birthsigns") }}
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'Settings' }" class="nav-tab" :class="{ 'nav-tab--active': isSettingsTab }">
            <IconSettings />
            {{ $t("settings") }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<script setup lang="ts">
import { useRouter, RouterLink, RouterView } from "vue-router";
import { IconCalendarEvent, IconComet, IconSettings } from "@tabler/icons-vue";
import { computed } from "vue";
import { settings } from "@/store/settings";
const router = useRouter();
if (!settings.value.onboarding) router.push({ name: "Onboarding" });

const isCalendarTab = computed(() =>
  ["Calendar", "Week", "Month", "Year", "Festivity"].some((name) => router.currentRoute.value.name === name)
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
  padding: 0 10px;
  background-color: var(--color-background);
  border-top: 1px solid var(--color-border);
  ul {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .nav-tab {
      display: inline-flex;
      flex-direction: column;
      gap: 8px;
      align-items: center;
      padding: 10px 15px;
      font-size: 0.75rem;
      font-weight: bold;
      color: #837a6b;
      text-align: center;

      @media (width >= 768px) {
        flex-direction: row;
      }
      &--active {
        color: #d83c23;
      }
      svg {
        width: 30px;
        height: 30px;
      }
    }
  }
}
</style>
