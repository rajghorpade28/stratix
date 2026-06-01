"use client";

import { motion } from "framer-motion";
import { ArrowRight, Share2, Target, PenTool, Search, MessageCircle, Mail, Magnet, MapPin, Sparkles, BarChart3 } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Share2,
    name: "Social Media Management",
    desc: "Keep your brand active and engaging across all platforms."
  },
  {
    icon: Target,
    name: "Meta Ads & Google Ads",
    desc: "Targeted advertising campaigns designed to maximize your ROI."
  },
  {
    icon: PenTool,
    name: "Content Creation",
    desc: "Professional graphics and copy that build trust."
  },
  {
    icon: Search,
    name: "Search Engine Optimisation",
    desc: "Improve your rankings to get discovered by active searchers."
  },
  {
    icon: MessageCircle,
    name: "WhatsApp Marketing (Chat Bot)",
    desc: "Automate conversations and broadcast updates directly."
  },
  {
    icon: Mail,
    name: "Email Marketing Automation",
    desc: "Nurture leads and retain customers with automated flows."
  },
  {
    icon: Magnet,
    name: "Lead Generation Campaign",
    desc: "Structured campaigns focused on capturing high-quality leads."
  },
  {
    icon: MapPin,
    name: "Google Business (Maps) Setup",
    desc: "Ensure your business is easily found by local customers."
  },
  {
    icon: Sparkles,
    name: "Brand Identity & Refresh",
    desc: "Modernize your visual identity to look premium and established."
  },
  {
    icon: BarChart3,
    name: "Weekly Analytic Report",
    desc: "Clear, simple reports so you always know your performance."
  }
];

export function ServicesPreview() {
  return (
    <section className="py-20 md:py-28 bg-background relative border-t border-border/40 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 md:gap-8 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <h2 className="text-sm font-medium tracking-[0.1em] text-accent uppercase mb-4">Our Services</h2>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, idx) => (
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
    </section>
  );
}
