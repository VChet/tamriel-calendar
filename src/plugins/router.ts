import { createRouter, createWebHistory } from "vue-router";
import { routes } from "vue-router/auto-routes";
import { composeTitle } from "@/helpers/router";
import { i18n } from "@/plugins/i18n";
import { useSettingsStore } from "@/store/settings";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    return Promise.resolve(savedPosition ?? { top: 0, left: 0 });
  }
});

router.beforeEach(() => {
  const { needRefresh, updateServiceWorker } = useSettingsStore();
  if (needRefresh) updateServiceWorker();
});
router.afterEach((to) => {
  const token = to.matched[0].meta.titleToken;
  if (token) document.title = composeTitle(i18n.global.t(token));
});

export default router;
