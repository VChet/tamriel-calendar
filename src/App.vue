<template>
  <RouterView />
  <footer class="main-nav">
    <nav>
      <ul>
        <li>
          <RouterLink to="/calendar">Календарь</RouterLink>
        </li>
        <li>
          <RouterLink to="/birthsigns">Знаки рождения</RouterLink>
        </li>
        <li>
          <RouterLink to="/settings">Настройки</RouterLink>
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
  border-top: 1px solid #b9b2a2;
  background-color: var(--color-background);
  ul {
    display: flex;
    justify-content: space-between;
  }
}
</style>
