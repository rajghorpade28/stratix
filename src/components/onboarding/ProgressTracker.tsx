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
    <div className="w-full max-w-3xl mx-auto mb-8 md:mb-12">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-muted-foreground/40">•</span>
          <span className="text-sm font-medium text-foreground">
            {stepName}
          </span>
        </div>
        <div className="text-sm font-bold text-muted-foreground">
          {progressPercentage}%
        </div>
      </div>
      
      <div className="h-1.5 w-full bg-accent/30 rounded-full overflow-hidden flex gap-1">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className="h-full flex-1 relative rounded-full overflow-hidden bg-background/50">
            {i < currentStep && (
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i === currentStep - 1 ? 0.2 : 0 }}
                className={cn(
                  "absolute inset-0 rounded-full",
                  i === currentStep - 1 ? "bg-primary" : "bg-primary/50"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
