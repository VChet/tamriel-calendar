<template>
  <router-view />
  <main-nav />
</template>
<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import { useSettingsStore } from "@/store/settings";
import head from "./plugins/head";
import MainNav from "@/components/main-nav.vue";

const router = useRouter();
const { settings, setLocale, setColorTheme } = useSettingsStore();
setLocale(head, settings.value.locale);
setColorTheme(head, settings.value.colorTheme);

if (!settings.value.onboarding) router.push({ name: "Onboarding" });
</script>
