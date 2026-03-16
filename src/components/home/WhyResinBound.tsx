import { motion } from 'framer-motion';
import { CheckCircle, Award, Clock, Shield, Banknote, Users, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteSettings } from '@/data/siteSettings';

import { siteContent } from '@/data/content';
import * as Icons from 'lucide-react';

const WhyChooseUs = () => {
  const content = siteContent.home.guarantee;
  
  return (
    <section className="section-padding bg-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
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
          <span className="label-solid inline-flex items-center gap-2 text-xs md:text-sm font-bold tracking-wider uppercase mb-0.5 md:mb-1 px-2 py-1">
            <Shield className="w-3.5 h-3.5" />
            {content.kicker}
          </span>
          <h2 className="section-title font-display text-4xl md:text-7xl font-bold text-primary mt-1 md:mt-2 mb-6 leading-tight">
            <span className="block">{content.titlePart1}</span>
            <span className="relative inline-block">
              {content.titlePart2}
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-accent" />
            </span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            {content.description}
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.items.map((reason, index) => {
            const Icon = (Icons as any)[reason.iconName] || Icons.CheckCircle;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ x: -4, y: -4 }}
                className="surface-panel p-6 transition-all group"
              >
                <div className="surface-icon w-14 h-14 mb-4 group-hover:bg-primary/90">
                  <Icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-bold text-primary mb-2 group-hover:text-primary/80 transition-colors">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.a
            href={`tel:${siteSettings.phoneFormatted}`}
            className="action-primary action-primary-inverse inline-flex items-center gap-3 px-6 py-4 md:px-10 md:py-5 text-lg md:text-xl group relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <Icons.Phone className="w-6 h-6 relative z-10" />
            <span className="relative z-10">{content.ctaButton}: {siteSettings.phone}</span>
          </motion.a>
          <div className="mt-4">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-muted-foreground font-medium hover:text-primary transition-colors link-underline"
            >
              Learn more about our team
              <Icons.ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
