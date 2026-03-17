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
      <section className="section-padding bg-background">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
              What Happens After You Request A Quote?
            </h2>
            <p className="text-muted-foreground mb-4">
              Once you submit the form, PM Roofers reviews the details and arranges the next step based on the type of
              job. For straightforward repairs we can often advise quickly on likely causes and what to expect from a
              site visit. For larger replacement or roofline work, we use the enquiry to plan the survey properly so the
              quote reflects the real condition of the property rather than a guess.
            </p>
            <p className="text-muted-foreground mb-4">
              Customers usually use this page when they want a free roofing quote without pressure. It is suitable for
              roof repairs, emergency roof repairs, leadwork, chimney repairs, gutters, skylight issues, damp-related
              roofing problems, and full roof replacement. If you are still comparing options, you can review our
              <a href="/services" className="ml-1 font-semibold text-accent-text-on-light hover:underline">service pages</a>,
              browse local coverage in
              <a href="/areas" className="ml-1 font-semibold text-accent-text-on-light hover:underline">areas we cover</a>,
              or check
              <a href="/reviews" className="ml-1 font-semibold text-accent-text-on-light hover:underline">customer reviews</a>
              before sending your enquiry.
            </p>
            <p className="text-muted-foreground">
              If your issue is urgent, call instead of waiting for a callback. If you simply want honest guidance and a
              no-obligation price, this form is the fastest route to a proper response from the team.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GetQuote;
