<template>
  <main class="container onboarding-view">
    <img src="/img/onboarding.svg" alt="logo">
    <h1>{{ $t("onboardingPage.welcome") }}</h1>
    <div>{{ $t("onboardingPage.description") }}</div>
    <button v-wave class="button button--block button--big" type="button" @click="exitOnboarding">
      {{ $t("onboardingPage.continue") }}
    </button>
  </main>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { useSettingsStore } from "@/store/settings";

const router = useRouter();
const { settings } = useSettingsStore();
function exitOnboarding() {
  settings.value.onboarding = true;
  router.push({ name: "Home" });
}
</script>
<style lang="scss">
@mixin title {
  font-family: Literata, serif;
  font-size: 1.625rem;
  font-weight: 600;
}
.onboarding-view.container {
  padding: 0 3.75rem;
}
.onboarding-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20vh auto;
  text-align: center;
  img {
    margin-bottom: 4.375rem;
  }
  h1 {
    @include title;

    margin-bottom: 1.5rem;
  }
  button {
    margin-top: auto;
  }
}
</style>
