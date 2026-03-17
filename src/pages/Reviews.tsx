import { motion } from 'framer-motion';
import { Star, Quote, MapPin, CheckCircle, Shield, Award, ThumbsUp, Phone, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/SEOHead';
import JsonLd from '@/components/JsonLd';
import { seoData } from '@/data/seoData';
import { Button } from '@/components/ui/button';
import { siteSettings } from '@/data/siteSettings';
import { beforeAfterImage, teamPhoto } from '@/data/images';

const reviews = [
  {
    name: "Helen M.",
    location: "Glasgow",
    rating: 5,
    text: "Peter explained the issue clearly, gave us a fair quote, and the work was carried out exactly when he said it would be.",
    date: "Customer feedback",
    verified: false,
    service: "Roof Repairs",
    highlight: true,
    initials: "HM",
    avatarColor: "bg-accent",
  },
  {
    name: "Craig D.",
    location: "Greenock",
    rating: 5,
    text: "We needed urgent help after a leak and PM Roofers responded quickly, kept us informed, and got the roof secure fast.",
    date: "Customer feedback",
    verified: false,
    service: "Emergency Roofing",
    highlight: true,
    initials: "CD",
    avatarColor: "bg-secondary",
  },
  {
    name: "Laura W.",
    location: "Paisley",
    rating: 5,
    text: "Straightforward advice and no pressure. The leadwork repair solved the problem properly.",
    date: "Customer feedback",
    verified: false,
    service: "Roof Replacement",
    highlight: true,
    initials: "LW",
    avatarColor: "bg-primary",
  },
  {
    name: "James B.",
    location: "Coatbridge",
    rating: 5,
    text: "Good communication, tidy workmanship, and a professional finish throughout the chimney repair.",
    date: "Customer feedback",
    verified: false,
    service: "Chimney Repairs",
    highlight: false,
    initials: "JB",
    avatarColor: "bg-accent",
  },
  {
    name: "Andrea W.",
    location: "Hamilton",
    rating: 5,
    text: "Approachable, efficient, and easy to deal with from the first call to completion.",
    date: "Customer feedback",
    verified: false,
    service: "Leadwork",
    highlight: true,
    initials: "AW",
    avatarColor: "bg-secondary",
  },
  {
    name: "Chris B.",
    location: "Airdrie",
    rating: 5,
    text: "Very pleased with the standard of work and the updates throughout the job.",
    date: "Customer feedback",
    verified: false,
    service: "Roughcasting",
    highlight: true,
    initials: "CB",
    avatarColor: "bg-primary",
  },
  {
    name: "Laura H.",
    location: "East Kilbride",
    rating: 5,
    text: "Kept us updated, arrived on time, and delivered exactly the finish we were hoping for.",
    date: "Customer feedback",
    verified: false,
    service: "UPVC Gutters",
    highlight: false,
    initials: "LH",
    avatarColor: "bg-accent",
  },
  {
    name: "Paul G.",
    location: "Coatbridge",
    rating: 5,
    text: "Fast response, clear advice, and a practical solution to the issue we were having.",
    date: "Customer feedback",
    verified: false,
    service: "Skylight Repairs",
    highlight: false,
    initials: "PG",
    avatarColor: "bg-secondary",
  },
  {
    name: "Helen M.",
    location: "Glasgow",
    rating: 5,
    text: "Everything was explained properly before work started and the whole process felt straightforward.",
    date: "Customer feedback",
    verified: false,
    service: "Damp Proofing",
    highlight: false,
    initials: "HM",
    avatarColor: "bg-primary",
  },
];

const stats = [
  { value: "9", label: "Customer Reviews" },
  { value: "5", label: "Google Rating", suffix: "/5" },
  { value: "30+", label: "Years Experience" },
  { value: "Fully", label: "Insured" },
];

const Reviews = () => {
  return (
    <Layout>
      <SEOHead 
        title={seoData.reviews.title}
        description={seoData.reviews.description}
        canonicalPath="/reviews"
      />
      <JsonLd 
        type="BreadcrumbList" 
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Reviews', path: '/reviews' }
        ]} 
      />
      {/* Hero Section with Stats - Services-inspired for mobile */}
      <section className="section-padding bg-primary relative overflow-hidden">
        {/* Background Image with gradient overlay */}
        <div className="absolute inset-0">
          <img 
            src={teamPhoto} 
            alt="PM Roofers team on site during roofing work" 
            className="w-full h-full object-cover opacity-[0.08] md:opacity-[0.12]"
            width={1600}
            height={900}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />
          <div className="absolute right-0 bottom-0 bg-gradient-to-t from-primary/90 via-transparent to-primary/50 border-b-4 border-accent" />
        </div>
        {/* Architectural grid overlay */}
        <div className="grid-overlay-accent absolute inset-0 opacity-20" />
        {/* Corner brackets */}
        <div className="absolute top-6 left-6 md:top-8 md:left-8 w-12 h-12 md:w-16 md:h-16 border-l-4 border-t-4 theme-corner-tl border-accent/50" />
        <div className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 md:w-16 md:h-16 border-r-4 border-t-4 theme-corner-tr border-accent/50" />
        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 w-12 h-12 md:w-16 md:h-16 border-l-4 border-b-4 theme-corner-bl border-accent/50" />
        <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-12 h-12 md:w-16 md:h-16 border-r-4 border-b-4 theme-corner-br border-accent/50" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-4 md:mb-8">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-2 bg-accent/10 border border-accent/20 text-primary-foreground text-xs md:text-sm font-semibold">
                <User className="w-4 h-4 text-accent" />
                Recent customer feedback
              </div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-2 bg-accent/10 border border-accent/20 text-primary-foreground text-xs md:text-sm font-semibold">
                <Shield className="w-4 h-4 text-accent" />
                Fully insured service
              </div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-2 bg-accent/10 border border-accent/20 text-primary-foreground text-xs md:text-sm font-semibold">
                <Award className="w-4 h-4 text-accent" />
                15+ years of experience
              </div>
            </div>
            
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 md:mb-6">
              Trusted by Homeowners Across{' '}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative inline-block text-gradient-accent"
              >
                Glasgow & Surrounding Areas
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute -bottom-2 left-0 w-full h-1.5 bg-accent glow-accent origin-left"
                />
              </motion.span>
            </h1>
            <p className="text-base md:text-xl text-primary-foreground/80 mb-6 md:mb-10">
              PM Roofers is presented as a 5/5 roofing company, with customer feedback focused on response time, clear advice, and dependable workmanship.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl py-2 px-2 md:p-6 border border-primary-foreground/20"
                >
                  <div className="text-lg md:text-4xl font-bold text-accent mb-0.5 md:mb-1">
                    {stat.value}
                    {stat.suffix || ""}
                  </div>
                  <div className="text-[10px] md:text-sm text-primary-foreground/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges & Certifications */}
      <section className="bg-background py-8 border-b border-border">
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-6 mb-4 md:mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-[10px] md:text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
              <Shield className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent" />
              <span>Fully Insured</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-[10px] md:text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
              <Award className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent" />
              <span>15+ Years Experience</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-[10px] md:text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
              <ThumbsUp className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent" />
              <span>Risk Assessments Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Reviews */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center w-full md:max-w-3xl md:mx-auto mb-8 md:mb-12"
          >
            <span className="label-solid text-xs md:text-sm font-bold tracking-wider uppercase mb-0.5 md:mb-1 px-2 py-1">Customer Stories</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mt-2 md:mt-6 mb-6">
              Recent Roofing Feedback
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              A snapshot of the customer comments and service standards PM Roofers is known for across Glasgow and the surrounding area.
            </p>
          </motion.div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className={`bg-card rounded-xl border p-6 relative hover:shadow-sharp transition-all flex flex-col h-full ${
                  review.highlight ? "border-accent/50 shadow-sharp" : "border-border"
                }`}
              >
                {review.highlight && (
                  <div className="absolute -top-3 left-6 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Featured Review
                  </div>
                )}

                <Quote className="absolute top-5 right-5 w-8 h-8 text-accent/15" />

                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>

                {/* Service Tag */}
                <div className="inline-block bg-secondary text-secondary-foreground text-xs font-medium px-3 py-1 rounded-full mb-4">
                  {review.service}
                </div>

                {/* Review Text */}
                <p className="text-foreground leading-relaxed mb-6 text-base flex-grow">"{review.text}"</p>

                {/* Author Info */}
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${review.avatarColor} rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm`}>
                      {review.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-primary">{review.name}</p>
                        {review.verified && (
                          <div className="flex items-center gap-1 text-accent">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-xs font-medium">Verified</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{review.location}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col items-center gap-6 mt-12"
          >
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/feedback"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground border-2 border-transparent rounded-xl px-6 py-4 font-semibold hover:bg-secondary/80 transition-all"
              >
                <Star className="w-5 h-5" />
                Share Your Feedback
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mid-Page CTA */}
      <section className="bg-accent py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-accent-foreground mb-2">
                Ready to Sort Your Roof?
              </h3>
            <p className="text-accent-foreground/80">
                Speak to PM Roofers today for a no-obligation quote on roofing and exterior repair work.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="secondary" className="font-semibold">
                <Link to="/get-quote">Get Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-accent-foreground text-accent-foreground hover:bg-accent-foreground/10">
                <a href={`tel:${siteSettings.phoneFormatted}`} className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Transformations Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center w-full md:max-w-3xl md:mx-auto mb-8 md:mb-12"
          >
            <span className="label-solid text-xs md:text-sm font-bold tracking-wider uppercase mb-0.5 md:mb-1 px-2 py-1">Transformations</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mt-2 md:mt-6 mb-6">
              See the Difference We Make
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Real before and after imagery from recent PM Roofers roofing and roofline projects.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl overflow-hidden shadow-sharp max-w-4xl mx-auto"
          >
            <img
              src={beforeAfterImage}
              alt="Before and after roofing project example"
              className="w-full h-auto"
              width={1600}
              height={900}
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-primary">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Book Your Roofing Quote?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Contact PM Roofers today for a free, no-obligation quote and practical advice on the right roofing or exterior repair service for your property.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8">
                <Link to="/get-quote">Get Your Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                <a href={`tel:${siteSettings.phoneFormatted}`} className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Reviews;
