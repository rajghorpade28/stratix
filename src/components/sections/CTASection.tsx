"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-primary border-t border-border/40">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto"
        >
          
          <h2 className="text-sm font-bold tracking-[0.1em] text-accent uppercase mb-6 md:mb-8">
            Let's Talk
          </h2>
          
          <h3 className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold mb-6 md:mb-8 tracking-tight text-primary-foreground leading-[1.1]">
            Ready to reach more customers?
          </h3>
          
          <p className="text-base md:text-xl text-primary-foreground/90 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            Let's discuss how we can help your business grow online.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Link 
                href="/contact"
                className="bg-accent text-accent-foreground px-8 py-4 rounded-md font-semibold text-[16px] hover:bg-accent/90 transition-colors shadow-sm flex items-center justify-center gap-3 w-full"
              >
                Contact Us Today
              </Link>
            </motion.div>
          </div>
          
        </motion.div>
      </div>
    </section>
  );
}
