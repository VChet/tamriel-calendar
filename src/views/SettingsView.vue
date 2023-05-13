<template>
  <main class="settings-view">
    <header>{{ $t("settings") }}</header>
    <article class="container">
      <ul class="settings-view__list">
        <li v-if="needRefresh">
          <button class="button button--block" type="button" @click="updateServiceWorker(true)">
            {{ $t("settingsPage.update") }}
          </button>
        </li>
        <li class="settings-view__list-language">
          <label>
            <input v-model="locale" type="radio" value="en" />
            English
          </label>
          <label>
            <input v-model="locale" type="radio" value="ru" />
            Русский
          </label>
        </li>
        <li>
          <a href="https://github.com/VChet/tamriel-calendar">GitHub</a>
        </li>
        <li>
          {{ $t("settingsPage.design") }}
          <a href="https://www.behance.net/gallery/110895975/Tamriel-Calendar-Mobile-App">Serafima S</a>
        </li>
      </ul>
    </article>
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { settings, setLocale, useSettingsStore } from "@/store/settings";

const { needRefresh, updateServiceWorker } = useSettingsStore();
const locale = ref(settings.value.locale);
watch(locale, setLocale);
</script>
<style lang="scss">
.settings-view {
  .container {
    padding: 10px 0;
  }
  header {
    padding: 15px;
    text-align: center;
    border-bottom: 1px solid #b9b2a2;
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
