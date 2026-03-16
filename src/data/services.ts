const heroImg = new URL("../assets/pm-contracts/image1.webp", import.meta.url).href;
const replacementImg = new URL("../assets/pm-contracts/image0.webp", import.meta.url).href;
const repairsImg = new URL("../assets/pm-contracts/image2.webp", import.meta.url).href;
const emergencyImg = new URL("../assets/pm-contracts/image3.webp", import.meta.url).href;
const leadworkImg = new URL("../assets/pm-contracts/image10.webp", import.meta.url).href;
const chimneyImg = new URL("../assets/pm-contracts/image11.webp", import.meta.url).href;
const coatingImg = new URL("../assets/pm-contracts/image13.webp", import.meta.url).href;
const roughcastingImg = new URL("../assets/pm-contracts/image14.webp", import.meta.url).href;
const skylightImg = new URL("../assets/pm-contracts/image15.webp", import.meta.url).href;
const guttersImg = new URL("../assets/pm-contracts/image16.webp", import.meta.url).href;
const dryRotImg = new URL("../assets/pm-contracts/image18.webp", import.meta.url).href;
const dampImg = new URL("../assets/pm-contracts/image19.webp", import.meta.url).href;

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ServiceImages {
  hero: string;
  main: string;
  gallery?: string[];
}

export interface Service {
  title: string;
  slug: string;
  description: string;
  heroText: string;
  images: ServiceImages;
  benefits: string[];
  features?: ServiceFeature[];
  process?: ProcessStep[];
  faqs?: FAQ[];
  galleryCount?: number;
  ctaText?: string;
  ctaSubtext?: string;
  benefitsTitle?: string;
  benefitsDescription?: string;
}

const standardProcess: ProcessStep[] = [
  {
    step: "1",
    title: "Free Roof Assessment",
    description: "We inspect the problem, assess access, and recommend the right repair or replacement option.",
  },
  {
    step: "2",
    title: "Clear Quote",
    description: "You receive a straightforward quote with the scope of work and pricing explained clearly.",
  },
  {
    step: "3",
    title: "Professional Work",
    description: "Our family-run team completes the job using practical methods and quality materials.",
  },
  {
    step: "4",
    title: "Final Walkthrough",
    description: "We check the completed work with you and leave the site tidy before sign-off.",
  },
];

export const services: Service[] = [
  {
    title: "Roof Replacement",
    slug: "roof-replacement",
    description: "Full roof replacement completed by a family-run roofing team with 30 years of experience.",
    heroText:
      "When your roof has reached the end of its life, we deliver dependable roof replacement with clear advice, quality workmanship, and a tidy finish.",
    images: { hero: heroImg, main: replacementImg, gallery: [replacementImg, coatingImg] },
    benefits: [
      "Pitched and flat roof replacement",
      "Clear recommendations before work starts",
      "Family-run service from quote to completion",
      "Fully liability insured workmanship",
      "Free roof inspections and quotes",
    ],
    process: standardProcess,
    faqs: [
      {
        question: "How do I know when I need a full roof replacement?",
        answer:
          "If repairs are no longer cost-effective, the roof structure is failing, or recurring leaks keep returning, we will explain whether replacement is the better long-term option.",
      },
    ],
    benefitsTitle: "Replace Your Roof With Confidence",
    benefitsDescription:
      "We focus on practical advice, honest pricing, and durable roofing work tailored to the condition of your property.",
  },
  {
    title: "Roof Repairs",
    slug: "roof-repairs",
    description: "Prompt roof repairs for slipped tiles, active leaks, weather damage, and general roof faults.",
    heroText:
      "From small leaks to visible storm damage, we carry out straightforward roof repairs that stop problems getting worse.",
    images: { hero: heroImg, main: repairsImg, gallery: [repairsImg, chimneyImg] },
    benefits: [
      "Leak tracing and repair",
      "Tile and ridge repairs",
      "Weather damage fixes",
      "Practical repair-first advice",
      "Domestic and commercial work",
    ],
    process: standardProcess,
    benefitsTitle: "Stop Roofing Problems Early",
    benefitsDescription:
      "Fast, honest repair work protects your property from further water ingress and avoids unnecessary replacement costs.",
  },
  {
    title: "Emergency Roof Repairs",
    slug: "emergency-roof-repairs",
    description: "24/7 emergency roofing response for urgent leaks and storm-related damage.",
    heroText:
      "When water is getting in or storm damage leaves your property exposed, we respond quickly to make the roof safe and secure.",
    images: { hero: heroImg, main: emergencyImg, gallery: [emergencyImg, repairsImg] },
    benefits: [
      "24/7 callout availability",
      "Rapid leak response",
      "Temporary make-safe works",
      "Storm and wind damage support",
      "Follow-on permanent repair options",
    ],
    process: standardProcess,
    benefitsTitle: "Urgent Roofing Help When You Need It",
    benefitsDescription:
      "Emergency roofing work is handled with urgency, clear communication, and a focus on protecting the property first.",
  },
  {
    title: "Leadwork",
    slug: "leadwork",
    description: "Lead flashing and leadwork repairs to protect roof junctions, valleys, and chimney details.",
    heroText:
      "Well-fitted leadwork is critical for waterproofing around vulnerable roof details. We repair and replace damaged lead where it matters most.",
    images: { hero: heroImg, main: leadworkImg, gallery: [leadworkImg] },
    benefits: [
      "Lead flashing repairs",
      "Chimney and valley detailing",
      "Weatherproof junction protection",
      "Compatible repairs for older roofs",
    ],
    process: standardProcess,
    benefitsTitle: "Protect The Weak Points In Your Roof",
    benefitsDescription:
      "Good leadwork stops persistent ingress issues around the details that often fail first in bad weather.",
  },
  {
    title: "Chimney Repairs",
    slug: "chimney-repairs",
    description: "Chimney repair work for cracks, loose masonry, lead flashings, and weather damage.",
    heroText:
      "Damaged chimney stacks can quickly lead to leaks and structural issues. We repair the visible faults before they become major problems.",
    images: { hero: heroImg, main: chimneyImg, gallery: [chimneyImg, leadworkImg] },
    benefits: [
      "Repointing and masonry repairs",
      "Lead flashing attention",
      "Storm damage repairs",
      "Safer, more watertight roofline",
    ],
    process: standardProcess,
    benefitsTitle: "Keep Your Chimney Safe And Sound",
    benefitsDescription:
      "Chimney problems are easier and cheaper to deal with when they are caught early by an experienced roofer.",
  },
  {
    title: "Skylight Repairs & Replacement",
    slug: "skylight-repairs",
    description: "Repairs and replacement for leaking or damaged skylights and roof windows.",
    heroText:
      "If your skylight is leaking, cracked, or no longer weather-tight, we can repair or replace it with a practical solution.",
    images: { hero: heroImg, main: skylightImg, gallery: [skylightImg] },
    benefits: [
      "Leak diagnostics and repair",
      "Replacement skylight fitting",
      "Improved weather protection",
      "Natural light preserved",
    ],
    process: standardProcess,
    benefitsTitle: "Sort Problem Skylights Properly",
    benefitsDescription:
      "We deal with common skylight failures before they create larger damp and internal damage issues.",
  },
  {
    title: "Roof & Wall Coatings",
    slug: "roof-and-wall-coatings",
    description: "Protective roof and wall coating services to refresh tired surfaces and improve weather resistance.",
    heroText:
      "A quality coating can improve appearance and help defend your roof and exterior walls from the Scottish weather.",
    images: { hero: heroImg, main: coatingImg, gallery: [coatingImg] },
    benefits: [
      "Refresh tired roof and wall finishes",
      "Improved surface protection",
      "Better kerb appeal",
      "Advice on whether coating is the right option",
    ],
    process: standardProcess,
    benefitsTitle: "Refresh And Protect Exposed Surfaces",
    benefitsDescription:
      "We keep the advice practical and only recommend coatings where they suit the condition of the property.",
  },
  {
    title: "Roughcasting",
    slug: "roughcasting",
    description: "Roughcasting work to protect exterior walls and improve the finish of the property.",
    heroText:
      "Where exterior walls need protection and a renewed finish, we carry out roughcasting work that supports the overall envelope of the building.",
    images: { hero: heroImg, main: roughcastingImg, gallery: [roughcastingImg] },
    benefits: [
      "Wall protection in exposed conditions",
      "Refreshed external finish",
      "Suitable for domestic property upgrades",
      "Integrated with wider repair work where needed",
    ],
    process: standardProcess,
    benefitsTitle: "Support Your Property Exterior",
    benefitsDescription:
      "Roughcasting can play an important role in long-term external protection when the walls need more than cosmetic attention.",
  },
  {
    title: "UPVC Gutters & Upgrades",
    slug: "upvc-gutters",
    description: "UPVC gutter replacement and roofline upgrades to improve drainage and tidy up the finish.",
    heroText:
      "We repair or replace damaged guttering and roofline elements to help keep rainwater moving away from the property properly.",
    images: { hero: heroImg, main: guttersImg, gallery: [guttersImg] },
    benefits: [
      "UPVC gutter replacement",
      "Improved roof drainage",
      "Cleaner roofline finish",
      "Reduced overflow and water staining risk",
    ],
    process: standardProcess,
    benefitsTitle: "Improve Drainage And Presentation",
    benefitsDescription:
      "Good guttering protects walls and foundations while also sharpening the appearance of the property.",
  },
  {
    title: "Dry Rot Repair",
    slug: "dry-rot-repair",
    description: "Targeted dry rot repair where roofing or moisture issues have started affecting timber elements.",
    heroText:
      "Where moisture ingress has led to timber damage, we carry out repair work that supports the wider roofing solution.",
    images: { hero: heroImg, main: dryRotImg, gallery: [dryRotImg] },
    benefits: [
      "Identify moisture-related timber damage",
      "Repair work linked to roof defects",
      "Practical advice on the underlying cause",
      "Combined repair packages where needed",
    ],
    process: standardProcess,
    benefitsTitle: "Fix The Cause, Not Just The Symptom",
    benefitsDescription:
      "Dry rot and timber issues often trace back to water ingress, so we look at the full problem rather than isolating one symptom.",
  },
  {
    title: "Damp Proofing",
    slug: "damp-proofing",
    description: "Damp proofing and moisture-management work for properties affected by persistent ingress problems.",
    heroText:
      "Persistent moisture problems can escalate quickly. We help identify likely external causes and carry out suitable repair work.",
    images: { hero: heroImg, main: dampImg, gallery: [dampImg] },
    benefits: [
      "Address moisture-related damage",
      "Roofing-led problem solving",
      "Suitable for ongoing damp concerns",
      "Clear explanation of the recommended fix",
    ],
    process: standardProcess,
    benefitsTitle: "Protect The Property Interior",
    benefitsDescription:
      "Where roof or exterior failures are contributing to damp, we prioritise practical repair work to reduce further damage.",
  },
];

export const getServiceData = (slug: string): Service | undefined => {
  return services.find((service) => service.slug === slug);
};

export const getAllServices = (): Service[] => services;
