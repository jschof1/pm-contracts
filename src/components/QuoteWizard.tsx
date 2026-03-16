import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Home, Ruler, Layers, Palette, User, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { siteSettings } from '@/data/siteSettings';
import { toast } from 'sonner';
import { normalizeUKPhone } from '@/lib/phoneUtils';

interface FormData {
  propertyType: string;
  projectSize: string;
  serviceInterest: string;
  preferredStyle: string;
  name: string;
  phone: string;
  email: string;
  postcode: string;
  message: string;
}

const initialFormData: FormData = {
  propertyType: '',
  projectSize: '',
  serviceInterest: '',
  preferredStyle: '',
  name: '',
  phone: '',
  email: '',
  postcode: '',
  message: '',
};

const steps = [
  { id: 1, title: 'Property', icon: Home },
  { id: 2, title: 'Scope', icon: Ruler },
  { id: 3, title: 'Service', icon: Layers },
  { id: 4, title: 'Style', icon: Palette },
  { id: 5, title: 'Details', icon: User },
  { id: 6, title: 'Complete', icon: Check },
];

const propertyTypes = [
  { value: 'residential', label: 'Residential Property' },
  { value: 'commercial', label: 'Commercial Property' },
];

const sizeRanges = [
  { value: 'small', label: 'Small Job / Single Area' },
  { value: 'medium', label: 'Multi-Area Property Clean' },
  { value: 'large', label: 'Full Exterior Deep Clean' },
  { value: 'commercial', label: 'Commercial Project' },
  { value: 'unsure', label: 'Not Sure - Need Survey' },
];

const serviceInterests = [
  { value: 'roof-replacement', label: 'Roof Replacement' },
  { value: 'roof-repairs', label: 'Roof Repairs' },
  { value: 'emergency-roof-repairs', label: 'Emergency Roof Repairs' },
  { value: 'leadwork', label: 'Leadwork' },
  { value: 'chimney-repairs', label: 'Chimney Repairs' },
  { value: 'roughcasting', label: 'Roughcasting' },
  { value: 'upvc-gutters', label: 'UPVC Gutters' },
  { value: 'other', label: 'Other Roofing or Exterior Work' },
];

const styles = [
  { value: 'repair', label: 'Repair Existing Roof' },
  { value: 'replacement', label: 'Full Roof Replacement' },
  { value: 'maintenance', label: 'Preventative Maintenance' },
  { value: 'exterior-upgrade', label: 'Exterior Upgrade / Protection' },
  { value: 'unsure', label: 'Need Expert Advice' },
];

interface QuoteWizardProps {
  compact?: boolean;
}

