<template>
  <main>
    <header class="header header--left">
      <RouterLink class="icon-button" type="button" :title="$t('back')" :to="{ name: 'Calendar' }">
        <icon-chevron-left />
      </RouterLink>
    </header>
    <section v-if="event" class="container content-card">
      <img
        v-if="event.image"
        class="content-card__image"
        :src="`/img/events/${event.image}.svg`"
        :alt="event.name"
      >
      <h1 class="content-card__title">
        {{ $t("eventPage.summoningDay") }}:
        {{ event.name }}
      </h1>
      <div class="content-card__subtitle">
        {{ event.monthName }}
      </div>
      <div class="content-card__description">
        {{ event.description }}
      </div>
    </section>
  </main>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import IconChevronLeft from "~icons/tabler/chevron-left";
import { useEventsStore } from "@/store/events";

const route = useRoute();
const { date } = route.query;
const { summoningDays } = useEventsStore();
const event = computed(() => (date ? summoningDays.get(date.toString()) : null));
</script>
