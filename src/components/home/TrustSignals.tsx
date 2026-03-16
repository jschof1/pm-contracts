import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

import { siteContent } from '@/data/content';

const TrustSignals = () => {
  const content = siteContent.home.trustSignals;
  const stats = content.stats;
  const trustBadges = content.badges;
  const certifications = content.certifications;
  
  return (
    <section className="bg-primary py-10 border-y-4 border-accent relative overflow-hidden">
      {/* Background grid */}
      <div className="grid-overlay-accent absolute inset-0" />
      
      <div className="container-custom relative z-10">
        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-3 md:flex md:flex-wrap items-center justify-center gap-2 md:gap-16 mb-8 pb-8 border-b-2 border-primary-foreground/20"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.label} 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-2xl md:text-4xl font-bold text-accent font-display leading-tight">{stat.value}</div>
              <div className="text-[10px] md:text-xs text-primary-foreground/70 uppercase tracking-wider mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col items-center"
        >
          <p className="text-[10px] md:text-xs text-primary-foreground/60 mb-4 font-medium uppercase tracking-widest">
            {siteContent.brand.trustedByline}
          </p>
          
          <div className="grid grid-cols-3 md:flex md:flex-wrap items-center justify-center gap-2 md:gap-8 w-full md:w-auto">
            {trustBadges.map((badge, index) => (
              <motion.div
                key={badge.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="surface-card flex flex-col items-center gap-1 p-2 md:p-4 border-primary-foreground/20 border-b-2 md:border-b-4 border-b-accent bg-primary-foreground/5 backdrop-blur-sm"
              >
                <div className="flex flex-row md:flex-col items-center gap-2 md:gap-1">
                  <div className="flex flex-col items-center gap-1">
                    <div className="px-1 py-0.5">
                      <img 
                        src={badge.logo} 
                        alt={badge.name}
                        className="h-4 md:h-8 w-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                    
                    {badge.stars && (
                      <div className="flex items-center gap-0.5">
                        {[...Array(badge.stars)].map((_, i) => (
                          <Star key={i} className="w-2 md:w-2.5 h-2 md:h-2.5 fill-[#FFD700] text-[#B8860B] stroke-[1.5px]" />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="text-left md:text-center leading-tight">
                    <span className="text-[10px] md:text-sm font-bold text-primary-foreground">{badge.rating}</span>
                    <span className="text-[8px] md:text-[10px] text-primary-foreground/60 block">{badge.ratingLabel}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center mt-8 pt-8 border-t-2 border-primary-foreground/20"
        >
          <p className="text-[10px] md:text-xs text-primary-foreground/60 mb-4 font-medium uppercase tracking-widest">
            Accreditations & Certifications
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 + 0.3 }}
                className="surface-card p-2 md:p-3 h-10 md:h-14 flex items-center justify-center bg-white/5"
              >
                <img 
                  src={cert.logo} 
                  alt={cert.name}
                  className="h-6 md:h-8 w-auto object-contain max-w-[60px] md:max-w-[80px]"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSignals;
