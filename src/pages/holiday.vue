<template>
  <main>
    <common-header search :back="{ name: 'Calendar' }">
      <template v-if="isShareSupported" #right>
        <button class="icon-button" type="button" @click="shareEvent">
          <icon-share3 />
        </button>
      </template>
    </common-header>
    <section v-if="event" class="container content-card">
      <img
        v-if="event.image"
        class="invert content-card__image"
        :src="`/img/events/${event.image}.svg`"
        :alt="event.name"
      >
      <h1 class="content-card__title">
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
import { useShare } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { IconShare3 } from "@tabler/icons-vue";
import { useSeoMeta } from "@unhead/vue";
import { composeTitle } from "@/helpers/router";
import head from "@/plugins/head";
import { useEventsStore } from "@/store/events";
import CommonHeader from "@/components/common-header.vue";

definePage({ meta: { titleToken: "router.holiday" } });

const route = useRoute("Holiday");
const date = route.query.date?.toString();
const { holidays } = useEventsStore();
const event = computed(() => (date ? holidays.get(date) : null));

const { t } = useI18n();
const title = computed<string>(() => {
  if (!event.value) return composeTitle(t(route.meta.titleToken!));
  return composeTitle(event.value.name);
});
const ogImage = computed<string | null>(() => {
  if (!event.value) return null;
  return `https://tamriel-calendar.netlify.app/img/events/${event.value?.image}.svg`;
});
useSeoMeta({
  title,
  description: event.value?.description,
  ogTitle: title,
  ogDescription: event.value?.description,
  ogImage,
  ogUrl: `https://tamriel-calendar.netlify.app${route.fullPath}`
}, { head });

const { share, isSupported: isShareSupported } = useShare();
function shareEvent(): void {
  if (!event.value) return;
  share({
    title: event.value.name,
    text: event.value.description,
    url: window.location.href
  });
}
</script>
