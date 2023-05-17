<template>
  <main v-if="festivity">
    <header class="header">
      <button class="icon-button" type="button" @click="router.back">&lt;</button>
    </header>
    <section class="container festivity">
      <img
        v-if="festivity.image"
        class="festivity__image"
        :src="`/img/festivities/${festivity.image}.webp`"
        :alt="festivity.name"
      />
      <h1 class="festivity__title">{{ festivity.name }}</h1>
      <div class="festivity__subtitle">{{ festivity.monthName }}</div>
      <div class="festivity__description">{{ festivity.description }}</div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFestivitiesStore } from "@/store/festivities";

const route = useRoute();
const router = useRouter();
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
</script>
<style lang="scss">
.festivity {
  display: flex;
  flex-direction: column;
  &__image {
    align-self: center;
    max-width: 100%;
    margin-bottom: 40px;
  }
  &__title {
    font-size: 24px;
    font-weight: bold;
  }
  &__subtitle {
    margin-top: 16px;
    color: #a59e8c;
  }
  &__description {
    margin-top: 30px;
  }
}
</style>
