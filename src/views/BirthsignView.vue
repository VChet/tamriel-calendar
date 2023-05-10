<template>
  <main class="container birthsign-view">
    <img class="birthsign-view__image" :src="`/img/birthsigns/${sign.image}.webp`" :alt="sign.name" />
    <h1 class="birthsign-view__title">{{ sign.name }}</h1>
    <div v-if="sign.month" class="birthsign-view__subtitle">Месяц {{ sign.month }}</div>
    <div class="birthsign-view__description">{{ sign.description }}</div>
  </main>
</template>

<script setup lang="ts">
import birthsigns from "@/assets/birthsigns.json";
import { useRoute } from "vue-router";
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
    margin-bottom: 50px;
  }
  &__title {
    font-size: 28px;
  }
  &__subtitle {
    color: #a59e8c;
    margin-top: 15px;
  }
  &__description {
    margin-top: 25px;
  }
}
</style>
