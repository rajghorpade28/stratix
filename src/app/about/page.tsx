"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Header Section */}
        <section className="max-w-3xl mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl font-heading font-bold mb-8 leading-[1.1] tracking-tight text-foreground"
          >
            We help businesses grow online.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl text-muted-foreground leading-relaxed"
          >
            
          </motion.p>
        </section>

        {/* Studio Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full aspect-[21/9] relative bg-card rounded mb-32 overflow-hidden shadow-lg border border-border/50"
        >
          <Image 
            src="/images/stratix_studio_workspace_1779964905457.png" 
            alt="Our workspace" 
            fill 
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
          />
        </motion.div>
        
        {/* Who/What/Who Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          <div className="flex flex-col pt-8 border-t border-border/50">
            <h2 className="text-sm font-bold tracking-[0.1em] text-accent uppercase mb-4">Who we are</h2>
            <p className="text-muted-foreground leading-relaxed">
              We are a dedicated marketing team based in Mumbai and Thane, committed to honest work and transparent reporting.
            </p>
          </div>

          <div className="flex flex-col pt-8 border-t border-border/50">
            <h2 className="text-sm font-bold tracking-[0.1em] text-accent uppercase mb-4">What we do</h2>
            <p className="text-muted-foreground leading-relaxed">
              We manage your social media, run high-performing ads, and automate your lead generation so you can focus on running your business.
            </p>
          </div>

          <div className="flex flex-col pt-8 border-t border-border/50">
            <h2 className="text-sm font-bold tracking-[0.1em] text-accent uppercase mb-4">Who we help</h2>
            <p className="text-muted-foreground leading-relaxed">
              We partner with local businesses, growing brands, and service providers who want a reliable team to handle their digital presence.
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}
