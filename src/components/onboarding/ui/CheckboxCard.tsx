"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxCardProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

export function CheckboxCard({ label, selected, onClick, className }: CheckboxCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      type="button"
      className={cn(
        "relative w-full p-4 rounded-xl border-2 text-left transition-all duration-300 flex items-center gap-3 overflow-hidden",
        selected 
          ? "glass shadow-[0_0_20px_rgba(124,58,237,0.1)] ring-1 ring-accent" 
          : "bg-card/50 backdrop-blur-sm border-border/60 hover:border-accent/40 hover:bg-white/40",
        className
      )}
    >
      {selected && (
        <motion.div
          layoutId={`checkbox-bg-${label}`}
          className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      <div className={cn(
        "relative z-10 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-md border-2 transition-all duration-300",
        selected ? "border-accent bg-accent text-primary-foreground shadow-[0_0_10px_rgba(124,58,237,0.3)] scale-110" : "border-muted-foreground/30 bg-background/50"
      )}>
        {selected && <Check size={12} strokeWidth={3} className="animate-in zoom-in duration-200" />}
      </div>
      
      <span className={cn(
        "relative z-10 font-heading font-semibold text-[14px] transition-colors leading-tight",
        selected ? "text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent" : "text-foreground/80"
      )}>
        {label}
      </span>
    </motion.button>
  );
}
