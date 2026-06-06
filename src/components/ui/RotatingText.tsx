"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingTextProps {
  words: string[];
  interval?: number;
  className?: string;
}

export function RotatingText({ words, interval = 3000, className = "" }: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <div className={`relative inline-grid items-center overflow-hidden py-1 ${className}`} style={{ justifyItems: 'start' }}>
      <AnimatePresence mode="sync">
        <motion.span
          key={index}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="col-start-1 row-start-1 inline-block"
          style={{ willChange: "transform" }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
