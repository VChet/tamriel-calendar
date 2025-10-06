<template>
  <main>
    <common-header search :back="{ name: 'Constellations' }">
      <template v-if="isShareSupported" #right>
        <button class="icon-button" type="button" @click="shareConstellation">
          <icon-share3 />
        </button>
      </template>
    </common-header>
    <section v-if="constellation" class="container content-card">
      <img
        v-if="constellation.image"
        class="invert content-card__image"
        :src="`/img/constellations/${constellation.image}.svg`"
        :alt="constellation.name"
      >
      <h1 class="content-card__title">
        {{ constellation.name }}
      </h1>
      <div v-if="isValidMonthIndex(constellation.date)" class="content-card__subtitle">
        {{ $t("month") }} {{ composeMonthNameFromDataEntry(constellation.date) }}
      </div>
      <div class="content-card__description">
        {{ constellation.description }}
      </div>
    </section>
  </main>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useShare } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { IconShare3 } from "@tabler/icons-vue";
import { useSeoMeta } from "@unhead/vue";
import { composeMonthNameFromDataEntry, isValidMonthIndex } from "@/helpers/date";
import { composeTitle } from "@/helpers/router";
import head from "@/plugins/head";
import { useEventsStore } from "@/store/events";
import CommonHeader from "@/components/common-header.vue";

const route = useRoute();
const { constellations } = useEventsStore();
const constellation = computed(() => constellations.get(route.params.month?.toString()));

const { t } = useI18n();
const title = computed<string>(() => {
  if (!constellation.value) return composeTitle(t(route.meta.titleToken!));
  return composeTitle(constellation.value.name);
});
const ogImage = computed<string | null>(() => {
  if (!constellation.value) return null;
  return `https://tamriel-calendar.netlify.app/img/constellations/${constellation.value?.image}.svg`;
});
useSeoMeta({
  title,
  description: constellation.value?.description,
  ogTitle: title,
  ogDescription: constellation.value?.description,
  ogImage,
  ogUrl: `https://tamriel-calendar.netlify.app${route.fullPath}`
}, { head });

const { share, isSupported: isShareSupported } = useShare();
function shareConstellation(): void {
  if (!constellation.value) return;
  share({
    title: constellation.value.name,
    text: constellation.value.description,
    url: window.location.href
  });
}
</script>
