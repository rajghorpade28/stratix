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
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      type="button"
      className={cn(
        "relative w-full p-5 rounded-2xl text-left transition-all duration-300 overflow-hidden",
        selected 
          ? "glass shadow-[0_0_30px_rgba(217,70,239,0.2)] ring-2 ring-accent" 
          : "bg-white/50 backdrop-blur-md border border-black/5 hover:border-accent/40 hover:bg-white/80 shadow-sm",
        className
      )}
    >
      {selected && (
        <motion.div
          layoutId="radio-card-active-bg"
          className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      <div className="relative z-10 flex items-start gap-4">
        <div className={cn(
          "mt-0.5 flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-300",
          selected ? "border-accent bg-accent text-primary-foreground shadow-[0_0_15px_rgba(217,70,239,0.5)] scale-110" : "border-black/10 bg-white"
        )}>
          {selected && <Check size={14} strokeWidth={3} className="animate-in zoom-in duration-200" />}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-3">
            {icon && <span className={cn("transition-colors", selected ? "text-accent" : "text-muted-foreground")}>{icon}</span>}
            <h3 className={cn(
              "font-heading font-bold text-[1.05rem] leading-tight transition-colors",
              selected ? "text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-[#06B6D4]" : "text-foreground/90"
            )}>
              {title}
            </h3>
          </div>
          {description && (
            <p className={cn(
              "mt-2 text-[13.5px] leading-relaxed transition-colors",
              selected ? "text-foreground/80" : "text-muted-foreground"
            )}>
              {description}
            </p>
          )}
        </div>
      </div>
    </motion.button>
  );
}
