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
import { useShare } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { IconShare3 } from "@tabler/icons-vue";
import { useSeoMeta } from "@unhead/vue";
import { composeTitle, findBySlug } from "@/helpers/router";
import head from "@/plugins/head";
import { useEventsStore } from "@/store/events";
import CommonHeader from "@/components/common-header.vue";

definePage({ meta: { titleToken: "router.holiday" } });

const route = useRoute("Holiday Slug");
const { holidays } = useEventsStore();
const event = findBySlug(holidays.values(), route.params.slug);

const { t } = useI18n();
const title = composeTitle(event?.name ?? t(route.meta.titleToken!));
const ogImage = event?.image ?
  `https://tamriel-calendar.netlify.app/img/events/${event.image}.svg` :
  null;
useSeoMeta({
  title,
  description: event?.description,
  ogTitle: title,
  ogDescription: event?.description,
  ogImage,
  ogUrl: `https://tamriel-calendar.netlify.app${route.fullPath}`
}, { head });

const { share, isSupported: isShareSupported } = useShare();
function shareEvent(): void {
  if (!event) return;
  share({
    title: event.name,
    text: event.description,
    url: window.location.href
  });
}
</script>
