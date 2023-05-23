import { createRouter, createWebHistory } from "vue-router";
import OnboardingView from "@/views/OnboardingView.vue";
import CalendarView from "@/views/CalendarView.vue";
import BirthsignsView from "@/views/BirthsignsView.vue";
import BirthsignView from "@/views/BirthsignView.vue";
import SettingsView from "@/views/SettingsView.vue";
import WeekView from "@/views/calendar/WeekView.vue";
import MonthView from "@/views/calendar/MonthView.vue";
import YearView from "@/views/calendar/YearView.vue";
import FestivityView from "@/views/FestivityView.vue";
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
      component: OnboardingView
    },
    {
      path: "/calendar",
      name: "Calendar",
      component: CalendarView,
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
          path: "/week",
          name: "Week",
          component: WeekView
        },
        {
          path: "/month",
          name: "Month",
          component: MonthView
        },
        {
          path: "/year",
          name: "Year",
          component: YearView
        }
      ]
    },
    {
      path: "/festivity",
      name: "Festivity",
      component: FestivityView
    },
    {
      path: "/birthsigns",
      name: "Birthsigns",
      component: BirthsignsView
    },
    {
      path: "/birthsign/:sign",
      name: "Birthsign",
      component: BirthsignView
    },
    {
      path: "/settings",
      name: "Settings",
      component: SettingsView
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "Home", params: {} }
    }
  ]
});

router.beforeEach((to, _from, next) => {
  const hasOnboardingCookie = document.cookie.includes("onboarding=true");
  if (!hasOnboardingCookie && to.name !== "Onboarding") {
    next("/onboarding");
  } else {
    next();
  }
});

export default router;
