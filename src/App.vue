<template>
  <RouterView class="container" />
  <footer class="main-nav">
    <nav>
      <ul>
        <li>
          <RouterLink to="/calendar" class="nav-tab" active-class="nav-tab--active">
            <IconCalendarEvent />
            {{ $t("calendar") }}
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/birthsigns" class="nav-tab" active-class="nav-tab--active">
            <IconComet />
            {{ $t("birthsigns") }}
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/settings" class="nav-tab" active-class="nav-tab--active">
            <IconSettings />
            {{ $t("settings") }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { IconCalendarEvent, IconComet, IconSettings } from "@tabler/icons-vue";
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
    align-items: center;
    justify-content: space-between;
    .nav-tab {
      display: inline-flex;
      flex-direction: column;
      gap: 8px;
      align-items: center;
      padding: 10px 15px;
      font-size: 14px;
      font-weight: bold;
      color: #837a6b;
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
