const googleLogo = new URL('../assets/logos/Google__G__logo.svg', import.meta.url).href;
const trustpilotLogo = new URL('../assets/logos/trustpilot.svg', import.meta.url).href;
const checkatradeLogo = new URL('../assets/certifications/Checkatrade-logo.webp', import.meta.url).href;
const safeContractorLogo = new URL('../assets/certifications/safe-contractor-20231106.svg', import.meta.url).href;
const trustMarkLogo = new URL('../assets/certifications/TrustMark-logo.webp', import.meta.url).href;

export interface NavLinkItem {
  title: string;
  href: string;
  description?: string;
}

export interface SeoEntry {
  title: string;
  description: string;
  ogImage?: string;
  noindex?: boolean;
}

export interface FAQCategory {
  title: string;
  faqs: Array<{ question: string; answer: string }>;
}

export interface HeaderContent {
  servicesMenu: NavLinkItem[];
  areasMenu: NavLinkItem[];
  mainLinks: NavLinkItem[];
  servicesLabel?: string;
  areasLabel?: string;
  viewAllServices?: string;
  viewAllServicesDesc?: string;
  viewAllAreas?: string;
  aboutLabel?: string;
}

export interface SiteContent {
  brand: {
    businessName: string;
    shortName: string;
    serviceAreaLabel: string;
    trustedByline: string;
  };
  cta: {
    primaryQuote: string;
    freeQuote: string;
    callNow: string;
    callUsNow: string;
    callback: string;
  };
  layout: {
    header: HeaderContent;
    footer: {
      companyBlurb: string;
      servicesLinks: NavLinkItem[];
      areasLinks: NavLinkItem[];
      bottomLinks: NavLinkItem[];
      workingHours: string;
      paymentLabel: string;
      contactLabel?: string;
    };
  };
  home: {
    seoPath: string;
    hero: {
      badgeReviews: string;
      badgeInsured: string;
      titlePart1: string;
      titlePart2: string;
      titlePart3: string;
      subtitle: string;
      experienceYears: string;
      benefits: string[];
    };
    urgency: {
      offer: string;
      slotsLeft: string;
    };
    about: {
      kicker: string;
      title: string;
      paragraphs: string[];
      stats: Array<{ number: string; label: string; iconName: string }>;
      cta: string;
    };
    services: {
      kicker: string;
      titlePart1: string;
      titlePart2: string;
      description: string;
      items: Array<{
        title: string;
        description: string;
        href: string;
        featured?: boolean;
        iconName: string;
      }>;
      ctaText: string;
      ctaButton: string;
      ctaBrowse: string;
    };
    process: {
      kicker: string;
      titlePart1: string;
      titlePart2: string;
      titlePart3: string;
      description: string;
      benefits: string[];
      directLineLabel: string;
      ctaButton: string;
      steps: Array<{
        step: string;
        title: string;
        description: string;
        highlight: string;
      }>;
    };
    beforeAfter: {
      kicker: string;
      title: string;
      description: string;
      ctaText: string;
      ctaButton: string;
      transformations: Array<{ location: string; project: string }>;
    };
    guarantee: {
      kicker: string;
      titlePart1: string;
      titlePart2: string;
      description: string;
      items: Array<{
        title: string;
        description: string;
        iconName: string;
      }>;
      includedTitle: string;
      includedItems: string[];
      ctaButton: string;
    };
    projects: {
      kicker: string;
      titlePart1: string;
      titlePart2: string;
      description: string;
      viewAll: string;
      ctaTitle: string;
      ctaDescription: string;
      ctaButton: string;
    };
    testimonials: {
      kicker: string;
      titlePart1: string;
      titlePart2: string;
      description: string;
      items: Array<{
        name: string;
        location: string;
        rating: number;
        text: string;
        date: string;
        verified: boolean;
      }>;
      ctaText: string;
      ctaButton: string;
      ctaBrowse: string;
    };
    objections: {
      kicker: string;
      title: string;
      description: string;
      items: Array<{
        question: string;
        answer: string;
        stat: string;
        statLabel: string;
        iconName: string;
      }>;
      ctaText: string;
      ctaButton: string;
    };
    faq: {
      kicker: string;
      title: string;
      description: string;
      viewAll: string;
      items: Array<{ question: string; answer: string }>;
    };
    areas: {
      kicker: string;
      titlePart1: string;
      titlePart2: string;
      description: string;
      viewAll: string;
    };
    cta: {
      kicker: string;
      titlePart1: string;
      titlePart2: string;
      description: string;
      benefits: Array<{ text: string; iconName: string }>;
    };
    trustSignals: {
      stats: Array<{ value: string; label: string }>;
      badges: Array<{
        name: string;
        rating: string;
        ratingLabel: string;
        logo: string;
        stars?: number;
        logoDark?: boolean;
      }>;
      certifications: Array<{ name: string; logo: string }>;
    };
  };
  about: {
    heroTitle: string;
    heroSubtitle: string;
    stats: Array<{ number: string; label: string }>;
    storyParagraphs: string[];
    teamTitle: string;
    teamDescription: string;
    teamBullets: string[];
    valuesIntro: string;
    values: Array<{ title: string; description: string }>;
  };
  faqPage: {
    heroTitle: string;
    heroSubtitle: string;
    categories: FAQCategory[];
    ctaTitle: string;
    ctaDescription: string;
    ctaContactLabel: string;
  };
  servicesPage: {
    heroTitle: string;
    heroSubtitle: string;
    heroPrimaryCta: string;
    heroSecondaryCtaPrefix: string;
    benefitsKicker: string;
    benefitsTitle: string;
    benefitsDescription: string;
    benefits: Array<{ title: string; description: string }>;
    guaranteedLabel: string;
    communicationLabel: string;
    ctaKicker: string;
    ctaTitlePart1: string;
    ctaTitlePart2: string;
    ctaTitlePart3: string;
    ctaDescription: string;
    ctaStats: Array<{ value: string; label: string }>;
  };
  areasPage: {
    breadcrumbLabel: string;
    heroTitle: string;
    heroSubtitle: string;
    heroTitlePart1: string;
    heroTitlePart2: string;
    heroPrimaryCta: string;
    heroSecondaryCtaPrefix: string;
    badgeLabel: string;
    sectionKickerSuffix: string;
    sectionTitlePart1: string;
    sectionTitlePart2: string;
    cardCtaLabel: string;
    loadMoreLabel: string;
    loadMoreSuffix: string;
    ctaKicker: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButtonLabel: string;
    ctaStats: Array<{ value: string; label: string }>;
  };
  contactPage: {
    heroTitle: string;
    heroSubtitle: string;
    infoCards: Array<{
      key: "phone" | "email" | "serviceArea" | "hours";
      title: string;
      subtext: string;
      href: string | null;
      contentType: "phone" | "email" | "address" | "text";
      content: string;
    }>;
    whyTitle: string;
    whyIntro: string;
    steps: Array<{ title: string; description: string }>;
    preferToTalkTitle: string;
    preferToTalkDescription: string;
    formTitle: string;
    formSubtitle: string;
    mapTitle: string;
    mapDescription: string;
  };
}

