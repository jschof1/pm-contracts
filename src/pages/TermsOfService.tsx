import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { seoData } from "@/data/seoData";
import { siteSettings } from "@/data/siteSettings";

const TermsOfService = () => {
  return (
    <Layout>
      <SEOHead 
        title={seoData.terms.title}
        description={seoData.terms.description}
        canonicalPath="/terms-of-service"
      />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            Terms of Service
          </h1>
          <p className="text-muted-foreground mb-8">
            Last updated: January 2025
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using the services provided by {siteSettings.businessName} ("we", "our", or "us"), 
                you agree to be bound by these Terms of Service. If you do not agree to these terms, 
                please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                2. Services
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We provide roofing and exterior property services for homes and businesses, including roof repairs,
                roof replacement, emergency callouts, leadwork, chimney repairs, roughcasting, gutters, damp proofing,
                dry rot repair, and related exterior works across Glasgow and surrounding areas. Services are provided
                subject to site conditions, access, and suitability of the structure involved.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                3. Quotations and Pricing
              </h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>All quotations are valid for 30 days from the date of issue unless otherwise stated.</li>
                <li>Prices are subject to a site survey and may vary based on actual conditions.</li>
                <li>Any additional work not included in the original quotation will be quoted separately.</li>
                <li>We reserve the right to adjust prices if there are significant changes in material costs.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                4. Payment Terms
              </h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>A deposit may be required for certain bookings, larger jobs, or reserved dates.</li>
                <li>The balance is due upon satisfactory completion of the agreed roofing or exterior works unless otherwise agreed in writing.</li>
                <li>We accept payment by bank transfer, credit/debit card, or cheque.</li>
                <li>Late payments may incur additional charges as permitted by law.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                5. Service Process
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our service process may include:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Assessment of the surfaces and access requirements before work begins.</li>
                <li>Selection of a suitable repair, replacement, or maintenance approach for the property.</li>
                <li>Professional roofing or exterior work carried out by our team.</li>
                <li>Final checks and site tidy-up once the work is complete.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                6. Guarantees and Warranties
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We provide the following guarantees:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>We stand behind the quality of our workmanship and service.</li>
                <li>Any service guarantees are limited to the scope described in your quotation or booking confirmation.</li>
                <li>Results may vary depending on surface age, condition, and pre-existing staining or damage.</li>
                <li>Damage caused by misuse, neglect, hidden defects, or third parties is not covered.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                7. Customer Responsibilities
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You agree to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide accurate information about your property and requirements.</li>
                <li>Ensure safe and reasonable access to the areas to be worked on as agreed.</li>
                <li>Inform us of any fragile surfaces, existing damage, access issues, or other relevant conditions before work begins.</li>
                <li>Obtain any necessary permissions or consents before work begins where applicable.</li>
                <li>Follow any aftercare or maintenance advice provided once the work is complete.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                8. Cancellation Policy
              </h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Cancellations made more than 14 days before the scheduled start date will receive a full refund of any deposit.</li>
                <li>Cancellations made within 14 days may forfeit part or all of the deposit to cover costs incurred.</li>
                <li>We reserve the right to cancel or reschedule work due to adverse weather conditions.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                9. Limitation of Liability
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                While we take every care to deliver high-quality work, our liability is limited to the 
                value of the contract. We are not liable for any indirect, incidental, or consequential 
                damages. This does not affect your statutory rights as a consumer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                10. Intellectual Property
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on this website, including text, images, logos, and designs, is the property 
                of {siteSettings.businessName} and is protected by copyright laws. You may not reproduce, 
                distribute, or use any content without our written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                11. Governing Law
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms of Service are governed by and construed in accordance with the laws of 
                England and Wales. Any disputes arising from these terms shall be subject to the 
                exclusive jurisdiction of the courts of England and Wales.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                12. Changes to Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. Changes will be 
                effective immediately upon posting to our website. Your continued use of our services 
                constitutes acceptance of any modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                13. Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-4 text-muted-foreground">
                <p><strong>{siteSettings.businessName}</strong></p>
                <p>Email: {siteSettings.email}</p>
                <p>Phone: Call now</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService;
