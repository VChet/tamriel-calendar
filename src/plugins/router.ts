import { createRouter, createWebHistory } from "vue-router";
import { composeTitle } from "@/helpers/router";
import { i18n } from "@/plugins/i18n";
import { useSettingsStore } from "@/store/settings";

const OnboardingView = () => import("@/views/OnboardingView.vue");
const SearchView = () => import("@/views/SearchView.vue");

const CalendarView = () => import("@/views/CalendarView.vue");
const WeekView = () => import("@/views/calendar/WeekView.vue");
const MonthView = () => import("@/views/calendar/MonthView.vue");
const YearView = () => import("@/views/calendar/YearView.vue");

const HolidayView = () => import("@/views/HolidayView.vue");
const SummoningDayView = () => import("@/views/SummoningDayView.vue");
const ConstellationsView = () => import("@/views/ConstellationsView.vue");
const ConstellationView = () => import("@/views/ConstellationView.vue");
const MoonPhaseView = () => import("@/views/MoonPhaseView.vue");

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
      component: OnboardingView,
      meta: { titleToken: "router.onboarding" }
    },
    {
      path: "/search",
      name: "Search",
      component: SearchView,
      meta: { titleToken: "router.search" }
    },
    {
      path: "/calendar",
      name: "Calendar",
      component: CalendarView,
      meta: { titleToken: "router.calendar" },
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
      component: HolidayView,
      meta: { titleToken: "router.holiday" }
    },
    {
      path: "/calendar/summoning-day",
      name: "SummoningDay",
      component: SummoningDayView,
      meta: { titleToken: "router.summoningDay" }
    },
    {
      path: "/moon-phase",
      name: "Moon Phase",
      component: MoonPhaseView,
      meta: { titleToken: "router.moonPhase" }
    },
    {
      path: "/constellations",
      name: "Constellations",
      component: ConstellationsView,
      meta: { titleToken: "router.constellations" }
    },
    {
      path: "/constellations/:month",
      name: "Constellation",
      component: ConstellationView,
      meta: { titleToken: "router.constellation" }
    },
    {
      path: "/settings",
      name: "Settings",
      component: SettingsView,
      meta: { titleToken: "router.settings" }
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
  const token = to.matched[0].meta.titleToken;
  if (token) document.title = composeTitle(i18n.global.t(token));
});

export default router;
