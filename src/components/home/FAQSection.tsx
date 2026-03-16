import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from 'react-router-dom';
import { ArrowRight, HelpCircle } from 'lucide-react';

import { siteContent } from '@/data/content';

const FAQSection = () => {
  const content = siteContent.home.faq;
  
  return (
    <section className="section-padding bg-secondary/50 relative overflow-hidden">
      {/* Decorative corners */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l-4 border-t-4 theme-corner-tl border-primary/20" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r-4 border-b-4 theme-corner-br border-primary/20" />
      
      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-4 md:gap-8 lg:gap-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="label-solid inline-flex items-center gap-2 text-xs md:text-sm font-bold tracking-wider uppercase mb-0.5 md:mb-4 px-2 py-1">
              <HelpCircle className="w-3.5 h-3.5" />
              {content.kicker}
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary mt-2 md:mt-6 mb-6">
              <span className="block">{content.title.split(' ').slice(0, -1).join(' ')}</span>
              <span className="relative inline-block">
                {content.title.split(' ').slice(-1)}
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary" />
              </span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-2 md:mb-8">
              {content.description}
            </p>
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 mt-1 md:mt-0 text-primary font-semibold hover:gap-3 transition-all link-underline"
            >
              {content.viewAll}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {content.items.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="surface-panel border-l-primary px-6 data-[state=open]:shadow-sharp transition-all"
                >
                  <AccordionTrigger className="text-left font-semibold text-primary hover:text-primary/80 py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
