import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { siteSettings } from '@/data/siteSettings';
import { normalizeUKPhone } from '@/lib/phoneUtils';

interface SimpleContactFormProps {
  compact?: boolean;
  className?: string;
}

const services = [
  'Roof Cleaning',
  'Gutter Cleaning',
  'Patio & Driveway Cleaning',
  'Window Cleaning',
  'Conservatory Cleaning',
  'Steam Cleaning',
  'Brickwork Cleaning',
  'Car Park Cleaning',
  'Rubbish Removal',
  'Other Cleaning Service',
];

const SimpleContactForm = ({ compact, className }: SimpleContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim() || !formData.service) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading('Sending your request...');
    
    try {
      const response = await fetch(siteSettings.quickFormWebhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          phone: normalizeUKPhone(formData.phone),
          source: "quick-contact-form",
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      toast.dismiss(loadingToast);
      toast.success('Thanks! We\'ll call you back shortly.');
      setFormData({ name: '', phone: '', service: '' });
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className={compact ? 'space-y-4' : 'space-y-5'}>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Your Name
          </label>
          <Input
            type="text"
            placeholder="John Smith"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-background border-border h-12 text-base px-4"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Phone Number
          </label>
          <Input
            type="tel"
            placeholder={siteSettings.phone}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="bg-background border-border h-12 text-base px-4"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            What do you need?
          </label>
          <Select
            value={formData.service}
            onValueChange={(value) => setFormData({ ...formData, service: value })}
          >
            <SelectTrigger className="bg-background border-border h-12 text-base px-4">
              <SelectValue placeholder="Select a service..." />
            </SelectTrigger>
            <SelectContent className="bg-card border-border z-50">
              {services.map((service) => (
                <SelectItem key={service} value={service} className="text-base py-3">
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-lg h-14 mt-2 shadow-sharp hover:shadow-sharp-lg transition-all"
        >
          {isSubmitting ? 'Sending...' : 'Get My Free Quote →'}
        </Button>
        
        <p className="text-xs text-muted-foreground text-center pt-1">
          ✓ No obligation · ✓ Response within 2 hours
        </p>
      </div>
    </form>
  );
};

export default SimpleContactForm;
