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
import { UseSwipeDirection, useSwipe } from "@vueuse/core";
import { ref } from "vue";
import { RouterLink, RouterView, useRouter } from "vue-router";

const calendarPages = ["Week", "Month", "Year"];

const router = useRouter();

const currentPageIndex = ref(calendarPages.indexOf(router.currentRoute.value.name as string));
const swipeContainer = ref<HTMLElement>();
useSwipe(swipeContainer, {
  onSwipeEnd: (_: TouchEvent, direction: UseSwipeDirection) => {
    if (direction === "right" && currentPageIndex.value > 0) {
      router.push({ name: calendarPages[currentPageIndex.value - 1] });
      currentPageIndex.value = currentPageIndex.value - 1;
    } else if (direction === "left" && currentPageIndex.value < calendarPages.length - 1) {
      router.push({ name: calendarPages[currentPageIndex.value + 1] });
      currentPageIndex.value = currentPageIndex.value + 1;
    }
  }
});
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
