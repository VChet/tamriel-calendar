import "vue-router";
import type { RouteNamedMap } from "vue-router/auto-routes";

declare module "vue-router" {
  interface RouteMeta {
    titleToken?: string
  }
}

export type RouteNamedKeys = keyof RouteNamedMap;
