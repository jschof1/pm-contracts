import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/SEOHead';
import JsonLd from '@/components/JsonLd';
import { seoData } from '@/data/seoData';
import { Award, Users, Clock, Shield, CheckCircle } from 'lucide-react';
import { siteSettings } from '@/data/siteSettings';
import { siteContent } from '@/data/content';
import { aboutBrandImage, craftsmanshipImage, workersImage } from '@/data/images';
import { GoogleReviewBadge, CertificationLogos } from '@/components/shared/TrustBadgeBar';

const valueIcons = [Award, Users, Clock, Shield];

const About = () => {
  return (
    <Layout>
      <SEOHead 
        title={seoData.about.title}
        description={seoData.about.description}
        canonicalPath="/about"
      />
      <JsonLd 
        type="BreadcrumbList" 
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'About Us', path: '/about' }
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
              {siteContent.about.heroTitle}
            </h1>
            <p className="text-xl text-primary-foreground/80">
              {siteContent.about.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-accent py-8 border-b border-accent-foreground/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {siteContent.about.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-3xl md:text-4xl text-accent-foreground mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-accent-foreground/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
                {siteContent.about.storyTitle}
              </h2>
              <div className="space-y-4 text-muted-foreground">
                {siteContent.about.storyParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-muted rounded-lg h-80 overflow-hidden relative"
            >
              <img 
                src={craftsmanshipImage}
                alt="Quality Craftsmanship"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-muted rounded-lg h-80 overflow-hidden relative"
            >
              <img 
                src={aboutBrandImage}
                alt="PM Contract team vehicle"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="font-display text-3xl md:text-4xl text-secondary-foreground mb-6">
                {siteContent.about.teamTitle}
              </h2>
              <p className="text-muted-foreground mb-6">
                {siteContent.about.teamDescription}
              </p>
              <ul className="space-y-3">
                {siteContent.about.teamBullets.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
                {siteContent.about.valuesTitle}
              </h2>
              <p className="text-muted-foreground mb-8">
                {siteContent.about.valuesIntro}
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {siteContent.about.values.map((value, index) => {
                  const Icon = valueIcons[index % valueIcons.length];
                  return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-card p-6 rounded-lg border border-border"
                  >
                    <Icon className="w-10 h-10 text-accent mb-3" />
                    <h3 className="font-display text-lg text-card-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {value.description}
                    </p>
                  </motion.div>
                );
                })}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-muted rounded-lg h-96 overflow-hidden relative"
            >
              <img 
                src={workersImage}
                alt="Workers on Site"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl text-primary-foreground mb-4">
              {siteContent.about.ctaTitle}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {siteContent.about.ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-md hover:bg-accent/90 transition-colors"
              >
                {siteContent.cta.freeQuote}
              </a>
              <a
                href={`tel:${siteSettings.phoneFormatted}`}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-foreground text-primary-foreground font-semibold rounded-md hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                {siteContent.cta.callNow} {siteSettings.phone}
              </a>
            </div>
            {/* Certifications */}
            <div className="bg-primary-foreground/10 rounded-lg py-6 px-4">
              <CertificationLogos />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
