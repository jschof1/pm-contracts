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

export interface AreaFAQ {
  question: string;
  answer: string;
}

export interface Area {
  name: string;
  slug: string;
  region: RegionKey;
  description: string;
  longDescription: string;
  nearbySummary: string;
  neighbourhoods: string[];
  keyFacts: string[];
  popularServices: string[];
  faqs: AreaFAQ[];
  projectsCompleted: number;
  yearsServing: number;
}

type RegionKey =
  | "greater-glasgow"
  | "inverclyde-renfrewshire"
  | "ayrshire"
  | "lanarkshire"
  | "west-lothian-falkirk"
  | "fife-forth"
  | "east-lothian-midlothian"
  | "stirling-clackmannanshire";

interface RegionProfile {
  coverageLine: string;
  contextLine: string;
  keyFactLine: string;
  visitLine: string;
  quoteLine: string;
  defaultServices: string[];
}

interface AreaSeed {
  name: string;
  slug: string;
  region: RegionKey;
  neighbourhoods: string[];
  projectsCompleted: number;
  localHighlight: string;
  serviceFocus?: string[];
}

const regionProfiles: Record<RegionKey, RegionProfile> = {
  "greater-glasgow": {
    coverageLine:
      "We regularly schedule roofing surveys, repair visits, and replacement work across the wider Glasgow commuter belt.",
    contextLine:
      "This part of the region includes a mix of established family housing, extensions, and newer estates, so roofing needs often range from isolated leak repairs to planned replacement work.",
    keyFactLine: "Strong coverage across Greater Glasgow for planned and urgent roofing jobs",
    visitLine:
      "For standard surveys we aim to book promptly, and we prioritise urgent leaks and storm-related problems where possible.",
    quoteLine:
      "Yes, we provide clear, no-obligation roofing quotes backed by practical recommendations rather than sales pressure.",
    defaultServices: ["roof-repairs", "roof-replacement", "emergency-roof-repairs"],
  },
  "inverclyde-renfrewshire": {
    coverageLine:
      "We cover coastal and inland property owners across Inverclyde and Renfrewshire with practical roofing support and straightforward scheduling.",
    contextLine:
      "Exposure to wind, driving rain, and salt air can make prompt roof repairs and reliable roofline maintenance especially important in this part of the west coast.",
    keyFactLine: "Experienced with coastal weather exposure and roofline issues",
    visitLine:
      "We can usually arrange a roofing visit quickly, and urgent weather-related issues are prioritised whenever diary space allows.",
    quoteLine:
      "Yes, we offer free roofing quotes for repairs, replacement work, gutters, and other exterior protection jobs.",
    defaultServices: ["roof-repairs", "emergency-roof-repairs", "upvc-gutters"],
  },
  ayrshire: {
    coverageLine:
      "We take on roofing work across Ayrshire for homeowners looking for reliable repair, replacement, and roofline support.",
    contextLine:
      "From coastal towns to inland communities, properties across Ayrshire often need sensible advice after prolonged bad weather and routine wear.",
    keyFactLine: "Reliable Ayrshire coverage for roof repairs, replacement, and guttering work",
    visitLine:
      "Survey times vary by location, but we aim to respond quickly and bring urgent roofing problems forward where we can.",
    quoteLine:
      "Yes, our quotes are free, clear, and tailored to the actual condition of the roof rather than a one-size-fits-all package.",
    defaultServices: ["roof-repairs", "upvc-gutters", "roof-replacement"],
  },
  lanarkshire: {
    coverageLine:
      "We work throughout Lanarkshire on roofing jobs for busy households, landlords, and commercial properties that need dependable follow-through.",
    contextLine:
      "The area includes everything from older town-centre stock to expanding residential developments, which means repair work and replacement planning are both common.",
    keyFactLine: "Consistent Lanarkshire coverage with family-run service and clear communication",
    visitLine:
      "We try to keep survey lead times sensible and move quickly on leaks, slipped materials, and storm-damage concerns.",
    quoteLine:
      "Yes, we provide free roofing quotations for repair work, replacements, leadwork, and roofline improvements.",
    defaultServices: ["roof-repairs", "roof-replacement", "chimney-repairs"],
  },
  "west-lothian-falkirk": {
    coverageLine:
      "We support customers across West Lothian and Falkirk with roofing work that is planned properly and explained clearly from the start.",
    contextLine:
      "These towns combine established housing, commuter developments, and mixed-use property, so customers often need a roofer who can handle both urgent repairs and longer-term remedial work.",
    keyFactLine: "Regular coverage across West Lothian and Falkirk for repairs and replacement work",
    visitLine:
      "We can usually arrange a site visit promptly and will always try to prioritise roofs with active leaks or weather damage.",
    quoteLine:
      "Yes, all roofing quotes are no-obligation and based on the condition of the roof, not guesswork.",
    defaultServices: ["roof-repairs", "roof-replacement", "leadwork"],
  },
  "fife-forth": {
    coverageLine:
      "We cover key towns around Fife and the Forth corridor for repair work, replacement projects, and roofline maintenance.",
    contextLine:
      "Properties in this corridor vary from long-established residential streets to newer developments, so roofing requirements can differ sharply from one job to the next.",
    keyFactLine: "Trusted coverage around Fife and the Forth for practical roofing support",
    visitLine:
      "We aim to book surveys without long delays and respond quickly when roof problems need urgent attention.",
    quoteLine:
      "Yes, we provide free quotes for roofing repairs, replacements, and related exterior works across this area.",
    defaultServices: ["roof-repairs", "roof-replacement", "upvc-gutters"],
  },
  "east-lothian-midlothian": {
    coverageLine:
      "We travel across East Lothian, Midlothian, and the Edinburgh side of our service radius for reliable roofing and roofline work.",
    contextLine:
      "This area includes dense commuter towns, coastal communities, and expanding residential locations, so roofing needs can range from routine repairs to more involved replacement projects.",
    keyFactLine: "Wide East Lothian and Midlothian coverage with straightforward roofing advice",
    visitLine:
      "We usually arrange survey visits promptly, with urgent callouts prioritised for leaks, storm damage, and safety-related issues.",
    quoteLine:
      "Yes, we offer clear, no-obligation quotes for roofing repairs, replacement work, leadwork, and associated exterior upgrades.",
    defaultServices: ["roof-repairs", "roof-replacement", "leadwork"],
  },
  "stirling-clackmannanshire": {
    coverageLine:
      "We cover Stirling and Clackmannanshire for roofing work where property owners want a dependable team and a tidy finish.",
    contextLine:
      "Across this area we see a broad spread of older homes, village properties, and modern developments, which makes practical roof inspections especially valuable before work is scoped.",
    keyFactLine: "Active coverage across Stirling and Clackmannanshire for roofing and remedial work",
    visitLine:
      "We aim to attend quickly for standard surveys and bring urgent roof issues forward whenever possible.",
    quoteLine:
      "Yes, we provide free quotations with honest advice on whether a repair, replacement, or roofline fix makes the most sense.",
    defaultServices: ["roof-repairs", "roof-replacement", "chimney-repairs"],
  },
};

