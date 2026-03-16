import { useParams, Link } from 'react-router-dom';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/SEOHead';
import JsonLd from '@/components/JsonLd';
import { getAreaSEO } from '@/data/seoData';
import QuoteWizard from '@/components/QuoteWizard';
import { 
  CheckCircle, MapPin, Phone, Star, Shield, Home, Calendar, 
  Award, ArrowRight, Clock, Paintbrush, Wrench, Droplets, 
  Building, Hammer, PaintBucket, CloudRain, Trees, Quote,
  Sparkles
} from 'lucide-react';
import { getAreaData, getNearbyAreas, getAreaImage, Area } from '@/data/areas';
import { services } from '@/data/services';
import { siteSettings } from '@/data/siteSettings';
import SimpleContactForm from '@/components/SimpleContactForm';
import { areaPageGalleryImages } from '@/data/images';
import { GoogleReviewBadge, CertificationLogos } from '@/components/shared/TrustBadgeBar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Animated Counter Component
interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
}

const Counter = ({ value, suffix = '', prefix = '' }: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000 });
  const displayValue = useTransform(springValue, (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
};

// Service icon mapping
const getServiceIcon = (slug: string) => {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    'roof-replacement': Building,
    'roof-repairs': Hammer,
    'emergency-roof-repairs': Clock,
    leadwork: Paintbrush,
    'chimney-repairs': Home,
    roughcasting: PaintBucket,
    'upvc-gutters': Trees,
    'skylight-repairs-and-replacement': Droplets,
    'dry-rot-repair': Wrench,
    'damp-proofing': CloudRain,
  };
  return icons[slug] || Building;
};

interface AreaPageProps {
  slugOverride?: string;
}

