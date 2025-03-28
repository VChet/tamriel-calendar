<template>
  <main class="settings-view">
    <common-header>
      {{ $t("settings") }}
    </common-header>
    <article class="container">
      <ul class="settings-view__list">
        <li class="settings-view__list-language">
          {{ $t("settingsPage.language") }}:
          <label v-for="lang in LOCALES" :key="lang.code">
            <input v-model="locale" type="radio" :value="lang.code">
            {{ lang.label }}
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
            {{ $t("settingsPage.appVersion") }}: {{ commitHash }} - {{ commitDate }}
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
import { ref, watch } from "vue";
import { IconBrandBehance, IconBrandGithub, IconBrandTelegram } from "@tabler/icons-vue";
import { composeCommitDate } from "@/helpers/date";
import { useSettingsStore } from "@/store/settings";
import CommonHeader from "@/components/common-header.vue";

const commitHash = import.meta.env.VITE_GIT_COMMIT_HASH;
const commitDate = composeCommitDate(import.meta.env.VITE_GIT_COMMIT_DATE);

const { LOCALES, settings, setLocale, needRefresh, updateServiceWorker } = useSettingsStore();
const locale = ref(settings.value.locale);
watch(locale, setLocale);
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
        color: var(--color-red);
      }
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
