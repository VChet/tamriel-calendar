<template>
  <header :class="classList">
    <router-link v-if="back" class="icon-button" type="button" :title="$t('back')" :to="back">
      <icon-chevron-left />
    </router-link>
    <slot />
  </header>
</template>
<script setup lang="ts">
import { computed } from "vue";
import type { RouteLocationRaw } from "vue-router";
import IconChevronLeft from "~icons/tabler/chevron-left";

interface CommonHeaderProps {
  back?: RouteLocationRaw | null
  spaceBetween?: boolean
}
const props = withDefaults(defineProps<CommonHeaderProps>(), { back: null, spaceBetween: false });
const classList = computed<Record<string, boolean>>(() => {
  const key = "header";
  return {
    [key]: true,
    [`${key}--space-between`]: props.spaceBetween
  };
});
</script>
<style lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.625rem;
  padding: 0 1rem;
  background-color: var(--color-beige);
  border-bottom: var(--divider);
  opacity: 0.94;
  &--left {
    justify-content: flex-start;
  }
  &--space-between {
    justify-content: space-between;
  }
}
</style>
