<template>
  <RouterLink :to="{ name: routeName, query: { date: festivity.date } }">
    <div class="festivity-card">
      <div>
        <div class="festivity-card__title">
          {{ festivity.name }}
        </div>
        <div class="festivity-card__description">
          {{ festivity.description }}
        </div>
      </div>
      <img
        v-if="festivity.image"
        :src="`/img/festivities/${festivity.image}.svg`"
        :alt="`${festivity.name} illustration`"
      >
    </div>
  </RouterLink>
</template>
<script setup lang="ts">
import type { SummoningDay } from "@/classes/Festivity";
import { Holiday } from "@/classes/Festivity";

const props = defineProps<{ festivity: Holiday | SummoningDay }>();
const routeName = props.festivity instanceof Holiday ? "Holiday" : "SummoningDay";
</script>
<style lang="scss">
.festivity-card {
  display: flex;
  gap: 0.75rem;
  height: 5rem;
  padding: 0.625rem 0.875rem 0.875rem;
  background-color: var(--color-white);
  border-radius: 1rem;
  &__title {
    margin-bottom: 0.125rem;
    font-size: 0.938rem;
    font-weight: bold;
  }
  &__description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 0.875rem;
  }
}
</style>
