import { CheckCircle2, Star, MessageSquare, RefreshCw, ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { siteSettings } from "@/data/siteSettings";

const MarketingForm = () => {
  return (
    <>
      <SEOHead
        title="Customer Submitted | PM Roofers"
        description="Your quote request has been received."
        canonicalPath="/marketing-form"
        noindex
      />
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
        <div className="max-w-xl w-full">
          {/* Success Header */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sharp">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Customer Added
            </h1>
            <p className="text-lg text-muted-foreground">
              The customer has been added to the pipeline.
            </p>
          </div>

          {/* What's Next */}
          <div className="bg-card rounded-2xl shadow-sharp-lg border-2 border-border overflow-hidden">
            <div className="bg-primary text-primary-foreground px-6 py-4">
              <h2 className="text-xl font-black text-center">Here's What Happens Next</h2>
            </div>

            <div className="p-6 space-y-6">
              {/* Step 1 - Reviews */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-amber-soft rounded-xl flex items-center justify-center flex-shrink-0 shadow-sharp-sm">
                  <Star className="w-6 h-6 text-amber" />
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-foreground text-lg mb-1">5-Star Review Request</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    The customer will receive reminders to leave a 5-star Google review over the next 4 weeks. 
                    This runs automatically and stops as soon as they leave one. Negative reviews are filtered out.
                  </p>
                </div>
              </div>

              {/* Connector Arrow */}
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90" />
                </div>
              </div>

              {/* Step 2 - Follow-up */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-accent-secondary rounded-xl flex items-center justify-center flex-shrink-0 shadow-sharp-sm">
                  <RefreshCw className="w-6 h-6 text-accent-secondary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-foreground text-lg mb-1">1-Year Follow-Up Sequence</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    The customer will receive texts every 2–3 months reminding them of your return customer discount 
                    and requesting referrals — both offering the same discount incentive.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-muted/30 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                Both sequences run automatically. No manual action needed.
              </p>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-6 text-center space-y-3">
            <a 
              href="/add-customer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-xl shadow-sharp hover:shadow-sharp-lg transition-all"
            >
              Add Another Customer
            </a>
            <p className="text-muted-foreground text-sm">
              Questions or need to manually adjust anything?{" "}
              <a 
                href={`tel:${siteSettings.phoneFormatted}`}
                className="inline-flex items-center gap-1 text-primary font-bold hover:underline"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Get in touch
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketingForm;
