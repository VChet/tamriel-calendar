<template>
  <main class="constellations-view">
    <common-header search>
      {{ $t("constellations") }}
    </common-header>
    <section class="container">
      <ul class="constellations-view__list">
        <router-link
          v-for="sign in constellations.values()"
          :key="sign.name"
          v-slot="{ navigate }"
          :to="{ name: 'Constellation', params: { month: sign.date } }"
          custom
        >
          <li role="link" @click="navigate">
            <img :src="`/img/constellations/${sign.image}.svg`" :alt="sign.name" class="invert">
            {{ sign.name }}
          </li>
        </router-link>
      </ul>
    </section>
  </main>
</template>
<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useEventsStore } from "@/store/events";
import CommonHeader from "@/components/common-header.vue";

const { constellations: data } = useEventsStore();
const constellations = [...data.values()].sort((a, b) => Number(a.date) - Number(b.date));
</script>
<style lang="scss">
.constellations-view {
  &__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem 1.25rem;
    justify-content: space-between;
    li {
      display: flex;
      flex-direction: column;
      gap: 0.875rem;
      align-items: center;
      font-size: 0.75rem;
      font-weight: bold;
      cursor: pointer;
      @media (hover: hover) {
        &:hover {
          color: var(--color-accent);
        }
      }
      img {
        max-width: 6.25rem;
        max-height: 6.25rem;
      }
    }
  }
}
</style>
