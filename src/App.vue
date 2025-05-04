<template>
  <router-view />
  <main-nav />
</template>
<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import { injectHead } from "@unhead/vue";
import { useSettingsStore } from "@/store/settings";
import MainNav from "@/components/main-nav.vue";

const router = useRouter();
const head = injectHead();
const { settings, setLocale, setColorTheme } = useSettingsStore();
setLocale(head, settings.value.locale);

setColorTheme(settings.value.colorTheme);

if (!settings.value.onboarding) router.push({ name: "Onboarding" });
</script>
