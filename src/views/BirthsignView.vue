<template>
  <main>
    <header class="header header--left">
      <button class="icon-button" type="button" @click="router.back">
        <IconChevronLeft />
      </button>
    </header>
    <section v-if="sign" class="container birthsign">
      <img class="birthsign__image" :src="`/img/birthsigns/${sign.image}.webp`" :alt="sign.name" />
      <h1 class="birthsign__title">{{ sign.name }}</h1>
      <div v-if="sign.month" class="birthsign__subtitle">
        {{ $t("month") }} {{ dayjs(sign.month, "MM").format("MMMM") }}
      </div>
      <div class="birthsign__description">{{ sign.description }}</div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import dayjs from "dayjs";
import { computed } from "vue";
import { IconChevronLeft } from "@tabler/icons-vue";
import { useFestivitiesStore } from "@/store/festivities";

const router = useRouter();
const route = useRoute();

const { birthsigns } = useFestivitiesStore();
const sign = computed(() => birthsigns.get(route.params.sign as string));
</script>
<style lang="scss">
.birthsign {
  display: flex;
  flex-direction: column;
  &__image {
    align-self: center;
    max-width: 100%;
    margin-bottom: 40px;
  }
  &__title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  &__subtitle {
    margin-top: 16px;
    color: #a59e8c;
  }
  &__description {
    margin-top: 30px;
  }
}
</style>
