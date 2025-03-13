<template>
  <router-view />
  <main-nav />
</template>
<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import { useSettingsStore } from "@/store/settings";
import MainNav from "@/components/main-nav.vue";

const router = useRouter();
const { settings } = useSettingsStore();
if (!settings.value.onboarding) router.push({ name: "Onboarding" });
</script>
