"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";

const plans = [
  {
    name: "BASIC",
    price: "₹10,999",
    period: "/ mo",
    features: [
      "Social Media Page Setup (Insta, Facebook)",
      "8 Posts + 2 Reels/Month",
      "Meta Ads (Insta, Facebook) one time boost for every post",
      "Google Business (Maps) Setup",
      "Monthly Performance Report",
      "2 Strategy Calls/Month"
    ],
    recommended: false,
  },
  {
    name: "ADVANCED",
    price: "₹24,999",
    period: "/ mo",
    features: [
      "Social Media Page Setup (Insta, Facebook)",
      "12 Post + 8 reels/Month",
      "Meta Ads (Insta, Facebook) strategic boost for every post",
      "Google Business (Maps) Setup",
      "Weekly Performance Reports",
      "WhatsApp Marketing & Broadcasts",
      "2 Strategy Calls/Month"
    ],
    recommended: true,
  },
  {
    name: "PREMIUM",
    price: "₹39,999",
    period: "/ mo",
    features: [
      "Social Media Page Setup (Insta, Facebook)",
      "20 Posts + 12 Reels/Month",
      "Google Ads + Meta Ads Both (Insta, Facebook)",
      "SEO (Search Engine Optimisation )",
      "Weekly Performance Reports",
      "CRO based advertising",
      "Weekly Strategy Calls"
    ],
    recommended: false,
  }
];

export function PricingPreview() {
  return (
    <section className="py-20 md:py-28 bg-card relative border-t border-border/40">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <h2 className="text-sm font-medium tracking-[0.1em] text-accent uppercase mb-4 md:mb-6">Pricing Plans</h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-6 leading-[1.1] tracking-tight">
            Clear, transparent pricing.
          </h3>
        </div>

        {/* 7-Day Sprint Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto bg-primary border border-accent/30 rounded p-4 sm:p-6 mb-12 md:mb-20 text-center shadow-lg relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-accent/5 mix-blend-overlay" />
          <h4 className="text-lg sm:text-2xl md:text-3xl font-heading font-bold text-primary-foreground relative z-10">
            7-DAY SPRINT <span className="text-accent font-light mx-2">—</span> ₹2,999 ONLY !
          </h4>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, idx) => (
            <motion.div 
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -5, scale: plan.recommended ? 1.07 : 1.02 }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex flex-col p-6 sm:p-8 md:p-10 rounded transition-colors ${
                plan.recommended 
                  ? 'bg-primary border border-primary shadow-[0_8px_40px_rgba(204,255,0,0.15)] z-10' 
                  : 'bg-background border border-border/50 hover:border-accent/40 hover:shadow-[0_8px_30px_rgba(204,255,0,0.08)]'
              }`}
            >
              
              <div className="mb-6">
                <h4 className={`text-2xl font-heading font-bold mb-1 ${plan.recommended ? 'text-primary-foreground' : 'text-foreground'}`}>
                  {plan.name}
                </h4>
              </div>
              
              <div className={`mb-10 pb-8 border-b ${plan.recommended ? 'border-primary-foreground/20' : 'border-border/50'}`}>
                <div className="flex items-baseline">
                  <span className={`text-4xl font-heading font-bold tracking-tight ${plan.recommended ? 'text-primary-foreground' : 'text-foreground'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ml-1 font-medium ${plan.recommended ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                    {plan.period}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col gap-4 flex-1 mb-10">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check size={18} className={`shrink-0 mt-0.5 ${plan.recommended ? 'text-accent' : 'text-accent'}`} />
                    <span className={`text-[15px] leading-relaxed ${plan.recommended ? 'text-primary-foreground/90' : 'text-foreground/80'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="mt-auto"
              >
                <Link 
                  href="/contact"
                  className={`w-full py-4 rounded text-center font-bold transition-colors block ${
                    plan.recommended 
                      ? 'bg-accent text-accent-foreground hover:bg-accent/90' 
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
