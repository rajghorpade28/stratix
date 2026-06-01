"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, Clock, Zap, Star, Tag, Sparkles, Image as ImageIcon, Infinity } from "lucide-react";
import { cn } from "@/lib/utils";

const graphicPlans = [
  {
    name: "Basic Design",
    subtitle: "Single Order",
    price: "₹250",
    period: "per design",
    description: "Perfect for one-off creative needs.",
    idealFor: ["Flyer Design", "Logo Design", "Forms", "Visiting Card Design", "Posters", "Invitation Cards", "Certificates", "ID Cards", "Report Cards", "File Design", "Book Covers", "Social Media Creatives"],
    features: [
      "Content & Tagline Assistance",
      "Necessary Images Included",
      "1 Free Revision",
    ],
    delivery: "1 Day Delivery",
    isPopular: false,
    badge: null,
    href: "/contact"
  },
  {
    name: "Festival Design",
    subtitle: "Package",
    price: "₹200",
    period: "per design",
    description: "Celebrate with branded festival graphics.",
    features: [
      "Festival Social Media Posts",
      "Promotional Graphics",
      "Offer Creatives",
      "Content & Tagline Assistance",
      "1 Free Revision",
    ],
    delivery: "1 Day Delivery",
    isPopular: false,
    badge: null,
    href: "/contact"
  },
  {
    name: "Monthly Subscription",
    subtitle: "Graphics",
    price: "₹1,500",
    period: "per month",
    description: "Consistent branding all month long.",
    features: [
      "10 Graphic Designs Per Month",
      "Content & Tagline Support",
      "Necessary Images Included",
      "Unlimited Revisions",
    ],
    highlightFeature: "Effective Cost ₹150 per Design",
    delivery: "1 Day Delivery Per Design",
    isPopular: true,
    badge: "MOST POPULAR",
    href: "/contact"
  },
  {
    name: "Referral Subscription",
    subtitle: "Offer",
    price: "₹1,000",
    period: "per month",
    description: "Exclusive rate for referred clients.",
    features: [
      "10 Graphic Designs Per Month",
      "Content & Tagline Support",
      "Necessary Images Included",
      "Unlimited Revisions",
    ],
    highlightFeature: "Effective Cost ₹100 per Design",
    delivery: "1 Day Delivery Per Design",
    isPopular: false,
    badge: "Available After Referral",
    badgeColor: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    href: "/contact"
  }
];

const bannerPlans = [
  {
    name: "Banner Design",
    subtitle: "Single Order",
    price: "₹400",
    period: "per banner",
    description: "High-impact banners for any platform.",
    features: [
      "Content & Tagline Assistance",
      "Unlimited Revisions",
    ],
    delivery: "2 Day Delivery",
    isPopular: false,
    badge: null,
    href: "/contact"
  },
  {
    name: "Festival Banner",
    subtitle: "Design",
    price: "₹350",
    period: "per banner",
    description: "Specialized banners for festive promotions.",
    features: [
      "Content & Tagline Assistance",
      "Unlimited Revisions",
    ],
    delivery: "2 Day Delivery",
    isPopular: false,
    badge: null,
    href: "/contact"
  },
  {
    name: "Monthly Subscription",
    subtitle: "Banner",
    price: "₹1,750",
    period: "per 2 months",
    description: "Consistent high-quality banner production.",
    features: [
      "5 Banner Designs",
      "1 Free Banner Included",
      "Unlimited Revisions",
    ],
    highlightFeature: "Effective Cost ₹350 Per Banner",
    delivery: "2 Day Delivery",
    isPopular: true,
    badge: "MOST POPULAR",
    href: "/contact"
  },
  {
    name: "Referral Subscription",
    subtitle: "Banner",
    price: "₹1,500",
    period: "per 2 months",
    description: "Exclusive banner rate for referred clients.",
    features: [
      "5 Banner Designs",
      "1 Free Banner Included",
      "Unlimited Revisions",
    ],
    highlightFeature: "Effective Cost ₹300 Per Banner",
    delivery: "2 Day Delivery",
    isPopular: false,
    badge: "Available After Referral",
    badgeColor: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    href: "/contact"
  }
];

