"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { WordReveal } from "@/components/ui/WordReveal";
import { LineReveal } from "@/components/ui/LineReveal";
import { RotatingText } from "@/components/ui/RotatingText";

export function WhatWeDo() {
  return (
    <section className="py-20 md:py-28 bg-muted relative border-t border-border/40">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-24">
          
          {/* Left Column: Heading & Copy */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
              hidden: {}
            }}
            className="flex flex-col max-w-2xl lg:sticky lg:top-40"
          >
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm font-medium tracking-[0.1em] text-accent uppercase mb-6 md:mb-8"
            >
              What We Do
            </motion.div>
            <WordReveal 
              text="We help businesses improve their online presence." 
              className="text-3xl md:text-5xl font-heading font-bold leading-[1.1] tracking-tight mb-6 md:mb-8 text-foreground" 
              delayOffset={0.2}
            />
            <LineReveal 
              text={"We manage your content, advertising, and digital\nmarketing so you can focus on running your business."} 
              className="text-base md:text-lg text-muted-foreground leading-relaxed font-sans max-w-xl mb-6" 
              delayOffset={0.5}
            />
          </motion.div>

          {/* Right Column: Editorial Image Composition */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="group relative w-full lg:w-1/2 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] bg-card rounded overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500"
          >
            <Image 
              src="/images/stratix_strategic_planning_1779964919486.png"
              alt="Strategic marketing investment"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-background/20 mix-blend-overlay group-hover:bg-background/10 transition-colors duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 border-t border-white/10 backdrop-blur-md bg-black/40 group-hover:bg-black/50 transition-colors duration-500">
              <span className="text-sm font-semibold tracking-[0.1em] text-white uppercase drop-shadow-sm">Strategic Growth</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
