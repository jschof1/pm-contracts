import { routeSeo } from "@/data/content";

export interface PageMetaData {
  url: string;
  bundleEntryPoint: string;
  path?: string;
  title: string;
  description: string;
  ogImage?: string;
  noindex?: boolean;
}

export const pages: PageMetaData[] = Object.entries(routeSeo).map(([path, seo]) => ({
  url: path === "/" ? "index.html" : `${path.slice(1)}/index.html`,
  bundleEntryPoint: "/src/main.tsx",
  path,
  title: seo.title,
  description: seo.description,
  ogImage: seo.ogImage,
  noindex: seo.noindex,
}));
