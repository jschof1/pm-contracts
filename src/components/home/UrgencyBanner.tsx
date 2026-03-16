import { motion } from 'framer-motion';
import { Clock, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

import { siteContent } from '@/data/content';

const UrgencyBanner = () => {
  const content = siteContent.home.urgency;
  const getTimeUntilEndOfMonth = () => {
    const now = new Date();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    const difference = endOfMonth.getTime() - now.getTime();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };
  const [timeLeft, setTimeLeft] = useState(getTimeUntilEndOfMonth);

  useEffect(() => {
    const calculateTimeLeft = () => {
      setTimeLeft(getTimeUntilEndOfMonth());
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

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
          
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs opacity-90">
              <Clock className="w-3 h-3" />
              <span>Ends in:</span>
            </div>
            
            <div className="flex items-center gap-1 font-mono font-bold text-xs">
              <span className="bg-primary/20 px-1.5 py-0.5 rounded">{timeLeft.days}d</span>
              <span className="opacity-60">:</span>
              <span className="bg-primary/20 px-1.5 py-0.5 rounded">{String(timeLeft.hours).padStart(2, '0')}h</span>
              <span className="opacity-60">:</span>
              <span className="bg-primary/20 px-1.5 py-0.5 rounded">{String(timeLeft.minutes).padStart(2, '0')}m</span>
            </div>
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
