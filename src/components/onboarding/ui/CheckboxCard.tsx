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
        "relative w-full p-4 rounded-lg border-2 text-left transition-all flex items-center gap-3",
        selected 
          ? "border-primary bg-primary/5 shadow-sm" 
          : "border-border bg-card hover:border-primary/50",
        className
      )}
    >
      <div className={cn(
        "flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-md border transition-colors",
        selected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/40 bg-background"
      )}>
        {selected && <Check size={14} strokeWidth={3} />}
      </div>
      
      <span className={cn(
        "font-medium text-[15px] transition-colors leading-tight",
        selected ? "text-foreground" : "text-muted-foreground"
      )}>
        {label}
      </span>
    </motion.button>
  );
}
