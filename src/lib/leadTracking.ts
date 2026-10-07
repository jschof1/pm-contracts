interface LeadFormFields {
  service?: string;
  email?: string;
  phone: string;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

// Call only after the enquiry endpoint accepts the submission. Contact fields
// are for the GTM enhanced-conversion tag, never general analytics properties.
export function trackLeadFormSubmit({ service = '', email = '', phone }: LeadFormFields) {
  if (typeof window === 'undefined') return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'lead_form_submit',
      form_name: 'quote_form',
      service,
      user_email: email.trim(),
      user_phone: phone.trim(),
    });
  } catch {
    // A blocked or broken tracking tag must not turn an accepted lead into an error.
  }
}
