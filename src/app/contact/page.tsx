"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { contactSchema } from "@/lib/validations";
import { submitContactForm } from "@/actions/contact";

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

// Extend the base schema to include service for the contact form specifically
const fullContactSchema = contactSchema.extend({
  service: z.string().min(1, "Please select a service."),
});

type ContactFormValues = z.infer<typeof fullContactSchema>;

export default function ContactPage() {
  const [globalError, setGlobalError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormValues>({
    resolver: zodResolver(fullContactSchema),
    defaultValues: { name: "", email: "", phone: "", company: "", service: "", message: "" },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setGlobalError("");
    
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    if (data.company) formData.append("businessName", data.company);
    formData.append("service", data.service);
    formData.append("message", data.message);

    const result = await submitContactForm(formData);

    if (result.error) {
      setGlobalError(result.error);
    } else {
      setSuccess(true);
      reset();
    }
  };

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
            Let&apos;s talk about <br className="hidden md:block"/>your marketing.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-3xl"
          >
            We are here to answer your questions and see if our services are the right fit for your business goals.
          </motion.p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-card border border-border p-6 sm:p-8 md:p-12 relative rounded-lg shadow-sm"
          >
            {success ? (
              <div className="flex flex-col items-center justify-center py-12 text-center h-full">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-accent" />
                </div>
                <h2 className="text-3xl font-heading font-bold mb-4">Message Sent!</h2>
                <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                  Thank you for reaching out. We have received your message and will get back to you shortly.
                </p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-heading font-bold mb-8">Send us a message</h2>
                
                {globalError && (
                  <div className="bg-destructive/10 text-destructive text-sm p-4 rounded-md mb-8 flex items-center gap-2">
                    <AlertCircle size={18} />
                    {globalError}
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground tracking-wide">Name</label>
                      <input 
                        {...register("name")}
                        type="text" 
                        className={`w-full bg-background border p-4 text-[15px] focus:outline-none focus:border-accent transition-colors rounded placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-accent ${errors.name ? 'border-destructive' : 'border-border/60'}`}
                        placeholder="Rohan Sharma"
                      />
                      {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium text-foreground tracking-wide">Business Name</label>
                      <input 
                        {...register("company")}
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
                        {...register("email")}
                        type="email" 
                        className={`w-full bg-background border p-4 text-[15px] focus:outline-none focus:border-accent transition-colors rounded placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-accent ${errors.email ? 'border-destructive' : 'border-border/60'}`}
                        placeholder="rohan@company.com"
                      />
                      {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-foreground tracking-wide">Phone Number</label>
                      <input 
                        {...register("phone")}
                        type="tel" 
                        className={`w-full bg-background border p-4 text-[15px] focus:outline-none focus:border-accent transition-colors rounded placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-accent ${errors.phone ? 'border-destructive' : 'border-border/60'}`}
                        placeholder="+91 98765 43210"
                      />
                      {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="service" className="text-sm font-medium text-foreground tracking-wide">Service Interested In</label>
                    <select 
                      {...register("service")}
                      className={`w-full bg-background border p-4 text-[15px] focus:outline-none focus:border-accent transition-colors rounded text-foreground appearance-none focus:ring-1 focus:ring-accent ${errors.service ? 'border-destructive' : 'border-border/60'}`}
                    >
                      <option value="" disabled>Select a service</option>
                      {exactServices.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.service && <p className="text-xs text-destructive">{errors.service.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground tracking-wide">Message</label>
                    <textarea 
                      {...register("message")}
                      rows={4} 
                      className={`w-full bg-background border p-4 text-[15px] focus:outline-none focus:border-accent transition-colors rounded placeholder:text-muted-foreground/50 resize-none focus:ring-1 focus:ring-accent ${errors.message ? 'border-destructive' : 'border-border/60'}`}
                      placeholder="How can we help you?"
                    />
                    {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-14 rounded bg-accent text-accent-foreground transition-colors font-bold text-[15px] shadow-sm flex items-center justify-center overflow-hidden relative group disabled:opacity-50"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "Send Message"}
                    </span>
                    {!isSubmitting && <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />}
                  </motion.button>
                </form>
              </>
            )}
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
