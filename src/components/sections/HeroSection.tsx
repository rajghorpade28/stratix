"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex flex-col justify-start pt-[180px] sm:pt-[240px] md:pt-[280px] pb-16 overflow-hidden bg-background">
      
      {/* Background Image - Warmer, slightly more visible */}
      <div className="absolute inset-0 z-0 opacity-[0.25] mix-blend-overlay">
        <Image 
          src="/images/stratix_studio_workspace_1779964905457.png"
          alt="STRATIX Studio"
          fill
          className="object-cover object-center scale-105"
          priority
        />
      </div>
      
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/90 via-background/95 to-background" />
      
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="max-w-5xl">
          


          <div
            id="hero-logo-target"
            className="mb-8 md:mb-12 h-[76px] md:h-[126px] lg:h-[180px] w-full flex items-center"
          />

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-heading font-bold tracking-tight leading-[1] mb-8 text-foreground"
          >
            We help your business get more <span className="text-accent italic font-serif font-medium">visibility</span> and leads online.
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="max-w-md"
            >
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-sans">
                We partner with local businesses and growing brands to reach more customers through advertising and content creation.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col sm:flex-row justify-start md:justify-end gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Link 
                  href="/start"
                  className="group relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-md bg-accent text-accent-foreground px-8 py-4 transition-all shadow-md font-semibold text-[15px] w-full sm:w-auto"
                >
                  <span className="relative z-10">Want to Build a Website?</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Link 
                  href="/contact"
                  className="group relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-md bg-transparent border border-border/50 text-foreground px-8 py-4 transition-all hover:bg-accent/10 font-semibold text-[15px] w-full sm:w-auto"
                >
                  <span className="relative z-10">Let's Talk</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
      
    </section>
  );
}
