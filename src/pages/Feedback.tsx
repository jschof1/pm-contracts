import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { siteSettings } from "@/data/siteSettings";
import { normalizeUKPhone } from "@/lib/phoneUtils";
import SEOHead from "@/components/SEOHead";

const FeedbackPage = () => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    feedback: "",
  });
  const { toast } = useToast();

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);

    if (rating >= 4) {
      if (siteSettings.feedbackGoogleReviewUrl) {
        window.location.href = siteSettings.feedbackGoogleReviewUrl;
        return;
      }

      setSubmitted(true);
    } else {
      // Show feedback form for 1, 2, or 3 stars
      setShowForm(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(siteSettings.feedbackWebhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: selectedRating,
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: normalizeUKPhone(formData.phone.trim()),
          feedback: formData.feedback.trim(),
          source: "feedback-page",
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setSubmitted(true);
      toast({
        title: "Feedback received",
        description: "Thank you for letting us know. We'll be in touch soon.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title={`Feedback | ${siteSettings.businessName}`}
        description={`Private feedback form for ${siteSettings.businessName}.`}
        canonicalPath="/feedback"
        noindex
      />
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
            {!showForm && !submitted && (
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground mb-2">How was your experience?</h1>
                <p className="text-muted-foreground mb-8">Your feedback helps us improve our service</p>

                <div className="flex justify-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(null)}
                      className="p-1 transition-transform hover:scale-110"
                      aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                    >
                      <Star
                        className={`w-10 h-10 transition-colors ${
                          (hoveredRating !== null ? star <= hoveredRating : star <= (selectedRating || 0))
                            ? "fill-accent text-accent"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground">Click a star to rate your experience</p>
              </div>
            )}

            {showForm && !submitted && (
              <div>
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-foreground mb-2">We're sorry to hear that</h2>
                  <p className="text-muted-foreground text-sm">
                    We truly apologise if we didn't meet your expectations. Please let us know what went wrong so we can
                    make it right.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      maxLength={255}
                    />
                  </div>
                  <div>
                    <Input
                      type="tel"
                      placeholder="Your phone (optional)"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      maxLength={20}
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Please tell us what went wrong..."
                      value={formData.feedback}
                      onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                      required
                      rows={4}
                      maxLength={1000}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Feedback"}
                  </Button>
                </form>
              </div>
            )}

            {submitted && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">Thank you for your feedback</h2>
                <p className="text-muted-foreground text-sm">
                  {selectedRating && selectedRating >= 4
                    ? "We appreciate the positive feedback. If our public Google review profile is not live yet, your response has still been recorded."
                    : "We appreciate you taking the time to share your experience. A member of our team will be in touch shortly to discuss how we can make things right."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackPage;
