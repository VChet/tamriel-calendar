<template>
  <div class="festivity-card">
    <div>
      <div class="festivity-card__title">
        {{ festivity.name }}
      </div>
      <div class="festivity-card__description">
        {{ festivity.description }}
      </div>
    </div>
    <img v-if="festivity.image" :src="festivity.image" />
  </div>
</template>

<script setup lang="ts">
import { Festivity } from "@/types/festivity";

defineProps<{ festivity: Festivity }>();
</script>
<style lang="scss">
.festivity-card {
  display: grid;
  grid-template-columns: 1fr 60px;
  gap: 15px;
  padding: 18px;
  background-color: #fffdf6;
  border-radius: 16px;
  &__title {
    margin-bottom: 10px;
    font-weight: bold;
  }
  &__description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 14px;
  }
}
</style>
