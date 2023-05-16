<template>
  <main class="container birthsigns-view">
    <h1>{{ $t("birthsigns") }}</h1>
    <ul class="birthsigns-view__list">
      <RouterLink
        v-for="(sign, index) in birthsigns.values()"
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
import { useFestivitiesStore } from "@/store/festivities";
const { birthsigns } = useFestivitiesStore();
</script>
<style lang="scss">
.birthsigns-view {
  h1 {
    margin-bottom: 60px;
    font-size: 28px;
    font-weight: bold;
  }
  &__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 50px;
    justify-content: space-between;
    li {
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
      font-size: 12px;
      font-weight: bold;
      img {
        max-width: 120px;
        max-height: 120px;
      }
    }
  }
}
</style>
