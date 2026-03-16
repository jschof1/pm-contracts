import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/SEOHead';
import JsonLd from '@/components/JsonLd';
import { seoData } from '@/data/seoData';
import { ArrowRight, CheckCircle, Shield, Phone, Sparkles, Layers, ListOrdered } from 'lucide-react';
import { services } from '@/data/services';
import { siteSettings } from '@/data/siteSettings';
import { siteContent } from '@/data/content';
import { GoogleReviewBadge } from '@/components/shared/TrustBadgeBar';
import { heroBackground } from '@/data/images';

const Services = () => {
  return (
    <Layout>
      <SEOHead 
        title={seoData.services.title}
        description={seoData.services.description}
        canonicalPath="/services"
      />
      <JsonLd 
        type="BreadcrumbList" 
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' }
        ]} 
      />
      {/* Hero Section - Index-inspired with background image & architectural details */}
      <section className="relative min-h-[50vh] md:min-h-0 flex items-center bg-primary overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroBackground}
            alt="Professional roofing services"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-primary/40" />
        </div>
        
        {/* Architectural grid overlay */}
        <div className="grid-overlay-accent absolute inset-0 opacity-20" />
        
        {/* Corner brackets - architectural detail */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-4 border-t-4 theme-corner-tl border-accent opacity-60 hidden md:block" />
        <div className="absolute top-8 right-8 w-16 h-16 border-r-4 border-t-4 theme-corner-tr border-accent opacity-60 hidden md:block" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l-4 border-b-4 theme-corner-bl border-accent opacity-60 hidden md:block" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-4 border-b-4 theme-corner-br border-accent opacity-60 hidden md:block" />
        
        {/* Accent line dividers */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute top-0 left-0 right-0 h-1 bg-accent origin-left"
        />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
        
        {/* Ambient glow */}
        <div className="ambient-glow w-[500px] h-[300px] -top-20 -left-20 animate-glow-pulse" />
        <div className="ambient-glow-navy w-[350px] h-[250px] bottom-20 right-20 animate-glow-pulse animation-delay-500" />
        
        <div className="container-custom relative z-10 pt-8 pb-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-3 md:mb-8">
              <div className="scale-90 md:scale-100 origin-center">
                <GoogleReviewBadge className="!bg-card/10 !rounded-lg border-2 border-primary-foreground/20" />
              </div>
              <div className="hidden md:inline-flex label-outline bg-card/10 backdrop-blur-xl border-primary-foreground/20 text-primary-foreground hover-glow scale-90 md:scale-100 origin-center">
                <Shield className="w-4 h-4 text-accent" />
                <span className="text-xs font-bold uppercase tracking-wider">Fully Insured & Guaranteed</span>
              </div>
            </div>
            <h1 className="font-display text-5xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="block"
              >
                Professional
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative inline-block text-gradient-accent"
              >
                Cleaning Services
                <motion.span 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute -bottom-2 left-0 w-full h-1.5 bg-accent glow-accent origin-left"
                />
              </motion.span>
            </h1>
            <p className="text-base md:text-xl text-primary-foreground/80 leading-relaxed mb-6">
              {siteContent.servicesPage.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#services-grid"
                className="action-primary px-8 py-4 font-bold group relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10">{siteContent.servicesPage.heroPrimaryCta}</span>
              </motion.a>
              <motion.a
                href={`tel:${siteSettings.phoneFormatted}`}
                className="action-secondary px-8 py-4 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-bold inline-flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-5 h-5" />
                {siteContent.servicesPage.heroSecondaryCtaPrefix} {siteSettings.phone}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid - Index ServicesSection-inspired */}
      <section id="services-grid" className="section-padding bg-muted/50 relative overflow-hidden">
        {/* Architectural grid background */}
        <div className="grid-overlay absolute inset-0" />
        
        {/* Decorative corner elements */}
        <div className="absolute top-8 left-8 w-20 h-20 border-l-4 border-t-4 theme-corner-tl border-primary/10" />
        <div className="absolute bottom-8 right-8 w-20 h-20 border-r-4 border-b-4 theme-corner-br border-primary/10" />

        <div className="container-custom relative">
          {/* Section Header */}
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
              className="label-solid inline-flex items-center gap-2 text-xs md:text-sm font-bold tracking-wider uppercase mb-0.5 md:mb-1 px-2 py-1"
            >
              <Layers className="w-3.5 h-3.5" />
              {siteContent.home.services.kicker}
            </motion.span>
            <h2 className="section-title text-4xl md:text-7xl font-display font-bold text-primary mt-1 md:mt-2 mb-6 leading-tight">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="block"
              >
                {siteContent.home.services.titlePart1}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative inline-block"
              >
                {siteContent.home.services.titlePart2}
                <motion.span 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute -bottom-2 left-0 w-full h-1 bg-accent origin-left"
                />
              </motion.span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={`/${service.slug}`}
                  className="group block h-full"
                >
                  <motion.div 
                    className="surface-card relative h-full flex flex-col overflow-hidden transition-all duration-500 corner-brackets"
                    whileHover={{ x: -4, y: -4 }}
                  >
                    {/* Service Image with theme corners */}
                    <div className="relative h-56 overflow-hidden theme-corner-tl theme-corner-tr">
                      <img 
                        src={service.images.main} 
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        width={640}
                        height={224}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                      <div className="absolute top-4 right-4 label-solid text-[10px] px-2 py-1 uppercase tracking-tighter">
                        Expert Service
                      </div>
                    </div>
                    {/* Content with accent top border */}
                    <div className="p-8 flex flex-col flex-grow bg-card relative border-t-4 border-t-accent theme-corner-bl theme-corner-br">
                      <h2 className="font-display text-2xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">
                        {service.title}
                      </h2>
                      <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                        {service.description}
                      </p>
                      <ul className="space-y-3 mb-8">
                        {(service.features ? service.features.map(f => f.title) : service.benefits.slice(0, 4)).map((feature) => (
                          <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
                            <div className="surface-icon-muted w-5 h-5 shrink-0 bg-accent/10 text-accent">
                              <CheckCircle className="w-3.5 h-3.5" />
                            </div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto pt-6 border-t border-border/50 flex flex-col gap-3">
                        <div className="action-inverse w-full py-4 text-center text-sm flex items-center justify-center gap-2">
                          View Service Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Call Button for Mobile */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <motion.a
          href={`tel:${siteSettings.phoneFormatted}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="surface-icon w-16 h-16 border-2 border-accent"
        >
          <Phone className="w-8 h-8" />
        </motion.a>
      </div>

      {/* Benefits Section - AboutSection-inspired */}
      <section className="section-padding bg-secondary relative overflow-hidden">
        {/* Decorative corner brackets */}
        <div className="absolute top-8 right-8 w-20 h-20 border-r-4 border-t-4 theme-corner-tr border-primary/20" />
        <div className="absolute bottom-8 left-8 w-20 h-20 border-l-4 border-b-4 theme-corner-bl border-primary/20" />
        {/* Soft glow elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

        <div className="container-custom relative z-10">
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
              className="label-solid inline-flex items-center gap-2 text-xs md:text-sm font-bold tracking-wider uppercase mb-0.5 md:mb-1 px-2 py-1"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              {siteContent.servicesPage.benefitsKicker}
            </motion.span>
            <h2 className="section-title text-4xl md:text-7xl font-display font-bold text-secondary-foreground mt-1 md:mt-2 mb-6 leading-tight">
              <span className="relative inline-block">
                {siteContent.servicesPage.benefitsTitle}
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute -bottom-2 left-0 w-full h-1 bg-accent origin-left"
                />
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
              {siteContent.servicesPage.benefitsDescription}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {siteContent.servicesPage.benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="surface-panel-accent p-8 transition-all group corner-brackets"
              >
                <div className="surface-icon w-12 h-12 mb-6 group-hover:bg-accent group-hover:text-accent-foreground">
                  <CheckCircle className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold text-secondary-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - ProcessSteps-inspired */}
      <section className="section-padding bg-card relative overflow-hidden">
        {/* Subtle grid overlay */}
        <div className="grid-overlay absolute inset-0 opacity-[0.03]" />
        {/* Corner accents */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-4 border-t-4 theme-corner-tl border-accent/20" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-4 border-b-4 theme-corner-br border-accent/20" />

        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="label-solid inline-flex items-center gap-2 text-xs md:text-sm font-bold tracking-wider uppercase mb-0.5 md:mb-1 px-2 py-1 w-fit"
                >
                  <ListOrdered className="w-3.5 h-3.5" />
                  {siteContent.home.process.kicker}
                </motion.span>
                <h2 className="section-title text-4xl md:text-7xl font-display font-bold text-foreground mt-1 md:mt-2 mb-6 text-left leading-tight">
                  <span className="relative inline-block">
                    {siteContent.home.process.titlePart1} {siteContent.home.process.titlePart2}
                    <motion.span
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="absolute -bottom-2 left-0 w-full h-1 bg-accent origin-left"
                    />
                  </span>
                </h2>
                <p className="text-muted-foreground text-lg mb-8 text-left">
                  {siteContent.home.process.description}
                </p>
                <div className="flex flex-col gap-4">
                  <div className="surface-panel p-4 border-l-4 border-l-accent">
                    <Shield className="w-6 h-6 text-accent" />
                    <span className="font-bold text-secondary-foreground">{siteContent.servicesPage.guaranteedLabel}</span>
                  </div>
                  <div className="surface-panel p-4 border-l-4 border-l-primary">
                    <Phone className="w-6 h-6 text-primary" />
                    <span className="font-bold text-secondary-foreground">{siteContent.servicesPage.communicationLabel}</span>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:w-2/3 grid sm:grid-cols-2 gap-8">
              {siteContent.home.process.steps.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="surface-panel p-8 group corner-brackets"
                >
                  <div className="font-display text-6xl text-accent absolute top-4 right-4 group-hover:text-accent/20 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4 relative z-10">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - CTASection-inspired with full branding */}
      <section className="section-padding bg-primary relative overflow-hidden">
        {/* Architectural grid overlay */}
        <div className="grid-overlay-accent absolute inset-0" />
        
        {/* Accent border lines */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
        
        {/* Corner brackets - architectural detail */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="absolute top-8 left-8 w-24 h-24 border-l-4 border-t-4 theme-corner-tl border-accent/40"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="absolute top-8 right-8 w-24 h-24 border-r-4 border-t-4 theme-corner-tr border-accent/40"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-8 left-8 w-24 h-24 border-l-4 border-b-4 theme-corner-bl border-accent/40"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-8 right-8 w-24 h-24 border-r-4 border-b-4 theme-corner-br border-accent/40"
        />
        
        {/* Decorative sharp rectangles */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="absolute top-0 right-0 w-64 h-64 bg-accent/10 -translate-y-1/2 translate-x-1/2"
        />
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 translate-y-1/2 -translate-x-1/2"
        />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Sparkle badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>{siteContent.servicesPage.ctaKicker}</span>
              <Sparkles className="w-4 h-4" />
            </motion.div>
            
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="block"
              >
                {siteContent.servicesPage.ctaTitlePart1}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="block"
              >
                {siteContent.servicesPage.ctaTitlePart2}{' '}
                <span className="relative inline-block text-gradient-accent">
                  {siteContent.servicesPage.ctaTitlePart3}
                  <motion.span 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="absolute -bottom-2 left-0 w-full h-1 bg-accent origin-left"
                  />
                </span>
              </motion.span>
            </h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-primary-foreground/80 mb-6 md:mb-12 max-w-2xl mx-auto text-base md:text-xl leading-relaxed"
            >
              {siteContent.servicesPage.ctaDescription}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            >
              <motion.a
                href={`tel:${siteSettings.phoneFormatted}`}
                className="action-primary-foreground px-8 py-3 font-bold text-base md:text-lg w-full sm:w-auto min-w-[200px]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-5 h-5 flex-shrink-0" />
                {siteContent.cta.callNow}
              </motion.a>
              <Link
                to="/contact"
                className="action-primary px-8 py-3 font-bold text-base md:text-lg group relative overflow-hidden inline-flex items-center justify-center gap-2 w-full sm:w-auto min-w-[200px]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10">{siteContent.cta.freeQuote}</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            
            {/* Trust Indicators in CTA */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-6 md:pt-12 border-t border-primary-foreground/10">
              {siteContent.servicesPage.ctaStats.map((item) => (
                <div key={item.label} className="text-center">
                  <div className="text-accent font-display text-2xl font-bold mb-1">{item.value}</div>
                  <div className="text-primary-foreground/60 text-[10px] uppercase tracking-widest font-bold">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
