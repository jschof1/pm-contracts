import { areas } from "./areas.ts";
import { services } from "./services.ts";
import { routeSeo } from "./content.ts";

export const SITE_BASE_URL = "https://rooferglasgow.uk";

export interface RouteDefinition {
  path: string;
  noindex?: boolean;
  prerender?: boolean;
  includeInSitemap?: boolean;
}

const staticRoutes: RouteDefinition[] = Object.entries(routeSeo).map(([path, seo]) => ({
  path,
  noindex: seo.noindex,
  prerender: true,
  includeInSitemap: !seo.noindex,
}));

const projectRoutes: RouteDefinition[] = [
  "/projects/full-roof-replacement",
  "/projects/emergency-leak-repair",
  "/projects/leadwork-and-chimney-repair",
  "/projects/roofline-and-gutter-upgrade",
].map((path) => ({ path, prerender: true, includeInSitemap: true }));

const dynamicServiceRoutes: RouteDefinition[] = services.map((service) => ({
  path: `/${service.slug}`,
  prerender: true,
  includeInSitemap: true,
}));

const dynamicAreaRoutes: RouteDefinition[] = areas.map((area) => ({
  path: `/${area.slug}`,
  prerender: true,
  includeInSitemap: true,
}));

export const allRoutes: RouteDefinition[] = [
  ...staticRoutes,
  ...dynamicServiceRoutes,
  ...dynamicAreaRoutes,
  ...projectRoutes,
];

export const getPrerenderRoutes = (): string[] =>
  allRoutes.filter((route) => route.prerender !== false).map((route) => route.path);

export const getIndexableRoutes = (): string[] =>
  allRoutes
    .filter((route) => route.includeInSitemap !== false && !route.noindex)
    .map((route) => route.path);
