import React from "react";
import type { PageMetaData } from "./pageMetaMap";
import { siteSettings } from "./data/siteSettings";
import { siteContent } from "./data/content";

type PageTemplateProps = PageMetaData;

const BASE_URL = "https://rooferglasgow.uk";

const PageTemplate = ({ title, description, ogImage, noindex, path }: PageTemplateProps) => {
  const fullTitle =
    title ||
    `${siteContent.brand.shortName} | Roofing Specialists ${siteContent.brand.serviceAreaLabel}`;
  const metaDescription =
    description ||
    `Roof repairs, roof replacement, emergency roofing and exterior property services across ${siteContent.brand.serviceAreaLabel}.`;
  const metaImage = ogImage || `${BASE_URL}/pm-contract-og.svg`;
  const canonicalUrl = `${BASE_URL}${path === "/" || !path ? "" : path}`;

  const robots = noindex
    ? "noindex, nofollow"
    : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "RoofingContractor"],
    "@id": `${BASE_URL}/#business`,
    name: siteSettings.businessName,
    description:
      `Roof repairs, roof replacement, roughcasting, leadwork and emergency roofing across ${siteContent.brand.serviceAreaLabel}`,
    url: BASE_URL,
    telephone: siteSettings.phone,
    email: siteSettings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Balfour Street",
      addressLocality: "Port Glasgow",
      postalCode: "PA14 5HF",
      addressCountry: "GB",
    },
    priceRange: "££",
    areaServed: {
      "@type": "State",
      name: siteContent.brand.serviceAreaLabel,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "00:00",
        closes: "23:59",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "00:00",
        closes: "23:59",
      },
    ],
  };

  return (
    <html lang="en-GB">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{fullTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content={robots} />
        <meta name="googlebot" content={robots} />
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" type="image/svg+xml" href="/favicons/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />

        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:image:alt" content={fullTitle} />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:site_name" content={siteSettings.businessName} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />

        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>
  );
};

export default PageTemplate;
