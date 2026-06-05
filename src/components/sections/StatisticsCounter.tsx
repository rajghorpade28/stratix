"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

const stats = [
  { label: "Projects Delivered", value: 150, suffix: "+" },
  { label: "Client Satisfaction", value: 99, suffix: "%" },
  { label: "Active Services", value: 12, suffix: "" },
  { label: "Team Members", value: 25, suffix: "+" },
];

function Counter({ from, to, suffix }: { from: number; to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const springValue = useSpring(from, {
    stiffness: 50,
    damping: 20,
    duration: 2
  });
  
  const displayValue = useTransform(springValue, (current) => Math.round(current));

  useEffect(() => {
    if (inView) {
      springValue.set(to);
    }
  }, [inView, springValue, to]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
}

export function StatisticsCounter() {
  return (
    <section className="py-16 md:py-24 bg-accent text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50" />
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="flex flex-col items-center text-center space-y-2 group"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold flex items-center group-hover:scale-110 transition-transform duration-500">
                <Counter from={0} to={stat.value} suffix={stat.suffix} />
                <span>{stat.suffix}</span>
              </div>
              <div className="text-sm md:text-base font-medium uppercase tracking-widest text-primary-foreground/80">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
