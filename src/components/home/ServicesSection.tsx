import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Layers } from 'lucide-react';
import { siteContent } from '@/data/content';
import { siteSettings } from '@/data/siteSettings';
import * as Icons from 'lucide-react';

import { getServiceImage } from '@/data/images';

const ServicesSection = () => {
  const content = siteContent.home.services;
  
  return (
    <section className="section-padding bg-muted/50 relative overflow-hidden">
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
            {content.kicker}
          </motion.span>
          <h2 className="section-title text-4xl md:text-7xl font-display font-bold text-primary mt-1 md:mt-2 mb-6 leading-tight">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="block"
            >
              {content.titlePart1}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative inline-block"
            >
              {content.titlePart2}
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
            className="text-muted-foreground text-base md:text-xl font-medium max-w-2xl mx-auto"
          >
            {content.description} {siteSettings.serviceArea}.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.items.map((service, index) => {
            const Icon = (Icons as any)[service.iconName] || Icons.Layers;
            const serviceImage = getServiceImage(service.href);

            return (
              <motion.div
                key={service.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={service.featured ? 'md:col-span-2 lg:col-span-1' : ''}
              >
                <Link
                  to={service.href}
                  className="group block h-full"
                >
                  <motion.div 
                    className="surface-card relative h-full flex flex-col overflow-hidden transition-all duration-500 corner-brackets"
                    whileHover={{ x: -4, y: -4 }}
                  >
                    {/* Image Container with diagonal clip */}
                    <div className="relative h-64 overflow-hidden theme-corner-tl theme-corner-tr">
                      <motion.img 
                        src={serviceImage} 
                        alt={service.title}
                        className="w-full h-full object-cover"
                        width={720}
                        height={256}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.7 }}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                      
                      {/* Icon Overlay with corner accent */}
                      <motion.div 
                        className="absolute top-4 left-4 surface-icon w-14 h-14 icon-accent-corner"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                      >
                        <Icon className="w-7 h-7" />
                      </motion.div>

                      {/* Badge for Featured with animation */}
                      {service.featured && (
                        <motion.div 
                          initial={{ x: 100 }}
                          whileInView={{ x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3, type: "spring" }}
                          className="absolute top-4 right-4 label-solid text-xs"
                        >
                          Most Popular
                        </motion.div>
                      )}
                      
                      {/* Hover reveal overlay */}
                      <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content with accent top border */}
                    <div className="p-8 flex flex-col flex-grow bg-card relative border-t-4 border-t-accent theme-corner-bl theme-corner-br">
                      {/* Animated accent line */}
                      <div className="absolute top-0 left-0 w-0 h-1 bg-accent group-hover:w-full transition-all duration-500" />
                      
                      <h3 className="font-display text-2xl font-bold text-primary mb-3 group-hover:text-primary/80 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4 font-medium min-h-[3.5rem]">
                        {service.description}
                      </p>

                      <div className="mb-6">
                        <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-accent font-bold">
                          Glasgow roofing service
                        </span>
                      </div>
                      
                      <div className="mt-auto flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-primary font-bold text-sm">
                          <span className="relative">
                            View Service Details
                            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                          </span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                        
                        <div className="pt-4 border-t border-border/50 flex flex-col gap-2">
                          <div
                            className="action-inverse w-full py-3 text-center font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              window.location.href = `tel:${siteSettings.phoneFormatted}`;
                            }}
                          >
                            <Phone className="w-4 h-4" />
                            {siteContent.cta.callNow}
                          </div>
                          <Link
                            to="/get-quote"
                            className="action-primary w-full py-3 text-center font-bold text-sm flex items-center justify-center gap-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Request Quote
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA - Phone First */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-8 md:mt-16"
        >
          <p className="text-muted-foreground text-lg mb-4">{content.ctaText}</p>
          <motion.a
            href={`tel:${siteSettings.phoneFormatted}`}
            className="action-primary action-primary-inverse inline-flex items-center gap-2 px-3 py-2.5 md:px-10 md:py-5 text-sm md:text-xl group relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <Phone className="w-7 h-7 relative z-10" />
            <div className="flex flex-col items-center relative z-10 leading-tight">
              <span className="text-sm uppercase tracking-widest font-bold opacity-80">Speak Directly With PM Roofers</span>
              <span className="text-2xl font-black">{siteContent.cta.callNow}</span>
            </div>
          </motion.a>
          <div className="mt-5">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors link-underline"
            >
              {content.ctaBrowse}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
