<template>
  <main>
    <common-header search :back="{ name: 'Birthsigns' }">
      <template v-if="isShareSupported" #right>
        <button class="icon-button" type="button" @click="shareBirthsign">
          <icon-share3 />
        </button>
      </template>
    </common-header>
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
      <div v-if="isValidMonthIndex(birthsign.date)" class="content-card__subtitle">
        {{ $t("month") }} {{ composeMonthNameFromDataEntry(birthsign.date) }}
      </div>
      <div class="content-card__description">
        {{ birthsign.description }}
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
import { useHead } from "@unhead/vue/legacy";
import { composeMonthNameFromDataEntry, isValidMonthIndex } from "@/helpers/date";
import { composeTitle } from "@/helpers/router";
import { useEventsStore } from "@/store/events";
import CommonHeader from "@/components/common-header.vue";

const route = useRoute();
const { birthsigns } = useEventsStore();
const birthsign = computed(() => birthsigns.get(route.params.month?.toString()));

const { t } = useI18n();
const title = computed<string>(() => {
  if (!birthsign.value) return composeTitle(t(route.meta.titleToken!));
  return composeTitle(birthsign.value.name);
});
const ogImage = computed<string | null>(() => {
  if (!birthsign.value) return null;
  return `https://tamriel-calendar.netlify.app/img/birthsigns/${birthsign.value?.image}.svg`;
});
useHead({
  title,
  meta: () => [
    { name: "description", content: birthsign.value?.description },
    { property: "og:title", content: title.value },
    { property: "og:description", content: birthsign.value?.description },
    { property: "og:image", content: ogImage.value },
    { property: "og:url", content: `https://tamriel-calendar.netlify.app${route.fullPath}` }
  ]
});

const { share, isSupported: isShareSupported } = useShare();
function shareBirthsign(): void {
  if (!birthsign.value) return;
  share({
    title: birthsign.value.name,
    text: birthsign.value.description,
    url: window.location.href
  });
}
</script>
