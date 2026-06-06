"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const headlineWords = "We help your business get more visibility and leads online.".split(" ");

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex flex-col justify-start pt-[140px] sm:pt-[160px] md:pt-[180px] pb-16 overflow-hidden bg-background">
      
      {/* Background Image */}
      <motion.div 
        style={{ y: backgroundY, opacity: opacityFade }}
        className="absolute inset-0 z-0 opacity-[0.25] mix-blend-overlay"
      >
        <Image 
          src="/images/stratix_studio_workspace_1779964905457.png"
          alt="STRATIX Studio"
          fill
          className="object-cover object-center scale-105"
          priority
        />
      </motion.div>
      
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/90 via-background/95 to-background" />
      
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-6">
          
          {/* Left Column: Logo Target & Cat Mascot */}
          <div className="w-full sm:w-2/3 lg:w-[45%] flex flex-col items-center lg:items-start relative z-10 pointer-events-none mt-4 lg:mt-0">

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0 
              }}
              transition={{ 
                duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] 
              }}
              className="w-full relative aspect-square lg:aspect-auto lg:h-[380px] flex items-center justify-center lg:justify-start"
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
            
            {/* Logo target positioned absolutely so it doesn't affect flex alignment of the cat */}
            <div
              id="hero-logo-target"
              className="absolute -bottom-16 left-0 h-[64px] md:h-[90px] lg:h-[120px] w-full flex items-center origin-left"
            />
          </div>

          {/* Right Column: Text & CTA */}
          <div className="w-full lg:w-[55%] flex flex-col justify-start relative z-20">

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-heading font-bold tracking-tight leading-[1.05] mb-8 text-foreground flex flex-wrap">
              {headlineWords.map((word, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.2 + (idx * 0.05)
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
                className="flex flex-col sm:flex-row justify-start gap-4 mt-2 pointer-events-auto"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    href="/start"
                    className="group relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-md bg-accent text-accent-foreground px-8 py-4 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-accent/30 font-semibold text-[15px] w-full sm:w-auto"
                  >
                    <span className="relative z-10">Want to Build a Website?</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 ease-out" />
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
