import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/SEOHead';
import JsonLd from '@/components/JsonLd';
import { seoData } from '@/data/seoData';
import QuoteWizard from '@/components/QuoteWizard';
import { GoogleReviewBadge, FullyInsuredBadge, CertificationLogos } from '@/components/shared/TrustBadgeBar';
import { CheckCircle } from 'lucide-react';

const GetQuote = () => {
  return (
    <Layout>
      <SEOHead 
        title={seoData.getQuote.title}
        description={seoData.getQuote.description}
        canonicalPath="/get-quote"
      />
      <JsonLd 
        type="BreadcrumbList" 
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Get Quote', path: '/get-quote' }
        ]} 
      />
      <section className="section-padding bg-secondary">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <GoogleReviewBadge />
              <FullyInsuredBadge />
            </div>
            
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary mb-4">
              Get Your Free Quote
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-6">
              Complete our quick form and we'll arrange a free, no-obligation survey at your property.
            </p>
            
            {/* Trust Statement */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-accent" />
                Fully Insured
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-accent" />
                Quality Guaranteed
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-accent" />
                Free Survey
              </span>
            </div>
          </div>
          
          <QuoteWizard />
          
          {/* Certifications */}
          <div className="mt-10 pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground text-center mb-4">Accredited & Certified</p>
            <CertificationLogos />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GetQuote;
