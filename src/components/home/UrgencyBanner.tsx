import { motion } from 'framer-motion';
import { Clock, Sparkles } from 'lucide-react';

import { siteContent } from '@/data/content';

const UrgencyBanner = () => {
  const content = siteContent.home.urgency;

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="hidden md:block bg-accent text-accent-foreground py-1"
    >
      <div className="container-custom">
        <div className="flex items-center justify-center gap-4 md:gap-6 text-center">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            <span className="font-semibold text-xs md:text-sm">
              {content.offer}
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-2 text-xs opacity-90">
            <Clock className="w-3 h-3" />
            <span>Same-day guidance where possible</span>
          </div>
          
          <span className="hidden lg:inline-flex items-center gap-1 bg-primary/20 px-2 py-0.5 rounded-full text-xs font-semibold">
            <span className="w-1.5 h-1.5 bg-accent-foreground rounded-full animate-pulse" />
            {content.slotsLeft}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default UrgencyBanner;
