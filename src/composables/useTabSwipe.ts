import { computed } from "vue";
import { useParentElement, useSwipe, type UseSwipeOptions } from "@vueuse/core";
import { useRouter } from "vue-router";
import type { RouteNamedKeys } from "@/types/router";

export function useTabSwipe(tabs: readonly RouteNamedKeys[], options?: UseSwipeOptions) {
  const router = useRouter();

  const currentTabIndex = computed<number>(() => tabs.indexOf(router.currentRoute.value.name));

  function navigate(index: number): void {
    router.replace({ name: tabs[index] });
  }

  const { isSwiping, direction } = useSwipe(useParentElement(), {
    onSwipeEnd(_event, swipeDirection) {
      if (swipeDirection === "right" && currentTabIndex.value > 0) {
        navigate(currentTabIndex.value - 1);
      } else if (swipeDirection === "left" && currentTabIndex.value < tabs.length - 1) {
        navigate(currentTabIndex.value + 1);
      }
    },
    ...options
  });

  const isLeftChevron = computed<boolean>(() => direction.value === "right" && currentTabIndex.value > 0);
  const isRightChevron = computed<boolean>(() => direction.value === "left" && currentTabIndex.value < tabs.length - 1);

  return {
    isSwiping,
    direction,
    isLeftChevron,
    isRightChevron
  };
}
