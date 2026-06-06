"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Share2, Target, PenTool, Search, MessageCircle, Magnet, MapPin, Layout, Cpu, Palette, AppWindow } from "lucide-react";
import Link from "next/link";
import { AuthGateModal } from "@/components/auth/AuthGateModal";
import { useRouter } from "next/navigation";

const buildServices = [
  { icon: Layout, name: "Website Development", desc: "Custom, high-performance websites that drive conversions.", href: "/start", ctaText: "Start Website Project" },
  { icon: AppWindow, name: "App Development", desc: "Premium iOS, Android, and Web applications tailored to your business.", href: "/start-app", ctaText: "Start App Project" },
  { icon: Cpu, name: "Business Automation", desc: "Streamline operations and save time with automated workflows." },
  { icon: Palette, name: "Graphic Design", desc: "Premium visual assets, branding, and creative direction.", href: "/graphics", ctaText: "View Pricing" },
];

const marketingServices = [
  { icon: Search, name: "Search Engine Optimization", desc: "Dominate search rankings and attract high-intent organic traffic." },
  { icon: Target, name: "Performance Marketing", desc: "Targeted advertising designed to maximize your return on ad spend." },
  { icon: MessageCircle, name: "Social Media Management", desc: "Engaging content and community management that builds brand loyalty." },
  { icon: PenTool, name: "Content Marketing", desc: "Strategic content creation that positions you as an industry authority." },
  { icon: Magnet, name: "Lead Generation", desc: "Automated systems designed to capture and qualify high-value leads." },
  { icon: MapPin, name: "Local SEO", desc: "Optimize your local presence to capture customers in your service area." }
];

function TiltCard({ children, href, onClick }: { children: React.ReactNode, href?: string, onClick?: (e: any) => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const content = (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full h-full"
    >
      <div 
        style={{ transform: "translateZ(30px)" }}
        className="w-full h-full"
      >
        {children}
      </div>
    </motion.div>
  );

  if (href) {
    return <Link href={href} onClick={onClick} className="block w-full h-full perspective-[1000px] group">{content}</Link>;
  }

  return <div className="block w-full h-full perspective-[1000px] group">{content}</div>;
}

export function ServicesPreview() {
  const { data: session, status } = useSession();
  const router = useRouter();
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

  return (
    <section className="py-20 md:py-28 bg-background relative border-t border-border overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-accent/5 mix-blend-normal filter blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        
        <AuthGateModal 
          isOpen={authModalOpen} 
          onClose={() => setAuthModalOpen(false)} 
          targetHref={pendingHref} 
        />

        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 md:gap-8 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <h2 className="text-sm font-medium tracking-[0.1em] text-accent uppercase mb-4 animate-pulse">Our Expertise</h2>
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold tracking-tight text-foreground leading-tight">
              Everything you need for a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-[#06B6D4]">stronger digital presence.</span>
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
          <div className="mb-8 border-b border-border pb-4">
            <h3 className="text-2xl font-heading font-bold text-foreground">Services</h3>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">Things we build and create for your business.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {buildServices.map((service, idx) => {
              const CardInner = (
                <div className="relative h-full glass rounded-2xl p-8 hover:border-accent/40 hover:shadow-[0_0_40px_rgba(217,70,239,0.2)] transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <motion.div 
                    className="w-14 h-14 rounded-xl bg-white/60 border border-white/80 shadow-sm flex items-center justify-center mb-6 relative z-10 group-hover:border-accent/50 group-hover:bg-white group-hover:shadow-[0_0_20px_rgba(217,70,239,0.15)] transition-all duration-500"
                  >
                    <service.icon className="w-6 h-6 text-foreground group-hover:text-accent transition-colors duration-500" />
                  </motion.div>
                  
                  <h4 className="text-xl font-heading font-bold text-foreground mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-accent group-hover:to-[#06B6D4] transition-all duration-300 relative z-10">
                    {service.name}
                  </h4>
                  
                  <p className="text-[15px] text-muted-foreground leading-relaxed relative z-10">
                    {service.desc}
                  </p>
                  
                  {service.ctaText && (
                    <div className="flex items-center gap-2 text-accent font-bold text-[13px] uppercase tracking-wider overflow-hidden max-h-0 opacity-0 group-hover:max-h-12 group-hover:opacity-100 group-hover:mt-8 transition-all duration-500 ease-out relative z-10">
                      {service.ctaText} <ArrowRight size={14} className="transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
                    </div>
                  )}
                </div>
              );

              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full perspective-1000"
                >
                  <TiltCard 
                    href={service.href} 
                    onClick={service.href ? (e: any) => handleServiceClick(e, service.href!) : undefined}
                  >
                    {CardInner}
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* MARKETING SERVICES CATEGORY */}
        <div>
          <div className="mb-8 border-b border-border pb-4">
            <h3 className="text-2xl font-heading font-bold text-foreground">Marketing Services</h3>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">Activities and campaigns focused on customer acquisition and business growth.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {marketingServices.map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="perspective-1000"
              >
                <TiltCard>
                  <div className="relative h-full glass rounded-2xl p-8 hover:border-accent/40 hover:shadow-[0_0_40px_rgba(217,70,239,0.2)] transition-all duration-500 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <motion.div 
                      className="w-14 h-14 rounded-xl bg-white/60 border border-white/80 shadow-sm flex items-center justify-center mb-6 relative z-10 group-hover:border-accent/50 group-hover:bg-white group-hover:shadow-[0_0_20px_rgba(217,70,239,0.15)] transition-all duration-500"
                    >
                      <service.icon className="w-6 h-6 text-foreground group-hover:text-accent transition-colors duration-500" />
                    </motion.div>
                    
                    <h4 className="text-xl font-heading font-bold text-foreground mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-accent group-hover:to-[#06B6D4] transition-all duration-300 relative z-10">
                      {service.name}
                    </h4>
                    
                    <p className="text-[15px] text-muted-foreground leading-relaxed relative z-10">
                      {service.desc}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
