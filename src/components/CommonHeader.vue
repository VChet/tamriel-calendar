<template>
  <header class="common-header">
    <template v-if="!isSearchMode">
      <router-link
        v-if="backButtonRoute"
        class="icon-button common-header__back"
        type="button"
        :title="$t('back')"
        :to="backButtonRoute"
      >
        <icon-chevron-left />
      </router-link>
      <slot />
      <div v-if="$slots.right || search" class="common-header__right">
        <slot name="right" />
        <button v-if="search" class="icon-button" type="button" :title="$t('search')" @click="isSearchMode = true">
          <icon-search />
        </button>
      </div>
    </template>
    <div v-else class="search-mode">
      <search-input v-model="searchQuery" />
      <button class="link" type="button" @click="isSearchMode = false">
        {{ $t('cancel') }}
      </button>
    </div>
  </header>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { type RouteLocationRaw, useRouter } from "vue-router";
import SearchInput from "./SearchInput.vue";
import { useSearchStore } from "@/store/search";
import IconChevronLeft from "~icons/tabler/chevron-left";
import IconSearch from "~icons/tabler/search";

interface CommonHeaderProps {
  /** Back button fallback route */
  back?: RouteLocationRaw | null
  search?: boolean
}
const props = withDefaults(defineProps<CommonHeaderProps>(), { back: null, search: false });

const router = useRouter();
const { searchQuery } = useSearchStore();
const isSearchMode = computed<boolean>({
  get: () => router.currentRoute.value.name === "Search",
  set: (isSearch) => {
    isSearch ?
      router.push({ name: "Search" }) :
      router.back();
  }
});

const backButtonRoute = computed(() => {
  if (!props.back) return null;
  const previousRoute = router.options.history.state.back?.toString();
  return previousRoute ?? props.back;
});
</script>
<style lang="scss">
.common-header {
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
  &__back {
    margin-right: auto;
  }
  &__right {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    margin-left: auto;
  }
  .search-mode {
    display: flex;
    gap: 0.875rem;
    align-items: baseline;
    width: 100%;
    button {
      font-size: 16px;
    }
  }
}
</style>