export const routeSeo: Record<string, SeoEntry> = {
  "/": {
    title: "PM Roofers | Roofers in Glasgow & Surrounding Areas",
    description:
      "Family-run roofing company offering roof repairs, roof replacement, emergency roofing, leadwork, roughcasting, and roofline services across Glasgow and surrounding areas.",
    ogImage: "https://pmroofers.com/pm-roofers-og.svg",
  },
  "/about": {
    title: "About PM Roofers | Family-Run Roofing Specialists",
    description:
      "Learn more about PM Roofers, a family-run roofing business with 30 years of experience, 24/7 support, and fully liability insured workmanship.",
    ogImage: "https://pmroofers.com/pm-roofers-og.svg",
  },
  "/contact": {
    title: "Contact PM Roofers | Free Roofing Quotes",
    description: "Contact PM Roofers for free roof inspections, quotes, and urgent roofing support across Glasgow, Greenock, and surrounding areas.",
    ogImage: "https://pmroofers.com/pm-roofers-og.svg",
  },
  "/faq": {
    title: "Roofing FAQs | PM Roofers",
    description: "Common questions about roof repairs, replacements, emergency callouts, leadwork, and roofing coverage from PM Roofers.",
    ogImage: "https://pmroofers.com/pm-roofers-og.svg",
  },
  "/services": {
    title: "Roofing Services | PM Roofers",
    description: "Roof replacement, roof repairs, emergency roofing, chimney repairs, leadwork, roughcasting, damp proofing, and more.",
    ogImage: "https://pmroofers.com/pm-roofers-og.svg",
  },
  "/areas": {
    title: "Areas We Cover | PM Roofers",
    description: "PM Roofers covers Glasgow, Greenock, and surrounding Scotland locations within a 60-mile service radius.",
    ogImage: "https://pmroofers.com/pm-roofers-og.svg",
  },
  "/reviews": {
    title: "Customer Reviews | PM Roofers",
    description: "Read what customers say about PM Roofers' roofing work, communication, and emergency response service.",
    ogImage: "https://pmroofers.com/pm-roofers-og.svg",
  },
  "/feedback": {
    title: "Leave Feedback | PM Roofers",
    description: "Private feedback page for PM Roofers customers.",
    ogImage: "https://pmroofers.com/pm-roofers-og.svg",
  },
  "/get-quote": {
    title: "Get a Quote | PM Roofers",
    description: "Request a free, no-obligation quote from PM Roofers for roofing and exterior repair work.",
    ogImage: "https://pmroofers.com/pm-roofers-og.svg",
  },
  "/special-offer": {
    title: "Priority Quote Request | PM Roofers",
    description: "Request a priority roofing quote from PM Roofers.",
    ogImage: "https://pmroofers.com/pm-roofers-og.svg",
  },
  "/discount": {
    title: "Priority Quote Request | PM Roofers",
    description: "Fast-track your PM Roofers quote request for roofing and exterior repair work.",
    ogImage: "https://pmroofers.com/pm-roofers-og.svg",
  },
  "/privacy-policy": {
    title: "Privacy Policy | PM Roofers",
    description: "Privacy policy for PM Roofers.",
    ogImage: "https://pmroofers.com/pm-roofers-og.svg",
    noindex: true,
  },
  "/terms-of-service": {
    title: "Terms of Service | PM Roofers",
    description: "Terms of service for PM Roofers.",
    ogImage: "https://pmroofers.com/pm-roofers-og.svg",
    noindex: true,
  },
  "/add-customer": {
    title: "Customer Portal | PM Roofers",
    description: "Private customer portal for PM Roofers clients.",
    ogImage: "https://pmroofers.com/pm-roofers-og.svg",
    noindex: true,
  },
};

