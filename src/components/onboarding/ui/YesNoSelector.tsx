"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface YesNoSelectorProps {
  id: string;
  value: boolean | null;
  onChange: (value: boolean) => void;
  className?: string;
}

export function YesNoSelector({ id, value, onChange, className }: YesNoSelectorProps) {
  return (
    <div className={cn("flex items-center gap-3 p-1 bg-accent/30 rounded-lg border border-border/50 w-full sm:w-auto", className)}>
      <button
        type="button"
        onClick={() => onChange(true)}
        className={cn(
          "relative flex-1 sm:flex-none sm:w-24 px-4 py-2 rounded-md font-medium text-sm transition-colors z-10",
          value === true ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        )}
      >
        {value === true && (
          <motion.div
            layoutId={`bg-yesno-${id}`}
            className="absolute inset-0 bg-primary rounded-md -z-10 shadow-sm"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        Yes
      </button>

      <button
        type="button"
        onClick={() => onChange(false)}
        className={cn(
          "relative flex-1 sm:flex-none sm:w-24 px-4 py-2 rounded-md font-medium text-sm transition-colors z-10",
          value === false ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        )}
      >
        {value === false && (
          <motion.div
            layoutId={`bg-yesno-${id}`}
            className="absolute inset-0 bg-primary rounded-md -z-10 shadow-sm"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        No
      </button>
    </div>
  );
}
