"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface RadioCardProps {
  title: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
  icon?: React.ReactNode;
}

export function RadioCard({ title, description, selected, onClick, className, icon }: RadioCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      type="button"
      className={cn(
        "relative w-full p-4 rounded-xl border-2 text-left transition-all overflow-hidden bg-card",
        selected 
          ? "border-primary bg-primary/5 shadow-[0_0_15px_rgba(var(--primary-color),0.1)]" 
          : "border-border hover:border-primary/50 hover:bg-accent/30",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          "mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full border transition-colors",
          selected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/30"
        )}>
          {selected && <Check size={12} strokeWidth={3} />}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {icon && <span className="text-primary">{icon}</span>}
            <h3 className={cn(
              "font-heading font-semibold text-base leading-tight transition-colors",
              selected ? "text-foreground" : "text-foreground/80"
            )}>
              {title}
            </h3>
          </div>
          {description && (
            <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </motion.button>
  );
}
