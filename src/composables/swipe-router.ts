import { type TransitionProps, reactive } from "vue";

export function useSwipeRouter() {
  const pageTransition = reactive<TransitionProps>({
    name: "router-view",
    mode: "in-out"
  });

  function setPageTransition(value: "forward" | "back") {
    if (value === "forward") {
      pageTransition.name = "router-view";
      pageTransition.mode = "in-out";
    }
    if (value === "back") {
      pageTransition.name = "router-view-back";
      pageTransition.mode = "default";
    }
  }

  function afterEnter() {
    window.scrollTo(0, 0);
  }
  function afterLeave() {
    setPageTransition("forward");
  }

  return {
    pageTransition,
    setPageTransition,
    afterEnter,
    afterLeave
  };
}
