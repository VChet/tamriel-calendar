import { createRouter, createWebHistory } from "vue-router";
import { useSettingsStore } from "./store/settings";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      redirect: { name: "Calendar" }
    },
    {
      path: "/onboarding",
      name: "Onboarding",
      component: () => import("@/views/OnboardingView.vue")
    },
    {
      path: "/calendar",
      name: "Calendar",
      component: () => import("@/views/CalendarView.vue")
    },
    {
      path: "/calendar/holiday",
      name: "Holiday",
      component: () => import("@/views/HolidayView.vue")
    },
    {
      path: "/calendar/summoning-day",
      name: "SummoningDay",
      component: () => import("@/views/SummoningDayView.vue")
    },
    {
      path: "/birthsigns",
      name: "Birthsigns",
      component: () => import("@/views/BirthsignsView.vue")
    },
    {
      path: "/birthsigns/:month",
      name: "Birthsign",
      component: () => import("@/views/BirthsignView.vue")
    },
    {
      path: "/settings",
      name: "Settings",
      component: () => import("@/views/SettingsView.vue")
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "Home", params: {} }
    }
  ],
  scrollBehavior(_to, _from, savedPosition) {
    return Promise.resolve(savedPosition ?? { top: 0, left: 0 });
  }
});

router.beforeEach(() => {
  const { needRefresh, updateServiceWorker } = useSettingsStore();
  if (needRefresh) updateServiceWorker();
});

export default router;
