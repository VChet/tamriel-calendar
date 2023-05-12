<template>
  <RouterView />
  <footer class="main-nav">
    <nav>
      <ul>
        <li>
          <RouterLink to="/calendar">{{ $t("calendar") }}</RouterLink>
        </li>
        <li>
          <RouterLink to="/birthsigns">{{ $t("birthsigns") }}</RouterLink>
        </li>
        <li>
          <RouterLink to="/settings">{{ $t("settings") }}</RouterLink>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<style lang="scss">
.container {
  padding: 30px 15px;
}
.main-nav {
  position: sticky;
  bottom: 0;
  width: 100%;
  padding: 20px;
  background-color: var(--color-background);
  border-top: 1px solid #b9b2a2;
  ul {
    display: flex;
    justify-content: space-between;
  }
}
</style>
