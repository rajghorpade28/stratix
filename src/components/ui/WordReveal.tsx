"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

interface WordRevealProps {
  text: string;
  className?: string;
  delayOffset?: number;
}

export function WordReveal({ text, className = "", delayOffset = 0 }: WordRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const words = text.split(" ");

  return (
    <div ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, idx) => (
        <span key={idx} className="overflow-hidden inline-block mr-[0.25em] pb-2">
          <motion.span
            initial={{ y: "120%", opacity: 0, rotateZ: 5 }}
            animate={isInView ? { y: "0%", opacity: 1, rotateZ: 0 } : { y: "120%", opacity: 0, rotateZ: 5 }}
            transition={{
              duration: 0.8,
              delay: delayOffset + idx * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block origin-bottom-left"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
