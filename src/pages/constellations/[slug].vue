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
import { useShare } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { IconShare3 } from "@tabler/icons-vue";
import { useSeoMeta } from "@unhead/vue";
import { composeMonthNameFromDataEntry, isValidMonthIndex } from "@/helpers/date";
import { composeTitle, findBySlug } from "@/helpers/router";
import head from "@/plugins/head";
import { useEventsStore } from "@/store/events";
import CommonHeader from "@/components/common-header.vue";

definePage({ meta: { titleToken: "router.constellation" } });

const route = useRoute("Constellations Slug");
const { constellations } = useEventsStore();
const constellation = findBySlug(constellations.values(), route.params.slug);

const { t } = useI18n();
const title = composeTitle(constellation?.name ?? t(route.meta.titleToken!));
const ogImage = constellation?.image ?
  `https://tamriel-calendar.netlify.app/img/constellations/${constellation.image}.svg` :
  null;
useSeoMeta({
  title,
  description: constellation?.description,
  ogTitle: title,
  ogDescription: constellation?.description,
  ogImage,
  ogUrl: `https://tamriel-calendar.netlify.app${route.fullPath}`
}, { head });

const { share, isSupported: isShareSupported } = useShare();
function shareConstellation(): void {
  if (!constellation) return;
  share({
    title: constellation.name,
    text: constellation.description,
    url: window.location.href
  });
}
</script>
