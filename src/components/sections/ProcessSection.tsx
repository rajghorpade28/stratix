"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "1",
    title: "Understand your business",
    description: "We review your current online presence and understand your customers."
  },
  {
    number: "2",
    title: "Create a marketing plan",
    description: "We outline exactly what needs to be done based on your budget."
  },
  {
    number: "3",
    title: "Execute content and campaigns",
    description: "We set up your ads and create your content."
  },
  {
    number: "4",
    title: "Monitor performance and improve",
    description: "We track the results and send you simple reports on what's working."
  }
];

export function ProcessSection() {
  return (
    <section className="py-20 md:py-28 bg-card relative border-t border-border/40">
      
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        
        <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-12 mb-20">
          <div className="max-w-2xl">
            <h2 className="text-sm font-medium tracking-[0.1em] text-accent uppercase mb-4">Our Process</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-bold tracking-tight leading-[1.1] text-foreground">
              How we work.
            </h3>
          </div>
          <div className="max-w-md pb-2">
            <p className="text-lg text-muted-foreground leading-relaxed">
              A straightforward, four-step approach to improving your digital presence and managing your marketing investment.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-background border border-border/50 rounded-xl p-8 flex flex-col hover:border-accent/50 transition-colors shadow-sm"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center font-bold text-xl mb-8">
                {step.number}
              </div>
              <h4 className="text-xl font-heading font-bold text-foreground mb-4">{step.title}</h4>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
