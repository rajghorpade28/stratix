"use client";

import { motion } from "framer-motion";

interface QuoteSeparatorProps {
  quote: string;
}

export function QuoteSeparator({ quote }: QuoteSeparatorProps) {
  return (
    <section className="py-24 bg-background relative flex justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto text-center relative"
      >
        <div className="absolute left-1/2 -top-10 -translate-x-1/2 w-px h-8 bg-accent/40" />
        
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif italic font-light text-foreground leading-tight">
          "{quote}"
        </h3>
        
        <div className="absolute left-1/2 -bottom-10 -translate-x-1/2 w-px h-8 bg-accent/40" />
      </motion.div>
    </section>
  );
}
