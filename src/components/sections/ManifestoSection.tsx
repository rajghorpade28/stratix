"use client";

import { motion } from "framer-motion";

const manifestoPoints = [
  {
    title: "Honest Work",
    description: "We don't make promises we can't keep. We believe in realistic goals and steady, sustainable business growth over overnight success."
  },
  {
    title: "Clear Reporting",
    description: "Marketing shouldn't be a mystery. You will always know exactly what we are doing, where your money is going, and what results are coming in."
  },
  {
    title: "Long-term Partnerships",
    description: "We aren't looking for quick wins. We want to be the team you trust year after year as your business continues to expand and evolve."
  },
  {
    title: "Quality Presentation",
    description: "Your brand is your reputation. We ensure every ad, photo, and website we create makes your business look professional and trustworthy."
  }
];

export function ManifestoSection() {
  return (
    <section className="py-20 md:py-28 bg-background relative border-t border-border/40">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
          <div className="max-w-3xl">
            <h2 className="text-sm font-medium tracking-[0.1em] text-accent uppercase mb-4">Our Values</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-bold tracking-tight leading-[1.1]">
              Honest work, real results.
            </h3>
          </div>
          <div className="max-w-md pb-2">
            <p className="text-lg text-muted-foreground leading-relaxed">
              We partner with our clients based on transparency, clear communication, and consistent execution.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {manifestoPoints.map((point, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col pt-8 border-t border-border/50 hover:border-primary/50 transition-colors duration-500"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center font-bold text-sm group-hover:bg-accent group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300">
                  {idx + 1}
                </span>
                <h4 className="text-2xl font-heading font-bold text-foreground tracking-tight group-hover:text-accent transition-colors duration-300">{point.title}</h4>
              </div>
              <p className="text-muted-foreground leading-relaxed text-[15px] pl-12 group-hover:text-foreground/80 transition-colors duration-300">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
