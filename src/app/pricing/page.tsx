"use client";

import { PricingPreview } from "@/components/sections/PricingPreview";
import { FAQSection } from "@/components/sections/FAQSection";
import { motion } from "framer-motion";

export default function PricingPage() {
  return (
    <main className="pt-32 pb-10 min-h-screen bg-background">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <section className="max-w-4xl mb-6 md:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 md:mb-8"
          >
            <span className="text-sm font-medium tracking-[0.1em] text-accent uppercase">
              Pricing
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-heading font-bold mb-6 md:mb-8 leading-[1.1] tracking-tight"
          >
            Straightforward pricing to help your business grow.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
          >
            No hidden fees, no complicated contracts. Just clear services and pricing designed to fit local businesses and growing brands.
          </motion.p>
        </section>
      </div>

      <div className="mt-[-40px] md:mt-[-80px]">
        {/* Reuse the Pricing component from the Home page but without the heavy padding at the top */}
        <PricingPreview />
      </div>

      <div className="mt-[-40px] md:mt-[-80px]">
        <FAQSection />
      </div>
      
    </main>
  );
}
