import { useEffect } from 'react';
import { siteSettings } from '@/data/siteSettings';
import { services } from '@/data/services';
import { areas } from '@/data/areas';
import { siteContent } from '@/data/content';

const BASE_URL = siteSettings.websiteUrl;

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceData {
  name: string;
  description: string;
  slug: string;
}

interface AreaData {
  name: string;
  slug: string;
  description: string;
}

interface ArticleData {
  title: string;
  description: string;
  slug: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
}

interface JsonLdProps {
  type: 'LocalBusiness' | 'Organization' | 'Service' | 'FAQPage' | 'BreadcrumbList' | 'WebSite' | 'Article';
  data?: ServiceData | ArticleData | AreaData;
  faqs?: FAQItem[];
  breadcrumbs?: BreadcrumbItem[];
}

const JsonLd = ({ type, data, faqs, breadcrumbs }: JsonLdProps) => {
  useEffect(() => {
    const scriptId = `jsonld-${type}-${data?.slug || 'main'}`;
    
    // Remove existing script if present
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    let schema: object | null = null;

    switch (type) {
      case 'LocalBusiness': {
        const isAreaPage = data && 'name' in data && !('title' in data) && !('description' in data && 'slug' in data && !('name' in data));
        const businessName = isAreaPage && 'name' in data ? `${siteSettings.businessName} ${data.name}` : siteSettings.businessName;
        
        const showFullAddress = !isAreaPage || (data && 'name' in data && data.name.toLowerCase() === 'glasgow');

        schema = {
          '@context': 'https://schema.org',
          '@type': ['LocalBusiness', 'RoofingContractor'],
          '@id': `${BASE_URL}/#business`,
          name: businessName,
          description: data && 'description' in data ? data.description : `Roof repairs, roof replacement, emergency roofing, leadwork, chimneys and exterior property services across ${siteContent.brand.serviceAreaLabel}.`,
          url: isAreaPage && 'slug' in data ? `${BASE_URL}/${data.slug}` : BASE_URL,
          telephone: siteSettings.phone,
          email: siteSettings.email,
          address: showFullAddress ? {
            '@type': 'PostalAddress',
            streetAddress: '11 Lanrig Place',
            addressLocality: 'Glasgow',
            postalCode: 'G69 9AT',
            addressCountry: 'GB',
          } : {
            '@type': 'PostalAddress',
            addressLocality: data && 'name' in data ? data.name : 'Glasgow',
            addressCountry: 'GB',
          },
          areaServed: isAreaPage && 'name' in data ? [
            {
              '@type': 'City',
              name: data.name,
            }
          ] : areas.map(area => ({
            '@type': 'City',
            name: area.name,
          })),
          serviceType: services.map(s => s.title),
          priceRange: '££',
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '07:00',
              closes: '19:00',
            },
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: 'Saturday',
              opens: '07:00',
              closes: '19:00',
            },
          ],
          image: `${BASE_URL}/pm-roofers-og.svg`,
          logo: `${BASE_URL}/favicons/web-app-manifest-512x512.png`,
          sameAs: [
            siteSettings.facebookUrl,
            siteSettings.instagramUrl,
            siteSettings.linkedinUrl,
          ].filter(Boolean),
        };
        break;
      }

      case 'Organization':
        schema = {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          '@id': `${BASE_URL}/#organization`,
          name: siteSettings.businessName,
          url: BASE_URL,
          logo: {
            '@type': 'ImageObject',
            url: `${BASE_URL}/favicons/web-app-manifest-512x512.png`,
            width: '512',
            height: '512',
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: siteSettings.phone,
            contactType: 'customer service',
            areaServed: 'GB',
            availableLanguage: 'English',
          },
          sameAs: [
            siteSettings.facebookUrl,
            siteSettings.instagramUrl,
            siteSettings.linkedinUrl,
          ].filter(Boolean),
        };
        break;

      case 'Service':
        if (data && 'name' in data) {
          schema = {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: `${data.name} - ${siteContent.brand.serviceAreaLabel}`,
            description: data.description,
            url: `${BASE_URL}/${data.slug}`,
            provider: {
              '@type': 'LocalBusiness',
              '@id': `${BASE_URL}/#business`,
              name: siteSettings.businessName,
            },
            areaServed: [
              {
                '@type': 'County',
                name: 'Glasgow City',
                containedIn: {
                  '@type': 'Country',
                  name: 'United Kingdom',
                },
              },
              {
                '@type': 'County',
                name: 'Inverclyde',
                containedIn: {
                  '@type': 'Country',
                  name: 'United Kingdom',
                },
              },
              {
                '@type': 'City',
                name: 'West Lothian',
                containedIn: {
                  '@type': 'Country',
                  name: 'United Kingdom',
                },
              },
            ],
            serviceType: data.name,
          };
        }
        break;

      case 'FAQPage':
        if (faqs && faqs.length > 0) {
          schema = {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          };
        }
        break;

      case 'BreadcrumbList':
        if (breadcrumbs && breadcrumbs.length > 0) {
          schema = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbs.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: item.name,
              item: `${BASE_URL}${item.path}`,
            })),
          };
        }
        break;

      case 'WebSite':
        schema = {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          '@id': `${BASE_URL}/#website`,
          url: BASE_URL,
          name: siteSettings.businessName,
          inLanguage: 'en-GB',
          publisher: {
            '@id': `${BASE_URL}/#organization`,
          },
        };
        break;

      case 'Article':
        if (data && 'title' in data) {
          const articleImage = data.image?.startsWith('http')
            ? data.image
            : data.image
              ? `${BASE_URL}${data.image}`
              : `${BASE_URL}/pm-roofers-og.svg`;
          schema = {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: data.title,
            description: data.description,
            image: articleImage,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `${BASE_URL}${data.slug.startsWith('/') ? data.slug : `/${data.slug}`}`,
            },
            author: {
              '@type': 'Organization',
              '@id': `${BASE_URL}/#organization`,
            },
            publisher: {
              '@type': 'Organization',
              '@id': `${BASE_URL}/#organization`,
              logo: {
                '@type': 'ImageObject',
                url: `${BASE_URL}/favicons/web-app-manifest-512x512.png`,
              },
            },
            datePublished: data.datePublished,
            dateModified: data.dateModified || data.datePublished,
          };
        }
        break;
    }

    if (schema) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      const script = document.getElementById(scriptId);
      if (script) {
        script.remove();
      }
    };
  }, [type, data, faqs, breadcrumbs]);

  return null;
};

export default JsonLd;
