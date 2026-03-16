import { motion } from 'framer-motion';
import { Shield, CheckCircle, Award, Banknote, FileCheck, Phone } from 'lucide-react';
import { siteSettings } from '@/data/siteSettings';

import { siteContent } from '@/data/content';
import * as Icons from 'lucide-react';

const GuaranteeSection = () => {
  const content = siteContent.home.guarantee;
  
  return (
    <section className="section-padding bg-secondary/40 relative overflow-hidden">
      {/* Decorative corners */}
      <div className="absolute top-8 left-8 w-20 h-20 border-l-4 border-t-4 theme-corner-tl border-primary/10" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-r-4 border-b-4 theme-corner-br border-primary/10" />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="label-solid inline-flex items-center gap-2 text-xs md:text-sm font-bold tracking-wider uppercase mb-0.5 md:mb-4 px-2 py-1">
              <Shield className="w-3.5 h-3.5" />
              {content.kicker}
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary mt-2 md:mt-6 mb-6">
              {content.titlePart1}
              <span className="relative inline-block ml-3">
                {content.titlePart2}
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-accent" />
              </span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
              {content.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {content.items.map((guarantee, index) => {
                const Icon = (Icons as any)[guarantee.iconName] || Icons.Shield;
                return (
                  <motion.div
                    key={guarantee.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="surface-panel p-4"
                  >
                    <Icon className="w-6 h-6 text-primary mb-2" />
                    <h3 className="font-bold text-primary text-sm mb-1">{guarantee.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {guarantee.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Content - What's Included */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="surface-inverse p-8 text-primary-foreground border-t-4 border-t-accent">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent flex items-center justify-center">
                  <Icons.FileCheck className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold">
                  {content.includedTitle}
                </h3>
              </div>

              <div className="space-y-4 mb-6">
                {content.includedItems.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <Icons.CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-primary-foreground/90 text-sm font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="border-t-2 border-primary-foreground/20 pt-5">
                <motion.a
                  href={`tel:${siteSettings.phoneFormatted}`}
                  className="action-primary flex items-center justify-center gap-3 px-6 py-4 font-bold text-base group relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <Icons.Phone className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">{content.ctaButton}</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
