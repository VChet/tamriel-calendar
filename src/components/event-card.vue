<template>
  <router-link :to="{ name: routeName, query: { date: event.date } }">
    <div class="event-card">
      <div>
        <div class="event-card__title">
          {{ event.name }}
        </div>
        <div class="event-card__description">
          {{ event.description }}
        </div>
      </div>
      <img
        v-if="event.image"
        class="invert event-card__image"
        :src="`/img/events/${event.image}.svg`"
        :alt="`${event.name} illustration`"
      >
    </div>
  </router-link>
</template>
<script setup lang="ts">
import { Holiday, type SummoningDay } from "@/classes/Event";

const props = defineProps<{ event: Holiday | SummoningDay }>();
const routeName = props.event instanceof Holiday ? "Holiday" : "SummoningDay";
</script>
<style lang="scss">
.event-card {
  display: flex;
  gap: 0.75rem;
  height: 5rem;
  padding: 0.625rem 0.875rem 0.875rem;
  background-color: var(--color-inverted-text);
  border-radius: 1rem;
  &__title {
    margin-bottom: 0.125rem;
    font-size: 0.938rem;
    font-weight: bold;
  }
  &__description {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    font-size: 0.875rem;
    -webkit-box-orient: vertical;
  }
  &__image {
    margin-left: auto;
  }
}
</style>
