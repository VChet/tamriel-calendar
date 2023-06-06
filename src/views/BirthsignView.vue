<template>
  <main>
    <header class="header header--left">
      <RouterLink class="icon-button" type="button" :title="$t('back')" :to="{ name: 'Birthsigns' }">
        <icon-chevron-left />
      </RouterLink>
    </header>
    <section v-if="birthsign" class="container content-card">
      <img
        v-if="birthsign.image"
        class="content-card__image"
        :src="`/img/birthsigns/${birthsign.image}.svg`"
        :alt="birthsign.name"
      />
      <h1 class="content-card__title">{{ birthsign.name }}</h1>
      <div v-if="dayjs(birthsign.month).isValid()" class="content-card__subtitle">
        {{ $t("month") }} {{ dayjs(birthsign.month, "MM").format("MMMM") }}
      </div>
      <div class="content-card__description">{{ birthsign.description }}</div>
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
const birthsign = computed(() => birthsigns.get(route.params.month.toString()));
</script>
