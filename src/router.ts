/* eslint-disable ts/explicit-function-return-type */
import { createRouter, createWebHistory } from "vue-router";
import { useSettingsStore } from "./store/settings";

const OnboardingView = () => import("@/views/OnboardingView.vue");
const SearchView = () => import("@/views/SearchView.vue");

const CalendarView = () => import("@/views/CalendarView.vue");
const WeekView = () => import("@/views/calendar/WeekView.vue");
const MonthView = () => import("@/views/calendar/MonthView.vue");
const YearView = () => import("@/views/calendar/YearView.vue");

const HolidayView = () => import("@/views/HolidayView.vue");
const SummoningDayView = () => import("@/views/SummoningDayView.vue");
const BirthsignsView = () => import("@/views/BirthsignsView.vue");
const BirthsignView = () => import("@/views/BirthsignView.vue");

const SettingsView = () => import("@/views/SettingsView.vue");

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
      path: "/search",
      name: "Search",
      component: SearchView
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
  ],
  scrollBehavior(_to, _from, savedPosition) {
    return Promise.resolve(savedPosition ?? { top: 0, left: 0 });
  }
});

router.beforeEach(() => {
  const { needRefresh, updateServiceWorker } = useSettingsStore();
  if (needRefresh) updateServiceWorker();
});
router.afterEach((to) => {
  const name = to.matched[0].name?.toString();
  document.title = `${name} | Tamriel Calendar`;
});

export default router;
