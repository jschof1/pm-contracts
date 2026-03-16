import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { siteSettings } from '@/data/siteSettings';

import { siteContent } from '@/data/content';
import * as Icons from 'lucide-react';

const CTASection = () => {
  const content = siteContent.home.cta;
  
  return (
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
      
      {/* Decorative Elements - Sharp rectangles with animation */}
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
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs md:text-sm font-bold uppercase tracking-widest mb-2 md:mb-6"
          >
            <Icons.Sparkles className="w-4 h-4" />
            <span>{content.kicker}</span>
            <Icons.Sparkles className="w-4 h-4" />
          </motion.div>
          
          <h2 className="section-title font-display text-4xl md:text-7xl font-bold text-primary-foreground mt-1 md:mt-2 mb-4 leading-tight">
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
              className="block"
            >
              <span className="relative inline-block text-gradient-accent">
                {content.titlePart2}
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
            className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto"
          >
            {content.description}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mb-8 w-full sm:w-auto"
          >
            <motion.a
              href={`tel:${siteSettings.phoneFormatted}`}
              className="action-primary inline-flex items-center gap-3 md:gap-4 px-6 py-4 md:px-10 md:py-5 text-lg md:text-xl group relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Shimmer effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Icons.Phone className="w-6 h-6 md:w-7 md:h-7 relative z-10" />
              <span className="relative z-10">{siteContent.cta.callNow}</span>
            </motion.a>
            
            <Link
              to="/contact"
              className="action-secondary inline-flex items-center gap-2 bg-transparent text-primary-foreground px-6 py-4 border-primary-foreground/30 hover:border-accent hover:text-accent group"
            >
              <span>Request a Callback</span>
              <Icons.ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Trust signals with stagger */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-primary-foreground/80 text-sm max-w-2xl mx-auto">
            {content.benefits.map((item, index) => {
              const Icon = (Icons as any)[item.iconName] || Icons.CheckCircle;
              return (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-primary-foreground/20 border-l-4 border-l-accent bg-primary-foreground/5 backdrop-blur-sm rounded-[var(--radius)] min-w-0"
                >
                  <Icon 
                    className={`w-4 h-4 ${item.text.includes('Rating') ? 'fill-[#EAB308] text-[#EAB308]' : 'text-accent'}`} 
                    style={item.text.includes('Rating') ? { color: '#EAB308', fill: '#EAB308' } : {}}
                  />
                  <span>{item.text}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
