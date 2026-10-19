import { Link } from 'react-router-dom';
import { CheckCircle, Phone, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/SEOHead';
import { siteSettings } from '@/data/siteSettings';
import { trackCallClick } from '@/lib/leadTracking';

type ThankYouProps = { source: 'home' | 'quote' };

// Distinct noindex pages allow separate successful-form goals in Google Ads.
const ThankYou = ({ source }: ThankYouProps) => {
  const isQuote = source === 'quote';
  const path = isQuote ? '/thank-you-quote' : '/thank-you-home';
  return (
    <Layout>
      <SEOHead
        title={isQuote ? 'Quote Request Received | PM Roofers' : 'Enquiry Received | PM Roofers'}
        description="Thank you for getting in touch with PM Roofers."
        canonicalPath={path}
        noindex
      />
      <section className="section-padding bg-secondary min-h-[60vh] flex items-center">
        <div className="container max-w-2xl mx-auto px-4">
          <div className="bg-card border border-border rounded-2xl shadow-lg p-8 md:p-12 text-center">
            <CheckCircle className="w-16 h-16 text-accent mx-auto mb-6" aria-hidden="true" />
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
              Thank you, we've received your {isQuote ? 'quote request' : 'enquiry'}.
            </h1>
            <p className="text-muted-foreground text-lg mb-7">
              The PM Roofers team will review your details and be in touch about the next steps.
              If your roofing issue is urgent, please call us directly.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a
                href={`tel:${siteSettings.phoneFormatted}`}
                onClick={() => trackCallClick('Thank you page call')}
                className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground font-bold px-6 py-3 rounded-md"
              >
                <Phone className="w-5 h-5" />{siteSettings.phoneDisplay}
              </a>
              <Link to="/" className="inline-flex items-center justify-center gap-2 border border-border font-semibold px-6 py-3 rounded-md">
                Back to homepage <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default ThankYou;