const QuoteWizard = ({ compact = false }: QuoteWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 6) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (!canProceed()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitted(false);
    const loadingToast = toast.loading('Sending your request...');
    
    try {
      const response = await fetch(siteSettings.quoteFormWebhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          phone: normalizeUKPhone(formData.phone),
          source: "quote-wizard",
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      toast.dismiss(loadingToast);
      toast.success('Quote request sent successfully!');
      setIsSubmitted(true);
      setCurrentStep(6);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Something went wrong. Please try again or call us directly.');
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.propertyType !== '';
      case 2: return formData.projectSize !== '';
      case 3: return formData.serviceInterest !== '';
      case 4: return formData.preferredStyle !== '';
      case 5: return formData.name !== '' && formData.phone !== '' && formData.email !== '';
      default: return true;
    }
  };

  return (
    <div className={cn(
      "bg-card rounded-xl shadow-sharp-lg border border-border overflow-hidden",
      compact ? "p-3 md:p-6" : "p-4 md:p-8"
    )}>
      {/* Progress Steps */}
      {!compact && (
        <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2 px-2">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center shrink-0">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                    currentStep >= step.id
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <step.icon className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <span className={cn(
                  "text-[10px] md:text-xs mt-2 hidden sm:block",
                  currentStep >= step.id ? "text-accent font-medium" : "text-muted-foreground"
                )}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-4 md:w-12 h-0.5 mx-1 md:mx-2",
                    currentStep > step.id ? "bg-accent" : "bg-muted"
                  )}
                ></div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-[280px]"
        >
          {/* Step 1: Property Type */}
          {currentStep === 1 && (
            <div>
              <h3 className="font-display text-lg md:text-2xl font-semibold mb-2">
                What type of property is this for?
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm mb-6">
                This helps us provide an accurate quote
              </p>
              <RadioGroup
                value={formData.propertyType}
                onValueChange={(value) => updateFormData('propertyType', value)}
                className="grid gap-3"
              >
                {propertyTypes.map((type) => (
                  <Label
                    key={type.value}
                    htmlFor={type.value}
                    className={cn(
                      "flex items-center gap-3 p-3 md:p-4 rounded-lg border-2 cursor-pointer transition-all",
                      formData.propertyType === type.value
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/50"
                    )}
                  >
                    <RadioGroupItem value={type.value} id={type.value} />
                    <span className="font-medium text-sm md:text-base">{type.label}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Step 2: Size */}
          {currentStep === 2 && (
            <div>
              <h3 className="font-display text-lg md:text-2xl font-semibold mb-2">
                Project scope?
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm mb-6">
                Tell us about the size of your project
              </p>
              <RadioGroup
                value={formData.projectSize}
                onValueChange={(value) => updateFormData('projectSize', value)}
                className="grid gap-3"
              >
                {sizeRanges.map((size) => (
                  <Label
                    key={size.value}
                    htmlFor={size.value}
                    className={cn(
                      "flex items-center gap-3 p-3 md:p-4 rounded-lg border-2 cursor-pointer transition-all",
                      formData.projectSize === size.value
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/50"
                    )}
                  >
                    <RadioGroupItem value={size.value} id={size.value} />
                    <span className="font-medium text-sm md:text-base">{size.label}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Step 3: Service Interest */}
          {currentStep === 3 && (
            <div>
              <h3 className="font-display text-lg md:text-2xl font-semibold mb-2">
                Which service are you interested in?
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm mb-6">
                Select the primary service you require
              </p>
              <RadioGroup
                value={formData.serviceInterest}
                onValueChange={(value) => updateFormData('serviceInterest', value)}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {serviceInterests.map((service) => (
                  <Label
                    key={service.value}
                    htmlFor={service.value}
                    className={cn(
                      "flex items-center gap-3 p-3 md:p-4 rounded-lg border-2 cursor-pointer transition-all",
                      formData.serviceInterest === service.value
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/50"
                    )}
                  >
                    <RadioGroupItem value={service.value} id={service.value} />
                    <span className="font-medium text-sm">{service.label}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Step 4: Style Preference */}
          {currentStep === 4 && (
            <div>
              <h3 className="font-display text-lg md:text-2xl font-semibold mb-2">
                Preferred style direction?
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm mb-6">
                We'll show you color samples during consultation
              </p>
              <RadioGroup
                value={formData.preferredStyle}
                onValueChange={(value) => updateFormData('preferredStyle', value)}
                className="grid gap-3"
              >
                {styles.map((style) => (
                  <Label
                    key={style.value}
                    htmlFor={style.value}
                    className={cn(
                      "flex items-center gap-3 p-3 md:p-4 rounded-lg border-2 cursor-pointer transition-all",
                      formData.preferredStyle === style.value
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/50"
                    )}
                  >
                    <RadioGroupItem value={style.value} id={style.value} />
                    <span className="font-medium text-sm md:text-base">{style.label}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Step 5: Contact Details */}
          {currentStep === 5 && (
            <div>
              <h3 className="font-display text-lg md:text-2xl font-semibold mb-2">
                Your contact details
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm mb-6">
                We'll call you within 24 hours to arrange your free survey
              </p>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-xs md:text-sm">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      placeholder="John Smith"
                      className="mt-1 h-9 md:h-10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-xs md:text-sm">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      placeholder={siteSettings.phone}
                      className="mt-1 h-9 md:h-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-xs md:text-sm">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    placeholder="john@example.com"
                    className="mt-1 h-9 md:h-10"
                  />
                </div>
                <div>
                  <Label htmlFor="postcode" className="text-xs md:text-sm">Postcode</Label>
                  <Input
                    id="postcode"
                    value={formData.postcode}
                    onChange={(e) => updateFormData('postcode', e.target.value)}
                    placeholder="M1 1AA"
                    className="mt-1 h-9 md:h-10"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-xs md:text-sm">Message (Optional)</Label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => updateFormData('message', e.target.value)}
                    placeholder="Tell us about your project..."
                    rows={3}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Confirmation */}
          {currentStep === 6 && (
            <div className="text-center py-4 md:py-8">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Check className="w-8 h-8 md:w-10 md:h-10 text-accent" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold mb-2 md:mb-3">
                Thank You!
              </h3>
              <p className="text-muted-foreground text-sm md:text-base mb-4 md:mb-6 max-w-md mx-auto">
                Your quote request has been submitted. A member of our team will contact you 
                within 24 hours to arrange your free, no-obligation survey.
              </p>
              <p className="text-xs md:text-sm text-accent font-medium">
                Expected callback: Within 24 hours
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      {currentStep < 6 && (
        <div className="flex items-center justify-between mt-6 md:mt-8 pt-4 md:pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="gap-2 text-xs md:text-sm px-3 md:px-4"
          >
            <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
            Back
          </Button>

          {currentStep < 5 ? (
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="btn-bronze gap-2 text-xs md:text-sm px-3 md:px-4"
            >
              Next
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className="btn-bronze gap-2 text-xs md:text-sm px-3 md:px-4"
            >
              Get My Free Quote
              <Check className="w-3 h-3 md:w-4 md:h-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default QuoteWizard;