export function GraphicsPricing() {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        
        {/* GRAPHICS DESIGN SECTION */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-6 border border-accent/20"
            >
              <ImageIcon size={16} />
              <span>Category 01</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4"
            >
              Graphics Design
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Professional graphics for social media, print, and branding.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {graphicPlans.map((plan, idx) => (
              <PricingCard key={plan.name} plan={plan} index={idx} />
            ))}
          </div>
        </div>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent mb-24" />

        {/* BANNER DESIGN SECTION */}
        <div>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6 border border-primary/20"
            >
              <Sparkles size={16} />
              <span>Category 02</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4"
            >
              Banner Design
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              High-impact banners to capture attention instantly.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bannerPlans.map((plan, idx) => (
              <PricingCard key={plan.name} plan={plan} index={idx} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function PricingCard({ plan, index }: { plan: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "relative flex flex-col h-full bg-card rounded-2xl border p-6 transition-all duration-300 group overflow-hidden",
        plan.isPopular 
          ? "border-accent shadow-[0_0_30px_rgba(204,255,0,0.1)] hover:shadow-[0_0_40px_rgba(204,255,0,0.2)]" 
          : "border-border/60 hover:border-accent/50 hover:bg-card/80"
      )}
    >
      {plan.isPopular && (
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-accent/50 via-accent to-accent/50" />
      )}
      
      {plan.badge && (
        <div className="mb-4">
          <span className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border",
            plan.badgeColor || "bg-accent/10 text-accent border-accent/20"
          )}>
            {plan.isPopular ? <Star size={12} className="fill-accent text-accent" /> : <Tag size={12} />}
            {plan.badge}
          </span>
        </div>
      )}

      <div className={cn("mb-6", !plan.badge && "mt-2")}>
        <h3 className="text-xl font-heading font-bold text-foreground">{plan.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{plan.subtitle}</p>
      </div>

      <div className="mb-6 flex items-baseline gap-1.5">
        <span className="text-4xl font-heading font-bold text-foreground">{plan.price}</span>
        <span className="text-sm text-muted-foreground font-medium">{plan.period}</span>
      </div>

      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        {plan.description}
      </p>

      {plan.delivery && (
        <div className="flex items-center gap-2 mb-6 px-3 py-2 bg-background/50 rounded-lg border border-border/50">
          <Clock size={16} className="text-primary" />
          <span className="text-sm font-semibold">{plan.delivery}</span>
        </div>
      )}

      <div className="flex-1 space-y-6">
        {plan.highlightFeature && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/5 border border-accent/20">
            <Zap size={16} className="text-accent flex-shrink-0" />
            <span className="text-sm font-bold text-accent leading-tight">{plan.highlightFeature}</span>
          </div>
        )}

        {plan.idealFor && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Suitable For:</h4>
            <div className="flex flex-wrap gap-2">
              {plan.idealFor.slice(0, 5).map((item: string, i: number) => (
                <span key={i} className="text-[11px] font-medium bg-secondary/50 text-secondary-foreground px-2 py-1 rounded-md">
                  {item}
                </span>
              ))}
              {plan.idealFor.length > 5 && (
                <span className="text-[11px] font-medium bg-background text-muted-foreground px-2 py-1 rounded-md border border-border">
                  +{plan.idealFor.length - 5} more
                </span>
              )}
            </div>
          </div>
        )}

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Includes:</h4>
          <ul className="space-y-3">
            {plan.features.map((feature: string, i: number) => {
              const isUnlimited = feature.toLowerCase().includes("unlimited");
              return (
                <li key={i} className="flex items-start gap-3">
                  {isUnlimited ? (
                    <Infinity size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  )}
                  <span className={cn("text-sm leading-tight", isUnlimited && "font-semibold text-foreground")}>
                    {feature}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border/50">
        <Link 
          href={plan.href}
          className={cn(
            "flex items-center justify-center w-full py-3.5 rounded-lg font-bold transition-all shadow-sm",
            plan.isPopular
              ? "bg-accent text-accent-foreground hover:bg-accent/90"
              : "bg-transparent border-2 border-primary text-primary hover:bg-primary/10"
          )}
        >
          {plan.isPopular ? "Order Design" : "Discuss Requirement"}
        </Link>
      </div>
    </motion.div>
  );
}
