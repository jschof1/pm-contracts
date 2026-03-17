import { motion } from 'framer-motion';
import { ArrowRight, MapPin, ExternalLink, Sparkles, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '@/data/projects';
import { siteSettings } from '@/data/siteSettings';

import { siteContent } from '@/data/content';

const ProjectsSection = () => {
  const content = siteContent.home.projects;
  
  return (
    <section id="projects" className="section-padding bg-primary relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-accent/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent-secondary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />
      
      {/* Architectural grid overlay - more visible on dark */}
      <div className="grid-overlay-accent absolute inset-0 opacity-10 pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs md:text-sm font-bold uppercase tracking-widest mb-2 md:mb-6"
            >
              <Sparkles className="w-4 h-4" />
              {content.kicker}
            </motion.span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground mt-2 md:mt-4 mb-6 md:mb-8 leading-tight">
              {content.titlePart1} <br />
              <span className="text-accent relative inline-block">
                {content.titlePart2}
                <motion.span 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute -bottom-2 left-0 w-full h-2 bg-accent/50 origin-left"
                />
              </span>
            </h2>
            <p className="text-primary-foreground/80 text-base md:text-xl lg:text-2xl font-medium leading-relaxed max-w-xl">
              {content.description} {siteSettings.serviceArea}.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block"
          >
            <Link 
              to="/#projects" 
              className="group flex items-center gap-4 text-primary-foreground font-bold text-xl hover:text-accent transition-all"
            >
              <span className="relative">
                {content.viewAll}
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-accent group-hover:w-full transition-all duration-300" />
              </span>
              <div className="w-14 h-14 rounded-2xl border-2 border-primary-foreground/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-accent-foreground transition-all duration-300 rotate-3 group-hover:rotate-0">
                <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {projects.slice(0, 4).map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group"
            >
              <Link 
                to={`/projects/${project.slug}`} 
                className="group block surface-card transition-all duration-500 corner-brackets h-full"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden theme-corner-tl theme-corner-tr">
                  <motion.img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                    width={720}
                    height={256}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  
                  {/* Icon Overlay with corner accent */}
                  <div className="absolute top-4 left-4 surface-icon w-14 h-14 icon-accent-corner">
                    <MapPin className="w-7 h-7" />
                  </div>

                  <div className="absolute bottom-4 right-4 label-solid text-xs font-bold tracking-wider uppercase">
                    {project.location}
                  </div>
                </div>
                
                {/* Content Area */}
                <div className="p-8 flex flex-col flex-grow bg-card relative border-t-4 border-t-accent theme-corner-bl theme-corner-br">
                  <div className="flex items-center gap-2 text-accent mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider">{project.style}</span>
                  </div>
                  
                  <h3 className="font-display text-2xl font-bold text-primary mb-3 group-hover:text-primary/80 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6 font-medium line-clamp-2 flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="mt-auto flex items-center gap-2 text-primary font-bold text-sm">
                    <span className="relative">
                      Explore Project Details
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                    </span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-10 md:hidden text-center">
          <Link 
            to="/#projects" 
            className="action-primary w-full justify-center py-4 flex items-center gap-2"
          >
            {content.viewAll}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 md:mt-20 p-8 md:p-12 rounded-3xl bg-primary text-primary-foreground border border-primary/30 relative overflow-hidden group shadow-sharp-lg"
        >
          {/* Background pattern */}
          <div className="grid-overlay-accent absolute inset-0 opacity-10" />
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl group-hover:bg-accent/30 transition-colors" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-xl">
              <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">{content.ctaTitle}</h3>
              <p className="text-primary-foreground/80 text-lg font-medium">
                {content.ctaDescription}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <motion.a
                href={`tel:${siteSettings.phoneFormatted}`}
                className="action-primary px-8 py-4 flex items-center justify-center gap-3 font-bold text-lg group/phone"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-5 h-5 group-hover/phone:rotate-12 transition-transform" />
                {siteContent.cta.callNow}
              </motion.a>
              <Link
                to="/get-quote"
                className="action-secondary px-8 py-4 flex items-center justify-center gap-2 font-bold text-lg bg-transparent text-primary-foreground border-primary-foreground/30 hover:border-accent hover:text-accent"
              >
                {content.ctaButton}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
