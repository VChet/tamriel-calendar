<template>
  <main class="settings-view">
    <header class="header settings-view__header">{{ $t("settings") }}</header>
    <article class="container">
      <ul class="settings-view__list">
        <li class="settings-view__list-language">
          {{ $t("settingsPage.language") }}:
          <label v-for="lang in availableLocales" :key="lang.code">
            <input v-model="locale" type="radio" :value="lang.code" />
            {{ lang.label }}
          </label>
        </li>
        <li>
          {{ $t("settingsPage.code") }}:
          <a href="https://github.com/VChet/tamriel-calendar">GitHub</a>
        </li>
        <li>
          {{ $t("settingsPage.design") }}
          <a href="https://www.behance.net/gallery/110895975/Tamriel-Calendar-Mobile-App">Serafima S</a>
        </li>
        <li>
          {{ $t("settingsPage.appVersion") }}: {{ commitHash }} ({{ commitDate }}).
          <button v-if="needRefresh" class="link" type="button" @click="updateServiceWorker(true)">
            {{ $t("settingsPage.update") }}
          </button>
        </li>
      </ul>
    </article>
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import dayjs from "dayjs";
import { settings, setLocale, useSettingsStore } from "@/store/settings";

const commitHash = import.meta.env.VITE_GIT_COMMIT_HASH;
const commitDate = dayjs(import.meta.env.VITE_GIT_COMMIT_DATE).format("DD/MM/YY");

const availableLocales = [
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" }
];
const { needRefresh, updateServiceWorker } = useSettingsStore();
const locale = ref(settings.value.locale);
watch(locale, setLocale);
</script>
<style lang="scss">
.settings-view {
  .container {
    padding: 0.625rem 0;
  }
  &__header {
    font-weight: 600;
    text-align: center;
  }
  &__list {
    li {
      padding: 1rem;
      &:not(:last-of-type) {
        border-bottom: var(--divider);
      }
    }
    a {
      color: var(--color-red);
    }
    &-language {
      display: flex;
      gap: 0.75rem;
      align-items: center;
      label:has(input) {
        display: inline-flex;
        gap: 0.5rem;
        align-items: center;
        cursor: pointer;
      }
      input[type="radio"] {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1rem;
        height: 1rem;
        appearance: none;
        border: 1px solid var(--color-beige-dark);
        border-radius: 50%;
        &:checked {
          background-color: var(--color-red);
          border-color: var(--color-red);
          &::before {
            display: block;
            width: 0.5rem;
            height: 0.5rem;
            content: "";
            background-color: var(--color-white);
            border-radius: 50%;
            transition: transform 0.2s;
          }
        }
      }
    }
  }
}
</style>
