import { motion } from 'framer-motion';
import { Clock, Banknote, Droplets, Wrench, Phone, ArrowRight } from 'lucide-react';
import { siteSettings } from '@/data/siteSettings';

import { siteContent } from '@/data/content';
import * as Icons from 'lucide-react';

const ObjectionCrusher = () => {
  const content = siteContent.home.objections;
  
  return (
    <section className="section-padding bg-primary relative overflow-hidden">
      {/* Background grid */}
      <div className="grid-overlay-accent absolute inset-0" />
      
      {/* Accent lines */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
      
      {/* Decorative corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-4 border-t-4 theme-corner-tl border-accent/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-4 border-b-4 theme-corner-br border-accent/30" />
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center w-full md:max-w-3xl md:mx-auto mb-8 md:mb-12"
        >
          <span className="label-solid inline-flex items-center gap-2 text-xs md:text-sm font-bold tracking-wider uppercase mb-0.5 md:mb-1 px-2 py-1">
            <Icons.HelpCircle className="w-3.5 h-3.5" />
            {content.kicker}
          </span>
          <h2 className="section-title font-display text-4xl md:text-7xl font-bold text-primary-foreground mt-1 md:mt-2 mb-6 leading-tight">
            {content.title}
          </h2>
          <p className="text-primary-foreground/70 text-base md:text-lg">
            {content.description}
          </p>
        </motion.div>

        {/* Objections Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {content.items.map((objection, index) => {
            const Icon = (Icons as any)[objection.iconName] || Icons.HelpCircle;
            return (
              <motion.div
                key={objection.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: -4, y: -4 }}
                className="surface-panel-accent border-t-primary p-4 md:p-6 transition-all group"
              >
                {/* Top Row: Icon + Question */}
                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                  <div className="surface-icon w-10 h-10 md:w-14 md:h-14 flex-shrink-0 group-hover:bg-primary/90">
                    <Icon className="w-5 h-5 md:w-7 md:h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-base md:text-lg font-bold text-primary leading-tight">
                    {objection.question}
                  </h3>
                </div>

                {/* Answer */}
                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-3 md:mb-4">
                  {objection.answer}
                </p>

                {/* Stat Badge */}
                <div className="flex items-center gap-2 md:gap-3 pt-2 md:pt-3 border-t-2 border-border">
                  <span className="text-xl md:text-2xl font-bold text-primary font-display">{objection.stat}</span>
                  <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider font-medium">
                    {objection.statLabel}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-primary-foreground/70 text-base mb-4">
            {content.ctaText}
          </p>
          <motion.a
            href={`tel:${siteSettings.phoneFormatted}`}
            className="action-primary inline-flex items-center gap-3 px-6 py-4 md:px-10 md:py-5 text-lg md:text-xl group relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <Icons.Phone className="w-6 h-6 relative z-10" />
            <span className="relative z-10">{content.ctaButton}</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ObjectionCrusher;
