const defaultAreaImg = new URL("../assets/pm-contracts/image0.webp", import.meta.url).href;

const areaImages: Record<string, string> = {
  glasgow: new URL("../assets/pm-contracts/image1.webp", import.meta.url).href,
  edinburgh: new URL("../assets/pm-contracts/image2.webp", import.meta.url).href,
  paisley: new URL("../assets/pm-contracts/image3.webp", import.meta.url).href,
  "east-kilbride": new URL("../assets/pm-contracts/image10.webp", import.meta.url).href,
  livingston: new URL("../assets/pm-contracts/image11.webp", import.meta.url).href,
  dunfermline: new URL("../assets/pm-contracts/image13.webp", import.meta.url).href,
  hamilton: new URL("../assets/pm-contracts/image14.webp", import.meta.url).href,
  cumbernauld: new URL("../assets/pm-contracts/image15.webp", import.meta.url).href,
  kirkcaldy: new URL("../assets/pm-contracts/image16.webp", import.meta.url).href,
  kilmarnock: new URL("../assets/pm-contracts/image18.webp", import.meta.url).href,
  ayr: new URL("../assets/pm-contracts/image19.webp", import.meta.url).href,
  coatbridge: new URL("../assets/pm-contracts/image21.webp", import.meta.url).href,
  greenock: new URL("../assets/pm-contracts/image22.webp", import.meta.url).href,
  stirling: new URL("../assets/pm-contracts/image23.webp", import.meta.url).href,
  airdrie: new URL("../assets/pm-contracts/image24.webp", import.meta.url).href,
};

export const getAreaImage = (slug: string): string => areaImages[slug] ?? defaultAreaImg;

export interface AreaTestimonial {
  name: string;
  text: string;
  project: string;
  rating: number;
}

export interface AreaFAQ {
  question: string;
  answer: string;
}

export interface Area {
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  neighbourhoods: string[];
  keyFacts: string[];
  testimonial: AreaTestimonial;
  additionalTestimonials: AreaTestimonial[];
  popularServices: string[];
  faqs: AreaFAQ[];
  projectsCompleted: number;
  yearsServing: number;
}

const baseFaqs = (areaName: string): AreaFAQ[] => [
  {
    question: `Do you cover all of ${areaName}?`,
    answer: `Yes, we cover ${areaName} and nearby locations across our service radius. Contact us and we can confirm availability quickly.`,
  },
  {
    question: "How quickly can you visit?",
    answer:
      "For standard roofing surveys we can usually arrange a visit promptly, and for urgent roof issues we also offer a 24/7 emergency response.",
  },
  {
    question: "Do you provide free quotes?",
    answer:
      "Yes, we provide clear, no-obligation quotes before any work begins.",
  },
];

const createArea = (
  name: string,
  slug: string,
  neighbourhoods: string[],
  projectsCompleted: number,
  localHighlight?: string
): Area => ({
  name,
  slug,
  description: `Trusted roofing and roof repair services in ${name}.`,
  longDescription:
    `PM Contract provides roofing, roof repairs, emergency callouts, and exterior property repair services in ${name}. ${localHighlight ? localHighlight + " " : ""}We focus on practical advice, honest communication, and high-quality workmanship for homeowners and commercial clients across the ${name} area.`,
  neighbourhoods,
  keyFacts: [
    `Trusted in ${name} with 30 years of experience`,
    "Family-run and fully liability insured",
    "24/7 emergency roofing support available",
  ],
  testimonial: {
    name: "Local Client",
    text: `Great service in ${name} - honest advice, quick response, and the roofing work was completed to a high standard.`,
    project: "Roof Repair",
    rating: 5,
  },
  additionalTestimonials: [
    {
      name: `${name} Resident`,
      text: "Fantastic communication and a tidy, professional job from start to finish.",
      project: "Roof Replacement",
      rating: 5,
    },
    {
      name: "Homeowner",
      text: `Arrived on time in ${name} and sorted the issue quickly with no fuss.`,
      project: "Emergency Roof Repair",
      rating: 5,
    },
  ],
  popularServices: ["roof-repairs", "roof-replacement", "emergency-roof-repairs"],
  faqs: baseFaqs(name),
  projectsCompleted,
  yearsServing: 30,
});

