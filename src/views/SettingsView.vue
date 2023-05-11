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
        <li class="settings-view__list-language">
          <label>
            <input v-model="locale" type="radio" value="tamriel-en" />
            English
          </label>
          <label>
            <input v-model="locale" type="radio" value="tamriel-ru" />
            Русский
          </label>
        </li>
      </ul>
    </article>
  </main>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { storeToRefs } from "pinia";
import { useSettingsStore } from "@/store/settings";

const settings = useSettingsStore();
const { dayjsLocale: locale } = storeToRefs(settings);
watch(locale, (newLocale) => settings.setLocale(newLocale));
</script>
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
    &-language {
      display: flex;
      gap: 16px;
    }
  }
}
</style>