const regionImages: Record<RegionKey, string> = {
  "greater-glasgow": areaImages.glasgow,
  "inverclyde-renfrewshire": areaImages.greenock,
  ayrshire: areaImages.ayr,
  lanarkshire: areaImages.hamilton,
  "west-lothian-falkirk": areaImages.livingston,
  "fife-forth": areaImages.dunfermline,
  "east-lothian-midlothian": areaImages.edinburgh,
  "stirling-clackmannanshire": areaImages.stirling,
};

const descriptionVariants = [
  (name: string) => `Trusted roofing and roof repair services in ${name}.`,
  (name: string) => `Dependable roof repairs and roofing services across ${name}.`,
  (name: string) => `Family-run roofing, roof repair, and emergency roofing support in ${name}.`,
  (name: string) => `Professional roofing and exterior repair services in ${name}.`,
];

const longDescriptionVariants = [
  (name: string, localHighlight: string, profile: RegionProfile) =>
    `PM Roofers provides roofing, roof repairs, emergency callouts, and exterior property repair services in ${name}. ${localHighlight} ${profile.coverageLine} We focus on practical advice, honest communication, and high-quality workmanship for homeowners and commercial clients across ${name}.`,
  (name: string, localHighlight: string, profile: RegionProfile) =>
    `Homeowners and property managers in ${name} contact PM Roofers for roof repairs, replacement work, and urgent weather-related roofing issues. ${profile.contextLine} ${localHighlight} Our team keeps the process straightforward, from first inspection to clear quotation and tidy completion.`,
  (name: string, localHighlight: string, profile: RegionProfile) =>
    `If you need experienced roofers covering ${name}, PM Roofers handles everything from isolated leaks and storm damage to larger replacement and roofline jobs. ${localHighlight} ${profile.coverageLine} We work with a family-run approach, clear recommendations, and no unnecessary upselling.`,
  (name: string, localHighlight: string, profile: RegionProfile) =>
    `PM Roofers supports customers across ${name} with roofing repairs, replacement planning, and emergency attendance when urgent issues appear. ${profile.contextLine} ${localHighlight} We aim to give property owners in ${name} a fast response, honest scope of work, and a finish that lasts.`,
];

const keyFactLeadVariants = [
  (name: string) => `Trusted across ${name} with 30 years of roofing experience`,
  (name: string) => `Serving ${name} with practical roofing advice and reliable workmanship`,
  (name: string) => `Established family-run roofing support for customers in ${name}`,
  (name: string) => `Experienced roofers covering ${name} and surrounding areas`,
];

const faqVariants = [
  (seed: AreaSeed, profile: RegionProfile): AreaFAQ[] => [
    {
      question: `Do you cover all of ${seed.name}?`,
      answer: `Yes, we cover ${seed.name}, including ${seed.neighbourhoods[0]} and ${seed.neighbourhoods[1]}, as well as nearby streets and surrounding spots where it fits our service radius. ${profile.coverageLine}`,
    },
    {
      question: `How quickly can you visit a property in ${seed.name}?`,
      answer: `${profile.visitLine} If the roof problem is urgent, let us know when you call and we will do our best to prioritise it.`,
    },
    {
      question: `Do you provide free roofing quotes in ${seed.name}?`,
      answer: `${profile.quoteLine} That includes roof repairs, replacement work, guttering, leadwork, and related external repairs.`,
    },
  ],
  (seed: AreaSeed, profile: RegionProfile): AreaFAQ[] => [
    {
      question: `Can you attend jobs across ${seed.name} and nearby areas?`,
      answer: `Yes. We work across ${seed.name} and the surrounding area, including ${seed.neighbourhoods[2]} and ${seed.neighbourhoods[3]}. ${profile.coverageLine}`,
    },
    {
      question: `What kind of roofing work do you handle in ${seed.name}?`,
      answer: `We take on roof repairs, replacement work, emergency roofing, roofline repairs, and related external remedial work depending on the condition of the property.`,
    },
    {
      question: `Can I get a no-obligation quote for work in ${seed.name}?`,
      answer: `${profile.quoteLine} We will inspect the roof, explain the issue clearly, and recommend the most sensible option for the job.`,
    },
  ],
  (seed: AreaSeed, profile: RegionProfile): AreaFAQ[] => [
    {
      question: `Are you available for urgent roof problems in ${seed.name}?`,
      answer: `Yes, we handle urgent roof issues across ${seed.name} and the wider area. ${profile.visitLine}`,
    },
    {
      question: `Do you only work on large roofing jobs in ${seed.name}?`,
      answer: `No. We handle both smaller repair jobs and larger replacement or remedial projects, depending on what the roof actually needs.`,
    },
    {
      question: `Do you offer free quotes for roofing work in ${seed.name}?`,
      answer: `${profile.quoteLine} We keep the quotation process clear and practical so you know exactly what has been recommended.`,
    },
  ],
  (seed: AreaSeed, profile: RegionProfile): AreaFAQ[] => [
    {
      question: `Which parts of ${seed.name} do you cover?`,
      answer: `We cover all of ${seed.name}, including areas such as ${seed.neighbourhoods.join(", ")}, alongside nearby locations within our normal service range.`,
    },
    {
      question: `Can you inspect leaking or storm-damaged roofs in ${seed.name}?`,
      answer: `Yes. We inspect leaking roofs, slipped materials, storm damage, and wider roofing defects across ${seed.name}. ${profile.visitLine}`,
    },
    {
      question: `Will you quote for repairs as well as full replacements in ${seed.name}?`,
      answer: `Yes. We quote for targeted repairs, full replacements, and related roofline or leadwork jobs depending on what the survey shows.`,
    },
  ],
];

