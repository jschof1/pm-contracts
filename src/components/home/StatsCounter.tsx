import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Home, Star, Calendar, Award } from 'lucide-react';

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
}

const Counter = ({ value, suffix = '', prefix = '' }: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000 });
  const displayValue = useTransform(springValue, (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  return (
    <motion.span 
      ref={ref}
      className="inline-block"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {displayValue}
    </motion.span>
  );
};

import { siteContent } from '@/data/content';
import * as Icons from 'lucide-react';

const StatsCounter = () => {
  const content = siteContent.home.about.stats;
  
  return (
    <section className="py-16 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-10" />
      
      {/* Decorative accent lines */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
      
      {/* Corner brackets */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 theme-corner-tl border-accent opacity-50" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 theme-corner-tr border-accent opacity-50" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 theme-corner-bl border-accent opacity-50" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 theme-corner-br border-accent opacity-50" />
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {content.map((stat, index) => {
            const Icon = (Icons as any)[stat.iconName] || Icons.CheckCircle;
            const isDecimal = stat.number.includes('.');
            const value = parseFloat(stat.number);
            const suffix = stat.number.replace(/[0-9.]/g, '');

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="text-center text-primary-foreground group"
              >
                {/* Icon with pulse ring effect */}
                <motion.div 
                  className="relative inline-flex items-center justify-center w-16 h-16 mx-auto mb-4"
                  whileHover={{ scale: 1.1 }}
                >
                  {/* Background square */}
                  <div className="absolute inset-0 bg-accent/20 group-hover:bg-accent/30 transition-colors duration-300" />
                  {/* Icon */}
                  <Icon className="w-8 h-8 text-accent relative z-10" />
                  {/* Corner accent */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent" />
                </motion.div>
                
                {/* Number with reveal effect */}
                <div className="text-4xl md:text-5xl font-bold mb-2 font-display">
                  {isDecimal ? (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
                    >
                      {stat.number}
                    </motion.span>
                  ) : (
                    <Counter value={value} suffix={suffix} />
                  )}
                </div>
                
                {/* Label with underline */}
                <div className="relative inline-block">
                  <span className="text-sm text-primary-foreground/70 uppercase tracking-wider font-medium">
                    {stat.label}
                  </span>
                  <motion.span 
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent/50"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.5, duration: 0.4 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
