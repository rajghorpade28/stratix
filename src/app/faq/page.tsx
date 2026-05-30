"use client";

import { FAQSection } from "@/components/sections/FAQSection";
import { motion } from "framer-motion";

export default function FAQPage() {
  return (
    <main className="pt-32 pb-10 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <section className="max-w-4xl mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-heading font-bold mb-8 leading-[1.1]"
          >
            Clear answers for <span className="gradient-text">clear results.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-muted-foreground leading-relaxed max-w-2xl"
          >
            We believe in complete transparency. If you have a question about how we operate, price, or deliver, you&apos;ll likely find the answer below.
          </motion.p>
        </section>
      </div>

      <div className="mt-[-80px]">
        <FAQSection />
      </div>
    </main>
  );
}
