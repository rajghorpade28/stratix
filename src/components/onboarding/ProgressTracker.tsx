"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressTrackerProps {
  currentStep: number;
  totalSteps: number;
  stepName: string;
}

export function ProgressTracker({ currentStep, totalSteps, stepName }: ProgressTrackerProps) {
  const progressPercentage = Math.round(((currentStep - 1) / totalSteps) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto mb-8 md:mb-12 relative z-10">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent uppercase tracking-widest">
            Step {currentStep} <span className="text-muted-foreground/40 font-medium">/ {totalSteps}</span>
          </span>
          <span className="text-accent/30">•</span>
          <span className="text-sm font-semibold text-foreground tracking-wide">
            {stepName}
          </span>
        </div>
        <div className="text-sm font-bold text-foreground">
          {progressPercentage}%
        </div>
      </div>
      
      <div className="relative h-2 w-full bg-border/50 rounded-full overflow-hidden flex gap-1 shadow-inner">
        {Array.from({ length: totalSteps }).map((_, i) => {
          const isActive = i === currentStep - 1;
          const isCompleted = i < currentStep - 1;
          
          return (
            <div key={i} className="h-full flex-1 relative rounded-full overflow-hidden bg-background/20">
              {(isCompleted || isActive) && (
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: isActive ? 0.2 : 0 }}
                  className={cn(
                    "absolute inset-0 rounded-full",
                    isCompleted ? "bg-primary/40" : "bg-gradient-to-r from-primary to-accent shadow-[0_0_10px_rgba(124,58,237,0.5)]"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