export const areas: Area[] = [
  createArea("Glasgow", "glasgow", ["City Centre", "Bearsden", "Newton Mearns", "Pollokshields"], 220, "Glasgow is a major focus area for PM Contract, especially for homeowners searching for fast roof repair and dependable replacement work."),
  createArea("Edinburgh", "edinburgh", ["Morningside", "Leith", "Corstorphine", "Newington"], 150, "We support customers across Edinburgh with practical roofing solutions and clear communication from survey through to completion."),
  createArea("Paisley", "paisley", ["Ralston", "Glenburn", "Foxbar", "Renfrew Road"], 98, "Paisley properties regularly need prompt roof repair support after heavy weather, and we cover the area with straightforward, experienced service."),
  createArea("East Kilbride", "east-kilbride", ["St Leonards", "The Murray", "Westwood", "Greenhills"], 92, "From urgent leaks to full replacements, we help East Kilbride homeowners protect their properties with practical roofing work."),
  createArea("Livingston", "livingston", ["Dedridge", "Howden", "Murieston", "Deans"], 80, "Livingston is within our active service radius for roofing, external repairs, and weather-related callouts."),
  createArea("Dunfermline", "dunfermline", ["Rosyth", "Pitreavie", "Duloch", "Abbeyview"], 74, "We cover Dunfermline for roofing work where honest advice and a tidy finish matter just as much as speed."),
  createArea("Hamilton", "hamilton", ["Bothwell", "Burnbank", "High Blantyre", "Chatelherault"], 88, "Hamilton homeowners rely on us for prompt roof repairs, guttering upgrades, and replacement advice where needed."),
  createArea("Cumbernauld", "cumbernauld", ["Condorrat", "Carrickstone", "Seafar", "Westfield"], 116, "Cumbernauld sits close to our service base, making it a strong area for routine repairs and urgent roofing callouts."),
  createArea("Kirkcaldy", "kirkcaldy", ["Dysart", "Templehall", "Strathallan", "Thornton"], 66, "We travel to Kirkcaldy for selected roofing jobs where experience and clean communication are a priority."),
  createArea("Kilmarnock", "kilmarnock", ["Hurlford", "Crookedholm", "Onthank", "Riccarton"], 71, "Kilmarnock customers use PM Contract for practical roofing support with transparent recommendations and quick scheduling."),
  createArea("Ayr", "ayr", ["Alloway", "Forehill", "Seafield", "Whitletts"], 69, "Ayr falls within our wider coverage area for replacement work, repair jobs, and external weatherproofing support."),
  createArea("Coatbridge", "coatbridge", ["Bargeddie", "Carnbroe", "Kirkwood", "Whifflet"], 95, "Coatbridge is a regular roofing service area for PM Contract thanks to our focus on fast response and reliable workmanship."),
  createArea("Greenock", "greenock", ["Gourock", "Branchton", "Cartsdyke", "Larkfield"], 126, "Greenock is close to the business address and remains one of the strongest local areas for PM Contract's family-run roofing service."),
  createArea("Stirling", "stirling", ["Bridge of Allan", "Raploch", "Causewayhead", "Bannockburn"], 61, "We support Stirling customers looking for professional roof repairs and replacement planning without sales pressure."),
  createArea("Airdrie", "airdrie", ["Coatdyke", "Clarkston", "Chapelhall", "Glenmavis"], 83, "Airdrie homeowners can contact PM Contract for 24/7 roofing support, replacement advice, and external repair work."),
];

export const getAreaData = (slug: string): Area | undefined => {
  return areas.find((area) => area.slug === slug);
};

export const getNearbyAreas = (currentSlug: string, count: number = 4): Area[] => {
  const otherAreas = areas.filter((area) => area.slug !== currentSlug);
  return otherAreas.sort(() => Math.random() - 0.5).slice(0, count);
};
