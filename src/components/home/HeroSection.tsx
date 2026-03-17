import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, ArrowRight, Phone, Sparkles } from 'lucide-react';
import SimpleContactForm from '@/components/SimpleContactForm';
import { siteSettings } from '@/data/siteSettings';
import { heroBackground } from '@/data/images';
import { siteContent } from '@/data/content';

const HeroSection = () => {
  const content = siteContent.home.hero;
  const googleBadge = siteContent.home.trustSignals.badges.find((badge) => badge.name.toLowerCase() === 'google');
  
  return (
    <section className="relative flex min-h-[calc(100vh-7rem)] items-center overflow-hidden bg-primary">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroBackground}
          alt={`${content.titlePart1} ${content.titlePart2} ${content.titlePart3}`}
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
          loading="eager"
        />
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-primary/40" />
      </div>
      
      {/* Architectural grid overlay */}
      <div className="grid-overlay absolute inset-0" />
      
      {/* Decorative corner brackets - architectural detail */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-4 border-t-4 theme-corner-tl border-accent opacity-60" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-4 border-t-4 theme-corner-tr border-accent opacity-60" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-4 border-b-4 theme-corner-bl border-accent opacity-60" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-4 border-b-4 theme-corner-br border-accent opacity-60" />
      
      {/* Accent line dividers */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-0 left-0 right-0 h-1 bg-accent origin-left"
      />
      
      {/* Ambient glow - rectangular */}
      <div className="ambient-glow w-[600px] h-[400px] -top-20 -left-20 animate-glow-pulse" />
      <div className="ambient-glow-navy w-[400px] h-[300px] bottom-20 right-20 animate-glow-pulse animation-delay-500" />

      <div className="container-custom relative z-10 py-4 md:py-10 lg:py-12">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-primary-foreground text-center lg:text-left"
          >
            {/* Trust Stack - Top */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-4 md:mb-8"
            >
              {/* Google profile - sharp badge with hover glow */}
              <div className="label-outline bg-card/10 backdrop-blur-xl border-primary-foreground/20 text-primary-foreground hover-glow group cursor-default px-3 py-1.5 text-xs">
                {googleBadge?.logo && <img src={googleBadge.logo} alt={googleBadge.name} className="w-4 h-4" width={16} height={16} loading="lazy" />}
                <span className="font-semibold">
                  {googleBadge?.rating || content.badgeReviews}
                </span>
              </div>

              {/* Fully Insured - Sharp badge */}
              <div className="label-outline bg-card/10 backdrop-blur-xl border-primary-foreground/20 text-primary-foreground hover-glow px-3 py-1.5 text-xs">
                <Shield className="w-3.5 h-3.5 text-accent" />
                <span>{content.badgeInsured}</span>
              </div>
            </motion.div>

            {/* Headline with reveal effect */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4 font-display text-4xl leading-[1.05] md:mb-5 md:text-5xl lg:text-[3.4rem] xl:text-[4rem]"
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="block"
              >
                {content.titlePart1}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="block text-gradient-accent"
              >
                {content.titlePart2}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="relative inline-block"
              >
                {content.titlePart3}
                {/* Animated underline */}
                <motion.span 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  className="absolute -bottom-2 left-0 w-full h-1.5 bg-accent glow-accent origin-left"
                />
              </motion.span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mx-auto mb-4 max-w-xl text-base leading-relaxed text-primary-foreground/85 md:mb-6 md:text-lg lg:mx-0"
            >
              {content.subtitle}{' '}
              <strong className="text-accent font-semibold relative">
                {content.experienceYears}
                <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-accent/50" />
              </strong>. 
              Serving homes and businesses across{' '}
              <strong className="text-primary-foreground">{siteSettings.serviceArea}</strong>.
            </motion.p>

            {/* Value Propositions with stagger */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-5 grid grid-cols-2 gap-2 md:mb-6 md:gap-3"
            >
              {content.benefits.map((point, index) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="surface-card flex items-center gap-3 border-l-4 border-l-accent border-primary-foreground/10 bg-card/5 px-4 py-2 text-sm font-medium text-primary-foreground/95 backdrop-blur-sm group cursor-default"
                >
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>{point}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="mb-5 flex flex-wrap items-center justify-center gap-3 lg:justify-start md:mb-6"
            >
              <div className="bg-card/10 backdrop-blur-sm border border-primary-foreground/15 px-4 py-2 text-sm font-semibold text-primary-foreground">
                Roof repairs and replacement
              </div>
              <div className="bg-card/10 backdrop-blur-sm border border-primary-foreground/15 px-4 py-2 text-sm font-semibold text-primary-foreground">
                Emergency callouts 24/7
              </div>
              <div className="bg-card/10 backdrop-blur-sm border border-primary-foreground/15 px-4 py-2 text-sm font-semibold text-primary-foreground">
                Glasgow and surrounding areas
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex w-full flex-col justify-center gap-3 [&>a]:min-w-0 [&>a]:flex-1 sm:flex-row lg:justify-start"
            >
              <motion.a
                href={`tel:${siteSettings.phoneFormatted}`}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold rounded-lg border-2 border-black/40 bg-accent text-accent-foreground group relative overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-sharp-lg),var(--shadow-accent-glow)] hover:-translate-x-0.5 hover:-translate-y-0.5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Shimmer effect on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Phone className="w-5 h-5 relative z-10 text-accent-foreground" />
                <span className="relative z-10">{siteContent.cta.callNow}</span>
              </motion.a>
              <motion.div
                className="lg:hidden action-secondary inline-flex items-center justify-center gap-2 bg-card/10 backdrop-blur-xl text-primary-foreground px-8 py-4 text-lg border-primary-foreground/20 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to="/get-quote" className="inline-flex items-center justify-center gap-2">
                  {siteContent.cta.freeQuote}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content - Quote Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block lg:self-stretch"
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
                {siteContent.cta.freeQuote.toUpperCase()}
              </motion.div>
              
              <div className="surface-panel-accent relative border-border/50 bg-card/95 p-6 pt-8 backdrop-blur-xl xl:p-8 xl:pt-10">
                <h2 className="font-display text-2xl text-foreground mb-1 text-center">
                  {siteContent.cta.primaryQuote}
                </h2>
                <p className="text-sm text-muted-foreground text-center mb-6">
                  No obligation • Direct response from PM Roofers
                </p>
                <SimpleContactForm compact />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
