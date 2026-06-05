"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { ArrowRight, Share2, Target, PenTool, Search, MessageCircle, Magnet, MapPin, Layout, Cpu, Palette, AppWindow } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthGateModal } from "@/components/auth/AuthGateModal";

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
    desc: "Premium visual assets, branding, and creative direction.",
    href: "/graphics",
    ctaText: "View Pricing"
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
  const { data: session, status } = useSession();
  const router = useRouter();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [pendingHref, setPendingHref] = useState("");

  const handleServiceClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If we're loading session, prevent navigation to avoid flickering issues
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

  return (
    <section className="py-20 md:py-28 bg-background relative border-t border-border/40 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        
        <AuthGateModal 
          isOpen={authModalOpen} 
          onClose={() => setAuthModalOpen(false)} 
          targetHref={pendingHref} 
        />

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
                    className="w-12 h-12 rounded-full bg-accent/5 border border-accent/20 flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-primary-foreground group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out"
                  >
                    <service.icon className="w-5 h-5 text-accent group-hover:text-primary-foreground transition-colors duration-500" />
                  </motion.div>
                  <h4 className="text-[17px] font-heading font-bold text-foreground mb-2 tracking-tight group-hover:text-accent transition-colors">
                    {service.name}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {service.desc}
                  </p>
                  {service.ctaText && (
                    <div className="flex items-center gap-2 text-accent font-bold text-[13px] uppercase tracking-wide overflow-hidden max-h-0 opacity-0 group-hover:max-h-12 group-hover:opacity-100 group-hover:mt-6 transition-all duration-500 ease-out">
                      {service.ctaText} <ArrowRight size={14} className="transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
                    </div>
                  )}
                </>
              );

              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full"
                >
                  {service.href ? (
                    <Link 
                      href={service.href}
                      onClick={(e) => handleServiceClick(e, service.href!)}
                      className="block h-full group p-6 bg-card border border-border/50 rounded-lg hover:border-primary/40 hover:shadow-[0_12px_40px_rgba(94,43,151,0.12)] hover:-translate-y-1 transition-all duration-300"
                    >
                      {CardInner}
                    </Link>
                  ) : (
                    <div className="block h-full group p-6 bg-card border border-border/50 rounded-lg hover:border-primary/40 hover:shadow-[0_12px_40px_rgba(94,43,151,0.12)] hover:-translate-y-1 transition-all duration-300 cursor-default">
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group p-6 bg-card border border-border/50 rounded-lg hover:border-primary/40 hover:shadow-[0_12px_40px_rgba(94,43,151,0.12)] hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                <motion.div 
                  className="w-12 h-12 rounded-full bg-accent/5 border border-accent/20 flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-primary-foreground group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out"
                >
                  <service.icon className="w-5 h-5 text-accent group-hover:text-primary-foreground transition-colors duration-500" />
                </motion.div>
                <h4 className="text-[17px] font-heading font-bold text-foreground mb-2 tracking-tight group-hover:text-accent transition-colors">
                  {service.name}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
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
