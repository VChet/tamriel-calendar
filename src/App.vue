<template>
  <router-view v-slot="{ Component }">
    <keep-alive :key="settings.locale">
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <main-nav />
</template>
<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import { useSettingsStore } from "@/store/settings";
import MainNav from "@/components/MainNav.vue";

const router = useRouter();
const { settings } = useSettingsStore();
if (!settings.value.onboarding) router.push({ name: "Onboarding" });
</script>
