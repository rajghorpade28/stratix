"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const playbooks = [
  {
    title: "The Acquisition Engine",
    focus: "Paid Media Architecture",
    description: "Our approach to paid acquisition relies on isolating variables. We don't guess what works; we test creative concepts, angles, and audience segments systematically. Once a winning combination is found, we scale aggressively using account consolidation and algorithmic bidding.",
    steps: [
      "Broad Audience Testing with High-Intent Creative",
      "Dynamic Product Ad (DPA) Retargeting",
      "Lookalike Expansion & Scale"
    ]
  },
  {
    title: "Visual Authority",
    focus: "Creative & Brand Direction",
    description: "In highly competitive markets, the brand with the highest perceived value wins. We build visual identities and ad creatives that immediately signal premium quality, creating pricing elasticity and driving higher conversion rates.",
    steps: [
      "Brand Archetype & Positioning Definition",
      "High-Fidelity Studio Production",
      "Native Social Content Creation"
    ]
  },
  {
    title: "The Retention Loop",
    focus: "Automation & Backend Funnels",
    description: "Acquiring a customer is expensive; losing them is a tragedy. We engineer automated communication flows across Email and WhatsApp to turn single-purchasers into loyal advocates and significantly increase Lifetime Value (LTV).",
    steps: [
      "Psychological Cart Recovery Sequences",
      "Post-Purchase Nurture & Education",
      "VIP Segmentation & Replenishment Flows"
    ]
  }
];

export default function ApproachPage() {
  return (
    <main className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <section className="max-w-5xl mb-12 md:mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-7xl lg:text-[5.5rem] font-heading font-bold mb-6 md:mb-8 leading-[0.95] tracking-tighter"
          >
            How we engineer <br className="hidden md:block"/>predictable growth.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mb-8 md:mb-12"
          >
            We rely on proven strategic playbooks rather than guesswork. Here is the exact methodology we deploy to scale modern digital brands.
          </motion.p>
        </section>

        {/* Cinematic Image Break */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-[30vh] sm:h-[40vh] md:h-[50vh] relative mb-16 md:mb-32 editorial-panel overflow-hidden"
        >
          <Image 
            src="/images/stratix_strategic_planning_1779964919486.png"
            alt="Strategic Planning"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-background/20" />
        </motion.div>

        {/* Playbooks */}
        <div className="flex flex-col gap-16 md:gap-32 mb-16 md:mb-32">
          {playbooks.map((playbook, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 editorial-panel p-6 sm:p-10 md:p-16 relative"
            >
              <div className="lg:col-span-5 flex flex-col relative z-10">
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase border-b border-white/10 pb-1">{playbook.focus}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4 md:mb-6 tracking-tight">{playbook.title}</h2>
              </div>

              <div className="lg:col-span-7 flex flex-col gap-8 md:gap-12 relative z-10">
                <p className="text-muted-foreground leading-relaxed text-base md:text-xl">
                  {playbook.description}
                </p>
                
                <div className="bg-card/20 p-5 sm:p-8 border border-white/5">
                  <h3 className="text-xs font-semibold tracking-[0.2em] text-foreground uppercase mb-4 md:mb-6">Core Methodology</h3>
                  <ul className="flex flex-col gap-4 md:gap-6">
                    {playbook.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="text-xs font-semibold tracking-widest text-muted-foreground mt-1">0{i+1}.</span>
                        <span className="text-foreground text-sm sm:text-base">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-12 md:pt-16 border-t border-white/5">
          <h3 className="text-2xl md:text-5xl font-heading font-bold mb-6 md:mb-8 tracking-tighter">Ready to deploy these systems?</h3>
          <Button size="lg" asChild className="h-14 px-10 text-sm font-medium rounded-none bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </div>

      </div>
    </main>
  );
}
