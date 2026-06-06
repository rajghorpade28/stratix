"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { MagneticButton } from "@/components/ui/MagneticButton";

const headlineWords = "Future-Proof Your Brand".split(" ");

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200px"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={containerRef} className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden bg-background">
      
      {/* Deep Atmospheric Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], rotate: [0, 90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] rounded-full bg-primary/20 mix-blend-screen filter blur-[150px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2], rotate: [0, -90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[30%] -right-[20%] w-[900px] h-[900px] rounded-full bg-[#06B6D4]/10 mix-blend-screen filter blur-[180px]"
        />
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-[20%] w-[600px] h-[400px] rounded-full bg-accent/20 mix-blend-screen filter blur-[150px]"
        />
      </div>

      {/* Massive Background Typography Mask */}
      <motion.div 
        style={{ y: textY, opacity: opacityFade }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden select-none"
      >
        <h1 className="text-[25vw] font-heading font-black text-transparent whitespace-nowrap opacity-5"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>
          STRATIX
        </h1>
      </motion.div>

      {/* Central Content */}
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10 flex flex-col items-center text-center mt-12">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 relative"
        >
          <div className="absolute inset-0 bg-accent/40 blur-3xl rounded-full" />
          <Image 
            src="/images/cat_megaphone.png"
            alt="STRATIX Mascot"
            width={180}
            height={180}
            className="relative z-10 drop-shadow-[0_0_30px_rgba(217,70,239,0.4)]"
            priority
          />
        </motion.div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-heading font-black tracking-tighter leading-[1.05] mb-8 text-foreground max-w-5xl">
          {headlineWords.map((word, idx) => (
            <div key={idx} className="overflow-hidden inline-block mr-[0.25em]">
              <motion.span
                initial={{ y: "120%", rotateZ: 5, opacity: 0 }}
                animate={{ y: "0%", rotateZ: 0, opacity: 1 }}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.2 + (idx * 0.1),
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="inline-block"
              >
                {word === "Brand" ? (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-[#06B6D4] italic font-serif font-medium drop-shadow-lg">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            </div>
          ))}
        </h1>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto mb-12"
        >
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-sans font-light tracking-wide">
            We partner with elite businesses to engineer high-performance digital experiences, immersive branding, and scalable growth systems.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto"
        >
          <MagneticButton>
            <Link 
              href="/start"
              className="group relative flex items-center justify-center gap-4 px-10 py-5 rounded-full bg-foreground text-background font-bold text-[16px] uppercase tracking-widest overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-[#06B6D4] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Launch Project</span>
              <motion.span
                className="relative z-10 group-hover:text-white"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </Link>
          </MagneticButton>
        </motion.div>
      </div>
      
      {/* Subtle overlay noise or texture could go here */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.015] mix-blend-overlay bg-[url('/noise.png')]"></div>
    </section>
  );
}
