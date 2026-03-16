/**
 * Centralized image assets - all images are resolved at build time via import.meta.url.
 * Components and pages should import from this file rather than directly from @/assets.
 */

const heroMain = new URL('../assets/pm-contracts/image1.webp', import.meta.url).href;
const heroAlt = new URL('../assets/pm-contracts/image0.webp', import.meta.url).href;
const teamSite = new URL('../assets/pm-contracts/image3.webp', import.meta.url).href;
const detailShot = new URL('../assets/pm-contracts/image10.webp', import.meta.url).href;
const roofWork = new URL('../assets/pm-contracts/image11.webp', import.meta.url).href;
const roofWorkAlt = new URL('../assets/pm-contracts/image13.webp', import.meta.url).href;
const gutters = new URL('../assets/pm-contracts/image16.webp', import.meta.url).href;
const damp = new URL('../assets/pm-contracts/image19.webp', import.meta.url).href;
const joinery = new URL('../assets/pm-contracts/image22.webp', import.meta.url).href;
const logoWordmark = new URL('../assets/pm-contracts/logo-wordmark.svg', import.meta.url).href;
const logoMark = new URL('../assets/pm-contracts/logo-mark.svg', import.meta.url).href;

export const heroBackground = heroMain;
export const heroBackgroundAreas = heroAlt;

export const teamPhoto = teamSite;
export const aboutBrandImage = teamSite;

export const beforeAfterImage = heroMain;
export const craftsmanshipImage = detailShot;
export const workersImage = teamSite;
export const flatRoofImage = roofWork;
export const chimneyRepairImage = roofWorkAlt;
export const commercialRoofImage = heroAlt;
export const projectRooferImage = heroMain;

export const serviceImages: Record<string, string> = {
  'roof-replacement': heroAlt,
  'roof-repairs': heroMain,
  'emergency-roof-repairs': teamSite,
  leadwork: detailShot,
  'chimney-repairs': roofWorkAlt,
  'skylight-repairs': roofWork,
  roughcasting: roofWorkAlt,
  'roof-and-wall-coatings': heroAlt,
  'upvc-gutters': gutters,
  'dry-rot-repair': damp,
  'damp-proofing': damp,
  'jet-washing': joinery,
  'general-joinery': joinery,
};

export const getServiceImage = (href: string): string =>
  serviceImages[href.replace('/services/', '').replace(/^\//, '')] ?? heroMain;

export const areaPageGalleryImages = {
  beforeAfter: beforeAfterImage,
  workers: teamSite,
  flatRoof: roofWork,
  team: teamPhoto,
  cityscape: heroBackgroundAreas,
} as const;

export const headerLogo = logoWordmark;
export const footerLogo = logoMark;

export const paymentLogos = {
  visa: new URL('../assets/payment/visa.svg', import.meta.url).href,
  mastercard: new URL('../assets/payment/mastercard.svg', import.meta.url).href,
  paypal: new URL('../assets/payment/paypal.svg', import.meta.url).href,
  applePay: new URL('../assets/payment/apple-pay.svg', import.meta.url).href,
  googlePay: new URL('../assets/payment/google-pay.svg', import.meta.url).href,
  klarna: new URL('../assets/payment/klarna.svg', import.meta.url).href,
  amex: new URL('../assets/payment/american-express.svg', import.meta.url).href,
} as const;