const AreaPage = ({ slugOverride }: AreaPageProps) => {
  const { area, slug } = useParams<{ area?: string; slug?: string }>();
  const resolvedSlug = slugOverride || area || slug || '';
  const data = getAreaData(resolvedSlug);
  const nearbyAreas = getNearbyAreas(resolvedSlug, 6);
  
  // Fallback for unknown areas
  const defaultArea: Area = {
    name: 'Glasgow',
    slug: 'glasgow',
    description: 'Professional roofing and exterior repair services across Glasgow.',
    longDescription: 'PM Roofers provides roof repairs, roof replacement, leadwork, chimney repairs and exterior protection work across Glasgow and surrounding areas.',
    neighbourhoods: ['Dennistoun', 'Bishopbriggs', 'Robroyston', 'Springburn', 'Rutherglen', 'Bearsden'],
    keyFacts: ['30 years experience', 'Fully liability insured', '24/7 emergency response'],
    testimonial: {
      name: 'Recent customer',
      text: 'Friendly service, honest advice, and a very noticeable improvement once the clean was finished.',
      project: 'Roofing Project',
      rating: 5,
    },
    additionalTestimonials: [],
    popularServices: ['roof-repairs', 'roof-replacement', 'emergency-roof-repairs'],
    faqs: [],
    projectsCompleted: 250,
    yearsServing: 30,
  };
  
  const areaData = data || defaultArea;
  const seo = getAreaSEO(areaData.name);
  const areaBackgroundImage = getAreaImage(areaData.slug);

  const benefits = [
    { text: `Local service across ${areaData.name} and surrounding areas`, icon: MapPin },
    { text: '24/7 emergency roof repair availability', icon: Award },
    { text: 'Fully insured and reliable service', icon: Shield },
    { text: 'Family-run service with clear communication', icon: CheckCircle },
    { text: 'Free quotes with no obligation', icon: Star },
    { text: 'Transparent pricing, no hidden costs', icon: CheckCircle },
    { text: '30 years of roofing experience', icon: Hammer },
    { text: 'Fast site visits and practical advice', icon: Clock },
  ];

  return (
    <Layout>
      <SEOHead 
        title={seo.title}
        description={seo.description}
        canonicalPath={`/${areaData.slug}`}
      />
      <JsonLd 
        type="LocalBusiness" 
        data={{ name: areaData.name, slug: areaData.slug, description: areaData.description }} 
      />
      <JsonLd 
        type="BreadcrumbList" 
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Areas', path: '/areas' },
          { name: areaData.name, path: `/${areaData.slug}` }
        ]} 
      />
      <JsonLd
        type="FAQPage"
        faqs={areaData.faqs.map(faq => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      {/* Hero Section */}
      <section className="area-section-padding bg-primary relative overflow-hidden">
        {/* Area Background Image */}
        <div className="absolute inset-0">
          <img 
            src={areaBackgroundImage} 
            alt={`${areaData.name} area`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/70 to-primary/85" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }} 
              className="max-w-4xl"
            >
              <Link to="/areas" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-4 text-sm transition-colors">
                <ArrowRight className="w-4 h-4 rotate-180" /> All Areas We Cover
              </Link>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <GoogleReviewBadge />
                <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Shield className="w-4 h-4 text-accent" />
                  <span className="text-xs font-bold text-primary-foreground">Fully Insured</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Award className="w-4 h-4 text-accent" />
                  <span className="text-xs font-bold text-primary-foreground">{areaData.yearsServing}+ Years Experience</span>
                </div>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-6">
                Roofing Services in {areaData.name}
              </h1>
              
              <p className="text-xl text-primary-foreground/80 mb-4">{areaData.description}</p>
              <p className="text-primary-foreground/70 mb-8 leading-relaxed">{areaData.longDescription}</p>
              
              {/* Neighbourhood tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {areaData.neighbourhoods.map((n) => (
                  <span key={n} className="bg-primary-foreground/10 text-primary-foreground/80 px-3 py-1 rounded-full text-sm">
                    {n}
                  </span>
                ))}
              </div>
              
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a 
                  href={`tel:${siteSettings.phoneFormatted}`}
                  className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-accent text-accent-foreground font-bold rounded-md hover:bg-accent/90 transition-all hover:scale-105 shadow-xl text-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="w-6 h-6 animate-pulse" />
                  Call Now
                </motion.a>
                <a 
                  href="#quote" 
                  className="inline-flex items-center justify-center px-8 py-5 border-2 border-primary-foreground text-primary-foreground font-semibold rounded-md hover:bg-primary-foreground hover:text-primary transition-colors"
                >
                  Get Free Quote
                </a>
              </div>
            </motion.div>

            {/* Right Content - Quote Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="surface-glass p-1 relative corner-accent group">
                {/* Glow effect behind card */}
                <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-primary/20 blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Badge with sparkle */}
                <motion.div 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, type: "spring" }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 label-solid z-10 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  FREE QUOTE
                </motion.div>
                
                <div className="relative bg-card/95 backdrop-blur-xl p-8 pt-10 border-2 border-border/50 border-t-4 border-t-accent">
                  <h2 className="font-display text-2xl text-foreground mb-1 text-center">
                    Get Your Free Quote
                  </h2>
                  <p className="text-sm text-muted-foreground text-center mb-6">
                    No obligation • Same-day response
                  </p>
                  <SimpleContactForm compact />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Counter Bar - compact, TrustSignals-inspired */}
      <section className="py-4 md:py-6 bg-primary border-y-4 border-accent relative overflow-hidden">
        <div className="grid-overlay-accent absolute inset-0 opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-8 items-center"
          >
            {[
              { icon: Home, value: areaData.projectsCompleted, suffix: '+', label: `Projects in ${areaData.name}` },
              { icon: Star, value: 4.9, label: 'Google Rating', isDecimal: true },
              { icon: Calendar, value: areaData.yearsServing, suffix: '+', label: 'Years Experience' },
              { icon: Award, value: 100, suffix: '%', label: 'Satisfaction Rate' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-lg sm:text-2xl md:text-4xl font-bold text-accent font-display leading-tight">
                  {stat.isDecimal ? (
                    <span>{stat.value}</span>
                  ) : (
                    <Counter value={stat.value} suffix={stat.suffix} />
                  )}
                </div>
                <div className="text-[10px] md:text-xs text-primary-foreground/70 uppercase tracking-wider mt-0.5">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services in Area Section */}
      <section className="area-section-padding bg-muted/50 relative overflow-hidden">
        {/* Architectural grid background */}
        <div className="grid-overlay absolute inset-0" />
        {/* Decorative corner elements */}
        <div className="absolute top-8 left-8 w-20 h-20 border-l-4 border-t-4 theme-corner-tl border-primary/10" />
        <div className="absolute bottom-8 right-8 w-20 h-20 border-r-4 border-b-4 theme-corner-br border-primary/10" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center w-full md:max-w-3xl md:mx-auto mb-8 md:mb-12"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="label-solid text-xs md:text-sm font-bold tracking-wider uppercase mb-0.5 md:mb-1 px-2 py-1"
            >
              Expert Cleaning
            </motion.span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-primary mt-1 md:mt-2 mb-6 leading-tight">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative inline-block"
              >
                Our Roofing Services in {areaData.name}
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute -bottom-2 left-0 w-full h-1 bg-accent origin-left"
                />
              </motion.span>
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-base md:text-lg font-medium max-w-2xl mx-auto"
            >
              From emergency roof repairs and roof replacement to leadwork, roughcasting, gutters, and damp-related remedial works, we deliver reliable exterior services across {areaData.name}.
            </motion.p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = getServiceIcon(service.slug);
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link to={`/${service.slug}`} className="group block h-full">
                    <motion.div
                      className="surface-card relative h-full flex flex-col overflow-hidden transition-all duration-500 corner-brackets"
                      whileHover={{ x: -4, y: -4 }}
                    >
                      {/* Image container */}
                      <div className="relative h-48 overflow-hidden theme-corner-tl theme-corner-tr">
                        <motion.img
                          src={service.images.main}
                          alt={service.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.7 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                        <div className="absolute top-4 left-4 surface-icon w-12 h-12 icon-accent-corner">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="absolute top-4 right-4 label-solid text-[10px] px-2 py-1 uppercase tracking-tighter">
                          {areaData.name}
                        </div>
                      </div>
                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow bg-card relative border-t-4 border-t-accent theme-corner-bl theme-corner-br">
                        <div className="absolute top-0 left-0 w-0 h-1 bg-accent group-hover:w-full transition-all duration-500" />
                        <h3 className="font-display text-xl font-bold text-primary mb-3 group-hover:text-primary/80 transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-6 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                          {service.description}
                        </p>
                        <div className="mt-auto pt-4 border-t border-border/50">
                          <span className="inline-flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all duration-300">
                            View Service Details
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground text-lg mb-4">
              Ready to discuss your roofing job in {areaData.name}?
            </p>
            <motion.a
              href={`tel:${siteSettings.phoneFormatted}`}
              className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-accent text-accent-foreground font-bold rounded-md hover:bg-accent/90 transition-all hover:scale-105 shadow-lg group relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Phone className="w-5 h-5 animate-pulse relative z-10" />
              <span className="relative z-10">Discuss Your {areaData.name} Project</span>
            </motion.a>
            <div className="mt-5">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors link-underline"
              >
                View all services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section - Enhanced */}
      <section className="area-section-padding bg-secondary relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
        <div className="grid-overlay absolute inset-0 opacity-[0.03]" />
        <div className="absolute top-8 right-8 w-16 h-16 border-r-4 border-t-4 theme-corner-tr border-primary/10 hidden md:block" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l-4 border-b-4 theme-corner-bl border-primary/10 hidden md:block" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="label-solid inline-block text-xs md:text-sm font-bold tracking-wider uppercase mb-2 px-2 py-1">
                Trusted Locally
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-secondary-foreground mb-4 relative inline-block">
                Why {areaData.name} Customers Choose PM Roofers
                <span className="absolute -bottom-1 left-0 w-16 h-1 bg-accent" />
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed max-w-xl">
                With {areaData.yearsServing}+ years of roofing experience and a growing track record across {areaData.name}, PM Roofers is known for honest advice, reliable service, and visible results.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.text}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group flex items-center gap-3 surface-card py-3 px-4 sm:py-4 border-l-4 border-l-accent/50 hover:border-l-accent transition-all duration-300 hover:shadow-sharp"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center rounded-sm bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors">
                      <benefit.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-sm text-card-foreground font-medium">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>
              
              <motion.a
                href={`tel:${siteSettings.phoneFormatted}`}
                className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-accent text-accent-foreground font-bold rounded-md hover:bg-accent/90 transition-all shadow-lg group relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Phone className="w-5 h-5 animate-pulse relative z-10" />
                <span className="relative z-10">Call Now</span>
              </motion.a>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="surface-card overflow-hidden border-2 border-border corner-brackets">
                <img 
                  src={areaPageGalleryImages.team}
                  alt={`Recent roofing work in ${areaData.name}`}
                  className="w-full h-80 lg:h-96 object-cover"
                  loading="lazy"
                />
              </div>
              {/* Key facts overlay */}
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 max-w-xs hidden md:block border-2 border-accent/40 shadow-sharp">
                <ul className="space-y-2">
                  {areaData.keyFacts.map((fact) => (
                    <li key={fact} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recent Projects Section */}
      <section className="area-section-padding">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Recent Roofing Projects in {areaData.name}
            </h2>
            <p className="text-muted-foreground">
              See examples of PM Roofers work completed across the {areaData.name} area
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { image: areaPageGalleryImages.beforeAfter, title: 'Roof Repair & Weatherproofing', desc: 'A repair-focused job completed to stop water ingress and leave the roof secure for the long term.' },
              { image: areaPageGalleryImages.workers, title: 'Gutter & Roofline Upgrade', desc: 'Roofline components replaced and tidied to improve drainage and overall exterior presentation.' },
              { image: areaPageGalleryImages.flatRoof, title: 'Exterior Refurbishment Work', desc: 'Exterior maintenance work carried out to restore presentation and protect the structure.' },
            ].map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-card rounded-lg overflow-hidden group border-2 border-border hover:border-accent transition-colors"
              >
                <div className="h-56 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={`${project.title} in ${areaData.name}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-card-foreground mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{project.desc}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{areaData.name}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Star className="w-4 h-4 fill-[#facc15] text-[#facc15]" />
                    <Star className="w-4 h-4 fill-[#facc15] text-[#facc15]" />
                    <Star className="w-4 h-4 fill-[#facc15] text-[#facc15]" />
                    <Star className="w-4 h-4 fill-[#facc15] text-[#facc15]" />
                    <Star className="w-4 h-4 fill-[#facc15] text-[#facc15]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a 
              href={`tel:${siteSettings.phoneFormatted}`}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-bold rounded-md hover:bg-accent/90 transition-all hover:scale-105 shadow-lg"
            >
              <Phone className="w-5 h-5 animate-pulse" />
              Book Your {areaData.name} Roofing Quote
            </a>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="area-section-padding bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl text-primary-foreground mb-4">
              What Our {areaData.name} Customers Say
            </h2>
            <p className="text-primary-foreground/70">
              Real reviews from real homeowners across {areaData.name}
            </p>
          </motion.div>
          
          {/* Featured Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-8 md:p-10 mb-8 max-w-3xl mx-auto"
          >
            <Quote className="w-12 h-12 text-accent mb-6" />
            <p className="text-xl md:text-2xl text-primary-foreground leading-relaxed mb-6">
              "{areaData.testimonial.text}"
            </p>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="font-semibold text-primary-foreground">{areaData.testimonial.name}</p>
                <p className="text-primary-foreground/70 text-sm">{areaData.testimonial.project} • {areaData.name}</p>
              </div>
              <div className="flex items-center gap-0.5">
                {[...Array(areaData.testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Additional Testimonials */}
          {areaData.additionalTestimonials.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {areaData.additionalTestimonials.map((review, index) => (
                <motion.div
                  key={review.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-primary-foreground/5 backdrop-blur-sm rounded-lg p-6"
                >
                  <div className="flex items-center gap-0.5 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-primary-foreground/90 mb-4">"{review.text}"</p>
                  <div>
                    <p className="font-medium text-primary-foreground text-sm">{review.name}</p>
                    <p className="text-primary-foreground/60 text-xs">{review.project}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <a 
              href={`tel:${siteSettings.phoneFormatted}`}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-bold rounded-md hover:bg-accent/90 transition-all hover:scale-105 shadow-xl"
            >
              <Phone className="w-5 h-5 animate-pulse" />
              Join Our Happy Customers
            </a>
            <p className="text-primary-foreground/60 text-sm mt-4">
              <Link to="/reviews" className="hover:text-primary-foreground underline">Read more reviews →</Link>
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      {areaData.faqs.length > 0 && (
        <section className="area-section-padding">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
                Common Questions About Roofing Services in {areaData.name}
              </h2>
              <p className="text-muted-foreground">
                Got questions about roofing and exterior repair work in {areaData.name}? We have answers.
              </p>
            </motion.div>
            
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {areaData.faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <AccordionItem value={`faq-${index}`} className="bg-card border-2 border-border rounded-lg px-6 data-[state=open]:border-accent">
                      <AccordionTrigger className="text-left font-medium text-card-foreground hover:no-underline py-5">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-5">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
            
            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-10"
            >
              <p className="text-muted-foreground mb-4">Still have questions?</p>
              <a 
                href={`tel:${siteSettings.phoneFormatted}`}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-bold rounded-md hover:bg-accent/90 transition-all hover:scale-105 shadow-lg"
              >
                <Phone className="w-5 h-5 animate-pulse" />
                Call For Instant Answers
              </a>
            </motion.div>
          </div>
        </section>
      )}

      {/* Nearby Areas Section */}
      <section className="area-section-padding bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl text-secondary-foreground mb-4">
              We Also Cover These Nearby Areas
            </h2>
            <p className="text-muted-foreground">
              Roofing and exterior services across Glasgow and the surrounding region
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {nearbyAreas.map((nearbyArea, index) => {
              const nearbyAreaImage = getAreaImage(nearbyArea.slug);
              return (
                <motion.div
                  key={nearbyArea.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link
                    to={`/${nearbyArea.slug}`}
                    className="group flex flex-col surface-card transition-all duration-500 corner-brackets h-full"
                  >
                    <div className="relative h-48 overflow-hidden theme-corner-tl theme-corner-tr">
                      <motion.img 
                        src={nearbyAreaImage} 
                        alt={`Roofing services in ${nearbyArea.name}`}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.7 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                      
                      {/* Icon Overlay with corner accent */}
                      <div className="absolute top-4 left-4 surface-icon w-12 h-12 icon-accent-corner">
                        <MapPin className="w-6 h-6" />
                      </div>

                      <div className="absolute bottom-4 right-4 label-solid text-[10px] font-bold tracking-wider uppercase">
                        {nearbyArea.projectsCompleted}+ Projects
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow bg-card relative border-t-4 border-t-accent theme-corner-bl theme-corner-br">
                      {/* Animated accent line */}
                      <div className="absolute top-0 left-0 w-0 h-1 bg-accent group-hover:w-full transition-all duration-500" />
                      
                      <div className="flex items-center gap-2 text-accent mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider">Nearby Area</span>
                      </div>
                      
                      <h3 className="font-display text-2xl font-bold text-primary mb-3 group-hover:text-primary/80 transition-colors duration-300">
                        {nearbyArea.name}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed mb-6 font-medium line-clamp-2 flex-grow">
                        Roofing and exterior services across {nearbyArea.name} and surrounding neighbourhoods.
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
                        <span className="text-primary font-bold text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                          View Area Details <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <Link 
              to="/areas" 
              className="inline-flex items-center gap-2 text-accent font-medium hover:underline"
            >
              View all areas we cover <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Quote Section */}
      <section id="quote" className="area-section-padding">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
                Get Your Free {areaData.name} Roofing Quote
              </h2>
              <p className="text-muted-foreground mb-6">
                Request a free, no-obligation roofing quote for your {areaData.name} property. We will discuss the issue, recommend the right solution, and provide a clear price.
              </p>
              
              {/* What's Included */}
              <div className="bg-secondary rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-foreground mb-4">What's Included in Your Free Quote:</h3>
                <ul className="space-y-3">
                  {[
                    'Assessment of the roofing issue or exterior works required',
                    'Written estimate with no hidden costs',
                    'Clear advice on the right repair or replacement approach',
                    'Realistic timing for the work',
                    'Honest answers to all your roofing questions',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Guarantees */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full">
                  <Shield className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium">Fully Insured</span>
                </div>
                <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full">
                  <Award className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium">Workmanship Guarantee</span>
                </div>
                <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full">
                  <Star className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium">4.9/5 Rating</span>
                </div>
              </div>
              
              <div className="bg-muted rounded-lg h-48 overflow-hidden">
                <img 
                  src={areaPageGalleryImages.cityscape} 
                  alt={`${areaData.name} area`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-lg shadow-xl border-2 border-border"
            >
              {/* Urgency banner */}
              <div className="bg-accent/10 border border-accent rounded-lg p-4 mb-6">
                <p className="text-center text-sm font-medium text-accent">
                  ⏰ Limited availability in {areaData.name} this month – book your free roofing quote now!
                </p>
              </div>
              
              <QuoteWizard />
              
              {/* Certifications */}
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground text-center mb-4">Accredited & Certified</p>
                <CertificationLogos />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AreaPage;
