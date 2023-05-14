<template>
  <main ref="swipeContainer">
    <header>
      <ul>
        <li>
          <RouterLink to="/week" class="tab">{{ $t("week") }}</RouterLink>
        </li>
        <li>
          <RouterLink to="/month" class="tab">{{ $t("month") }}</RouterLink>
        </li>
        <li>
          <RouterLink to="/year" class="tab">{{ $t("year") }}</RouterLink>
        </li>
      </ul>
    </header>
    <RouterView v-slot="{ Component }" class="container">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </RouterView>
  </main>
</template>

<script setup lang="ts">
import { useSwipe, type UseSwipeDirection } from "@vueuse/core";
import { ref } from "vue";
import { RouterLink, RouterView, useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const calendarPages = route.matched[0].children.map(({ name }) => name);

const currentPageIndex = ref(calendarPages.indexOf(route.name as string));
const swipeContainer = ref<HTMLElement | null>(null);
useSwipe(swipeContainer, {
  onSwipeEnd: (_: TouchEvent, direction: UseSwipeDirection) => {
    if (direction === "right" && currentPageIndex.value > 0) {
      navigateToPage(currentPageIndex.value - 1);
    } else if (direction === "left" && currentPageIndex.value < calendarPages.length - 1) {
      navigateToPage(currentPageIndex.value + 1);
    }
  }
});

function navigateToPage(pageIndex: number) {
  const name = calendarPages[pageIndex];
  router.push({ name });
  currentPageIndex.value = pageIndex;
}
</script>
<style lang="scss" scoped>
header {
  padding: 15px;
  border-bottom: 1px solid #b9b2a2;
  ul {
    display: flex;
    gap: 25px;
    justify-content: center;
    .tab {
      display: inline-block;
      padding: 6px 15px;
      color: var(--color-text);
      &.router-link-active {
        color: #fff;
        background-color: #52493a;
        border-radius: 24px;
      }
    }
  }
}
</style>
