<template>
  <main>
    <header>
      <ul>
        <li>
          <RouterLink to="/day" class="tab">День</RouterLink>
        </li>
        <li>
          <RouterLink to="/month" class="tab">Месяц</RouterLink>
        </li>
        <li>
          <RouterLink to="/year" class="tab">Год</RouterLink>
        </li>
      </ul>
    </header>
    <RouterView class="container" />
  </main>
</template>

<script setup lang="ts"></script>
<style lang="scss" scoped>
header {
  padding: 15px;
  border-bottom: 1px solid #b9b2a2;
  ul {
    display: flex;
    gap: 25px;
    justify-content: center;
    .tab {
      display: inline-block;
      padding: 6px 15px;
      color: var(--color-text);
      &.router-link-active {
        color: #fff;
        background-color: #52493a;
        border-radius: 24px;
      }
    }
  }
}
</style>
