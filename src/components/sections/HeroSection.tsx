"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-16 overflow-hidden bg-background">
      
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
          
          <motion.div
            initial={{ scale: 12, opacity: 0, y: "15vh", filter: "blur(12px)" }}
            animate={{ scale: 1, opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 flex items-center gap-4 origin-left transform-gpu"
          >
            <div className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-90" />
              <div className="absolute inset-[3px] bg-background rounded-lg z-10 flex items-center justify-center">
                <span className="font-heading font-bold text-2xl sm:text-3xl leading-none bg-clip-text text-transparent bg-gradient-to-br from-white to-white/50">S</span>
              </div>
            </div>
            <span className="font-heading font-bold text-3xl sm:text-4xl tracking-[0.25em] text-foreground drop-shadow-lg">STRATIX</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10"
          >
            <span className="text-sm font-medium tracking-[0.1em] text-accent uppercase">
              Digital Marketing Partner
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-[6.5rem] font-heading font-bold tracking-tight leading-[1] mb-10 text-foreground"
          >
            We help your business get more <span className="text-accent italic font-serif font-medium">visibility</span> and leads online.
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.7 }}
              className="max-w-md"
            >
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-sans">
                We partner with local businesses and growing brands to reach more customers through advertising and content creation.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.9 }}
              className="flex justify-start md:justify-end"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Link 
                  href="/contact"
                  className="group relative inline-flex items-center gap-4 overflow-hidden rounded-md bg-accent text-accent-foreground px-8 py-4 transition-all shadow-md font-semibold text-[15px]"
                >
                  <span className="relative z-10">Let's Talk</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
                </Link>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
      
    </section>
  );
}
