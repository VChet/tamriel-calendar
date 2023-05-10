<template>
  <main class="settings-view">
    <header>Настройки</header>
    <article class="container">
      <ul class="settings-view__list">
        <li>
          Оригинальный дизайн
          <a href="https://www.behance.net/gallery/110895975/Tamriel-Calendar-Mobile-App">Serafima S</a>
        </li>
        <li>
          <a href="https://github.com/VChet/tamriel-calendar">GitHub</a>
        </li>
      </ul>
    </article>
  </main>
</template>

<script setup lang="ts"></script>
<style lang="scss">
.settings-view {
  .container {
    padding: 10px 0;
  }
  header {
    padding: 15px;
    border-bottom: 1px solid #b9b2a2;
    text-align: center;
  }
  &__list {
    li {
      padding: 10px 15px;
      &:not(:last-of-type) {
        border-bottom: 1px solid #b9b2a2;
      }
    }
    a {
      color: var(--color-highlight);
    }
  }
}
</style>
