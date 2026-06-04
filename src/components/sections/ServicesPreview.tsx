"use client";

import { motion } from "framer-motion";
import { ArrowRight, Share2, Target, PenTool, Search, MessageCircle, Magnet, MapPin, Layout, Cpu, Palette, AppWindow } from "lucide-react";
import Link from "next/link";

const buildServices = [
  {
    icon: Layout,
    name: "Website Development",
    desc: "Custom, high-performance websites that drive conversions.",
    href: "/start",
    ctaText: "Start Website Project"
  },
  {
    icon: AppWindow,
    name: "App Development",
    desc: "Premium iOS, Android, and Web applications tailored to your business.",
    href: "/start-app",
    ctaText: "Start App Project"
  },
  {
    icon: Cpu,
    name: "Business Automation",
    desc: "Streamline operations and save time with automated workflows."
  },
  {
    icon: Palette,
    name: "Graphic Design",
    desc: "Premium visual assets, branding, and creative direction."
  }
];

const growthSolutions = [
  {
    icon: Share2,
    name: "Social Media Marketing",
    desc: "Keep your brand active and engaging across all platforms."
  },
  {
    icon: Target,
    name: "Meta & Google Ads",
    desc: "Targeted advertising campaigns designed to maximize your ROI."
  },
  {
    icon: Search,
    name: "SEO",
    desc: "Improve your rankings to get discovered by active searchers."
  },
  {
    icon: Magnet,
    name: "Lead Generation",
    desc: "Structured campaigns focused on capturing high-quality leads."
  },
  {
    icon: PenTool,
    name: "Content Marketing",
    desc: "Professional graphics and copy that build trust."
  },
  {
    icon: MessageCircle,
    name: "WhatsApp Marketing",
    desc: "Automate conversations and broadcast updates directly."
  },
  {
    icon: MapPin,
    name: "Local Business Growth",
    desc: "Ensure your business is easily found by local customers."
  }
];

export function ServicesPreview() {
  return (
    <section className="py-20 md:py-28 bg-background relative border-t border-border/40 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 md:gap-8 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <h2 className="text-sm font-medium tracking-[0.1em] text-accent uppercase mb-4">Our Expertise</h2>
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold tracking-tight text-foreground leading-tight">
              Everything you need for a stronger digital presence.
            </h3>
          </div>
          <div className="pb-2">
            <Link 
              href="/services" 
              className="group flex items-center gap-2 text-sm font-bold text-accent hover:text-accent/80 transition-all uppercase tracking-wide"
            >
              View Full Details
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* SERVICES CATEGORY */}
        <div className="mb-20">
          <div className="mb-8 border-b border-border/40 pb-4">
            <h3 className="text-2xl font-heading font-bold text-foreground">Services</h3>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">Things we build and create for your business.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {buildServices.map((service, idx) => {
              const CardInner = (
                <>
                  <motion.div 
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    className="w-12 h-12 rounded-full bg-accent/5 border border-accent/20 flex items-center justify-center mb-5 group-hover:bg-accent/15 transition-colors"
                  >
                    <service.icon className="w-5 h-5 text-accent" />
                  </motion.div>
                  <h4 className="text-[17px] font-heading font-bold text-foreground mb-2 tracking-tight group-hover:text-accent transition-colors">
                    {service.name}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.desc}
                  </p>
                  {service.ctaText && (
                    <div className="mt-6 flex items-center gap-2 text-accent font-bold text-[13px] uppercase tracking-wide group-hover:text-accent/80 transition-colors">
                      {service.ctaText} <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </>
              );

              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full"
                >
                  {service.href ? (
                    <Link 
                      href={service.href}
                      className="block h-full group p-6 bg-card border border-border/50 rounded-lg hover:border-accent/50 hover:shadow-[0_8px_30px_rgba(204,255,0,0.08)] transition-colors"
                    >
                      {CardInner}
                    </Link>
                  ) : (
                    <div className="block h-full group p-6 bg-card border border-border/50 rounded-lg hover:border-accent/50 hover:shadow-[0_8px_30px_rgba(204,255,0,0.08)] transition-colors cursor-default">
                      {CardInner}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* GROWTH SOLUTIONS CATEGORY */}
        <div>
          <div className="mb-8 border-b border-border/40 pb-4">
            <h3 className="text-2xl font-heading font-bold text-foreground">Growth Solutions</h3>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">Activities and campaigns focused on customer acquisition and business growth.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {growthSolutions.map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group p-6 bg-card border border-border/50 rounded-lg hover:border-accent/50 hover:shadow-[0_8px_30px_rgba(204,255,0,0.08)] transition-colors cursor-default"
              >
                <motion.div 
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  className="w-12 h-12 rounded-full bg-accent/5 border border-accent/20 flex items-center justify-center mb-5 group-hover:bg-accent/15 transition-colors"
                >
                  <service.icon className="w-5 h-5 text-accent" />
                </motion.div>
                <h4 className="text-[17px] font-heading font-bold text-foreground mb-2 tracking-tight group-hover:text-accent transition-colors">
                  {service.name}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
