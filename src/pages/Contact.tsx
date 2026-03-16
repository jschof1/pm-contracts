import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/SEOHead';
import JsonLd from '@/components/JsonLd';
import { seoData } from '@/data/seoData';
import QuoteWizard from '@/components/QuoteWizard';
import { Phone, Mail, MapPin, Clock, Shield } from 'lucide-react';
import { siteSettings } from '@/data/siteSettings';
import { siteContent } from '@/data/content';
import { teamPhoto } from '@/data/images';
import { GoogleReviewBadge, CertificationLogos } from '@/components/shared/TrustBadgeBar';

const iconMap = {
  phone: Phone,
  email: Mail,
  serviceArea: MapPin,
  hours: Clock,
} as const;

const contactInfo = [
  ...siteContent.contactPage.infoCards.map((item) => {
    const Icon = iconMap[item.key];
    let content = item.content;
    let href = item.href;

    if (item.contentType === 'phone') {
      content = siteContent.cta.callNow;
      href = `tel:${siteSettings.phoneFormatted}`;
    }
    if (item.contentType === 'email') {
      content = siteSettings.email;
      href = `mailto:${siteSettings.email}`;
    }
    if (item.contentType === 'address') {
      content = siteSettings.address;
    }

    return {
      icon: Icon,
      title: item.title,
      content,
      href,
      subtext: item.subtext,
    };
  }),
];

const Contact = () => {
  return (
    <Layout>
      <SEOHead 
        title={seoData.contact.title}
        description={seoData.contact.description}
        canonicalPath="/contact"
      />
      <JsonLd 
        type="BreadcrumbList" 
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' }
        ]} 
      />
      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <GoogleReviewBadge />
              <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Shield className="w-4 h-4 text-accent" />
                <span className="text-xs font-bold text-primary-foreground">{siteContent.home.hero.badgeInsured}</span>
              </div>
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-primary-foreground mb-6">
              {siteContent.contactPage.heroTitle}
            </h1>
            <p className="text-xl text-primary-foreground/80">
              {siteContent.contactPage.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Bar */}
      <section className="bg-accent py-8 border-b border-accent-foreground/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-accent-foreground/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-accent-foreground text-xs mb-1 uppercase tracking-wider">
                  {item.title}
                </h3>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-accent-foreground font-medium hover:underline block text-base md:text-sm break-all sm:break-words px-2"
                  >
                    {item.content}
                  </a>
                ) : (
                  <span className="text-accent-foreground font-medium block text-base md:text-sm">{item.content}</span>
                )}
                <span className="text-xs text-accent-foreground/80 mt-1 block">{item.subtext}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-12 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            {/* Left Column - Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
                {siteContent.contactPage.whyTitle}
              </h2>
              <div className="space-y-6 text-muted-foreground">
                <p className="text-sm md:text-base">
                  {siteContent.contactPage.whyIntro}
                </p>
                <ul className="space-y-4">
                  {siteContent.contactPage.steps.map((step, index) => (
                    <li key={step.title} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-semibold shrink-0">{index + 1}</span>
                      <div>
                        <strong className="text-foreground text-sm md:text-base">{step.title}</strong>
                        <p className="text-xs md:text-sm">{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct Contact Box */}
              <div className="mt-8 p-5 md:p-6 bg-secondary rounded-lg border border-border">
                <h3 className="font-display text-xl text-secondary-foreground mb-4">
                  {siteContent.contactPage.preferToTalkTitle}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {siteContent.contactPage.preferToTalkDescription}
                </p>
                <motion.a
                  href={`tel:${siteSettings.phoneFormatted}`}
                  className="inline-flex items-center gap-2 text-primary label-solid font-semibold text-lg hover:underline break-all"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <Phone className="w-5 h-5 shrink-0 back" />
                  {siteContent.cta.callNow}
                </motion.a>
              </div>
            </motion.div>

            {/* Right Column - Quote Wizard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full"
            >
              <div className="bg-card p-4 md:p-8 rounded-xl shadow-lg border border-border">
                <h3 className="font-display text-xl md:text-2xl text-card-foreground mb-2 text-center">
                  {siteContent.contactPage.formTitle}
                </h3>
                <p className="text-muted-foreground text-center text-xs md:text-sm mb-6">
                  {siteContent.contactPage.formSubtitle}
                </p>
                <QuoteWizard compact={true} />
                
                {/* Certifications below form */}
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center mb-4">{siteContent.contactPage.accreditedLabel}</p>
                  <CertificationLogos />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl text-secondary-foreground mb-4">
              {siteContent.contactPage.mapTitle}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {siteContent.contactPage.mapDescription}
            </p>
          </motion.div>
          <div className="bg-muted rounded-lg h-80 overflow-hidden relative">
            <img
              src={teamPhoto}
              alt="PM Roofers service area coverage"
              className="w-full h-full object-cover"
              width={1200}
              height={320}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-primary/70 flex items-center justify-center">
              <div className="text-center text-primary-foreground">
                <MapPin className="w-12 h-12 mx-auto mb-2" />
                <p className="font-display text-2xl">{siteContent.contactPage.mapTitle}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
