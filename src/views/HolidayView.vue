<template>
  <main>
    <common-header space-between :back="{ name: 'Calendar' }">
      <button v-if="isShareSupported" class="icon-button" type="button" @click="shareEvent">
        <icon-share3 />
      </button>
    </common-header>
    <section v-if="event" class="container content-card">
      <img
        v-if="event.image"
        class="content-card__image"
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
import { useRoute } from "vue-router";
import { useShare } from "@vueuse/core";
import IconShare3 from "~icons/tabler/share3";
import { useEventsStore } from "@/store/events";
import CommonHeader from "@/components/CommonHeader.vue";

const route = useRoute();
const date = route.query.date?.toString();
const { holidays } = useEventsStore();
const event = computed(() => (date ? holidays.get(date) : null));

const { share, isSupported: isShareSupported } = useShare();
function shareEvent() {
  if (!event.value) return;
  share({
    title: event.value.name,
    text: event.value.description,
    url: window.location.href
  });
}
</script>
