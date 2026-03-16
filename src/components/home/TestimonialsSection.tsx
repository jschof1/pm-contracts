import { motion } from 'framer-motion';
import { Star, Quote, MapPin, CheckCircle, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteSettings } from '@/data/siteSettings';

import { siteContent } from '@/data/content';
import * as Icons from 'lucide-react';

const TestimonialsSection = () => {
  const content = siteContent.home.testimonials;
  
  return (
    <section className="section-padding bg-secondary/40 relative overflow-hidden">
      {/* Decorative corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-4 border-t-4 theme-corner-tl border-primary/10" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-4 border-b-4 theme-corner-br border-primary/10" />
      
      <div className="container-custom relative">
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
            className="label-solid inline-flex items-center gap-2 text-xs md:text-sm font-bold tracking-wider uppercase mb-0.5 md:mb-1 px-2 py-1"
          >
            <Icons.Star className="w-3.5 h-3.5" />
            {content.kicker}
          </motion.span>
          <h2 className="section-title text-4xl md:text-7xl font-display font-bold text-primary mt-1 md:mt-2 mb-6 leading-tight">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="block"
            >
              {content.titlePart1}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative inline-block"
            >
              {content.titlePart2}
              <motion.span 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-2 left-0 w-full h-1 bg-accent origin-left"
              />
            </motion.span>
          </h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-base md:text-lg"
          >
            {content.description}
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {content.items.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <motion.div 
                className="surface-panel p-6 relative transition-all h-full group corner-brackets theme-corner-tl theme-corner-tr theme-corner-bl theme-corner-br"
                whileHover={{ x: -2, y: -2 }}
              >
                {/* Quote Icon with animation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                >
                  <Icons.Quote className="absolute top-5 right-5 w-8 h-8 text-primary/20 group-hover:text-primary/30 transition-colors" />
                </motion.div>

                {/* Stars with stagger */}
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + i * 0.05 + 0.1, type: "spring" }}
                    >
                      <Icons.Star className="w-4 h-4 fill-[#FFD700] text-[#B8860B] stroke-[1.5px]" />
                    </motion.div>
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-foreground leading-relaxed mb-5 text-sm italic">
                  "{testimonial.text}"
                </p>

                {/* Author Info */}
                <div className="flex items-center justify-between border-t-2 border-border pt-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-primary text-sm">{testimonial.name}</p>
                      {testimonial.verified && (
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                        >
                          <Icons.CheckCircle className="w-3.5 h-3.5 text-accent-secondary" />
                        </motion.div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <Icons.MapPin className="w-3 h-3" />
                      <span>{testimonial.location}</span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1">{testimonial.date}</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA - Phone First */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">{content.ctaText}</p>
          <motion.a
            href={`tel:${siteSettings.phoneFormatted}`}
            className="action-primary inline-flex items-center gap-3 px-8 py-5 text-lg group relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <Icons.Phone className="w-6 h-6 relative z-10" />
            <span className="relative z-10">{content.ctaButton}: {siteSettings.phone}</span>
          </motion.a>
          <div className="mt-4">
            <Link
              to="/reviews"
              className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors link-underline"
            >
              {content.ctaBrowse}
              <Icons.ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
