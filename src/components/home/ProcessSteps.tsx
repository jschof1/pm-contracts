import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, FileText, HardHat, ThumbsUp, Phone, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { siteSettings } from '@/data/siteSettings';
import { siteContent } from '@/data/content';
import * as Icons from 'lucide-react';

const ProcessSteps = () => {
  const content = siteContent.home.process;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={containerRef} className="section-padding bg-primary relative overflow-hidden">
      {/* Background Parallax Elements */}
      <motion.div style={{ y: y1 }} className="absolute -top-20 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <motion.div style={{ y: y2 }} className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent-secondary/10 rounded-full blur-3xl" />
      
      {/* Architectural grid */}
      <div className="grid-overlay-accent absolute inset-0 opacity-20" />
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left: Content & Visual */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-2 md:mb-6">
                <Icons.Sparkles className="w-3 h-3" />
                <span>{content.kicker}</span>
              </div>
              
              <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
                {content.titlePart1} <br />
                <span className="text-accent">{content.titlePart2}</span> {content.titlePart3}
              </h2>
              
              <p className="text-primary-foreground/80 text-base md:text-lg mb-8 leading-relaxed">
                {content.description}
              </p>

              <div className="space-y-4">
                {content.benefits.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    className="flex items-center gap-3 text-primary-foreground/90 font-medium"
                  >
                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                      <Icons.CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                    </div>
                    {item}
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className="surface-panel-accent mt-6 md:mt-10 p-4 md:p-6 bg-accent border-accent/20 relative overflow-hidden group"
                whileHover={{ y: -5 }}
              >
                {/* Decorative background element */}
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-card/10 rounded-full blur-2xl group-hover:bg-card/20 transition-colors" />
                
                <div className="flex items-center gap-4 mb-3 md:mb-4 relative z-10">
                  <div className="surface-icon w-10 h-10 md:w-12 md:h-12">
                    <Icons.Phone className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-accent-foreground/80 text-[10px] md:text-xs font-bold uppercase tracking-wider">{content.directLineLabel}</p>
                    <p className="text-accent-foreground font-display text-xl md:text-2xl font-bold">{siteSettings.phone}</p>
                  </div>
                </div>
                <Link to="/contact" className="action-inverse w-full justify-center py-3 text-sm flex items-center gap-2 font-bold relative z-10">
                  {content.ctaButton}
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Steps Vertical Timeline */}
          <div className="lg:w-2/3 w-full">
            <div className="relative space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
              {content.steps.map((step, index) => {
                const Icon = (Icons as any)[index === 0 ? 'Calendar' : index === 1 ? 'FileText' : index === 2 ? 'HardHat' : 'ThumbsUp'] || Icons.CheckCircle;
                const color = index === 0 ? 'bg-accent-secondary' : index === 1 ? 'bg-accent' : index === 2 ? 'bg-primary' : 'bg-accent-secondary';
                
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="group relative"
                  >
                    <div className="surface-card h-full bg-card/5 backdrop-blur-md border-primary-foreground/10 p-5 md:p-8 hover:bg-card/10 transition-all duration-500 group-hover:border-accent/50">
                      {/* Step Number Background */}
                      <div className="absolute top-3 right-4 md:top-4 md:right-6 text-4xl md:text-6xl font-display font-black text-primary-foreground/5 group-hover:text-accent/10 transition-colors">
                        {step.step}
                      </div>

                      <div className="relative z-10 flex flex-row md:flex-col gap-3 md:gap-0">
                        <div className={`surface-icon w-9 h-9 md:w-14 md:h-14 shrink-0 ${color} md:mb-6 group-hover:scale-110 transition-transform duration-500`}>
                          <Icon className="w-4 h-4 md:w-7 md:h-7 text-primary-foreground" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="font-display text-xl md:text-2xl font-bold text-primary-foreground mb-2 md:mb-3 group-hover:text-accent transition-colors">
                            {step.title}
                          </h3>
                          
                          <p className="text-primary-foreground/80 mb-4 md:mb-6 text-sm md:text-base leading-relaxed">
                            {step.description}
                          </p>

                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            {step.highlight}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
