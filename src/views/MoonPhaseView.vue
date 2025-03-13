<template>
  <main class="moon-phase-view">
    <common-header search>
      {{ $t("moonPhase") }}
    </common-header>
    <section class="container">
      <div class="moon-phase-view__moons">
        <div class="moon-phase-view__moons-masser">
          <img :src="`/img/moons/masser/masser_${MoonPhase[phases.masser]}.webp`" :alt="MoonPhase[phases.masser]">
          <div class="moon-phase-view__title">
            {{ $t("moonPhasePage.masser") }}
          </div>
          {{ $t(`moonPhasePage.phases[${phases.masser}]`) }}
        </div>
        <div class="moon-phase-view__moons-secunda">
          <img :src="`/img/moons/secunda/secunda_${MoonPhase[phases.secunda]}.webp`" :alt="MoonPhase[phases.secunda]">
          <div class="moon-phase-view__title">
            {{ $t("moonPhasePage.secunda") }}
          </div>
          {{ $t(`moonPhasePage.phases[${phases.secunda}]`) }}
        </div>
      </div>
    </section>
  </main>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { currentDayOfYear } from "@/helpers/date";
import CommonHeader from "@/components/common-header.vue";

enum MoonPhase {
  newMoon = 0,
  oneWax,
  halfWax,
  threeWax,
  fullMoon,
  threeWan,
  halfWan,
  oneWan
}
const PHASE_AMOUNT = 8;
const MASSER_CYCLE = 24;
const SECUNDA_CYCLE = 8;

function getPhase(phase: number, cycle: number): MoonPhase {
  // The phase index is determined based on the lower boundary of the interval.
  const phaseIndex = Math.floor((phase / cycle) * PHASE_AMOUNT) % PHASE_AMOUNT;
  return phaseIndex satisfies MoonPhase;
}

const phases = computed(() => {
  const masserPhase = currentDayOfYear() % MASSER_CYCLE;
  const secundaPhase = currentDayOfYear() % SECUNDA_CYCLE;
  const masser = getPhase(masserPhase, MASSER_CYCLE);
  const secunda = getPhase(secundaPhase, SECUNDA_CYCLE);

  return { masser, secunda };
});
</script>
<style lang="scss">
.moon-phase-view {
  $size: 16rem;
  &__title {
    font-family: Literata, serif;
    font-size: 1.375rem;
  }
  &__moons {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    place-items: center;
    @media (width >= 768px) {
      grid-template-columns: 1fr 1fr;
    }
    > div {
      display: grid;
      grid-template-rows: repeat(3, min-content);
      gap: 1rem;
      place-items: center;
      @media (width >= 768px) {
        grid-template-rows: $size min-content min-content;
      }
    }
    &-masser img {
      width: $size;
      height: $size;
    }
    &-secunda img {
      width: calc($size / 2);
      height: calc($size / 2);
    }
  }
}
</style>
