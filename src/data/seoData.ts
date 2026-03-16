import { routeSeo, siteContent } from "@/data/content";

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
  title: `${title} | ${siteContent.brand.businessName} | ${siteContent.brand.serviceAreaLabel}`,
  description: `${title} across ${siteContent.brand.serviceAreaLabel}. Family-run roofing specialists with 30 years of experience, 24/7 support, and free quotes.`,
});

export const getAreaSEO = (name: string) => ({
  title: `Roofers in ${name} | ${siteContent.brand.businessName}`,
  description: `Roof replacement, roof repairs, emergency roofing, leadwork, chimneys, and roofline services in ${name}. Family-run, fully liability insured, and available across the wider Glasgow region.`,
});