const createArea = (seed: AreaSeed, index: number): Area => {
  const profile = regionProfiles[seed.region];
  const popularServices = seed.serviceFocus ?? profile.defaultServices;

  return {
    name: seed.name,
    slug: seed.slug,
    region: seed.region,
    description: descriptionVariants[index % descriptionVariants.length](seed.name),
    longDescription:
      longDescriptionVariants[index % longDescriptionVariants.length](
        seed.name,
        seed.localHighlight,
        profile
      ),
    nearbySummary: seed.localHighlight,
    neighbourhoods: seed.neighbourhoods,
    keyFacts: [
      keyFactLeadVariants[index % keyFactLeadVariants.length](seed.name),
      "Family-run and fully liability insured",
      profile.keyFactLine,
    ],
    popularServices,
    faqs: faqVariants[index % faqVariants.length](seed, profile),
    projectsCompleted: seed.projectsCompleted,
    yearsServing: 30,
  };
};

const areaSeeds: AreaSeed[] = [
  {
    name: "Glasgow",
    slug: "glasgow",
    region: "greater-glasgow",
    neighbourhoods: ["City Centre", "Dennistoun", "Pollokshields", "Cardonald"],
    projectsCompleted: 220,
    localHighlight:
      "Glasgow remains one of our busiest service areas, where customers typically need a fast roofer who can inspect, quote clearly, and keep work moving without unnecessary delays.",
  },
  {
    name: "Edinburgh",
    slug: "edinburgh",
    region: "east-lothian-midlothian",
    neighbourhoods: ["Morningside", "Leith", "Corstorphine", "Newington"],
    projectsCompleted: 150,
    localHighlight:
      "Edinburgh customers tend to value detailed surveys, tidy workmanship, and clear communication before larger roofing jobs are booked in.",
  },
  {
    name: "Paisley",
    slug: "paisley",
    region: "inverclyde-renfrewshire",
    neighbourhoods: ["Ralston", "Glenburn", "Foxbar", "Renfrew Road"],
    projectsCompleted: 98,
    localHighlight:
      "Paisley is a strong part of our west-side coverage, with regular demand for leak repairs, guttering work, and sensible replacement advice.",
  },
  {
    name: "East Kilbride",
    slug: "east-kilbride",
    region: "lanarkshire",
    neighbourhoods: ["St Leonards", "The Murray", "Westwood", "Greenhills"],
    projectsCompleted: 92,
    localHighlight:
      "In East Kilbride we often help homeowners who want practical roofing work on occupied family properties with minimal disruption.",
  },
  {
    name: "Livingston",
    slug: "livingston",
    region: "west-lothian-falkirk",
    neighbourhoods: ["Dedridge", "Howden", "Murieston", "Deans"],
    projectsCompleted: 80,
    localHighlight:
      "Livingston stays active for both reactive roof repairs and planned remedial work on homes where roofline issues have built up over time.",
  },
  {
    name: "Dunfermline",
    slug: "dunfermline",
    region: "fife-forth",
    neighbourhoods: ["Rosyth", "Pitreavie", "Duloch", "Abbeyview"],
    projectsCompleted: 74,
    localHighlight:
      "Dunfermline jobs often involve a mix of repair work and roofline upgrades, especially where customers want clear advice before committing to bigger works.",
  },
  {
    name: "Hamilton",
    slug: "hamilton",
    region: "lanarkshire",
    neighbourhoods: ["Bothwell", "Burnbank", "High Blantyre", "Chatelherault"],
    projectsCompleted: 88,
    localHighlight:
      "Hamilton is a regular service area for us, with homeowners often asking for prompt inspections after bad weather or when an older roof starts showing repeated defects.",
  },
  {
    name: "Cumbernauld",
    slug: "cumbernauld",
    region: "greater-glasgow",
    neighbourhoods: ["Condorrat", "Carrickstone", "Seafar", "Westfield"],
    projectsCompleted: 116,
    localHighlight:
      "Cumbernauld sits well within our active radius, making it a strong location for both urgent roofing visits and planned replacement work.",
  },
  {
    name: "Kirkcaldy",
    slug: "kirkcaldy",
    region: "fife-forth",
    neighbourhoods: ["Dysart", "Templehall", "Strathallan", "Thornton"],
    projectsCompleted: 66,
    localHighlight:
      "Kirkcaldy customers usually want straightforward advice on whether a roof needs a targeted repair, wider remedial work, or a longer-term replacement plan.",
  },
  {
    name: "Kilmarnock",
    slug: "kilmarnock",
    region: "ayrshire",
    neighbourhoods: ["Hurlford", "Crookedholm", "Onthank", "Riccarton"],
    projectsCompleted: 71,
    localHighlight:
      "Kilmarnock remains a solid Ayrshire location for practical roofing support, particularly where customers want a tidy job and honest pricing.",
  },
  {
    name: "Ayr",
    slug: "ayr",
    region: "ayrshire",
    neighbourhoods: ["Alloway", "Forehill", "Seafield", "Whitletts"],
    projectsCompleted: 69,
    localHighlight:
      "Ayr stays relevant for repair and replacement work where roof condition is affected by exposure, age, and ongoing maintenance demands.",
  },
  {
    name: "Coatbridge",
    slug: "coatbridge",
    region: "greater-glasgow",
    neighbourhoods: ["Bargeddie", "Carnbroe", "Kirkwood", "Whifflet"],
    projectsCompleted: 95,
    localHighlight:
      "Coatbridge is a regular roofing area for us thanks to straightforward travel access and steady demand for repair work on established housing stock.",
  },
  {
    name: "Greenock",
    slug: "greenock",
    region: "inverclyde-renfrewshire",
    neighbourhoods: ["Gourock", "Branchton", "Cartsdyke", "Larkfield"],
    projectsCompleted: 126,
    localHighlight:
      "Greenock remains one of our strongest west-coast service areas, where urgent leak issues and roofline maintenance come up regularly.",
  },
  {
    name: "Stirling",
    slug: "stirling",
    region: "stirling-clackmannanshire",
    neighbourhoods: ["Bridge of Allan", "Raploch", "Causewayhead", "Bannockburn"],
    projectsCompleted: 61,
    localHighlight:
      "Stirling customers often want experienced roofers who can inspect carefully, explain the issue plainly, and keep the work on schedule.",
  },
  {
    name: "Airdrie",
    slug: "airdrie",
    region: "greater-glasgow",
    neighbourhoods: ["Coatdyke", "Clarkston", "Chapelhall", "Glenmavis"],
    projectsCompleted: 83,
    localHighlight:
      "Airdrie is close enough to remain a practical area for quick surveys, responsive repair work, and larger roofing projects when needed.",
  },
  {
    name: "Bearsden",
    slug: "bearsden",
    region: "greater-glasgow",
    neighbourhoods: ["Westerton", "Mosshead", "Killermont", "Castlehill"],
    projectsCompleted: 58,
    localHighlight:
      "Bearsden homeowners typically want tidy roofing work on well-kept family properties, with careful attention to chimneys, lead details, and a finish that matches the rest of the home.",
    serviceFocus: ["roof-repairs", "leadwork", "roof-replacement"],
  },
  {
    name: "Bishopbriggs",
    slug: "bishopbriggs",
    region: "greater-glasgow",
    neighbourhoods: ["Auchinairn", "Cadder", "Jellyhill", "Wester Cleddens"],
    projectsCompleted: 57,
    localHighlight:
      "Bishopbriggs is a steady commuter-belt area where customers usually want fast inspection slots, practical repair advice, and roofing work planned cleanly around occupied homes.",
  },
  {
    name: "Kirkintilloch",
    slug: "kirkintilloch",
    region: "greater-glasgow",
    neighbourhoods: ["Hillhead", "Lenzie", "Merkland", "Waterside"],
    projectsCompleted: 54,
    localHighlight:
      "Kirkintilloch brings a mix of older roofs and later suburban housing, so customers often need measured advice on whether gradual wear calls for a targeted repair or wider remedial work.",
  },
  {
    name: "Lenzie",
    slug: "lenzie",
    region: "greater-glasgow",
    neighbourhoods: ["Lenzie Moss", "Kirkintilloch", "Whitegates", "Woodilee"],
    projectsCompleted: 44,
    localHighlight:
      "Lenzie jobs often call for careful inspection and tidy execution, especially where customers want works handled cleanly around occupied homes.",
  },
  {
    name: "Milngavie",
    slug: "milngavie",
    region: "greater-glasgow",
    neighbourhoods: ["Craigdhu", "Clober", "Mains Estate", "Baldernock"],
    projectsCompleted: 51,
    localHighlight:
      "Milngavie is well within our regular coverage and tends to generate enquiries for repairs, replacement planning, and weather-related roofing issues.",
  },
  {
    name: "Clydebank",
    slug: "clydebank",
    region: "greater-glasgow",
    neighbourhoods: ["Dalmuir", "Drumry", "Linnvale", "Yoker"],
    projectsCompleted: 64,
    localHighlight:
      "Clydebank combines established housing and busier mixed-use property, so customers often need practical roofing advice that balances urgency with budget.",
  },
  {
    name: "Renfrew",
    slug: "renfrew",
    region: "greater-glasgow",
    neighbourhoods: ["Braehead", "Dean Park", "Newmains", "Porterfield"],
    projectsCompleted: 55,
    localHighlight:
      "Renfrew is a useful location for fast site visits, and many jobs here start with leak tracing or roofline issues that need sorted before wider damage develops.",
  },
  {
    name: "Rutherglen",
    slug: "rutherglen",
    region: "greater-glasgow",
    neighbourhoods: ["Burnside", "Bankhead", "Fernhill", "Shawfield"],
    projectsCompleted: 56,
    localHighlight:
      "Rutherglen stays active for repair work on older roofs where timely intervention matters more than overcomplicated recommendations.",
  },
  {
    name: "Giffnock",
    slug: "giffnock",
    region: "greater-glasgow",
    neighbourhoods: ["Merrylee", "Williamwood", "Braidbar", "Orchard Park"],
    projectsCompleted: 46,
    localHighlight:
      "Giffnock customers often ask for roofing work that is planned neatly around busy households, especially where chimneys, flashings, and older roof details need dealt with carefully.",
    serviceFocus: ["roof-repairs", "leadwork", "roof-replacement"],
  },
  {
    name: "Newton Mearns",
    slug: "newton-mearns",
    region: "greater-glasgow",
    neighbourhoods: ["Mearnskirk", "Crookfur", "Maidenhill", "Westacres"],
    projectsCompleted: 49,
    localHighlight:
      "Newton Mearns is a strong area for planned remedial work on larger residential properties where valleys, roofline details, and longer-term replacement planning need looked at properly.",
    serviceFocus: ["roof-repairs", "roof-replacement", "leadwork"],
  },
  {
    name: "Barrhead",
    slug: "barrhead",
    region: "greater-glasgow",
    neighbourhoods: ["Auchenback", "Dovecothall", "Arthurlie", "Springhill"],
    projectsCompleted: 47,
    localHighlight:
      "Barrhead properties often need prompt roofing support after bad weather, particularly when smaller defects have been left unchecked for too long.",
  },
  {
    name: "Blantyre",
    slug: "blantyre",
    region: "greater-glasgow",
    neighbourhoods: ["High Blantyre", "Priestfield", "Stonefield", "Auchinraith"],
    projectsCompleted: 45,
    localHighlight:
      "Blantyre sits in a practical part of our radius for routine repairs, roof inspections, and replacement planning on occupied family homes.",
  },
  {
    name: "Bellshill",
    slug: "bellshill",
    region: "greater-glasgow",
    neighbourhoods: ["Orbiston", "Mossend", "Milnwood", "Hattonrigg"],
    projectsCompleted: 53,
    localHighlight:
      "Bellshill generates steady roofing enquiries where access is straightforward and customers want the issue diagnosed properly before work begins.",
  },
  {
    name: "Lennoxtown",
    slug: "lennoxtown",
    region: "greater-glasgow",
    neighbourhoods: ["Campsie Glen", "Milton of Campsie", "Clachan of Campsie", "Kirkintilloch"],
    projectsCompleted: 32,
    localHighlight:
      "Lennoxtown jobs often need a practical approach to access and exposure, especially on properties closer to the Campsie side where weather can punish smaller roofing defects more quickly.",
  },
  {
    name: "Croy",
    slug: "croy",
    region: "greater-glasgow",
    neighbourhoods: ["Croy Station", "Craiglinn", "Castlecary", "Kilsyth"],
    projectsCompleted: 30,
    localHighlight:
      "Croy is a smaller coverage point for us, but still a sensible area for repair work, roof inspections, and planned roofing jobs within the wider corridor.",
  },
  {
    name: "Port Glasgow",
    slug: "port-glasgow",
    region: "inverclyde-renfrewshire",
    neighbourhoods: ["Boglestone", "Devol", "Parklea", "Kingston"],
    projectsCompleted: 72,
    localHighlight:
      "Port Glasgow stays central to our west-coast coverage, where exposed weather and older roofing details can make quick leak repairs, flashing work, and dependable guttering especially important.",
    serviceFocus: ["roof-repairs", "upvc-gutters", "leadwork"],
  },
  {
    name: "Dumbarton",
    slug: "dumbarton",
    region: "inverclyde-renfrewshire",
    neighbourhoods: ["Silverton", "Brucehill", "Castlehill", "Dalreoch"],
    projectsCompleted: 50,
    localHighlight:
      "Dumbarton is a practical area for both reactive roofing work and planned remedial jobs where customers want solid advice before committing.",
  },
  {
    name: "Johnstone",
    slug: "johnstone",
    region: "inverclyde-renfrewshire",
    neighbourhoods: ["Spateston", "Thorn", "Kilbarchan", "Houston"],
    projectsCompleted: 48,
    localHighlight:
      "Johnstone often brings in roofing enquiries where a straightforward inspection and a realistic repair-versus-replacement recommendation make the biggest difference.",
  },
  {
    name: "Kilmacolm",
    slug: "kilmacolm",
    region: "inverclyde-renfrewshire",
    neighbourhoods: ["Quarrier's Village", "Bridge of Weir", "Port Glasgow", "Birkmyre"],
    projectsCompleted: 37,
    localHighlight:
      "Kilmacolm customers typically want careful survey work and a tidy standard of finish, especially on detached and traditional homes where chimneys, lead details, and presentation all matter.",
    serviceFocus: ["roof-repairs", "leadwork", "roof-replacement"],
  },
  {
    name: "Bridge of Weir",
    slug: "bridge-of-weir",
    region: "inverclyde-renfrewshire",
    neighbourhoods: ["Ranfurly", "Quarrier's Village", "Houston", "Kilmacolm"],
    projectsCompleted: 39,
    localHighlight:
      "Bridge of Weir is well suited to planned roofing work on residential properties where tidy scheduling, clear communication, and careful attention to roof details all matter.",
    serviceFocus: ["roof-repairs", "leadwork", "roof-replacement"],
  },
  {
    name: "Inverkip",
    slug: "inverkip",
    region: "inverclyde-renfrewshire",
    neighbourhoods: ["Inverkip Marina", "Wemyss Bay", "Gourock", "Lunderston Bay"],
    projectsCompleted: 34,
    localHighlight:
      "Inverkip properties can see tougher coastal exposure, so roof repairs and roofline maintenance need to be handled with weather resistance in mind.",
    serviceFocus: ["roof-repairs", "upvc-gutters", "emergency-roof-repairs"],
  },
  {
    name: "Wemyss Bay",
    slug: "wemyss-bay",
    region: "inverclyde-renfrewshire",
    neighbourhoods: ["Kelly", "Inverkip", "Skelmorlie", "Upper Wemyss Bay"],
    projectsCompleted: 31,
    localHighlight:
      "Wemyss Bay is a smaller coastal area for us, but still one where prompt attention to roof leaks, flashing issues, and gutters can prevent wider weather damage.",
    serviceFocus: ["roof-repairs", "upvc-gutters", "leadwork"],
  },
  {
    name: "Skelmorlie",
    slug: "skelmorlie",
    region: "inverclyde-renfrewshire",
    neighbourhoods: ["Meigle", "Wemyss Bay", "Largs", "Eglinton Estate"],
    projectsCompleted: 28,
    localHighlight:
      "Skelmorlie sits on an exposed coastal stretch, so roofing jobs here often focus on staying ahead of water ingress and persistent weather wear.",
    serviceFocus: ["roof-repairs", "upvc-gutters", "leadwork"],
  },
  {
    name: "Lochwinnoch",
    slug: "lochwinnoch",
    region: "inverclyde-renfrewshire",
    neighbourhoods: ["Howwood", "Kilbarchan", "Johnstone", "Castle Semple"],
    projectsCompleted: 29,
    localHighlight:
      "Lochwinnoch is a more outlying area within our radius, where customers usually want practical roofing help without waiting on a lengthy survey process.",
  },
  {
    name: "Largs",
    slug: "largs",
    region: "ayrshire",
    neighbourhoods: ["Netherhall", "Roddinghill", "Fairlie", "Southannan Sands"],
    projectsCompleted: 46,
    localHighlight:
      "Largs is a strong coastal location for roof repairs and roofline work, where sea-facing wind and rain can quickly turn slipped materials, flashing defects, and tired gutters into bigger issues.",
    serviceFocus: ["roof-repairs", "upvc-gutters", "emergency-roof-repairs"],
  },
  {
    name: "Fairlie",
    slug: "fairlie",
    region: "ayrshire",
    neighbourhoods: ["Fairlie Moor", "Largs", "Montfode", "Kelburn"],
    projectsCompleted: 26,
    localHighlight:
      "Fairlie is a smaller coastal coverage point, and jobs here often centre on keeping roofs watertight and roofline details in good order.",
    serviceFocus: ["roof-repairs", "upvc-gutters", "leadwork"],
  },
  {
    name: "West Kilbride",
    slug: "west-kilbride",
    region: "ayrshire",
    neighbourhoods: ["Seamill", "Portencross", "Crosbie", "Fairlie"],
    projectsCompleted: 33,
    localHighlight:
      "West Kilbride combines village housing with coastal exposure, so repair work here often needs to balance everyday maintenance issues with materials that stand up to repeated wind and rain.",
    serviceFocus: ["roof-repairs", "upvc-gutters", "roof-replacement"],
  },
  {
    name: "Ardrossan",
    slug: "ardrossan",
    region: "ayrshire",
    neighbourhoods: ["North Crescent", "Whitlees", "Montfode", "Saltcoats"],
    projectsCompleted: 38,
    localHighlight:
      "Ardrossan is another coastal town where we frequently see roofing defects linked to prolonged weather exposure, aging roofline materials, and repairs that have been left too long.",
    serviceFocus: ["roof-repairs", "upvc-gutters", "emergency-roof-repairs"],
  },
  {
    name: "Kilwinning",
    slug: "kilwinning",
    region: "ayrshire",
    neighbourhoods: ["Whitehirst Park", "Pennyburn", "Abbeylands", "Nethermains"],
    projectsCompleted: 35,
    localHighlight:
      "Kilwinning is a practical area for routine roofing repairs and replacement work where homeowners want a clear explanation before the job is booked.",
  },
  {
    name: "Irvine",
    slug: "irvine",
    region: "ayrshire",
    neighbourhoods: ["Bourtreehill", "Girdle Toll", "Dreghorn", "Marress"],
    projectsCompleted: 44,
    localHighlight:
      "Irvine brings in a broad mix of repair and replacement enquiries, particularly where roofs have seen gradual wear rather than one obvious failure point.",
  },
  {
    name: "Dalry",
    slug: "dalry",
    region: "ayrshire",
    neighbourhoods: ["Drakemyre", "Muinhead", "Highfield", "Kilbirnie"],
    projectsCompleted: 27,
    localHighlight:
      "Dalry is a smaller town within our Ayrshire coverage, where customers usually want efficient repair work and sensible recommendations on next steps.",
  },
  {
    name: "Kilbirnie",
    slug: "kilbirnie",
    region: "ayrshire",
    neighbourhoods: ["Longbar", "Glengarnock", "Dalry", "Ladeside"],
    projectsCompleted: 28,
    localHighlight:
      "Kilbirnie roofing jobs often involve addressing persistent defects before they develop into wider internal damage or recurring leaks.",
  },
  {
    name: "Beith",
    slug: "beith",
    region: "ayrshire",
    neighbourhoods: ["Barrmill", "Gateside", "Netherhouses", "Broadstone"],
    projectsCompleted: 25,
    localHighlight:
      "Beith is a practical outlying area for us, especially where customers need an experienced roofer to inspect and scope works without overcomplicating the process.",
  },
  {
    name: "Stewarton",
    slug: "stewarton",
    region: "ayrshire",
    neighbourhoods: ["Lainshaw", "Annick", "Dunlop", "Kingsford"],
    projectsCompleted: 29,
    localHighlight:
      "Stewarton tends to suit planned repair and replacement work on residential properties where tidy execution and clear timing both matter.",
  },
  {
    name: "Wishaw",
    slug: "wishaw",
    region: "lanarkshire",
    neighbourhoods: ["Craigneuk", "Coltness", "Cambusnethan", "Overtown"],
    projectsCompleted: 48,
    localHighlight:
      "Wishaw is a regular Lanarkshire area for us, with steady demand for repair work on roofs that have started to show recurring problems.",
  },
  {
    name: "Larkhall",
    slug: "larkhall",
    region: "lanarkshire",
    neighbourhoods: ["Ashgill", "Netherburn", "Merryton", "Chapelton"],
    projectsCompleted: 34,
    localHighlight:
      "Larkhall jobs often start with a survey to pin down whether a leak or defect can be repaired cleanly or needs wider remedial work.",
  },
  {
    name: "Carluke",
    slug: "carluke",
    region: "lanarkshire",
    neighbourhoods: ["Braidwood", "Ravenscraig", "Law", "Crossford"],
    projectsCompleted: 33,
    localHighlight:
      "Carluke is a good fit for homeowners who want straightforward roofing advice and a family-run team that keeps the work manageable.",
  },
  {
    name: "Stonehouse",
    slug: "stonehouse",
    region: "lanarkshire",
    neighbourhoods: ["Canderside", "Netherburn", "Birkwood", "Glassford"],
    projectsCompleted: 27,
    localHighlight:
      "Stonehouse is a smaller Lanarkshire location, but still a sensible area for targeted roof repairs and planned replacement work when needed.",
  },
  {
    name: "Strathaven",
    slug: "strathaven",
    region: "lanarkshire",
    neighbourhoods: ["Auchenheath", "Drumsagard", "Glassford", "Chapelton"],
    projectsCompleted: 30,
    localHighlight:
      "Strathaven enquiries often come from customers who want roofing work handled carefully on established homes, with clear advice on whether chimney, flashing, or broader roof repairs are the right next step.",
    serviceFocus: ["roof-repairs", "leadwork", "chimney-repairs"],
  },
  {
    name: "Lanark",
    slug: "lanark",
    region: "lanarkshire",
    neighbourhoods: ["New Lanark", "Riverside", "Kirkfieldbank", "Hyndford"],
    projectsCompleted: 31,
    localHighlight:
      "Lanark sits further out within our radius, so customers here usually value a roofer who arrives prepared and can assess older roof details, chimney work, and broader remedial needs from the first visit.",
    serviceFocus: ["roof-repairs", "chimney-repairs", "leadwork"],
  },
  {
    name: "Lesmahagow",
    slug: "lesmahagow",
    region: "lanarkshire",
    neighbourhoods: ["Blackwood", "Birkwood", "Netherhall", "Bankhead"],
    projectsCompleted: 24,
    localHighlight:
      "Lesmahagow is one of the more outlying Lanarkshire towns we cover, with repair jobs often focused on resolving weather-related defects quickly.",
  },
  {
    name: "Shotts",
    slug: "shotts",
    region: "lanarkshire",
    neighbourhoods: ["Salsburgh", "Harthill", "Dykehead", "Stane"],
    projectsCompleted: 26,
    localHighlight:
      "Shotts is a practical point in our wider Lanarkshire coverage where customers often need prompt roofing help rather than a drawn-out quotation process.",
  },
  {
    name: "Ferniegair",
    slug: "ferniegair",
    region: "lanarkshire",
    neighbourhoods: ["Hamilton", "Chatelherault", "Larkhall", "Meikle Earnock"],
    projectsCompleted: 18,
    localHighlight:
      "Ferniegair is a smaller part of our Hamilton-side coverage, and most jobs here are best served by a quick inspection and a clear plan of action.",
  },
  {
    name: "Bathgate",
    slug: "bathgate",
    region: "west-lothian-falkirk",
    neighbourhoods: ["Boghall", "Wester Inch", "Ballencrieff", "Torphichen"],
    projectsCompleted: 40,
    localHighlight:
      "Bathgate is a reliable location for both roof repairs and planned roofing works on homes where defects need addressed before they become repeat issues.",
  },
  {
    name: "Whitburn",
    slug: "whitburn",
    region: "west-lothian-falkirk",
    neighbourhoods: ["Greenrigg", "Polkemmet", "Longridge", "Heartlands"],
    projectsCompleted: 30,
    localHighlight:
      "Whitburn jobs often involve practical remedial work on residential roofs where a quick, honest recommendation is more useful than a hard sell.",
  },
  {
    name: "Broxburn",
    slug: "broxburn",
    region: "west-lothian-falkirk",
    neighbourhoods: ["Uphall", "Dechmont", "Pumpherston", "Winchburgh"],
    projectsCompleted: 34,
    localHighlight:
      "Broxburn is a solid commuter-belt area for us, especially where roof repairs need to be scheduled efficiently around busy households.",
  },
  {
    name: "Uphall",
    slug: "uphall",
    region: "west-lothian-falkirk",
    neighbourhoods: ["Uphall Station", "Broxburn", "Pumpherston", "Ecclesmachan"],
    projectsCompleted: 24,
    localHighlight:
      "Uphall is a smaller service point where customers usually need a dependable roofer to inspect the issue properly and keep the solution proportionate.",
  },
  {
    name: "Linlithgow",
    slug: "linlithgow",
    region: "west-lothian-falkirk",
    neighbourhoods: ["Blackness", "Bridgend", "Linlithgow Bridge", "Kingscavil"],
    projectsCompleted: 33,
    localHighlight:
      "Linlithgow customers often place a premium on clear workmanship standards and tidy completion, particularly on traditional and well-presented homes where chimneys, leadwork, and finish quality matter.",
    serviceFocus: ["roof-repairs", "leadwork", "chimney-repairs"],
  },
  {
    name: "Fauldhouse",
    slug: "fauldhouse",
    region: "west-lothian-falkirk",
    neighbourhoods: ["Breich", "Longridge", "Whitburn", "Stoneyburn"],
    projectsCompleted: 22,
    localHighlight:
      "Fauldhouse is within our wider West Lothian coverage and suits prompt roofing repairs, early-stage leak diagnosis, and straightforward quotations.",
  },
  {
    name: "West Calder",
    slug: "west-calder",
    region: "west-lothian-falkirk",
    neighbourhoods: ["Harburn", "Polbeth", "Addiewell", "Loganlea"],
    projectsCompleted: 23,
    localHighlight:
      "West Calder tends to bring in roofing jobs where property owners want practical guidance on whether a localised repair will solve the issue for the long term.",
  },
  {
    name: "Falkirk",
    slug: "falkirk",
    region: "west-lothian-falkirk",
    neighbourhoods: ["Bainsford", "Camelon", "Shieldhill", "Laurieston"],
    projectsCompleted: 42,
    localHighlight:
      "Falkirk is one of the stronger eastern coverage areas for us, with a good mix of reactive repairs, replacement projects, and roofline jobs.",
  },
  {
    name: "Bo'ness",
    slug: "boness",
    region: "west-lothian-falkirk",
    neighbourhoods: ["Deanfield", "Borrowstoun", "Kinneil", "Grangepans"],
    projectsCompleted: 25,
    localHighlight:
      "Bo'ness is a practical part of the Forth-side service area where customers often need help with aging roofs, chimney details, and weatherproofing work that stands up to Forth-side exposure.",
    serviceFocus: ["roof-repairs", "chimney-repairs", "leadwork"],
  },
  {
    name: "Rosyth",
    slug: "rosyth",
    region: "fife-forth",
    neighbourhoods: ["Camdean", "Park Road", "Admiralty", "Pitreavie"],
    projectsCompleted: 29,
    localHighlight:
      "Rosyth sits naturally within our Dunfermline-side coverage, making it a sensible location for inspections, repairs, and roofline maintenance work.",
  },
  {
    name: "Queensferry",
    slug: "queensferry",
    region: "fife-forth",
    neighbourhoods: ["South Queensferry", "Dalmeny", "Kirkliston", "Echline"],
    projectsCompleted: 24,
    localHighlight:
      "Queensferry jobs often need practical planning around Forth-side exposure, access, and traditional roof details, especially when a smaller defect needs fixed before weather pushes it further.",
  },
  {
    name: "Musselburgh",
    slug: "musselburgh",
    region: "east-lothian-midlothian",
    neighbourhoods: ["Fisherrow", "Wallyford", "Newcraighall", "Monktonhall"],
    projectsCompleted: 39,
    localHighlight:
      "Musselburgh is a strong east-side area for us, where customers commonly want quick leak diagnosis on a mix of older housing, busy family homes, and weather-exposed roofs closer to the coast.",
  },
  {
    name: "Dalkeith",
    slug: "dalkeith",
    region: "east-lothian-midlothian",
    neighbourhoods: ["Woodburn", "Eskbank", "Newbattle", "Mayfield"],
    projectsCompleted: 35,
    localHighlight:
      "Dalkeith is well suited to planned roofing work where the issue needs inspected carefully and explained clearly before the quote is finalised.",
  },
  {
    name: "Bonnyrigg",
    slug: "bonnyrigg",
    region: "east-lothian-midlothian",
    neighbourhoods: ["Poltonhall", "Rosewell", "Lasswade", "Burnbrae"],
    projectsCompleted: 31,
    localHighlight:
      "Bonnyrigg properties often need roofing help that is straightforward, neatly scheduled, and proportionate to the actual condition of the roof.",
  },
  {
    name: "Prestonpans",
    slug: "prestonpans",
    region: "east-lothian-midlothian",
    neighbourhoods: ["Port Seton", "Cockenzie", "Blindwells", "Tranent"],
    projectsCompleted: 28,
    localHighlight:
      "Prestonpans combines dense housing and coastal exposure, so repair work here often needs to address both water ingress and long-term weather wear.",
    serviceFocus: ["roof-repairs", "leadwork", "upvc-gutters"],
  },
  {
    name: "Tranent",
    slug: "tranent",
    region: "east-lothian-midlothian",
    neighbourhoods: ["Elphinstone", "Ormiston", "Windygoul", "Macmerry"],
    projectsCompleted: 29,
    localHighlight:
      "Tranent is a practical area for roofing surveys and remedial work where customers want fast feedback on whether repair or replacement is the better route.",
  },
  {
    name: "Haddington",
    slug: "haddington",
    region: "east-lothian-midlothian",
    neighbourhoods: ["Nungate", "Athal Crescent", "Lennoxlove", "Auburn"],
    projectsCompleted: 27,
    localHighlight:
      "Haddington customers usually want a roofer who can inspect thoroughly and scope works properly, especially on traditional properties where chimney repairs, leadwork, and careful detailing matter.",
    serviceFocus: ["roof-repairs", "leadwork", "chimney-repairs"],
  },
  {
    name: "Longniddry",
    slug: "longniddry",
    region: "east-lothian-midlothian",
    neighbourhoods: ["Seton Mains", "Macmerry", "Aberlady", "Prestonpans"],
    projectsCompleted: 21,
    localHighlight:
      "Longniddry is a smaller East Lothian location, but one where coastal weather exposure means fast roof repairs, dependable roofline work, and good flashing details still matter.",
    serviceFocus: ["roof-repairs", "upvc-gutters", "leadwork"],
  },
  {
    name: "Gorebridge",
    slug: "gorebridge",
    region: "east-lothian-midlothian",
    neighbourhoods: ["Newtongrange", "Temple", "Arniston", "Rosewell"],
    projectsCompleted: 22,
    localHighlight:
      "Gorebridge works well for planned residential roofing jobs where customers want practical guidance and realistic timescales.",
  },
  {
    name: "Pathhead",
    slug: "pathhead",
    region: "east-lothian-midlothian",
    neighbourhoods: ["Ford", "Cranstoun", "Fala", "Tynehead"],
    projectsCompleted: 18,
    localHighlight:
      "Pathhead is one of the smaller towns in our eastern coverage, where clear surveys and tidy repair work tend to matter most to homeowners.",
  },
  {
    name: "Dunblane",
    slug: "dunblane",
    region: "stirling-clackmannanshire",
    neighbourhoods: ["The Cathedral", "Newton", "Kinbuck", "Ashfield"],
    projectsCompleted: 28,
    localHighlight:
      "Dunblane customers often expect careful roofing work on traditional and higher-spec homes, particularly where finish quality, chimney details, and clear communication matter as much as speed.",
    serviceFocus: ["roof-repairs", "leadwork", "chimney-repairs"],
  },
  {
    name: "Bridge of Allan",
    slug: "bridge-of-allan",
    region: "stirling-clackmannanshire",
    neighbourhoods: ["Causewayhead", "Logie", "University", "Cornton"],
    projectsCompleted: 24,
    localHighlight:
      "Bridge of Allan is a natural extension of our Stirling coverage and suits planned roofing jobs on well-kept properties where tidy execution, leadwork, and overall presentation all matter.",
    serviceFocus: ["roof-repairs", "leadwork", "roof-replacement"],
  },
  {
    name: "Alloa",
    slug: "alloa",
    region: "stirling-clackmannanshire",
    neighbourhoods: ["Tullibody", "Fishcross", "Sauchie", "Clackmannan"],
    projectsCompleted: 32,
    localHighlight:
      "Alloa brings in a reliable mix of roof repairs and wider remedial work, especially where older housing stock has started to show repeated faults around slates, flashings, or roofline sections.",
  },
  {
    name: "Bannockburn",
    slug: "bannockburn",
    region: "stirling-clackmannanshire",
    neighbourhoods: ["St Ninians", "Whins of Milton", "Plean", "Cowie"],
    projectsCompleted: 20,
    localHighlight:
      "Bannockburn is a practical part of our Stirling-side service area for responsive roof repairs and straightforward quotations.",
  },
  {
    name: "Menstrie",
    slug: "menstrie",
    region: "stirling-clackmannanshire",
    neighbourhoods: ["Blairlogie", "Bridge of Allan", "Alva", "Logie"],
    projectsCompleted: 17,
    localHighlight:
      "Menstrie is a smaller coverage location, but still one where a careful roof inspection and sensible scope of work can save customers from repeat issues.",
  },
  {
    name: "Tullibody",
    slug: "tullibody",
    region: "stirling-clackmannanshire",
    neighbourhoods: ["Cambus", "Alloa", "Menstrie", "Fishcross"],
    projectsCompleted: 21,
    localHighlight:
      "Tullibody is well placed for routine roofing work where customers want reliable attendance and a practical explanation of the issue.",
  },
  {
    name: "Alva",
    slug: "alva",
    region: "stirling-clackmannanshire",
    neighbourhoods: ["Menstrie", "Tillicoultry", "Coalsnaughton", "Devonside"],
    projectsCompleted: 18,
    localHighlight:
      "Alva roofing jobs often need a sensible approach to inspection and repair planning, especially where ongoing wear has built up over several seasons.",
  },
  {
    name: "Clackmannan",
    slug: "clackmannan",
    region: "stirling-clackmannanshire",
    neighbourhoods: ["Kennet", "Forestmill", "Alloa", "Sauchie"],
    projectsCompleted: 16,
    localHighlight:
      "Clackmannan sits within our wider central-belt reach and suits property owners looking for clear recommendations and practical roofing support.",
  },
];

