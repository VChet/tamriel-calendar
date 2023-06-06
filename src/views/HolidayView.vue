<template>
  <main>
    <header class="header header--left">
      <RouterLink class="icon-button" type="button" :title="$t('back')" :to="{ name: 'Calendar' }">
        <IconChevronLeft />
      </RouterLink>
    </header>
    <section v-if="festivity" class="container content-card">
      <img
        v-if="festivity.image"
        class="content-card__image"
        :src="`/img/festivities/${festivity.image}.svg`"
        :alt="festivity.name"
      />
      <h1 class="content-card__title">
        {{ festivity.name }}
      </h1>
      <div class="content-card__subtitle">{{ festivity.monthName }}</div>
      <div class="content-card__description">{{ festivity.description }}</div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { IconChevronLeft } from "@tabler/icons-vue";
import { useFestivitiesStore } from "@/store/festivities";

const route = useRoute();
const { date } = route.query;
const { holidays } = useFestivitiesStore();
const festivity = computed(() => (date ? holidays.get(date.toString()) : null));
</script>
