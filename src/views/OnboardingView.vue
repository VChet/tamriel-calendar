<template>
  <main class="container onboarding-view">
    <h1>{{ $t("onboardingPage.welcome") }}</h1>
    <div>{{ $t("onboardingPage.description") }}</div>
    <button class="button button--big" type="button" @click="exitOnboarding">
      {{ $t("onboardingPage.continue") }}
    </button>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
function exitOnboarding() {
  document.cookie = "onboarding=true";
  router.push({ name: "Home" });
}
</script>
<style lang="scss">
.onboarding-view {
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  margin: 20vh auto;
  text-align: center;
  h1 {
    font-size: 1.75rem;
  }
}
</style>
