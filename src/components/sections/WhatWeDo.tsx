"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function WhatWeDo() {
  return (
    <section className="py-20 md:py-28 bg-background relative border-t border-border/40">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-24">
          
          {/* Left Column: Heading & Copy */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col max-w-2xl lg:sticky lg:top-40"
          >
            <h2 className="text-sm font-medium tracking-[0.1em] text-accent uppercase mb-6 md:mb-8">What We Do</h2>
            <h3 className="text-3xl md:text-5xl font-heading font-bold leading-[1.1] tracking-tight mb-6 md:mb-8 text-foreground">
              We help businesses improve their online presence.
            </h3>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-sans max-w-xl mb-6">
              We manage your content, advertising, and digital marketing so you can focus on running your business.
            </p>
          </motion.div>

          {/* Right Column: Editorial Image Composition */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full lg:w-1/2 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] bg-card rounded overflow-hidden shadow-md"
          >
            <Image 
              src="/images/stratix_strategic_planning_1779964919486.png"
              alt="Strategic marketing investment"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-background/20 mix-blend-overlay" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 border-t border-white/10 backdrop-blur-md bg-black/40">
              <span className="text-sm font-semibold tracking-[0.1em] text-white uppercase drop-shadow-sm">Strategic Growth</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
