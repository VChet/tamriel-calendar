<template>
  <main>
    <header class="header header--left">
      <RouterLink class="icon-button" type="button" :title="$t('back')" :to="{ name: 'Birthsigns' }">
        <IconChevronLeft />
      </RouterLink>
    </header>
    <section v-if="sign" class="container birthsign">
      <img class="birthsign__image" :src="`/img/birthsigns/${sign.image}.svg`" :alt="sign.name" />
      <h1 class="birthsign__title">{{ sign.name }}</h1>
      <div v-if="dayjs(sign.month).isValid()" class="birthsign__subtitle">
        {{ $t("month") }} {{ dayjs(sign.month, "MM").format("MMMM") }}
      </div>
      <div class="birthsign__description">{{ sign.description }}</div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import dayjs from "dayjs";
import { computed } from "vue";
import { IconChevronLeft } from "@tabler/icons-vue";
import { useFestivitiesStore } from "@/store/festivities";

const route = useRoute();

const { birthsigns } = useFestivitiesStore();
const sign = computed(() => birthsigns.get(route.params.month.toString()));
</script>
<style lang="scss">
.birthsign {
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
