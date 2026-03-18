import { routeSeo, siteContent } from "@/data/content";
import { services } from "@/data/services";
import type { Area } from "@/data/areas";

const getRouteSeo = (path: string) => {
  const data = routeSeo[path];
  if (!data) {
    return {
      title: `${siteContent.brand.shortName} | ${siteContent.brand.serviceAreaLabel}`,
      description: `Trusted roofing and exterior repair services across ${siteContent.brand.serviceAreaLabel}.`,
    };
  }

  return {
    title: data.title,
    description: data.description,
  };
};

export const seoData = {
  homepage: getRouteSeo("/"),
  about: getRouteSeo("/about"),
  contact: getRouteSeo("/contact"),
  getQuote: getRouteSeo("/get-quote"),
  services: getRouteSeo("/services"),
  areas: getRouteSeo("/areas"),
  faq: getRouteSeo("/faq"),
  reviews: getRouteSeo("/reviews"),
  privacy: getRouteSeo("/privacy-policy"),
  terms: getRouteSeo("/terms-of-service"),
  feedback: getRouteSeo("/feedback"),
  discount: getRouteSeo("/discount"),
  specialOffer: getRouteSeo("/special-offer"),
  addCustomer: getRouteSeo("/add-customer"),
};

export const getServiceSEO = (title: string) => ({
  title: `${title} in Glasgow | ${siteContent.brand.businessName}`,
  description: `${title} in Glasgow and surrounding areas. Family-run roofers offering free quotes and fast response.`,
});

const seoRegionThemes: Record<Area["region"], string> = {
  "greater-glasgow": "Regular coverage across the wider Glasgow commuter belt.",
  "inverclyde-renfrewshire": "Practical support for coastal and inland properties exposed to tougher west-coast weather.",
  ayrshire: "Reliable roofing support across coastal and inland Ayrshire towns.",
  lanarkshire: "Dependable roofing support for busy households, landlords, and mixed property types across Lanarkshire.",
  "west-lothian-falkirk": "Clear roofing advice for established housing, commuter developments, and mixed-use property.",
  "fife-forth": "Straightforward roofing support across Fife and the Forth corridor.",
  "east-lothian-midlothian": "Trusted coverage across commuter towns, coastal communities, and expanding residential areas.",
  "stirling-clackmannanshire": "Dependable roofing support across central towns, villages, and mixed housing stock.",
};

const getServiceLabels = (slug: string) => {
  const title = services.find((service) => service.slug === slug)?.title ?? "Roofing Services";
  return {
    title,
    description: title.toLowerCase(),
  };
};

export const getAreaSEO = (area: Pick<Area, "name" | "region" | "popularServices">) => {
  const primaryService = getServiceLabels(area.popularServices[0] ?? "roof-repairs");
  const secondaryService = getServiceLabels(area.popularServices[1] ?? "roof-replacement");

  return {
    title: `${siteContent.brand.businessName} in ${area.name} | ${primaryService.title}`,
    description: `${primaryService.description} and ${secondaryService.description} in ${area.name}. ${seoRegionThemes[area.region]} Family-run roofers offering free quotes and clear advice.`,
  };
};