export const areas: Area[] = areaSeeds.map((seed, index) => createArea(seed, index));

export const getAreaData = (slug: string): Area | undefined => {
  return areas.find((area) => area.slug === slug);
};

export const getAreaImage = (slug: string): string => {
  const directImage = areaImages[slug];

  if (directImage) {
    return directImage;
  }

  const region = getAreaData(slug)?.region;
  return (region && regionImages[region]) ?? defaultAreaImg;
};

export const getNearbyAreas = (currentSlug: string, count: number = 4): Area[] => {
  const currentArea = getAreaData(currentSlug);

  if (!currentArea) {
    return areas.slice(0, count);
  }

  const rankArea = (area: Area) => {
    const sharedServices = area.popularServices.filter((service) =>
      currentArea.popularServices.includes(service)
    ).length;
    const sharedNeighbourhoodNames = area.neighbourhoods.filter((neighbourhood) =>
      currentArea.neighbourhoods.includes(neighbourhood)
    ).length;

    return {
      sameRegion: area.region === currentArea.region ? 1 : 0,
      sharedServices,
      sharedNeighbourhoodNames,
      projectsCompleted: area.projectsCompleted,
    };
  };

  return areas
    .filter((area) => area.slug !== currentSlug)
    .sort((left, right) => {
      const leftRank = rankArea(left);
      const rightRank = rankArea(right);

      return (
        rightRank.sameRegion - leftRank.sameRegion ||
        rightRank.sharedServices - leftRank.sharedServices ||
        rightRank.sharedNeighbourhoodNames - leftRank.sharedNeighbourhoodNames ||
        rightRank.projectsCompleted - leftRank.projectsCompleted ||
        left.name.localeCompare(right.name)
      );
    })
    .slice(0, count);
};
