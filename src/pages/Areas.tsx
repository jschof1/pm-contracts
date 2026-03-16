import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/SEOHead';
import JsonLd from '@/components/JsonLd';
import { seoData } from '@/data/seoData';
import { siteContent } from '@/data/content';
import { siteSettings } from '@/data/siteSettings';
import { MapPin, ArrowRight, ChevronDown, Sparkles, Phone, Shield } from 'lucide-react';
import { areas, getAreaImage } from '@/data/areas';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import { GoogleReviewBadge } from '@/components/shared/TrustBadgeBar';
import { useState } from 'react';

import { heroBackgroundAreas } from '@/data/images';

const Areas = () => {
  const [displayCount, setDisplayCount] = useState(9);
  const hasMore = areas.length > displayCount;

  const showMore = () => {
    setDisplayCount(prev => prev + 9);
  };

  return (
    <Layout>
      <SEOHead 
        title={seoData.areas.title}
        description={seoData.areas.description}
        canonicalPath="/areas"
      />
      <JsonLd 
        type="BreadcrumbList" 
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: siteContent.areasPage.breadcrumbLabel, path: '/areas' }
        ]} 
      />
      {/* Hero Section - Services-inspired with background image & architectural details */}
      <section className="relative min-h-[50vh] md:min-h-0 flex items-center bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBackgroundAreas}
            alt=""
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-primary/40" />
        </div>
        <div className="grid-overlay-accent absolute inset-0 opacity-20" />
        <div className="absolute top-8 left-8 w-16 h-16 border-l-4 border-t-4 theme-corner-tl border-accent opacity-60 hidden md:block" />
        <div className="absolute top-8 right-8 w-16 h-16 border-r-4 border-t-4 theme-corner-tr border-accent opacity-60 hidden md:block" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l-4 border-b-4 theme-corner-bl border-accent opacity-60 hidden md:block" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-4 border-b-4 theme-corner-br border-accent opacity-60 hidden md:block" />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute top-0 left-0 right-0 h-1 bg-accent origin-left"
        />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
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
                <span className="text-xs font-bold uppercase tracking-wider">{siteContent.areasPage.badgeLabel}</span>
              </div>
            </div>
            <h1 className="font-display text-5xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="block"
              >
                {siteContent.areasPage.heroTitlePart1}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative inline-block text-gradient-accent"
              >
                {siteContent.areasPage.heroTitlePart2}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute -bottom-2 left-0 w-full h-1.5 bg-accent glow-accent origin-left"
                />
              </motion.span>
            </h1>
            <p className="text-base md:text-xl text-primary-foreground/80 leading-relaxed mb-6">
              {siteContent.areasPage.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#areas-grid"
                className="action-primary px-8 py-4 font-bold group relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10">{siteContent.areasPage.heroPrimaryCta}</span>
              </motion.a>
              <motion.a
                href={`tel:${siteSettings.phoneFormatted}`}
                className="action-secondary px-8 py-4 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-bold inline-flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-5 h-5" />
                {siteContent.areasPage.heroSecondaryCtaPrefix} {siteSettings.phone}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
      <section id="areas-grid" className="section-padding bg-muted/50 relative overflow-hidden">
        <div className="grid-overlay absolute inset-0" />
        <div className="absolute top-8 left-8 w-20 h-20 border-l-4 border-t-4 theme-corner-tl border-primary/10" />
        <div className="absolute bottom-8 right-8 w-20 h-20 border-r-4 border-b-4 theme-corner-br border-primary/10" />
        <div className="container-custom relative">
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
            >
              {areas.length}+ {siteContent.areasPage.sectionKickerSuffix}
            </motion.span>
            <h2 className="section-title text-4xl md:text-5xl font-display font-bold text-primary mt-2 md:mt-6 mb-6 leading-tight">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="block"
              >
                {siteContent.areasPage.sectionTitlePart1}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative inline-block"
              >
                {siteContent.areasPage.sectionTitlePart2}
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
            <AnimatePresence mode="popLayout">
              {areas.slice(0, displayCount).map((area, index) => {
                const areaImage = getAreaImage(area.slug);
                return (
                  <motion.div
                    key={area.slug}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link
                      to={`/${area.slug}`}
                      className="group block h-full"
                    >
                  <motion.div
                    className="surface-card relative h-full flex flex-col overflow-hidden transition-all duration-500 corner-brackets"
                    whileHover={{ x: -4, y: -4 }}
                  >
                    <div className="relative h-56 overflow-hidden theme-corner-tl theme-corner-tr">
                      <img
                        src={areaImage}
                        alt={`Cleaning services in ${area.name}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        width={640}
                        height={224}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                      <div className="absolute top-4 left-4 surface-icon w-12 h-12 icon-accent-corner">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div className="absolute top-4 right-4 label-solid text-[10px] px-2 py-1 uppercase tracking-tighter">
                        {area.projectsCompleted}+ Projects
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow bg-card relative border-t-4 border-t-accent theme-corner-bl theme-corner-br">
                      <h2 className="font-display text-2xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">
                        {area.name}
                      </h2>
                      <p className="text-muted-foreground text-sm mb-6 leading-relaxed line-clamp-2">
                        {area.description}
                      </p>
                      <div className="mt-auto pt-6 border-t border-border/50 flex flex-col gap-3">
                        <div className="action-inverse w-full py-4 text-center text-sm flex items-center justify-center gap-2">
                          {siteContent.areasPage.cardCtaLabel} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {hasMore && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <motion.button
                onClick={showMore}
                className="action-primary inline-flex items-center gap-2 px-8 py-4 font-bold group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {siteContent.areasPage.loadMoreLabel}
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </motion.button>
              <p className="mt-4 text-sm text-muted-foreground font-medium">
                Showing {displayCount} of {areas.length} {siteContent.areasPage.loadMoreSuffix}
              </p>
            </motion.div>
          )}
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

      <TestimonialsSection />
      <section className="section-padding bg-primary relative overflow-hidden">
        <div className="grid-overlay-accent absolute inset-0" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
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
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>{siteContent.areasPage.ctaKicker}</span>
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
                {siteContent.areasPage.ctaTitle}
              </motion.span>
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-primary-foreground/80 mb-12 max-w-2xl mx-auto text-xl leading-relaxed"
            >
              {siteContent.areasPage.ctaDescription}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            >
              <Link
                to="/contact"
                className="action-primary px-10 py-3 font-bold text-2xl md:text-lg group relative overflow-hidden inline-flex items-center justify-center gap-2"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10">{siteContent.areasPage.ctaButtonLabel}</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
              <motion.a
                href={`tel:${siteSettings.phoneFormatted}`}
                className="action-secondary px-10 py-3 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-bold text-2xl md:text-lg inline-flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center gap-2">
                  <Phone className="w-7 h-7 md:w-5 md:h-5 flex-shrink-0" />
                  {siteContent.cta.callNow}
                </span>
                <span>{siteSettings.phone}</span>
              </motion.a>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-6 md:pt-12 border-t border-primary-foreground/10">
              {siteContent.areasPage.ctaStats.map((item) => (
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

export default Areas;
