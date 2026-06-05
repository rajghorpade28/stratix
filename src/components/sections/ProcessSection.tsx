"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "1",
    title: "Discovery & Audit",
    shortTitle: "Discovery",
    description: "We dive deep into your business model, review your current online presence, and understand your ideal customer profile to find the gaps.",
    icon: "🔍"
  },
  {
    number: "2",
    title: "Strategic Planning",
    shortTitle: "Strategy",
    description: "We outline a precise roadmap tailored to your budget. This includes determining the best channels, content types, and growth strategies.",
    icon: "🗺️"
  },
  {
    number: "3",
    title: "Execution & Build",
    shortTitle: "Execution",
    description: "Our team gets to work. We set up your ad campaigns, design your digital assets, build your web platforms, and launch.",
    icon: "⚡"
  },
  {
    number: "4",
    title: "Monitor & Scale",
    shortTitle: "Scale",
    description: "We track the results daily. We optimize what's working, kill what isn't, and send you simple, transparent reports so you see exactly what's happening.",
    icon: "📈"
  }
];

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-20 md:py-32 bg-card relative border-t border-border/40 overflow-hidden">
      
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        
        <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-12 mb-20">
          <div className="max-w-2xl">
            <h2 className="text-sm font-medium tracking-[0.1em] text-accent uppercase mb-4">Client Journey</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-bold tracking-tight leading-[1.1] text-foreground">
              How we grow together.
            </h3>
          </div>
          <div className="max-w-md pb-2">
            <p className="text-lg text-muted-foreground leading-relaxed">
              A straightforward, transparent approach to improving your digital presence and managing your marketing investment.
            </p>
          </div>
        </div>

        {/* INTERACTIVE TIMELINE */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          
          {/* Timeline Selector */}
          <div className="w-full lg:w-1/3 relative">
            <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-border/50 hidden md:block" />
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    onMouseEnter={() => setActiveStep(idx)}
                    className="relative flex items-center gap-4 group text-left min-w-[160px] md:min-w-0 flex-shrink-0"
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm z-10 transition-all duration-500",
                      isActive 
                        ? "bg-accent text-primary-foreground shadow-[0_0_20px_rgba(94,43,151,0.3)] scale-110" 
                        : "bg-background border-2 border-border text-muted-foreground group-hover:border-accent/50"
                    )}>
                      {step.number}
                    </div>
                    <div className="flex flex-col">
                      <span className={cn(
                        "font-heading font-bold transition-colors duration-300",
                        isActive ? "text-foreground text-lg" : "text-muted-foreground text-base group-hover:text-foreground/80"
                      )}>
                        {step.shortTitle}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Content Area */}
          <div className="w-full lg:w-2/3 min-h-[250px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="bg-background border border-border/50 rounded-2xl p-8 md:p-12 shadow-sm"
              >
                <div className="text-4xl mb-6">{steps[activeStep].icon}</div>
                <h4 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                  {steps[activeStep].title}
                </h4>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {steps[activeStep].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