export const siteContent: SiteContent = {
  brand: {
    businessName: "PM Roofers",
    shortName: "PM Roofers",
    serviceAreaLabel: "Glasgow, Greenock, and surrounding areas",
    trustedByline: "Family-run roofing specialists serving Glasgow and the surrounding area.",
  },
  cta: {
    primaryQuote: "Request Your Free Roofing Quote",
    freeQuote: "Get Free Quote",
    callNow: "Call Now",
    callUsNow: "Call Us Now",
    callback: "Or Request a Callback",
  },
  layout: {
    header: {
      servicesMenu: [
        { title: "Roof Replacement", href: "/roof-replacement", description: "Full new roofs and replacement projects" },
        { title: "Roof Repairs", href: "/roof-repairs", description: "Leaks, slipped tiles, and storm damage" },
        { title: "Emergency Roofing", href: "/emergency-roof-repairs", description: "24/7 urgent roofing response" },
        { title: "Leadwork", href: "/leadwork", description: "Flashing, valleys, and junction details" },
        { title: "Chimney Repairs", href: "/chimney-repairs", description: "Chimney and roofline repair work" },
        { title: "Skylight Repairs", href: "/skylight-repairs", description: "Repairs and replacement" },
        { title: "Roughcasting", href: "/roughcasting", description: "Exterior wall protection work" },
        { title: "UPVC Gutters", href: "/upvc-gutters", description: "Gutters and roofline upgrades" },
        { title: "Damp Proofing", href: "/damp-proofing", description: "Moisture and ingress support" },
      ],
      areasMenu: [
        { title: "Glasgow", href: "/glasgow" },
        { title: "Greenock", href: "/greenock" },
        { title: "Paisley", href: "/paisley" },
        { title: "Cumbernauld", href: "/cumbernauld" },
        { title: "Edinburgh", href: "/edinburgh" },
        { title: "View All Areas", href: "/areas" },
      ],
      mainLinks: [
        { title: "About", href: "/about" },
        { title: "Reviews", href: "/reviews" },
        { title: "FAQ", href: "/faq" },
        { title: "Contact", href: "/contact" },
      ],
      servicesLabel: "Roofing Services",
      areasLabel: "Areas We Cover",
      viewAllServices: "All Services",
      viewAllServicesDesc: "Explore PM Roofers' roofing and repair services",
      viewAllAreas: "All Areas",
      aboutLabel: "About PM Roofers",
    },
    footer: {
      companyBlurb: "PM Roofers is a family-run roofing business offering 24/7 support, honest advice, and dependable workmanship across Glasgow and surrounding areas.",
      servicesLinks: [
        { title: "Roof Replacement", href: "/roof-replacement" },
        { title: "Roof Repairs", href: "/roof-repairs" },
        { title: "Emergency Roofing", href: "/emergency-roof-repairs" },
        { title: "Leadwork", href: "/leadwork" },
        { title: "Chimney Repairs", href: "/chimney-repairs" },
        { title: "Skylight Repairs", href: "/skylight-repairs" },
        { title: "Roughcasting", href: "/roughcasting" },
        { title: "UPVC Gutters", href: "/upvc-gutters" },
        { title: "Damp Proofing", href: "/damp-proofing" },
      ],
      areasLinks: [
        { title: "Glasgow", href: "/glasgow" },
        { title: "Greenock", href: "/greenock" },
        { title: "Paisley", href: "/paisley" },
        { title: "East Kilbride", href: "/east-kilbride" },
        { title: "Cumbernauld", href: "/cumbernauld" },
        { title: "Hamilton", href: "/hamilton" },
        { title: "Coatbridge", href: "/coatbridge" },
        { title: "Airdrie", href: "/airdrie" },
        { title: "Stirling", href: "/stirling" },
        { title: "Edinburgh", href: "/edinburgh" },
      ],
      bottomLinks: [
        { title: "About", href: "/about" },
        { title: "Reviews", href: "/reviews" },
        { title: "FAQ", href: "/faq" },
        { title: "Contact", href: "/contact" },
        { title: "Privacy Policy", href: "/privacy-policy" },
        { title: "Terms of Service", href: "/terms-of-service" },
      ],
      workingHours: "24/7 Roofing Support",
      paymentLabel: "Payment Options:",
      contactLabel: "Contact Info",
    },
  },
  home: {
    seoPath: "/",
    hero: {
      badgeReviews: "5/5 Google Reviews",
      badgeInsured: "Fully Liability Insured",
      titlePart1: "Premium Roofing",
      titlePart2: "Repairs & Replacements",
      titlePart3: "Across Glasgow",
      subtitle: "PM Roofers delivers roof repairs, roof replacement, emergency callouts, leadwork, and roofline work with direct communication and practical advice.",
      experienceYears: "30 years of experience",
      benefits: [
        "24/7 Emergency Roofing",
        "Free Roofing Quotes",
        "Family-Run Service",
        "Roof Repairs & Replacement",
      ],
    },
    urgency: {
      offer: "Need urgent roofing help? PM Roofers offers 24/7 emergency callouts across Glasgow and surrounding areas.",
      slotsLeft: "Fast response available today",
    },
    about: {
      kicker: "About PM Roofers",
      title: "A Family-Run Roofer With A Premium Standard Of Service",
      paragraphs: [
        "PM Roofers is led by Peter McPhee and built around experienced roofing workmanship, dependable communication, and a straightforward approach to quoting and repairs.",
        "From urgent roof leaks and storm damage to full roof replacement, leadwork, chimney repairs, and roofline upgrades, we deliver work that is practical, tidy, and clearly explained from the outset.",
      ],
      stats: [
        { number: "30", label: "Years Experience", iconName: "Award" },
        { number: "24/7", label: "Emergency Support", iconName: "Clock" },
        { number: "60", label: "Mile Service Radius", iconName: "MapPin" },
        { number: "Fully", label: "Liability Insured", iconName: "Shield" },
      ],
      cta: "Learn More About Our Roofing Team",
    },
    services: {
      kicker: "Roofing Services",
      titlePart1: "Roofing Services",
      titlePart2: "Built Around What Homeowners Need Most",
      description: "PM Roofers focuses on the roofing jobs that matter most when protection, speed, and workmanship count across",
      items: [
        {
          title: "Roof Replacement",
          description: "Full roof replacement with honest guidance on whether repair or replacement is the smarter option.",
          href: "/roof-replacement",
          featured: true,
          iconName: "Home",
        },
        {
          title: "Roof Repairs",
          description: "Prompt repairs for leaks, slipped tiles, storm damage, and general roofing faults.",
          href: "/roof-repairs",
          iconName: "Hammer",
        },
        {
          title: "Emergency Roofing",
          description: "24/7 emergency response when your roof needs urgent attention.",
          href: "/emergency-roof-repairs",
          iconName: "Shield",
        },
        {
          title: "Leadwork",
          description: "Lead flashing and roof-detail repairs around chimneys, valleys, and junctions.",
          href: "/leadwork",
          iconName: "Shield",
        },
        {
          title: "Chimney Repairs",
          description: "Repair work for chimney stacks, flashing, and masonry issues.",
          href: "/chimney-repairs",
          iconName: "Building",
        },
        {
          title: "UPVC Gutters",
          description: "Guttering and roofline upgrades to improve drainage and presentation.",
          href: "/upvc-gutters",
          iconName: "Droplets",
        },
      ],
      ctaText: "Not sure whether you need a repair, an emergency callout, or a full replacement?",
      ctaButton: "Speak To A Roofer",
      ctaBrowse: "Browse all roofing services",
    },
    process: {
      kicker: "How We Work",
      titlePart1: "A Simple",
      titlePart2: "Roofing Process",
      titlePart3: "From Survey to Sign-Off",
      description: "We keep the process clear so you know what needs doing, what it costs, and what happens next.",
      benefits: ["Free Assessments", "Clear Quotes", "Practical Advice"],
      directLineLabel: "Direct Line",
      ctaButton: "Book Your Free Quote",
      steps: [
        {
          step: "01",
          title: "Free Assessment",
          description: "We inspect the roof issue, talk through the likely cause, and recommend the right solution.",
          highlight: "No-obligation quote",
        },
        {
          step: "02",
          title: "Clear Pricing",
          description: "You receive a straightforward quote with no confusing jargon or hidden extras.",
          highlight: "Transparent costs",
        },
        {
          step: "03",
          title: "Professional Work",
          description: "Our team carries out the roofing work using practical methods and quality materials.",
          highlight: "Family-run workmanship",
        },
        {
          step: "04",
          title: "Tidy Finish",
          description: "We walk the job through with you and leave the site clean and ready to use.",
          highlight: "Clear handover",
        },
      ],
    },
    beforeAfter: {
      kicker: "Recent Work",
      title: "Real Roofing Work From PM Roofers",
      description: "Examples of the kinds of roofing and roofline jobs PM Roofers carries out across the wider Glasgow region.",
      ctaText: "Need help with a roof issue at your property?",
      ctaButton: "Get Your Free Quote",
      transformations: [
        { location: "Glasgow", project: "Full Roof Replacement" },
        { location: "Greenock", project: "Emergency Leak Repair" },
        { location: "Paisley", project: "Leadwork and Chimney Repair" },
      ],
    },
    guarantee: {
      kicker: "Why Homeowners Call Us",
      titlePart1: "Straightforward",
      titlePart2: "Service You Can Rely On",
      description: "PM Roofers is built around honest communication, experienced workmanship, and showing up when roofing problems need dealt with quickly.",
      items: [
        {
          title: "30 Years Experience",
          description: "Long-term roofing experience across replacement and repair work.",
          iconName: "Award",
        },
        {
          title: "24/7 Support",
          description: "Emergency roofing help is available when urgent issues need quick action.",
          iconName: "Clock",
        },
        {
          title: "Family-Run Business",
          description: "You deal with a business that values direct communication and reputation.",
          iconName: "Users",
        },
        {
          title: "Fully Liability Insured",
          description: "Peace of mind that the work is carried out with the right cover in place.",
          iconName: "Shield",
        },
      ],
      includedTitle: "What To Expect",
      includedItems: [
        "Free roof assessment",
        "Clear, written quote",
        "Honest advice on repair vs replacement",
        "Tidy workmanship",
        "Prompt follow-up communication",
      ],
      ctaButton: "Call PM Roofers",
    },
    projects: {
      kicker: "Project Highlights",
      titlePart1: "Selected",
      titlePart2: "Recent Jobs",
      description: "A look at the kind of roofing and roofline work PM Roofers completes across Glasgow and the surrounding area.",
      viewAll: "View All Roofing Projects",
      ctaTitle: "Need A Roofer You Can Depend On?",
      ctaDescription: "Get a clear quote, practical advice, and direct contact with a family-run roofing company that takes workmanship seriously.",
      ctaButton: "Get a Free Quote",
    },
    testimonials: {
      kicker: "Customer Feedback",
      titlePart1: "Why People",
      titlePart2: "Recommend PM Roofers",
      description: "PM Roofers is backed by strong customer feedback and repeat referrals built on communication, reliability, and visible results.",
      items: [
        {
          name: "Homeowner",
          location: "Glasgow",
          rating: 5,
          text: "Peter explained the issue clearly, gave us a fair quote, and the work was carried out exactly when he said it would be.",
          date: "Customer feedback",
          verified: false,
        },
        {
          name: "Property Owner",
          location: "Greenock",
          rating: 5,
          text: "We needed urgent help after a leak and PM Roofers responded quickly, kept us informed, and got the roof secure fast.",
          date: "Customer feedback",
          verified: false,
        },
        {
          name: "Landlord",
          location: "Paisley",
          rating: 5,
          text: "Straightforward advice and no pressure. The leadwork repair solved the problem properly.",
          date: "Customer feedback",
          verified: false,
        },
      ],
      ctaText: "Want the same no-nonsense service for your roof?",
      ctaButton: "Call Now",
      ctaBrowse: "See more reviews",
    },
    objections: {
      kicker: "Common Questions",
      title: "Still Weighing Up The Job?",
      description: "These are the questions we hear most often from homeowners who want clear advice before they commit.",
      items: [
        {
          question: "Do I need a repair or a replacement?",
          answer: "We will tell you honestly. If a repair is enough, we will say so. If replacement is the better long-term option, we will explain why.",
          stat: "30",
          statLabel: "Years experience",
          iconName: "Hammer",
        },
        {
          question: "Can you help quickly if the roof is leaking now?",
          answer: "Yes. PM Roofers offers 24/7 emergency roofing support for urgent situations where the property needs fast attention.",
          stat: "24/7",
          statLabel: "Emergency response",
          iconName: "Clock",
        },
        {
          question: "Are you insured?",
          answer: "Yes, PM Roofers is fully liability insured, and we keep the work and communication professional from start to finish.",
          stat: "Fully",
          statLabel: "Liability insured",
          iconName: "Shield",
        },
        {
          question: "Do you cover my area?",
          answer: "We cover Glasgow and a broad surrounding radius. If you're unsure, call and we'll confirm straight away.",
          stat: "60",
          statLabel: "Mile radius",
          iconName: "MapPin",
        },
      ],
      ctaText: "Still have a question? Speak directly with PM Roofers.",
      ctaButton: "Call Now",
    },
    faq: {
      kicker: "Got Questions?",
      title: "Frequently Asked Questions",
      description: "Quick answers about roofing work, emergencies, quotes, and the areas PM Roofers covers.",
      viewAll: "View All FAQs",
      items: [
        {
          question: "Do you provide free roof inspections and quotes?",
          answer: "Yes. We provide free, no-obligation quotes so you can understand the issue and the recommended work before making a decision.",
        },
        {
          question: "Do you offer emergency roof repairs?",
          answer: "Yes. PM Roofers offers 24/7 support for urgent leaks and storm-related roofing problems.",
        },
        {
          question: "Are you fully insured and experienced?",
          answer: "Yes. PM Roofers is fully liability insured and brings 30 years of roofing experience to every job.",
        },
        {
          question: "What areas do you cover?",
          answer: "We cover Glasgow, Greenock, and many surrounding locations within roughly a 60-mile radius.",
        },
      ],
    },
    areas: {
      kicker: "Coverage",
      titlePart1: "Serving Glasgow",
      titlePart2: "And The Wider Region",
      description: "PM Roofers covers a broad service radius from the Glasgow area, including Greenock, Paisley, East Kilbride, Edinburgh, and more.",
      viewAll: "View All Areas We Cover",
    },
    cta: {
      kicker: "Get Started Today",
      titlePart1: "Need A Reliable",
      titlePart2: "Glasgow Roofer?",
      description: "Speak directly with PM Roofers for a free quote, honest advice, and roofing work carried out with care, speed, and clear communication.",
      benefits: [
        { text: "Free Quote", iconName: "CheckCircle" },
        { text: "24/7 Support", iconName: "Clock" },
        { text: "Fully Insured", iconName: "Shield" },
        { text: "Family Run", iconName: "Users" },
      ],
    },
    trustSignals: {
      stats: [
        { value: "30", label: "Years Experience" },
        { value: "24/7", label: "Emergency Support" },
        { value: "60", label: "Mile Radius" },
      ],
      badges: [
        {
          name: "Google",
          rating: "5/5",
          ratingLabel: "Google Reviews",
          logo: googleLogo,
          stars: 5,
        },
      ],
      certifications: [],
    },
  },
  about: {
    heroTitle: "About PM Roofers",
    heroSubtitle: "A family-run roofing business focused on honest advice, dependable workmanship, and fast support when problems need sorted.",
    stats: [
      { number: "30", label: "Years Experience" },
      { number: "24/7", label: "Support Available" },
      { number: "60", label: "Mile Service Radius" },
      { number: "Fully", label: "Liability Insured" },
    ],
    storyParagraphs: [
      "PM Roofers is led by Peter McPhee and built around practical roofing knowledge, straightforward communication, and a reputation for showing up when customers need help.",
      "The business focuses on roofing and roofline work first: roof repairs, roof replacement, emergency response, leadwork, chimney work, skylights, roughcasting, and related exterior repair services.",
      "As a family-run business, PM Roofers keeps the service direct and personal, with no overcomplication and no pressure selling.",
    ],
    teamTitle: "A Family-Run Approach",
    teamDescription: "Customers choose PM Roofers because they want experienced roofing support, clear communication, and a business that takes pride in its reputation.",
    teamBullets: [
      "30 years of roofing experience",
      "24/7 emergency support available",
      "Fully liability insured",
      "Free quotes and straightforward advice",
    ],
    valuesIntro: "The principles that guide every job",
    values: [
      { title: "Honest Advice", description: "We explain what needs doing clearly and tell you when a repair is enough." },
      { title: "Reliable Workmanship", description: "We aim to do the job properly the first time with methods that suit the property." },
      { title: "Fast Response", description: "Urgent roofing problems need quick action, especially after bad weather." },
      { title: "Family-Run Service", description: "We value direct communication, reputation, and leaving customers with confidence in the result." },
    ],
  },
  faqPage: {
    heroTitle: "Frequently Asked Questions",
    heroSubtitle: "Everything you need to know about PM Roofers' roofing work, emergency response, service area, and quoting process.",
    categories: [
      {
        title: "About PM Roofers",
        faqs: [
          {
            question: "What does PM Roofers do?",
            answer: "PM Roofers provides roof repairs, roof replacement, emergency roofing, leadwork, chimney repairs, skylight work, roughcasting, roofline upgrades, damp proofing, and related exterior repair services.",
          },
          {
            question: "What areas do you cover?",
            answer: "We cover Glasgow and a broad surrounding radius including Greenock, Paisley, East Kilbride, Cumbernauld, Edinburgh, and more.",
          },
          {
            question: "Are you fully insured?",
            answer: "Yes. PM Roofers is fully liability insured.",
          },
          {
            question: "What makes PM Roofers different?",
            answer: "PM Roofers is family-run, offers 24/7 support, and brings 30 years of roofing experience with an honest, practical approach to quoting and repair advice.",
          },
        ],
      },
      {
        title: "Roofing Services",
        faqs: [
          {
            question: "Do you offer emergency roof repairs?",
            answer: "Yes. We offer 24/7 emergency support for urgent roofing issues such as active leaks and storm damage.",
          },
          {
            question: "Can you help with leadwork and chimneys?",
            answer: "Yes. Lead flashing, leadwork details, and chimney repairs are a core part of the service offering.",
          },
          {
            question: "Do you only work on roofs?",
            answer: "Roofing is the main focus, but we also take on closely related exterior services such as roughcasting, damp proofing, roof coatings, and UPVC gutters where they support the wider job.",
          },
        ],
      },
      {
        title: "Quotes & Pricing",
        faqs: [
          {
            question: "Do you provide free quotes?",
            answer: "Yes. We offer free, no-obligation quotes so you can understand the work and the likely cost before you commit.",
          },
          {
            question: "How do you price the work?",
            answer: "Pricing depends on the scope of the job, access, urgency, and the materials or repairs required. We explain that clearly in the quote.",
          },
          {
            question: "Will you tell me if a repair is enough?",
            answer: "Yes. We aim to give practical advice rather than push unnecessary replacement work.",
          },
        ],
      },
      {
        title: "Scheduling & Workmanship",
        faqs: [
          {
            question: "How quickly can you start?",
            answer: "That depends on the job and our schedule, but urgent issues are prioritised and emergency support is available 24/7.",
          },
          {
            question: "Do you leave the site tidy?",
            answer: "Yes. We aim to keep the process straightforward and leave the site in a clean, usable condition once the work is complete.",
          },
          {
            question: "Do you offer any customer incentives?",
            answer: "We occasionally run time-limited roofing promotions. If there is a live offer, it will be shown clearly on the relevant landing page or during your quote discussion.",
          },
        ],
      },
    ],
    ctaTitle: "Still Have Questions?",
    ctaDescription: "Get in touch and speak directly with PM Roofers about the roofing issue you're dealing with.",
    ctaContactLabel: "Contact Us",
  },
  servicesPage: {
    heroTitle: "Roofing & Exterior Repair Services",
    heroSubtitle: "From urgent roof repairs to full replacements, PM Roofers delivers practical roofing work across Glasgow and surrounding areas.",
    heroPrimaryCta: "Explore Services",
    heroSecondaryCtaPrefix: "Call",
    benefitsKicker: "Why PM Roofers",
    benefitsTitle: "Roofing Help Without The Runaround",
    benefitsDescription: "We keep the advice clear, the service direct, and the workmanship focused on doing the job properly.",
    benefits: [
      { title: "30 Years Experience", description: "Long-term roofing experience across repairs, replacements, and urgent callouts" },
      { title: "Family-Run Service", description: "Direct communication and a reputation that matters to the business" },
      { title: "24/7 Emergency Support", description: "Fast response when leaks or weather damage need urgent attention" },
      { title: "Fully Liability Insured", description: "Peace of mind that the work is backed by proper cover" },
    ],
    guaranteedLabel: "Honest Advice First",
    communicationLabel: "Direct Contact Throughout",
    ctaKicker: "Get Started Today",
    ctaTitlePart1: "Need A",
    ctaTitlePart2: "Reliable",
    ctaTitlePart3: "Roofer?",
    ctaDescription: "Contact PM Roofers for a free quote and practical advice on the right solution for your roof.",
    ctaStats: [
      { value: "30", label: "Years Experience" },
      { value: "24/7", label: "Emergency Support" },
      { value: "Family", label: "Run Business" },
      { value: "Free", label: "Quotes" },
    ],
  },
  areasPage: {
    breadcrumbLabel: "Areas",
    heroTitle: "Areas We Cover",
    heroSubtitle: "PM Roofers covers Glasgow and a broad surrounding service radius for roofing and roofline work.",
    heroTitlePart1: "Roofing Support",
    heroTitlePart2: "Across Glasgow & Beyond",
    heroPrimaryCta: "View Areas",
    heroSecondaryCtaPrefix: "Call",
    badgeLabel: "Family Run, 24/7, Fully Insured",
    sectionKickerSuffix: "Locations",
    sectionTitlePart1: "Areas We",
    sectionTitlePart2: "Cover",
    cardCtaLabel: "View Area Details",
    loadMoreLabel: "See More Areas",
    loadMoreSuffix: "locations we serve",
    ctaKicker: "Get in Touch",
    ctaTitle: "Need To Confirm Your Area?",
    ctaDescription: "If you're within our service radius, PM Roofers can usually help. Call to confirm availability quickly.",
    ctaButtonLabel: "Get Your Free Quote",
    ctaStats: [
      { value: "60", label: "Mile Radius" },
      { value: "24/7", label: "Emergency Support" },
      { value: "30", label: "Years Experience" },
      { value: "Family", label: "Run Business" },
    ],
  },
  contactPage: {
    heroTitle: "Get Your Free Roofing Quote",
    heroSubtitle: "Call PM Roofers today for straightforward advice, a free quote, and fast help with urgent roofing issues.",
    infoCards: [
      {
        key: "phone",
        title: "Phone",
        subtext: "24/7 emergency support",
        href: "tel",
        contentType: "phone",
        content: "",
      },
      {
        key: "email",
        title: "Email",
        subtext: "We respond as quickly as possible",
        href: "mailto",
        contentType: "email",
        content: "",
      },
      {
        key: "serviceArea",
        title: "Service Area",
        subtext: "Glasgow and surrounding areas",
        href: "/areas",
        contentType: "address",
        content: "",
      },
      {
        key: "hours",
        title: "Availability",
        subtext: "24/7 roofing support",
        href: null,
        contentType: "text",
        content: "Emergency and quote enquiries welcome",
      },
    ],
    whyTitle: "Why Call PM Roofers?",
    whyIntro: "When you get in touch, you speak to a family-run roofing business that values straight answers and fast support.",
    steps: [
      { title: "Quick Response", description: "We'll respond quickly and confirm the best next step for your enquiry." },
      { title: "Free Assessment", description: "We'll arrange a visit or talk through the issue so we can quote properly." },
      { title: "Clear Quote", description: "You'll receive straightforward pricing and advice on the recommended work." },
      { title: "No Pressure", description: "Take the time you need. We focus on practical advice, not pushy sales." },
    ],
    preferToTalkTitle: "Prefer to Talk?",
    preferToTalkDescription: "Call PM Roofers directly to speak about your roof issue.",
    formTitle: "Request Your Free Quote",
    formSubtitle: "Complete the form below and we'll be in touch as soon as possible",
    mapTitle: "Serving Glasgow, Greenock, and surrounding areas",
    mapDescription: "PM Roofers covers a broad radius for roofing work across Glasgow and surrounding Scotland locations.",
  },
};

export const nav = siteContent.layout.header;
export const footer = siteContent.layout.footer;

export default siteContent;
