"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

const exactServices = [
  "Social Media Management",
  "Meta Ads & Google Ads",
  "Content Creation",
  "Search Engine Optimisation",
  "WhatsApp Marketing (Chat Bot)",
  "Email Marketing Automation",
  "Lead Generation Campaign",
  "Google Business (Maps) Setup",
  "Brand Identity & Refresh",
  "Weekly Analytic Report",
  "Multiple Services / Other"
];

export default function ContactPage() {
  return (
    <main className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <section className="max-w-5xl mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-heading font-bold mb-8 leading-[0.95] tracking-tighter"
          >
            Let&apos;s talk about <br className="hidden md:block"/>your marketing.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl"
          >
            We are here to answer your questions and see if our services are the right fit for your business goals.
          </motion.p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-card border border-border p-8 md:p-12 relative rounded-lg shadow-sm"
          >
            <h2 className="text-2xl font-heading font-bold mb-8">Send us a message</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground tracking-wide">Name</label>
                  <input 
                    id="name" 
                    type="text" 
                    className="w-full bg-background border border-border/60 p-4 text-[15px] focus:outline-none focus:border-accent transition-colors rounded placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-accent" 
                    placeholder="Rohan Sharma"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="businessName" className="text-sm font-medium text-foreground tracking-wide">Business Name</label>
                  <input 
                    id="businessName" 
                    type="text" 
                    className="w-full bg-background border border-border/60 p-4 text-[15px] focus:outline-none focus:border-accent transition-colors rounded placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-accent" 
                    placeholder="Company Inc."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground tracking-wide">Email</label>
                  <input 
                    id="email" 
                    type="email" 
                    className="w-full bg-background border border-border/60 p-4 text-[15px] focus:outline-none focus:border-accent transition-colors rounded placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-accent" 
                    placeholder="rohan@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-foreground tracking-wide">Phone Number</label>
                  <input 
                    id="phone" 
                    type="tel" 
                    className="w-full bg-background border border-border/60 p-4 text-[15px] focus:outline-none focus:border-accent transition-colors rounded placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-accent" 
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="service" className="text-sm font-medium text-foreground tracking-wide">Service Interested In</label>
                <select 
                  id="service" 
                  className="w-full bg-background border border-border/60 p-4 text-[15px] focus:outline-none focus:border-accent transition-colors rounded text-foreground appearance-none focus:ring-1 focus:ring-accent"
                  defaultValue=""
                >
                  <option value="" disabled>Select a service</option>
                  {exactServices.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground tracking-wide">Message</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className="w-full bg-background border border-border/60 p-4 text-[15px] focus:outline-none focus:border-accent transition-colors rounded placeholder:text-muted-foreground/50 resize-none focus:ring-1 focus:ring-accent" 
                  placeholder="How can we help you?"
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className="w-full h-14 rounded bg-accent text-accent-foreground transition-colors font-bold text-[15px] shadow-sm flex items-center justify-center overflow-hidden relative group"
              >
                <span className="relative z-10">Send Message</span>
                <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col gap-12"
          >
            <div>
              <h2 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase mb-6">Direct Contact</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Prefer to reach out directly? Give us a call or send an email, and our team will get back to you promptly.
              </p>
              
              <ul className="flex flex-col gap-8">
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-card border border-border flex items-center justify-center shrink-0 rounded">
                    <Mail size={20} className="text-accent" />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-1">Email</span>
                    <a href="mailto:connectstratix@gmail.com" className="text-lg text-foreground hover:text-accent transition-colors">connectstratix@gmail.com</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-card border border-border flex items-center justify-center shrink-0 rounded">
                    <Phone size={20} className="text-accent" />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-1">Phone</span>
                    <a href="tel:+917738017142" className="text-lg text-foreground hover:text-accent transition-colors">+91 7738017142</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-card border border-border flex items-center justify-center shrink-0 rounded">
                    <MapPin size={20} className="text-accent" />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-1">Location</span>
                    <span className="text-lg text-foreground leading-relaxed">
                      Thane / Navi Mumbai
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            
          </motion.div>

        </div>
      </div>
    </main>
  );
}
