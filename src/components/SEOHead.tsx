import { useEffect } from 'react';
import { siteContent } from '@/data/content';

const BASE_URL = 'https://rooferglasgow.uk';
const DEFAULT_IMAGE = '/images/logo.png';
const SITE_NAME = siteContent.brand.businessName;

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  noindex?: boolean;
}

const SEOHead = ({
  title,
  description,
  canonicalPath = '',
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false,
}: SEOHeadProps) => {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper to set or create meta tag
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Helper to set or create link tag
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      
      if (!element) {
        element = document.createElement('link');
        element.rel = rel;
        document.head.appendChild(element);
      }
      element.href = href;
    };

    const fullUrl = `${BASE_URL}${canonicalPath}`;
    const fullImageUrl = image.startsWith('http') ? image : `${BASE_URL}${image}`;

    // Basic meta tags
    setMetaTag('description', description);
    
    // Robots
    if (noindex) {
      setMetaTag('robots', 'noindex, nofollow');
      setMetaTag('googlebot', 'noindex, nofollow');
    } else {
      setMetaTag('robots', 'index, follow');
      setMetaTag('googlebot', 'index, follow');
    }

    // Canonical URL
    setLinkTag('canonical', fullUrl);

    // Open Graph tags
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:url', fullUrl, true);
    setMetaTag('og:image', fullImageUrl, true);
    setMetaTag('og:image:alt', `${SITE_NAME} preview image`, true);
    setMetaTag('og:type', type, true);
    setMetaTag('og:site_name', SITE_NAME, true);
    setMetaTag('og:locale', 'en_GB', true);

    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', fullImageUrl);
    setMetaTag('twitter:image:alt', `${SITE_NAME} preview image`);

    // Cleanup function to remove dynamically added tags
    return () => {
      // We don't remove tags on cleanup to prevent flashing
    };
  }, [title, description, canonicalPath, image, type, noindex]);

  return null;
};

export default SEOHead;
