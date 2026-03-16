import { z } from 'zod';

import { siteContent, routeSeo } from '../src/data/content.ts';
import {
  theme,
  professionalCorporateTheme,
  dominionTradeTheme,
  dominionTradeRoundedTheme,
  atlasStoneTheme,
} from '../src/data/theme.ts';
import { areas } from '../src/data/areas.ts';
import { services } from '../src/data/services.ts';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const seoSchema = z.object({
  title: z.string().min(10),
  description: z.string().min(20),
  ogImage: z.string().url().optional(),
  noindex: z.boolean().optional(),
});

const contentSchema = z.object({
  brand: z.object({
    businessName: z.string().min(2),
    shortName: z.string().min(2),
    serviceAreaLabel: z.string().min(2),
    trustedByline: z.string().min(2),
  }),
  cta: z.object({
    primaryQuote: z.string().min(2),
    freeQuote: z.string().min(2),
    callNow: z.string().min(2),
    callUsNow: z.string().min(2),
    callback: z.string().min(2),
  }),
  layout: z.object({
    header: z.object({
      servicesMenu: z.array(z.object({ title: z.string().min(1), href: z.string().startsWith('/') })).min(1),
      areasMenu: z.array(z.object({ title: z.string().min(1), href: z.string().startsWith('/') })).min(1),
      mainLinks: z.array(z.object({ title: z.string().min(1), href: z.string().startsWith('/') })).min(1),
    }),
    footer: z.object({
      companyBlurb: z.string().min(10),
      servicesLinks: z.array(z.object({ title: z.string().min(1), href: z.string().startsWith('/') })).min(1),
      areasLinks: z.array(z.object({ title: z.string().min(1), href: z.string().startsWith('/') })).min(1),
      bottomLinks: z.array(z.object({ title: z.string().min(1), href: z.string().startsWith('/') })).min(1),
      workingHours: z.string().min(3),
      paymentLabel: z.string().min(3),
    }),
  }),
  home: z.object({
    seoPath: z.string(),
    hero: z.object({
      badgeReviews: z.string(),
      badgeInsured: z.string(),
      titlePart1: z.string(),
      titlePart2: z.string(),
      titlePart3: z.string(),
      subtitle: z.string(),
      experienceYears: z.string(),
      benefits: z.array(z.string()),
    }),
    urgency: z.object({
      offer: z.string(),
      slotsLeft: z.string(),
    }),
    about: z.object({
      kicker: z.string(),
      title: z.string(),
      paragraphs: z.array(z.string()),
      stats: z.array(z.object({ number: z.string(), label: z.string() })),
      cta: z.string(),
    }),
    services: z.object({
      kicker: z.string(),
      titlePart1: z.string(),
      titlePart2: z.string(),
      description: z.string(),
      items: z.array(z.object({
        title: z.string(),
        description: z.string(),
        href: z.string(),
        featured: z.boolean().optional(),
        iconName: z.string(),
      })),
      ctaText: z.string(),
      ctaButton: z.string(),
      ctaBrowse: z.string(),
    }),
    process: z.object({
      kicker: z.string(),
      titlePart1: z.string(),
      titlePart2: z.string(),
      titlePart3: z.string(),
      description: z.string(),
      benefits: z.array(z.string()),
      directLineLabel: z.string(),
      ctaButton: z.string(),
      steps: z.array(z.object({
        step: z.string(),
        title: z.string(),
        description: z.string(),
        highlight: z.string(),
      })),
    }),
    beforeAfter: z.object({
      kicker: z.string(),
      title: z.string(),
      description: z.string(),
      ctaText: z.string(),
      ctaButton: z.string(),
    }),
    guarantee: z.object({
      kicker: z.string(),
      titlePart1: z.string(),
      titlePart2: z.string(),
      description: z.string(),
      items: z.array(z.object({
        title: z.string(),
        description: z.string(),
        iconName: z.string(),
      })),
      includedTitle: z.string(),
      includedItems: z.array(z.string()),
      ctaButton: z.string(),
    }),
    projects: z.object({
      kicker: z.string(),
      titlePart1: z.string(),
      titlePart2: z.string(),
      description: z.string(),
      viewAll: z.string(),
      ctaTitle: z.string(),
      ctaDescription: z.string(),
      ctaButton: z.string(),
    }),
    testimonials: z.object({
      kicker: z.string(),
      titlePart1: z.string(),
      titlePart2: z.string(),
      description: z.string(),
      items: z.array(z.object({
        name: z.string(),
        location: z.string(),
        rating: z.number(),
        text: z.string(),
        date: z.string(),
        verified: z.boolean(),
      })),
      ctaText: z.string(),
      ctaButton: z.string(),
      ctaBrowse: z.string(),
    }),
    objections: z.object({
      kicker: z.string(),
      title: z.string(),
      description: z.string(),
      items: z.array(z.object({
        question: z.string(),
        answer: z.string(),
        stat: z.string(),
        statLabel: z.string(),
        iconName: z.string(),
      })),
      ctaText: z.string(),
      ctaButton: z.string(),
    }),
    faq: z.object({
      kicker: z.string(),
      title: z.string(),
      description: z.string(),
      viewAll: z.string(),
      items: z.array(z.object({ question: z.string(), answer: z.string() })),
    }),
    areas: z.object({
      kicker: z.string(),
      titlePart1: z.string(),
      titlePart2: z.string(),
      description: z.string(),
      viewAll: z.string(),
    }),
    cta: z.object({
      kicker: z.string(),
      titlePart1: z.string(),
      titlePart2: z.string(),
      description: z.string(),
      benefits: z.array(z.object({ text: z.string(), iconName: z.string() })),
    }),
    trustSignals: z.object({
      stats: z.array(z.object({ value: z.string(), label: z.string() })),
      badges: z.array(z.object({
        name: z.string(),
        rating: z.string(),
        ratingLabel: z.string(),
        logo: z.string(),
        stars: z.number().optional(),
        logoDark: z.boolean().optional(),
      })),
      certifications: z.array(z.object({ name: z.string(), logo: z.string() })),
    }),
  }),
  about: z.object({
    heroTitle: z.string().min(3),
    heroSubtitle: z.string().min(3),
    stats: z.array(z.object({ number: z.string().min(1), label: z.string().min(1) })).min(1),
    storyParagraphs: z.array(z.string().min(5)).min(1),
  }),
  faqPage: z.object({
    heroTitle: z.string().min(3),
    categories: z.array(z.object({
      title: z.string().min(3),
      faqs: z.array(z.object({ question: z.string().min(5), answer: z.string().min(10) })).min(1),
    })).min(1),
  }),
  servicesPage: z.object({
    heroTitle: z.string().min(3),
    benefits: z.array(z.object({ title: z.string().min(3), description: z.string().min(5) })).min(1),
  }),
  areasPage: z.object({
    heroTitle: z.string().min(3),
  }),
  contactPage: z.object({
    heroTitle: z.string().min(3),
    steps: z.array(z.object({ title: z.string().min(3), description: z.string().min(5) })).min(1),
  }),
});

