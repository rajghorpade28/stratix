"use client";

import { motion } from "framer-motion";
import { Share2, Target, PenTool, Search, MessageCircle, Mail, Magnet, MapPin, Sparkles, BarChart3 } from "lucide-react";
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

export default function ServicesPage() {
  return (
    <main className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Header Section */}
        <section className="max-w-3xl mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-[1.1] tracking-tight text-foreground"
          >
            Everything you need for a stronger digital presence.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            We handle the operational marketing tasks that help your business look professional and attract more customers.
          </motion.p>
        </section>

        {/* Services Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="group p-8 bg-card border border-border/50 rounded-lg hover:border-accent/50 hover:shadow-[0_8px_30px_rgba(204,255,0,0.08)] transition-colors cursor-default flex flex-col h-full"
            >
              <motion.div 
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="w-14 h-14 rounded-full bg-accent/5 border border-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent/15 transition-colors"
              >
                <service.icon className="w-6 h-6 text-accent" />
              </motion.div>
              <h2 className="text-xl font-heading font-bold text-foreground mb-3 tracking-tight group-hover:text-accent transition-colors">
                {service.name}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <section className="py-20 border-t border-border/40 flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 tracking-tight text-foreground">Ready to invest in your visibility?</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
            Let's have a straightforward conversation about your business goals and see if our firm would be a good fit to help you grow.
          </p>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Link 
              href="/contact"
              className="bg-accent text-accent-foreground px-8 py-4 rounded font-bold text-[15px] shadow-sm inline-block"
            >
              Let's Talk
            </Link>
          </motion.div>
        </section>

      </div>
    </main>
  );
}
