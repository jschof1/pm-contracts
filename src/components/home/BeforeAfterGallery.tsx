import { motion } from 'framer-motion';
import { ArrowRight, MapPin, ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { beforeAfterImage } from '@/data/images';
import { siteContent } from '@/data/content';

const BeforeAfterGallery = () => {
  const content = siteContent.home.beforeAfter;
  
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center w-full md:max-w-3xl md:mx-auto mb-8 md:mb-16"
        >
          <span className="label-solid inline-flex items-center gap-2 text-xs md:text-sm font-bold tracking-wider uppercase mb-0.5 md:mb-1 px-2 py-1">
            <ImageIcon className="w-3.5 h-3.5" />
            {content.kicker}
          </span>
          <h2 className="section-title font-display text-4xl md:text-7xl font-bold text-primary mt-1 md:mt-2 mb-6 leading-tight">
            {content.title}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            {content.description}
          </p>
        </motion.div>

        {/* Featured Before/After Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="surface-card overflow-hidden">
            <img 
              src={beforeAfterImage}
              alt="Before and after exterior cleaning example"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Project Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {content.transformations.map((item, index) => (
            <motion.div
              key={item.location}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group"
            >
              <div className="surface-card p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-primary mb-2">
                  {item.project}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {item.location}, {siteContent.brand.serviceAreaLabel}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gallery CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            {content.ctaText}
          </p>
          <Link
            to="/contact"
            className="action-inverse inline-flex items-center gap-2 px-6 py-3 font-semibold"
          >
            {content.ctaButton}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BeforeAfterGallery;
