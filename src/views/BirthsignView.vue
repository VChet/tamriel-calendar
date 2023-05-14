<template>
  <main class="container birthsign-view">
    <img class="birthsign-view__image" :src="`/img/birthsigns/${sign.image}.webp`" :alt="sign.name" />
    <h1 class="birthsign-view__title">{{ sign.name }}</h1>
    <div v-if="sign.month" class="birthsign-view__subtitle">{{ $t("month") }} {{ sign.month }}</div>
    <div class="birthsign-view__description">{{ sign.description }}</div>
  </main>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import birthsigns from "@/assets/birthsigns.json";
const route = useRoute();
const index = Number(route.params.sign);
const sign = birthsigns[index];
</script>
<style lang="scss">
.birthsign-view {
  display: flex;
  flex-direction: column;
  &__image {
    align-self: center;
    max-width: 100%;
    margin-bottom: 40px;
  }
  &__title {
    font-size: 24px;
    font-weight: bold;
  }
  &__subtitle {
    margin-top: 16px;
    color: #a59e8c;
  }
  &__description {
    margin-top: 30px;
  }
}
</style>
