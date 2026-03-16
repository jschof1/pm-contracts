import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, Clock, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { aboutBrandImage } from '@/data/images';
import { siteContent } from '@/data/content';

const AboutSection = () => {
  const content = siteContent.home.about;
  const statsIcons = [
    { label: 'Years Experience', icon: Clock },
    { label: 'Happy Customers', icon: Users },
    { label: 'On-Time Delivery', icon: Award },
  ];
  
  return (
    <section className="section-padding bg-primary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
      <div className="absolute top-8 right-8 w-20 h-20 border-r-4 border-t-4 theme-corner-tr border-accent/30" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-l-4 border-b-4 theme-corner-bl border-accent/30" />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="surface-card aspect-[4/3] bg-slate-medium overflow-hidden border-4 border-accent/20">
              <img 
                src={aboutBrandImage}
                alt="PM Contract team and vehicle"
                className="w-full h-full object-cover"
                width={800}
                height={600}
                loading="lazy"
              />
            </div>
            
            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute -bottom-8 -right-8 surface-panel-accent p-6 hidden md:block"
            >
              <div className="grid grid-cols-3 gap-6">
                {content.stats.map((stat) => {
                  const Icon = statsIcons.find(s => s.label === stat.label)?.icon || Award;
                  return (
                    <div key={stat.label} className="text-center">
                      <Icon className="w-6 h-6 text-accent mx-auto mb-2" />
                      <div className="font-display text-2xl font-bold text-primary">{stat.number}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="label-solid inline-flex items-center gap-2 text-xs md:text-sm font-bold tracking-wider uppercase mb-0.5 md:mb-4 px-2 py-1">
              <Info className="w-3.5 h-3.5" />
              {content.kicker}
            </span>
            
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mt-2 md:mt-6 mb-6">
              {content.title}
            </h2>
            
            <div className="space-y-4 text-primary-foreground/80 leading-relaxed mb-8">
              {content.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Mobile Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8 md:hidden">
              {content.stats.map((stat) => (
                <div key={stat.label} className="surface-card text-center p-4 border-l-2 border-l-accent bg-primary-foreground/10">
                  <div className="font-display text-xl font-bold text-primary-foreground">{stat.number}</div>
                  <div className="text-xs text-primary-foreground/70">{stat.label}</div>
                </div>
              ))}
            </div>

            <Button asChild className="action-primary gap-2 border-2 border-accent hover:bg-accent hover:text-primary transition-all duration-300">
              <Link to="/about">
                {content.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
