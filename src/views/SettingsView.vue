<template>
  <main class="settings-view">
    <common-header>
      {{ $t("settings") }}
    </common-header>
    <article class="container">
      <ul class="settings-view__list">
        <li class="settings-view__list-radio">
          {{ $t("settingsPage.language") }}:
          <label v-for="lang in LOCALES" :key="lang.code">
            <input v-model="locale" type="radio" :value="lang.code">
            {{ lang.label }}
          </label>
        </li>
        <li class="settings-view__list-radio">
          {{ $t("settingsPage.colorTheme") }}:
          <label v-for="theme in COLOR_THEMES" :key="theme.code">
            <input v-model="colorTheme" type="radio" :value="theme.code">
            {{ theme.label }}
          </label>
        </li>
        <li>
          <a v-wave href="https://www.behance.net/gallery/110895975/Tamriel-Calendar-Mobile-App">
            <icon-brand-behance />
            {{ $t("settingsPage.design") }}
          </a>
        </li>
        <li>
          <a v-wave :href="$t('settingsPage.tgChannelUrl')">
            <icon-brand-telegram />
            {{ $t('settingsPage.tgChannel') }}
          </a>
        </li>
        <li>
          <a v-wave href="https://github.com/VChet/tamriel-calendar">
            <icon-brand-github />
            {{ $t("settingsPage.appVersion") }}: {{ VITE_GIT_COMMIT_HASH }} - {{ VITE_GIT_COMMIT_DATE }}
          </a>
        </li>
        <li v-if="needRefresh">
          <button v-wave class="link" type="button" @click="updateServiceWorker(true)">
            {{ $t("settingsPage.update") }}
          </button>
        </li>
      </ul>
    </article>
  </main>
</template>
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { IconBrandBehance, IconBrandGithub, IconBrandTelegram } from "@tabler/icons-vue";
import { injectHead } from "@unhead/vue";
import { useSettingsStore } from "@/store/settings";
import CommonHeader from "@/components/common-header.vue";

const { VITE_GIT_COMMIT_HASH, VITE_GIT_COMMIT_DATE } = import.meta.env;

const head = injectHead();

const { LOCALES, settings, setLocale, setColorTheme, needRefresh, updateServiceWorker } = useSettingsStore();
const locale = ref(settings.value.locale);
watch(locale, (value) => { setLocale(head, value); });

const colorTheme = ref(settings.value.colorTheme);
watch(colorTheme, setColorTheme);
const { t } = useI18n();
const COLOR_THEMES = computed(() => [
  { code: "light", label: t("settingsPage.light") },
  { code: "dark", label: t("settingsPage.dark") }
]);
</script>
<style lang="scss">
.settings-view {
  .container {
    padding: 0.625rem 0;
  }
  &__list {
    li {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      &:not(:has(a, button)) {
        padding: 1rem;
      }
      &:not(:last-of-type) {
        border-bottom: var(--divider);
      }
    }
    a,
    button {
      flex: 1;
      padding: 1rem;
      text-align: start;
      white-space: nowrap;
      svg {
        color: var(--color-accent);
      }
    }
    &-radio {
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
        border: 1px solid var(--color-text);
        border-radius: 50%;
        &:checked {
          background-color: var(--color-accent);
          border-color: var(--color-accent);
          &::before {
            display: block;
            width: 0.5rem;
            height: 0.5rem;
            content: "";
            background-color: var(--color-inverted-text);
            border-radius: 50%;
            transition: transform 0.2s;
          }
        }
      }
    }
  }
}
</style>
