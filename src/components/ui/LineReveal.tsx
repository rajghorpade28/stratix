"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

interface LineRevealProps {
  text: string;
  className?: string;
  delayOffset?: number;
}

export function LineReveal({ text, className = "", delayOffset = 0 }: LineRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Split by newlines or roughly by sentences if no newlines exist. 
  // For simplicity, we assume text provided has explicit \n for lines, 
  // or we split by sentence endings.
  const lines = text.split("\n").filter(line => line.trim().length > 0);

  return (
    <div ref={ref} className={`flex flex-col gap-1 ${className}`}>
      {lines.map((line, idx) => (
        <div key={idx} className="overflow-hidden">
          <motion.p
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{
              duration: 1.0,
              delay: delayOffset + idx * 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
          </motion.p>
        </div>
      ))}
    </div>
  );
}
