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
import { useRoute } from "vue-router";
import { useShare } from "@vueuse/core";
import { IconShare3 } from "@tabler/icons-vue";
import { useEventsStore } from "@/store/events";
import { composeMonthNameFromDataEntry, isValidMonthIndex } from "@/helpers/date";
import CommonHeader from "@/components/CommonHeader.vue";

const route = useRoute();
const { birthsigns } = useEventsStore();
const birthsign = computed(() => birthsigns.get(route.params.month?.toString()));

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
