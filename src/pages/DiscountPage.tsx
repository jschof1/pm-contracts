import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { siteSettings } from "@/data/siteSettings";
import { Gift, Clock, Shield, CheckCircle2, Users, Star, Flame, AlertTriangle, X } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const DiscountPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse moves to top of viewport (leaving page)
      if (e.clientY <= 5 && !hasShownPopup && !isSubmitted) {
        setShowExitPopup(true);
        setHasShownPopup(true);
      }
    };

    // Also detect mobile back button via visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && !hasShownPopup && !isSubmitted) {
        // Store in session so popup shows on return
        sessionStorage.setItem('showExitPopup', 'true');
      }
    };

    // Check if returning from tab switch
    if (sessionStorage.getItem('showExitPopup') === 'true' && !hasShownPopup && !isSubmitted) {
      setShowExitPopup(true);
      setHasShownPopup(true);
      sessionStorage.removeItem('showExitPopup');
    }

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [hasShownPopup, isSubmitted]);

  // Countdown timer - expires at midnight tonight (local timezone)
  const getTimeUntilMidnight = () => {
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    const diff = endOfDay.getTime() - now.getTime();
    if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };
    return {
      hours: Math.floor(diff / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };
  };
  const [timeLeft, setTimeLeft] = useState(getTimeUntilMidnight);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const next = getTimeUntilMidnight();
      setTimeLeft(next);
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  // Rotating location examples for social proof styling
  const [recentClaim, setRecentClaim] = useState(0);
  const recentNames = ["Sarah from Glasgow", "Mike from Paisley", "Emma from Coatbridge", "James from Hamilton", "Lisa from Greenock"];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRecentClaim(prev => (prev + 1) % recentNames.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [recentNames.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error("Please fill in your name and phone number");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(siteSettings.discountFormWebhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim(),
          source: "special-offer-page",
          offer: "PRIORITY ROOFING QUOTE REQUEST",
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again or use the call now button.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <>
        <SEOHead
          title="Priority Roofing Quote Request | PM Roofers"
          description="Request a priority roofing quote from PM Roofers for urgent repairs, replacements, and exterior protection work."
          canonicalPath="/discount"
          noindex
        />
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6 bg-card p-8 rounded-2xl shadow-2xl border border-border">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">You're In! 🎉</h1>
          <p className="text-muted-foreground text-lg">
            Your <span className="text-primary font-semibold">priority quote request</span> has been noted.
            We'll call you shortly to discuss your roofing or exterior project.
          </p>
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Can't wait? Call us now:
            </p>
            <a 
              href={`tel:${siteSettings.phoneFormatted}`}
              className="text-xl font-bold text-primary hover:underline"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="Priority Roofing Quote Request | PM Roofers"
        description="Request a priority roofing quote from PM Roofers for urgent repairs, replacements, and exterior protection work."
        canonicalPath="/discount"
        noindex
      />
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      {/* Sticky Urgency Banner */}
      <div className="bg-destructive text-destructive-foreground py-2 px-4 text-center sticky top-0 z-50">
        <div className="flex items-center justify-center gap-2 text-sm font-bold">
          <Flame className="w-4 h-4 animate-pulse" />
          {timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 ? (
            <span>OFFER EXPIRED — Check back tomorrow!</span>
          ) : (
            <>
              <span>OFFER EXPIRES IN:</span>
              <div className="flex gap-1 font-mono">
                <span className="bg-background/20 px-2 py-0.5 rounded">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span>:</span>
                <span className="bg-background/20 px-2 py-0.5 rounded">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span>:</span>
                <span className="bg-background/20 px-2 py-0.5 rounded">{String(timeLeft.seconds).padStart(2, '0')}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Exit Intent Popup */}
      <Dialog open={showExitPopup} onOpenChange={setShowExitPopup}>
        <DialogContent className="sm:max-w-md border-2 border-destructive/50 p-0 overflow-hidden">
          <div className="bg-destructive text-destructive-foreground p-3 text-center">
            <div className="flex items-center justify-center gap-2 font-bold">
              <AlertTriangle className="w-5 h-5" />
              WAIT! Don't Leave Empty Handed
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Gift className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-black text-foreground">
                Your <span className="text-primary">Priority Quote</span> Is Waiting
              </h3>
              <p className="text-muted-foreground">
                You're seconds away from requesting a fast callback from PM Roofers. Are you sure you want to leave?
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-foreground">No obligation — just a friendly call</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-foreground">Takes 30 seconds to claim</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-foreground">Offer expires at midnight</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={() => {
                  setShowExitPopup(false);
                  // Focus on the name input
                  document.getElementById('name')?.focus();
                }}
                className="w-full h-12 font-bold text-base"
              >
                Yes - Keep My Priority Quote
              </Button>
              <button
                onClick={() => setShowExitPopup(false)}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                No thanks, I'll come back later
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="container max-w-xl mx-auto px-4 py-6">
        {/* Form First - Above the Fold */}
        <div className="bg-card p-6 md:p-8 rounded-2xl shadow-2xl border-2 border-primary/20 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
          
          <div className="relative space-y-5">
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                <Clock className="w-3 h-3" />
                Priority callback request
              </div>
              
              <div className="space-y-1">
                <h1 className="text-3xl md:text-4xl font-black text-foreground">
                  Get a <span className="text-primary">Fast Roofing Callback</span>
                </h1>
                <p className="text-muted-foreground">
                  For urgent repairs, replacement quotes, and roofing advice
                </p>
              </div>

              {/* Social Proof Counter */}
              <div className="flex items-center justify-center gap-2 text-sm">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">
                  <span className="font-bold text-foreground">Fast response</span> from a local roofing team
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-foreground font-medium text-sm">Your Name *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  maxLength={100}
                  className="h-12 text-base border-2 focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-foreground font-medium text-sm">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="07xxx xxxxxx"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  maxLength={20}
                  className="h-12 text-base border-2 focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-foreground font-medium text-sm">What do you need? (optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Roof leak, replacement, roughcasting, guttering..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={2}
                  maxLength={1000}
                  className="text-base resize-none border-2 focus:border-primary"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 text-lg font-black shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98]" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Request Priority Callback"}
              </Button>

              {/* Micro-commitments */}
              <div className="flex flex-col items-center gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-green-500" />
                  <span>Your info is 100% secure</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  <span>No spam, ever. We'll just call to discuss your project.</span>
                </div>
              </div>
            </form>

            {/* Live Social Proof Notification */}
            <div className="bg-muted/50 rounded-lg p-3 flex items-center gap-3 animate-fade-in">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Gift className="w-4 h-4 text-primary" />
              </div>
              <div className="text-sm">
                <span className="font-semibold text-foreground">{recentNames[recentClaim]}</span>
                  <span className="text-muted-foreground"> just requested a roofing callback</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Signals Below */}
        <div className="mt-6 space-y-4">
          {/* Rating */}
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              <Star className="w-5 h-5 fill-[#facc15] text-[#facc15]" />
              <Star className="w-5 h-5 fill-[#facc15] text-[#facc15]" />
              <Star className="w-5 h-5 fill-[#facc15] text-[#facc15]" />
              <Star className="w-5 h-5 fill-[#facc15] text-[#facc15]" />
              <Star className="w-5 h-5 fill-[#facc15] text-[#facc15]" />
            </div>
            <span className="text-sm text-muted-foreground">
              <span className="font-bold text-foreground">5/5</span> Google Reviews
            </span>
          </div>

          {/* Quick Trust Points */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-card/50 rounded-lg p-3 border border-border">
              <div className="font-bold text-foreground">30+ Years</div>
              <div className="text-muted-foreground">Experience</div>
            </div>
            <div className="bg-card/50 rounded-lg p-3 border border-border">
              <div className="font-bold text-foreground">Fully</div>
              <div className="text-muted-foreground">Insured</div>
            </div>
            <div className="bg-card/50 rounded-lg p-3 border border-border">
              <div className="font-bold text-foreground">Free</div>
              <div className="text-muted-foreground">Quotes</div>
            </div>
          </div>

          {/* What You Get */}
          <div className="bg-card/50 rounded-xl p-4 border border-border space-y-3">
            <h3 className="font-bold text-foreground text-center">What You Get:</h3>
            <div className="space-y-2">
              {[
                "Priority callback from PM Roofers",
                "Free no-obligation quote",
                "Straightforward advice on the right next step",
                "A roofing-specific plan for your job"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default DiscountPage;
