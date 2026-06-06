"use client";
import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Share2, Target, PenTool, Search, MessageCircle, Magnet, MapPin, Layout, Cpu, Palette, AppWindow } from "lucide-react";
import Link from "next/link";
import { AuthGateModal } from "@/components/auth/AuthGateModal";

const allServices = [
  { icon: Layout, name: "Website Development", desc: "Custom, high-performance websites that drive conversions.", href: "/start", ctaText: "Start Website Project", color: "from-primary" },
  { icon: AppWindow, name: "App Development", desc: "Premium iOS, Android, and Web applications tailored to your business.", href: "/start-app", ctaText: "Start App Project", color: "from-accent" },
  { icon: Cpu, name: "Business Automation", desc: "Streamline operations and save time with automated workflows.", color: "from-[#06B6D4]" },
  { icon: Palette, name: "Graphic Design", desc: "Premium visual assets, branding, and creative direction.", href: "/graphics", ctaText: "View Pricing", color: "from-pink-500" },
  { icon: Target, name: "Growth Marketing", desc: "Targeted advertising and SEO designed to maximize your ROI.", color: "from-orange-500" },
];

function StickyCard({ service, index, total }: { service: any, index: number, total: number }) {
  const { data: session, status } = useSession();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [pendingHref, setPendingHref] = useState("");

  const handleServiceClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (status === "loading") {
      e.preventDefault();
      return;
    }
    if (!session) {
      e.preventDefault();
      setPendingHref(href);
      setAuthModalOpen(true);
    }
  };

  // The sticky offset increases with index so they stack nicely
  const stickyTop = 100 + index * 40; 
  
  const innerContent = (
    <div className="relative w-full h-[350px] md:h-[400px] glass rounded-3xl p-8 md:p-12 overflow-hidden group shadow-2xl border-t border-white/20">
      
      {/* Background Glow */}
      <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${service.color} to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-[80px] rounded-full`} />
      
      <div className="flex flex-col h-full justify-between relative z-10">
        <div>
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-inner`}
          >
            <service.icon className="w-8 h-8 text-foreground group-hover:text-white transition-colors duration-300" />
          </motion.div>
          <h4 className="text-3xl md:text-4xl font-heading font-black text-foreground mb-4 tracking-tighter">
            {service.name}
          </h4>
          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed font-light">
            {service.desc}
          </p>
        </div>

        {service.ctaText && (
          <div className="flex items-center gap-3 text-white font-bold uppercase tracking-widest text-sm mt-8 group-hover:text-accent transition-colors">
            {service.ctaText}
            <ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        )}
      </div>

      <AuthGateModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} targetHref={pendingHref} />
    </div>
  );

  return (
    <div className="sticky w-full mb-24" style={{ top: `${stickyTop}px` }}>
      {service.href ? (
        <Link href={service.href} onClick={(e) => handleServiceClick(e, service.href!)} className="block w-full">
          {innerContent}
        </Link>
      ) : (
        innerContent
      )}
    </div>
  );
}

export function ServicesPreview() {
  return (
    <section className="py-32 bg-[#09090B] relative">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10">
        
        <div className="mb-32 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="text-sm font-bold tracking-[0.2em] text-accent uppercase mb-6"
          >
            Our Ecosystem
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl md:text-6xl font-heading font-black tracking-tighter text-foreground leading-tight"
          >
            Capabilities designed <br/> for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#06B6D4]">dominance.</span>
          </motion.h3>
        </div>

        {/* Stacked Cards */}
        <div className="relative pb-20">
          {allServices.map((service, idx) => (
            <StickyCard key={idx} service={service} index={idx} total={allServices.length} />
          ))}
        </div>
        
      </div>
    </section>
  );
}
