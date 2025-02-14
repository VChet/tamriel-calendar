import type { RouteRecordRaw } from "vue-router";
import { useHead } from "@unhead/vue";
import VWave from "v-wave";
import { ViteSSG } from "vite-ssg";
import { useSettingsStore } from "@/store/settings";
import { composeTitle } from "./helpers/router";
import { i18n } from "./plugins/i18n";
import "./assets/global.scss";
import App from "./App.vue";

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
const MoonPhaseView = () => import("@/views/MoonPhaseView.vue");

const SettingsView = () => import("@/views/SettingsView.vue");

const { settings, setLocale } = useSettingsStore();
setLocale(settings.value.locale);

const routes: RouteRecordRaw[] = [
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
    path: "/birthsigns",
    name: "Birthsigns",
    component: BirthsignsView,
    meta: { titleToken: "router.birthsigns" }
  },
  {
    path: "/birthsigns/:month",
    name: "Birthsign",
    component: BirthsignView,
    meta: { titleToken: "router.birthsign" }
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
];

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, router }) => {
    app.use(i18n).use(VWave, {});

    router.beforeEach(() => {
      const { needRefresh, updateServiceWorker } = useSettingsStore();
      if (needRefresh) updateServiceWorker();
    });
    router.afterEach((to) => {
      const token = to.matched[0].meta.titleToken;
      if (token) useHead({ title: composeTitle(i18n.global.t(token)) });
    });
  }
);
