import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { seoData } from "@/data/seoData";
import { siteSettings } from "@/data/siteSettings";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <SEOHead 
        title={seoData.privacy.title}
        description={seoData.privacy.description}
        canonicalPath="/privacy-policy"
      />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-8">
            Last updated: August 2026
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                1. Introduction
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {siteSettings.businessName} ("we", "our", or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you visit our website or use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                2. Information We Collect
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may collect the following types of information:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Personal Information:</strong> Name, email address, phone number, postal address when you contact us or request a quote.</li>
                <li><strong>Property Information:</strong> Details about your property and project requirements for providing accurate quotes.</li>
                <li><strong>Optional service data:</strong> If you accept optional services, Plausible analytics and LeadConnector tracking/chat may process information about your website use.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide and maintain our services</li>
                <li>Process and respond to your enquiries and quote requests</li>
                <li>Communicate with you about your enquiry or requested services</li>
                <li>Understand website use and provide chat only where you have accepted those optional services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                4. Information Sharing
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except as necessary to provide our services or as required by law. 
                We may share information with trusted service providers who assist us in operating our 
                website and conducting our business, provided they agree to keep this information confidential.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Optional analytics and chat
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Optional services are off by default. If you choose to accept them, this website loads Plausible analytics and LeadConnector tracking/chat. Your choice is stored only in this browser so the website can remember it. You can change it at any time using the Cookie settings link in the footer.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                The separate Customer Portal page embeds a LeadConnector form only when you choose to open that page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                5. Data Security
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organisational measures to protect your personal 
                information against unauthorised access, alteration, disclosure, or destruction. However, 
                no method of transmission over the Internet is 100% secure, and we cannot guarantee 
                absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                6. Your Rights
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Under UK data protection laws, you have the right to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to processing of your personal information</li>
                <li>Request restriction of processing</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                7. Cookies
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Essential technical storage may be used to provide the website and protect forms. Optional analytics and chat are not loaded unless you choose to accept them. You can revisit that choice using Cookie settings in the footer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                8. Changes to This Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes 
                by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                9. Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
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

export default PrivacyPolicy;
