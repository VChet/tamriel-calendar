<template>
  <main class="container onboarding-view">
    <img src="/img/onboarding.svg" alt="logo" class="invert">
    <h1>{{ $t("onboardingPage.welcome") }}</h1>
    <div>{{ $t("onboardingPage.description") }}</div>
    <button v-wave class="button button--block button--big" type="button" @click="exitOnboarding">
      {{ $t("onboardingPage.continue") }}
    </button>
  </main>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { useHead } from "@unhead/vue";
import { useSettingsStore } from "@/store/settings";

const router = useRouter();
const { settings } = useSettingsStore();
function exitOnboarding(): void {
  settings.value.onboarding = true;
  router.push({ name: "Home" });
}

useHead({
  link: [{ rel: "canonical", href: "https://tamriel-calendar.netlify.app/" }],
  meta: [{ name: "robots", content: "noindex, nofollow" }]
});
</script>
<style lang="scss">
.onboarding-view.container {
  padding: 0 3.75rem;
}
.onboarding-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  text-align: center;
  img {
    margin-bottom: 4.375rem;
  }
  h1 {
    margin-bottom: 1.5rem;
    font-family: Literata, serif;
    font-size: 1.625rem;
    font-weight: 600;
  }
  div {
    margin-bottom: 1.5rem;
  }
  button {
    margin-top: auto;
  }
}
</style>
