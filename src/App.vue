<template>
  <RouterView />
  <footer class="main-nav">
    <nav>
      <ul>
        <li v-for="{ route, token } in pages" :key="route">
          <RouterLink :to="route" class="nav-tab" active-class="nav-tab--active">
            {{ $t(token) }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";

const pages = [
  { route: "/calendar", token: "calendar" },
  { route: "/birthsigns", token: "birthsigns" },
  { route: "/settings", token: "settings" }
];
</script>

<style lang="scss">
.container {
  padding: 30px 15px;
}
.main-nav {
  position: sticky;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  background-color: var(--color-background);
  border-top: 1px solid #b9b2a2;
  ul {
    display: flex;
    justify-content: space-between;
    .nav-tab {
      display: inline-block;
      padding: 20px;
      font-size: 14px;
      font-weight: bold;
      color: #837a6b;
      &--active {
        color: #d83c23;
      }
    }
  }
}
</style>
