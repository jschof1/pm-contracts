import { motion } from 'framer-motion';
import { Link, useParams, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/SEOHead';
import JsonLd from '@/components/JsonLd';
import { getServiceSEO } from '@/data/seoData';
import QuoteWizard from '@/components/QuoteWizard';
import { CheckCircle, ArrowRight, Shield, Phone } from 'lucide-react';
import { getServiceData } from '@/data/services';
import { siteSettings } from '@/data/siteSettings';
import { GoogleReviewBadge, CertificationLogos } from '@/components/shared/TrustBadgeBar';

interface ServicePageProps {
  slugOverride?: string;
}

const ServicePage = ({ slugOverride }: ServicePageProps) => {
  const { service, slug } = useParams<{ service?: string; slug?: string }>();
  const resolvedSlug = slugOverride || service || slug || '';
  const data = getServiceData(resolvedSlug);

  if (!data) {
    return <Navigate to="/404" replace />;
  }

  const seo = getServiceSEO(data.title, data.slug);

  return (
    <Layout>
      <SEOHead 
        title={seo.title}
        description={seo.description}
        canonicalPath={`/${data.slug}`}
      />
      <JsonLd 
        type="Service" 
        data={{ name: data.title, description: data.description, slug: data.slug }} 
      />
      <JsonLd 
        type="BreadcrumbList" 
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: data.title, path: `/${data.slug}` }
        ]} 
      />
      {data.faqs && <JsonLd type="FAQPage" faqs={data.faqs} />}
      {/* Hero Section */}
      <section className="section-padding bg-primary relative overflow-hidden">
        {/* Background grid */}
        <div className="grid-overlay-accent absolute inset-0 opacity-20" />
        
        {/* Accent lines */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-8 text-sm font-bold uppercase tracking-widest transition-colors"
              >
                <ArrowRight className="w-4 h-4 rotate-180" /> Back to Services
              </Link>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <GoogleReviewBadge />
                <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-lg border-l-4 border-accent px-4 py-2">
                  <Shield className="w-4 h-4 text-accent" />
                  <span className="text-xs font-bold text-primary-foreground uppercase tracking-wider">Fully Insured & Guaranteed</span>
                </div>
              </div>
              
              <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                {data.title} <span className="text-accent">Services</span>
              </h1>
              <p className="text-xl text-primary-foreground/80 mb-10 leading-relaxed max-w-xl">
                {data.heroText}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#quote"
                  className="inline-flex items-center justify-center px-10 py-5 bg-accent text-accent-foreground font-bold rounded-lg hover:bg-accent/90 transition-all shadow-sharp hover:shadow-sharp-lg text-lg group"
                >
                  Get Free Quote
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href={`tel:${siteSettings.phoneFormatted}`}
                  className="inline-flex items-center justify-center px-10 py-5 border-2 border-primary-foreground text-primary-foreground font-bold rounded-lg hover:bg-primary-foreground hover:text-primary transition-all text-lg"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  Call Now
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* Decorative frame */}
              <div className="absolute -top-4 -right-4 w-full h-full border-4 border-accent/30 z-0" />
              <div className="bg-muted rounded-lg h-[450px] overflow-hidden relative z-10 shadow-sharp-lg border-2 border-primary-foreground/10">
                <img 
                  src={data.images.hero} 
                  alt={data.title}
                  className="w-full h-full object-cover"
                  width={640}
                  height={450}
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div className="bg-card/90 backdrop-blur-sm p-4 shadow-sharp border-l-4 border-accent">
                    <p className="text-primary font-bold text-sm uppercase tracking-wider">Expert Craftsmanship</p>
                    <p className="text-muted-foreground text-xs">Verified Professional Installation</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features/Sectors Section (Optional) */}
      {data.features && (
        <section className="section-padding bg-card">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center w-full md:max-w-3xl md:mx-auto mb-8 md:mb-16"
            >
              <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="label-solid text-xs md:text-sm font-bold tracking-wider uppercase mb-0.5 md:mb-4 px-3 py-1.5"
          >Comprehensive Solutions</motion.span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-2 md:mt-6 mb-6">
                What's Included
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
                We provide a complete end-to-end service, ensuring every aspect of your {data.title.toLowerCase()} project is handled with professional care.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-secondary p-8 border-t-4 border-accent shadow-sharp hover:shadow-sharp-lg transition-all group"
                >
                  <div className="surface-icon-muted w-16 h-16 mb-6 group-hover:bg-primary group-hover:text-primary-foreground">
                    {feature.icon && <feature.icon className="w-8 h-8 text-accent group-hover:text-primary-foreground transition-colors" />}
                  </div>
                  <h3 className="font-display text-xl font-bold text-secondary-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      <section className={`section-padding relative overflow-hidden ${data.features ? 'bg-secondary' : 'bg-card'}`}>
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="label-solid text-xs md:text-sm font-bold tracking-wider uppercase mb-0.5 md:mb-4 px-3 py-1.5"
          >Why Choose Us</motion.span>
              <h2 className={`font-display text-3xl md:text-5xl font-bold mt-2 md:mt-6 mb-8 leading-tight ${data.features ? 'text-secondary-foreground' : 'text-foreground'}`}>
                {data.benefitsTitle || `Why Choose Our ${data.title} Service?`}
              </h2>
              <p className="text-muted-foreground mb-10 text-base md:text-lg leading-relaxed">
                {data.benefitsDescription || data.description}
              </p>
              <div className="grid sm:grid-cols-2 gap-6 mb-12">
                {data.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-4 p-4 bg-card/50 backdrop-blur-sm border-l-4 border-accent shadow-sm">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted-foreground font-medium text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`tel:${siteSettings.phoneFormatted}`}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all shadow-sharp"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
                <a
                  href="#quote"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-bold rounded-lg hover:bg-accent/90 transition-all shadow-sharp"
                >
                  Get Free Quote
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -bottom-6 -left-6 w-full h-full border-4 border-primary/20 z-0" />
              <div className="bg-muted rounded-lg h-[400px] overflow-hidden relative z-10 shadow-sharp-lg border-2 border-primary-foreground">
                <img 
                  src={data.images.main} 
                  alt={`${data.title} Example`}
                  className="w-full h-full object-cover"
                  width={640}
                  height={400}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/10" />
              </div>
              {/* Floating trust element */}
              <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground p-6 shadow-sharp-lg z-20 hidden md:block">
                <p className="text-2xl font-bold font-display mb-1">20+ Years</p>
                <p className="text-[10px] uppercase tracking-widest font-bold">Industry Experience</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section (Optional) */}
      {data.process && (
        <section className="section-padding bg-primary relative overflow-hidden">
          {/* Background grid */}
          <div className="grid-overlay-accent absolute inset-0 opacity-10" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center w-full md:max-w-3xl md:mx-auto mb-8 md:mb-16"
            >
              <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="label-solid text-xs md:text-sm font-bold tracking-wider uppercase mb-0.5 md:mb-4 px-3 py-1.5"
          >Step-by-Step Excellence</motion.span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mt-2 md:mt-6 mb-6">
                Our Professional Process
              </h2>
              <p className="text-primary-foreground/70 max-w-2xl mx-auto text-base md:text-lg">
                From initial survey to final handover, we ensure a smooth, professional experience with clear communication at every stage.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.process.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative p-8 bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 group hover:bg-primary-foreground/10 transition-all"
                >
                  <div className="surface-icon-accent w-14 h-14 font-display text-2xl font-bold mb-6 group-hover:scale-110 transition-transform">
                    {item.step}
                  </div>
                  <h3 className="font-display text-xl font-bold text-primary-foreground mb-4">
                    {item.title}
                  </h3>
                  <p className="text-primary-foreground/60 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  {/* Connector line for desktop */}
                  {index < data.process.length - 1 && (
                    <div className="hidden lg:block absolute top-1/4 -right-4 w-8 h-0.5 bg-accent/30 z-0" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section (Optional) */}
      {data.galleryCount && (
        <section className={`section-padding ${!data.process ? 'bg-secondary' : 'bg-card'}`}>
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center w-full md:max-w-3xl md:mx-auto mb-8 md:mb-16"
            >
              <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="label-solid text-xs md:text-sm font-bold tracking-wider uppercase mb-0.5 md:mb-4 px-3 py-1.5"
          >Project Showcase</motion.span>
              <h2 className={`font-display text-3xl md:text-5xl font-bold mt-2 md:mt-6 mb-6 ${!data.process ? 'text-secondary-foreground' : 'text-foreground'}`}>
                Recent {data.title} Projects
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
                Take a look at the quality of our recent work across the region. Every project is finished to our exacting standards.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {Array.from({ length: data.galleryCount }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-muted rounded-lg h-80 overflow-hidden relative group shadow-sharp hover:shadow-sharp-lg transition-all"
                >
                  <img 
                    src={data.images.gallery?.[i % data.images.gallery.length] ?? data.images.main} 
                    alt={`${data.title} Project ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                    <span className="text-accent font-bold text-xs uppercase tracking-widest mb-2">Completed Project</span>
                    <span className="text-primary-foreground font-display text-xl font-bold">{data.title} - Case Study {i + 1}</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm p-2 shadow-sharp opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section (Optional) */}
      {data.faqs && (
        <section className="section-padding bg-secondary relative overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center w-full md:max-w-3xl md:mx-auto mb-8 md:mb-16"
            >
              <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="label-solid text-xs md:text-sm font-bold tracking-wider uppercase mb-0.5 md:mb-4 px-3 py-1.5"
          >Expert Advice</motion.span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-secondary-foreground mt-2 md:mt-6 mb-6">
                Common Questions
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
                Find answers to the most common questions about our {data.title.toLowerCase()} services.
              </p>
            </motion.div>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              {data.faqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-card p-8 border-l-4 border-primary shadow-sharp group hover:border-accent transition-all"
                >
                  <h3 className="font-display text-lg font-bold text-secondary-foreground mb-4 group-hover:text-primary transition-colors">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                to="/faq"
                className="inline-flex items-center gap-3 text-primary font-bold hover:text-accent transition-all group"
              >
                View All Frequently Asked Questions 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Quote Section */}
      <section id="quote" className="section-padding bg-card relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/30 -skew-x-12 translate-x-1/4 z-0" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center w-full md:max-w-3xl md:mx-auto mb-8 md:mb-16"
            >
              <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="label-solid text-xs md:text-sm font-bold tracking-wider uppercase mb-0.5 md:mb-4 px-3 py-1.5"
          >Get Started Today</motion.span>
              <h2 className="font-display text-3xl md:text-6xl font-bold text-foreground mt-2 md:mt-6 mb-8">
                Request Your <span className="text-primary">Free Quote</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                Ready to secure your property? Complete our quick form below and one of our experts will be in touch within 24 hours to arrange your free site visit.
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                {[
                  'Free Site Survey',
                  'Response within 24 Hours',
                  'Quality Guaranteed'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-muted-foreground font-bold text-sm uppercase tracking-wider">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-4 h-4 text-accent" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-card p-8 md:p-12 shadow-sharp-lg border-2 border-border relative">
                {/* Decorative corner */}
                <div className="absolute -top-2 -left-2 w-12 h-12 border-t-4 border-l-4 border-accent" />
                
                <QuoteWizard />
                
                {/* Certifications */}
                <div className="mt-12 pt-12 border-t border-border">
                  <p className="text-[10px] text-muted-foreground text-center mb-8 uppercase tracking-[0.3em] font-bold">Accredited & Certified Professionals</p>
                  <CertificationLogos />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicePage;