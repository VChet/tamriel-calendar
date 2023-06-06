import { createRouter, createWebHistory } from "vue-router";
import OnboardingView from "@/views/OnboardingView.vue";
import CalendarView from "@/views/CalendarView.vue";
import BirthsignsView from "@/views/BirthsignsView.vue";
import BirthsignView from "@/views/BirthsignView.vue";
import SettingsView from "@/views/SettingsView.vue";
import WeekView from "@/views/calendar/WeekView.vue";
import MonthView from "@/views/calendar/MonthView.vue";
import YearView from "@/views/calendar/YearView.vue";
import HolidayView from "@/views/HolidayView.vue";
import SummoningDayView from "@/views/SummoningDayView.vue";
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
          path: "/calendar/week",
          name: "Week",
          component: WeekView
        },
        {
          path: "/calendar/month",
          name: "Month",
          component: MonthView
        },
        {
          path: "/calendar/year",
          name: "Year",
          component: YearView
        }
      ]
    },
    {
      path: "/calendar/holiday",
      name: "Holiday",
      component: HolidayView
    },
    {
      path: "/calendar/summoning-day",
      name: "SummoningDay",
      component: SummoningDayView
    },
    {
      path: "/birthsigns",
      name: "Birthsigns",
      component: BirthsignsView
    },
    {
      path: "/birthsigns/:month",
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

router.beforeEach(() => {
  const { needRefresh, updateServiceWorker } = useSettingsStore();
  if (needRefresh) updateServiceWorker();
});

export default router;