const themeSchema = z.object({
  name: z.string().min(3),
  cssVariables: z.record(z.string(), z.string().min(1)).refine((record) => Object.keys(record).length > 0, {
    message: 'Expected at least one css variable',
  }),
  darkCssVariables: z.record(z.string(), z.string().min(1)).optional(),
});

const requiredThemeTokens = [
  '--background',
  '--foreground',
  '--card',
  '--card-foreground',
  '--popover',
  '--popover-foreground',
  '--primary',
  '--primary-foreground',
  '--secondary',
  '--secondary-foreground',
  '--muted',
  '--muted-foreground',
  '--accent',
  '--accent-foreground',
  '--accent-text-on-light',
  '--accent-glow',
  '--accent-soft',
  '--accent-secondary',
  '--accent-secondary-foreground',
  '--border',
  '--input',
  '--ring',
  '--radius',
  '--font-display',
  '--font-body',
  '--shadow-sm',
  '--shadow-md',
  '--shadow-lg',
  '--shadow-xl',
  '--shadow-sharp',
  '--shadow-sharp-lg',
  '--shadow-accent',
  '--shadow-accent-glow',
  '--shadow-line',
  '--shadow-line-accent',
  '--slate-dark',
  '--slate-medium',
  '--slate-light',
  '--amber',
  '--amber-glow',
  '--amber-soft',
  '--navy',
  '--navy-light',
  '--glass-bg',
  '--glass-border',
  '--glass-blur',
  '--sidebar-background',
  '--sidebar-foreground',
  '--sidebar-primary',
  '--sidebar-primary-foreground',
  '--sidebar-accent',
  '--sidebar-accent-foreground',
  '--sidebar-border',
  '--sidebar-ring',
];

const areaSchema = z.object({
  name: z.string().min(2),
  slug: z.string().regex(slugRegex),
  description: z.string().min(10),
  longDescription: z.string().min(10),
  neighbourhoods: z.array(z.string().min(2)).min(1),
  faqs: z.array(z.object({ question: z.string().min(5), answer: z.string().min(10) })),
});

const serviceSchema = z.object({
  title: z.string().min(2),
  slug: z.string().regex(slugRegex),
  description: z.string().min(10),
  heroText: z.string().min(10),
  benefits: z.array(z.string().min(2)).min(1),
});

const ensureUnique = (values, label) => {
  const seen = new Set();
  for (const value of values) {
    if (seen.has(value)) {
      throw new Error(`Duplicate ${label}: ${value}`);
    }
    seen.add(value);
  }
};

const ensureThemeHasRequiredTokens = (themeToCheck) => {
  const missing = requiredThemeTokens.filter((token) => !(token in themeToCheck.cssVariables));
  if (missing.length > 0) {
    throw new Error(`Theme "${themeToCheck.name}" is missing required tokens: ${missing.join(', ')}`);
  }
};

const run = () => {
  // Mock browser environment for data files that might import images or use browser globals
  global.window = {};
  global.document = {
    createElement: () => ({ style: {} }),
    getElementsByTagName: () => [],
  };

  contentSchema.parse(siteContent);
  themeSchema.parse(theme);
  [professionalCorporateTheme, dominionTradeTheme, dominionTradeRoundedTheme, atlasStoneTheme].forEach((preset) => {
    themeSchema.parse(preset);
    ensureThemeHasRequiredTokens(preset);
  });

  for (const [path, seo] of Object.entries(routeSeo)) {
    if (!path.startsWith('/')) {
      throw new Error(`SEO path must start with '/': ${path}`);
    }
    seoSchema.parse(seo);
  }

  areas.forEach((area) => areaSchema.parse(area));
  services.forEach((service) => serviceSchema.parse(service));

  ensureUnique(areas.map((area) => area.slug), 'area slug');
  ensureUnique(services.map((service) => service.slug), 'service slug');

  console.log(`Validated content (${Object.keys(routeSeo).length} SEO routes), ${areas.length} areas, ${services.length} services.`);
};

try {
  run();
} catch (error) {
  console.error('Data validation failed:', error);
  process.exit(1);
}
