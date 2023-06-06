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
      component: () => import("@/views/CalendarView.vue"),
      redirect: { name: "Week" },
      beforeEnter(to, _from, next) {
        const { selectedCalendar } = useSettingsStore();
        if (selectedCalendar.value && to.name !== selectedCalendar.value) {
          next({ name: selectedCalendar.value });
        } else {
          next();
        }
      },
      children: [
        {
          path: "/calendar/week",
          name: "Week",
          component: () => import("@/views/calendar/WeekView.vue")
        },
        {
          path: "/calendar/month",
          name: "Month",
          component: () => import("@/views/calendar/MonthView.vue")
        },
        {
          path: "/calendar/year",
          name: "Year",
          component: () => import("@/views/calendar/YearView.vue")
        }
      ]
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
  ]
});

router.beforeEach(() => {
  const { needRefresh, updateServiceWorker } = useSettingsStore();
  if (needRefresh) updateServiceWorker();
});

export default router;
