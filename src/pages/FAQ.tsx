import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/SEOHead';
import JsonLd from '@/components/JsonLd';
import { seoData } from '@/data/seoData';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { siteSettings } from '@/data/siteSettings';
import { siteContent } from '@/data/content';
import { HelpCircle } from 'lucide-react';
import { craftsmanshipImage } from '@/data/images';
import { GoogleReviewBadge, CertificationLogos } from '@/components/shared/TrustBadgeBar';

// Flatten all FAQs for JSON-LD
const getAllFaqs = (categories: typeof faqCategories) => {
  return categories.flatMap(cat => cat.faqs);
};

const faqCategories = siteContent.faqPage.categories;

const FAQ = () => {
  const allFaqs = getAllFaqs(faqCategories);
  
  return (
    <Layout>
      <SEOHead 
        title={seoData.faq.title}
        description={seoData.faq.description}
        canonicalPath="/faq"
      />
      <JsonLd type="FAQPage" faqs={allFaqs} />
      <JsonLd 
        type="BreadcrumbList" 
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'FAQ', path: '/faq' }
        ]} 
      />
      {/* Hero Section */}
      <section className="bg-primary pt-8 pb-16 md:py-20 relative overflow-hidden border-b-4 border-accent">
        <div className="absolute inset-0 opacity-10">
          <img 
            src={craftsmanshipImage} 
            alt="" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Trust Badge */}
            <div className="flex justify-center mb-6">
              <GoogleReviewBadge className="!bg-card/10 !rounded-lg border-2 border-primary-foreground/20" />
            </div>
            
            <div className="flex items-center justify-center gap-3 md:flex-col md:gap-4 mb-3 md:mb-6">
              <div className="inline-flex items-center justify-center w-10 h-10 md:w-16 md:h-16 bg-accent/20 rounded-full shrink-0">
                <HelpCircle className="w-5 h-5 md:w-8 md:h-8 text-accent" />
              </div>
              <h1 className="font-display text-3xl md:text-5xl text-primary-foreground md:text-center">
                {siteContent.faqPage.heroTitle}
              </h1>
            </div>
            <p className="text-base md:text-xl text-primary-foreground/80">
              {siteContent.faqPage.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="pt-10 pb-20 md:py-20 bg-muted/50 relative overflow-hidden">
        <div className="grid-overlay absolute inset-0" />
        <div className="absolute top-8 left-8 w-20 h-20 border-l-4 border-t-4 theme-corner-tl border-primary/10" />
        <div className="absolute bottom-8 right-8 w-20 h-20 border-r-4 border-b-4 theme-corner-br border-primary/10" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl text-foreground mb-6 text-center md:text-left">
                {category.title}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`${categoryIndex}-${index}`}
                    className="bg-card border border-border rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-left text-lg font-semibold text-card-foreground hover:text-accent-text-on-light">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl text-secondary-foreground mb-4">
              {siteContent.faqPage.ctaTitle}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {siteContent.faqPage.ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-md hover:bg-accent/90 transition-colors"
              >
                {siteContent.faqPage.ctaContactLabel}
              </a>
              <a
                href={`tel:${siteSettings.phoneFormatted}`}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary font-semibold rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {siteContent.cta.callNow}
              </a>
            </div>
            {/* Certifications */}
            <CertificationLogos />
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
