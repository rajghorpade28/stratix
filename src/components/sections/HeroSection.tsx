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
      
      {/* Background Glowing Orbs for Depth */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px] mix-blend-multiply"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-accent/20 blur-[150px] mix-blend-multiply"
        />
      </div>

      {/* Background Image */}
      <motion.div 
        style={{ y: backgroundY, opacity: opacityFade }}
        className="absolute inset-0 z-0 opacity-[0.15] mix-blend-overlay"
      >
        <Image 
          src="/images/stratix_studio_workspace_1779964905457.png"
          alt="STRATIX Studio"
          fill
          className="object-cover object-center scale-105"
          priority
        />
      </motion.div>
      
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/80 via-background/95 to-background" />
      
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-6">
          
          {/* Left Column: Logo Target & Cat Mascot */}
          <div className="w-full sm:w-2/3 lg:w-[45%] flex flex-col items-center lg:items-start relative z-10 pointer-events-none mt-4 lg:mt-0">

            <motion.div 
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ 
                opacity: 1, 
                y: 0,
                filter: "blur(0px)"
              }}
              transition={{ 
                duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] 
              }}
              className="w-full relative aspect-square lg:aspect-auto lg:h-[420px] flex items-center justify-center lg:justify-start"
            >
              {/* Subtle Megaphone Projection Glow */}
              <motion.div 
                animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.95, 1.1, 0.95] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[40%] right-0 w-64 h-64 bg-accent/30 rounded-full blur-[80px] translate-x-1/4 -translate-y-1/2"
              />
              
              <Image 
                src="/images/cat_megaphone.png"
                alt="STRATIX Mascot"
                fill
                className="object-contain object-center lg:object-left-bottom scale-[1.1] origin-bottom-left drop-shadow-2xl"
                priority
              />
            </motion.div>
            
            <div
              id="hero-logo-target"
              className="absolute -bottom-16 left-0 h-[64px] md:h-[90px] lg:h-[120px] w-full flex items-center origin-left"
            />
          </div>

          {/* Right Column: Text & CTA */}
          <div className="w-full lg:w-[55%] flex flex-col justify-start relative z-20">

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.8rem] font-heading font-bold tracking-tight leading-[1.1] mb-8 text-foreground flex flex-wrap">
              {headlineWords.map((word, idx) => (
                <div key={idx} className="overflow-hidden inline-block mr-[0.25em]">
                  <motion.span
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.1 + (idx * 0.05),
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="inline-block"
                  >
                    {word === "visibility" ? (
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent italic font-serif font-medium drop-shadow-sm">{word}</span>
                    ) : (
                      word
                    )}
                  </motion.span>
                </div>
              ))}
            </h1>

            <div className="flex flex-col gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-md"
              >
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-sans font-medium">
                  We partner with local businesses and growing brands to reach more customers through premium advertising and content creation.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row justify-start gap-4 mt-4 pointer-events-auto"
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-500 group-hover:duration-200" />
                  <Link 
                    href="/start"
                    className="relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-md bg-foreground text-background px-8 py-4 transition-all font-semibold text-[15px] w-full sm:w-auto"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Want to Build a Website?
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        →
                      </motion.span>
                    </span>
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
