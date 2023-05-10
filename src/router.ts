import { createRouter, createWebHistory } from "vue-router";
import CalendarView from "@/views/CalendarView.vue";
import BirthsignsView from "@/views/BirthsignsView.vue";
import SettingsView from "@/views/SettingsView.vue";
import WeekView from "@/views/calendar/WeekView.vue";
import MonthView from "@/views/calendar/MonthView.vue";
import YearView from "@/views/calendar/YearView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      redirect: { name: "Calendar" }
    },
    {
      path: "/calendar",
      name: "Calendar",
      component: CalendarView,
      redirect: { name: "Week" },
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
      path: "/birthsigns",
      name: "Birthsigns",
      component: BirthsignsView
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

export default router;
