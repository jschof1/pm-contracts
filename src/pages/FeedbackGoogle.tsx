import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Star } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { siteSettings } from "@/data/siteSettings";

const FeedbackGoogle = () => {
  useEffect(() => {
    if (siteSettings.googleBusinessReviewUrl) {
      window.location.replace(siteSettings.googleBusinessReviewUrl);
    }
  }, []);

  const profileUrl = siteSettings.googleBusinessProfileUrl;

  return (
    <>
      <SEOHead
        title={`Google Reviews | ${siteSettings.businessName}`}
        description={`Review handoff page for ${siteSettings.businessName}.`}
        canonicalPath="/feedback/google"
        noindex
      />
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-8 text-center shadow-xl">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Star className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-3 text-3xl font-bold text-foreground">Thanks for the 5-star feedback</h1>
          <p className="mb-6 text-muted-foreground">
            Our Google Business Profile review link is still being finalised as part of the PM Roofers launch.
            Once the profile is live, this page will redirect straight to the public review form.
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            {profileUrl ? (
              <Button asChild size="lg">
                <a href={profileUrl} target="_blank" rel="noreferrer">
                  View Google Reviews
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            ) : null}
            <Button asChild variant="outline" size="lg">
              <Link to="/reviews">Back to reviews</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackGoogle;
