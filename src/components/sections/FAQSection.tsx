"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long does it take to get started?",
    answer: "We like to move fast. After our first meeting to understand your business, we can usually have your new website updates or ad campaigns running within 7 to 10 days."
  },
  {
    question: "Do you create the ads and the website?",
    answer: "Yes. We handle both. We believe your ads and your website need to work together perfectly. We take care of designing the ads, writing the text, and updating your website so everything looks professional."
  },
  {
    question: "Will I know what is happening with my marketing?",
    answer: "Absolutely. We don't hide behind confusing reports. We send you a simple, easy-to-read summary every month that shows exactly how many people visited your site and how many new leads or sales you received."
  },
  {
    question: "Do I have to sign a long-term contract?",
    answer: "No. We offer flexible month-to-month plans. We want you to stay with us because you are seeing real results, not because you are locked into a contract."
  },
  {
    question: "What kinds of businesses do you work with?",
    answer: "We specialize in helping local businesses like salons, gyms, clinics, and restaurants, as well as growing e-commerce brands who want to improve their online presence and reach more customers."
  }
];

export function FAQSection() {
  return (
    <section className="py-20 md:py-28 bg-muted relative border-t border-border/40">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 max-w-7xl mx-auto">
          
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <h2 className="text-sm font-medium tracking-[0.1em] text-accent uppercase mb-4 md:mb-6">FAQ</h2>
              <h3 className="text-3xl md:text-5xl font-heading font-bold mb-6 md:mb-8 leading-tight tracking-tight text-foreground">
                Common questions.
              </h3>
              <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-sm leading-relaxed">
                Everything you need to know about working with us and how we can help your business.
              </p>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <Accordion className="w-full space-y-4">
              {faqs.map((faq, idx) => (
                <AccordionItem 
                  key={idx} 
                  value={`item-${idx}`} 
                  className="bg-card border border-border/50 rounded-xl px-6 data-open:border-primary/50 transition-colors duration-300 shadow-sm hover:shadow-md"
                >
                  <AccordionTrigger className="text-left font-heading text-lg md:text-xl font-bold hover:text-primary text-foreground transition-all duration-300 py-6 group hover:no-underline border-b-0">
                    <span className="flex-1">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-[15px] sm:text-[16px] leading-relaxed pb-6 pr-4 sm:pr-12 pt-0 mt-[-10px]">
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
}
