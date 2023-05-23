<template>
  <main class="container birthsigns-view">
    <h1>{{ $t("birthsigns") }}</h1>
    <ul class="birthsigns-view__list">
      <RouterLink
        v-for="sign in birthsigns.values()"
        :key="sign.name"
        v-slot="{ navigate }"
        :to="`/birthsign/${sign.month}`"
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
    font-size: 1.875rem;
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
      font-size: 0.75rem;
      font-weight: bold;
      cursor: pointer;
      &:hover {
        color: var(--color-highlight);
      }
      img {
        max-width: 120px;
        max-height: 120px;
      }
    }
  }
}
</style>
