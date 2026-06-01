"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FeatureGroupProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function FeatureGroup({ title, children, className }: FeatureGroupProps) {
  return (
    <div className={cn("mb-8 last:mb-0", className)}>
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4 pb-2 border-b border-border/50">
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {children}
      </div>
    </div>
  );
}
