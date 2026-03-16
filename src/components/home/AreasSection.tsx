import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { areas as areasData } from '@/data/areas';
import { siteContent } from '@/data/content';

const AreasSection = () => {
  const content = siteContent.home.areas;
  const displayAreas = areasData.slice(0, 12); // Show first 12 areas
  
  return (
    <section className="section-padding bg-muted/40 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-8 left-8 w-20 h-20 border-l-4 border-t-4 theme-corner-tl border-primary/10" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-r-4 border-b-4 theme-corner-br border-primary/10" />
      
      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="label-solid inline-flex items-center gap-2 text-xs md:text-sm font-bold tracking-wider uppercase mb-0.5 md:mb-4 px-2 py-1">
              <MapPin className="w-3.5 h-3.5" />
              {content.kicker}
            </span>
            
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary mt-2 md:mt-6 mb-6 leading-tight">
              <span className="block mb-1">{content.titlePart1}</span>
              <span className="relative inline-block">
                {content.titlePart2}
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-accent" />
              </span>
            </h2>
            
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4 md:mb-8">
              {content.description}
            </p>

            {/* Areas Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
              {displayAreas.map((area, index) => (
                <motion.div
                  key={area.slug}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <Link
                    to={`/${area.slug}`}
                    className="surface-card flex items-center gap-2 p-3 border-l-4 border-l-transparent hover:border-l-primary transition-all group"
                  >
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {area.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <Link
              to="/areas"
              className="inline-flex items-center gap-2 mt-4 md:mt-8 text-primary font-bold hover:gap-3 transition-all link-underline"
            >
              {content.viewAll}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="surface-card aspect-square bg-muted overflow-hidden border-4 border-accent/20">
              <iframe 
                src="https://www.google.com/maps?q=Glasgow%2C%20Scotland&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[20%] contrast-[1.1]"
              ></iframe>
              
              {/* Subtle blue overlay */}
              <div className="absolute inset-0 bg-primary/10 pointer-events-none mix-blend-multiply" />
              
              {/* Decorative corner brackets */}
              <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 theme-corner-tl border-accent pointer-events-none" />
              <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 theme-corner-tr border-accent pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 theme-corner-bl border-accent pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 theme-corner-br border-accent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AreasSection;
