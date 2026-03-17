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
  title: `${title} in Glasgow | ${siteContent.brand.businessName}`,
  description: `${title} in Glasgow and surrounding areas. Family-run roofers offering free quotes and fast response.`,
});

export const getAreaSEO = (name: string) => ({
  title: `Roofers in ${name} | ${siteContent.brand.businessName}`,
  description: `Roof repairs, roof replacement, leadwork, gutters, and emergency roofing in ${name}. Family-run roofers with free quotes and fast response.`,
});
