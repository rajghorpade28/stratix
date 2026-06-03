"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const headlineWords = "We help your business get more visibility and leads online.".split(" ");

export function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex flex-col justify-center pt-[120px] sm:pt-[150px] md:pt-[180px] pb-16 overflow-hidden bg-background">
      
      {/* Background Image */}
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
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-12">
          
          {/* Left Column: Cat Mascot */}
          <motion.div 
            initial={{ opacity: 0, x: -50, rotate: 5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full sm:w-2/3 lg:w-[45%] relative aspect-square lg:aspect-auto lg:h-[600px] flex items-center justify-center lg:justify-start mt-4 lg:mt-0 z-10 pointer-events-none"
          >
            {/* Subtle Megaphone Projection Glow */}
            <motion.div 
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[40%] right-0 w-64 h-64 bg-accent/20 rounded-full blur-[70px] translate-x-1/4 -translate-y-1/2"
            />
            
            <Image 
              src="/images/cat_megaphone.png"
              alt="STRATIX Mascot"
              fill
              className="object-contain object-center lg:object-left-bottom scale-[1.1] origin-bottom-left"
              priority
            />
          </motion.div>

          {/* Right Column: Text & CTA */}
          <div className="w-full lg:w-[55%] flex flex-col justify-start relative z-20">
            
            <div
              id="hero-logo-target"
              className="mb-4 md:mb-6 h-[76px] md:h-[126px] lg:h-[180px] w-full flex items-center origin-left"
            />

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-heading font-bold tracking-tight leading-[1.05] mb-8 text-foreground flex flex-wrap">
              {headlineWords.map((word, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, x: -30, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.7, 
                    delay: 0.3 + (idx * 0.08), 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="inline-block mr-[0.25em]"
                >
                  {word === "visibility" ? (
                    <span className="text-accent italic font-serif font-medium">{word}</span>
                  ) : (
                    word
                  )}
                </motion.span>
              ))}
            </h1>

            <div className="flex flex-col gap-8">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="max-w-md"
              >
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-sans">
                  We partner with local businesses and growing brands to reach more customers through advertising and content creation.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.0 }}
                className="flex flex-col sm:flex-row justify-start gap-4"
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
      </div>
      
    </section>
  );
}
