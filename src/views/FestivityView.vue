<template>
  <main v-if="festivity">
    <header class="header header--left">
      <RouterLink class="icon-button" type="button" :title="$t('back')" :to="{ name: 'Calendar' }">
        <IconChevronLeft />
      </RouterLink>
    </header>
    <section class="container festivity">
      <img
        v-if="festivity.image"
        class="festivity__image"
        :src="`/img/festivities/${festivity.image}.svg`"
        :alt="festivity.name"
      />
      <h1 class="festivity__title">
        <template v-if="isSummoningDay">{{ $t("festivityPage.summoningDay") }}:</template>
        {{ festivity.name }}
      </h1>
      <div class="festivity__subtitle">{{ festivity.monthName }}</div>
      <div class="festivity__description">{{ festivity.description }}</div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { IconChevronLeft } from "@tabler/icons-vue";
import { useFestivitiesStore } from "@/store/festivities";

const route = useRoute();
const { type, date } = route.query;
const { holidays, summoningDays } = useFestivitiesStore();
const festivity = computed(() => {
  if (type === "holiday" && date) {
    return holidays.get(date.toString());
  } else if (type === "summoningDay" && date) {
    return summoningDays.get(date.toString());
  }
  return null;
});
const isSummoningDay = computed(() => type === "summoningDay");
</script>
<style lang="scss">
.festivity {
  display: flex;
  flex-direction: column;
  &__image {
    align-self: center;
    max-width: 100%;
    margin: 3.5rem 0 2.5rem;
  }
  &__title {
    font-family: Literata, serif;
    font-size: 1.625rem;
    font-weight: 600;
  }
  &__subtitle {
    margin-top: 0.375rem;
    font-weight: 500;
    color: var(--color-beige-dark);
    opacity: 0.4;
  }
  &__description {
    margin-top: 1rem;
  }
}
</style>
