<template>
  <main class="container birthsigns-view">
    <h1>Знаки рождения</h1>
    <ul class="birthsigns-view__list">
      <RouterLink
        v-for="(sign, index) in birthsigns"
        :key="index"
        v-slot="{ navigate }"
        :to="`/birthsign/${index}`"
        custom
      >
        <li role="link" @click="navigate">
          <img :src="`/img/birthsigns/${sign.image}.webp`" :alt="sign.name" />
          {{ sign.name }}
        </li>
      </RouterLink>
    </ul>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import birthsigns from "@/assets/birthsigns.json";
</script>
<style lang="scss">
.birthsigns-view {
  h1 {
    margin-bottom: 40px;
  }
  &__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px 10px;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      font-size: 12px;
      font-weight: bold;
      img {
        max-width: 90px;
        max-height: 90px;
      }
    }
  }
}
</style>
