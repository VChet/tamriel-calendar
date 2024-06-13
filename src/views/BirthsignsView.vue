<template>
  <main class="birthsigns-view">
    <common-header search />
    <section class="container">
      <h1>{{ $t("birthsigns") }}</h1>
      <ul class="birthsigns-view__list">
        <router-link
          v-for="sign in birthsigns.values()"
          :key="sign.name"
          v-slot="{ navigate }"
          :to="{ name: 'Birthsign', params: { month: sign.date } }"
          custom
        >
          <li role="link" @click="navigate">
            <img :src="`/img/birthsigns/${sign.image}.svg`" :alt="sign.name">
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
import CommonHeader from "@/components/CommonHeader.vue";

const { birthsigns: data } = useEventsStore();
const birthsigns = [...data.values()].sort((a, b) => Number(a.date) - Number(b.date));
</script>
<style lang="scss">
.birthsigns-view {
  h1 {
    margin-bottom: 3.125rem;
    font-family: Literata, serif;
    font-size: 1.625rem;
    font-weight: 600;
  }
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
          color: var(--color-red);
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
