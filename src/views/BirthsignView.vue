<template>
  <main>
    <header class="header header--space-between">
      <router-link class="icon-button" type="button" :title="$t('back')" :to="{ name: 'Birthsigns' }">
        <icon-chevron-left />
      </router-link>
      <button v-if="isShareSupported" class="icon-button" type="button" @click="shareBirthign">
        <icon-share3 />
      </button>
    </header>
    <section v-if="birthsign" class="container content-card">
      <img
        v-if="birthsign.image"
        class="content-card__image"
        :src="`/img/birthsigns/${birthsign.image}.svg`"
        :alt="birthsign.name"
      >
      <h1 class="content-card__title">
        {{ birthsign.name }}
      </h1>
      <div v-if="dayjs(birthsign.date).isValid()" class="content-card__subtitle">
        {{ $t("month") }} {{ dayjs(birthsign.date, "MM").format("MMMM") }}
      </div>
      <div class="content-card__description">
        {{ birthsign.description }}
      </div>
    </section>
  </main>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useShare } from "@vueuse/core";
import dayjs from "dayjs";
import IconChevronLeft from "~icons/tabler/chevron-left";
import IconShare3 from "~icons/tabler/share3";
import { useEventsStore } from "@/store/events";

const route = useRoute();
const { birthsigns } = useEventsStore();
const birthsign = computed(() => birthsigns.get(route.params.month.toString()));

const { share, isSupported: isShareSupported } = useShare();
function shareBirthign() {
  if (!birthsign.value) return;
  share({
    title: birthsign.value.name,
    text: birthsign.value.description,
    url: window.location.href
  });
}
</script>
