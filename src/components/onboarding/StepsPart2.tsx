"use client";

import { OnboardingData } from "@/types/onboarding";
import { CheckboxCard } from "./ui/CheckboxCard";
import { RadioCard } from "./ui/RadioCard";
import { FeatureGroup } from "./ui/FeatureGroup";
import { YesNoSelector } from "./ui/YesNoSelector";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface StepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
}

export function Step5Features({ data, updateData }: StepProps) {
  const toggleFeature = (category: keyof OnboardingData["features"], feature: string) => {
    const list = data.features[category] as string[];
    const newList = list.includes(feature) ? list.filter(f => f !== feature) : [...list, feature];
    updateData({ features: { ...data.features, [category]: newList } });
  };

  const categories = {
    communication: ["WhatsApp Integration", "Email Integration", "Live Chat", "AI Chatbot (Text Based)", "AI Voice Agent (Website Voice Assistant)"],
    booking: ["Appointment Booking", "Reservation System", "Customer Data Collection"],
    selling: ["Online Payments", "Product Purchase Records", "Shopping Cart track", "Order Tracking"],
    management: ["Admin Dashboard", "Inventory Management", "Order Management", "Analytics Dashboard", "Report Generation"],
    marketing: ["SEO Setup", "Lead Collection Forms", "WhatsApp Automation", "Email Automation", "Social Media Integration"],
    security: ["Website Security Setup", "Backup & Recovery", "Speed Optimization", "Spam Protection"]
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold">5. Website Features Required</h2>
      
      {Object.entries(categories).map(([key, features]) => (
        <FeatureGroup key={key} title={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}>
          {features.map(f => (
            <CheckboxCard
              key={f}
              label={f}
              selected={(data.features[key as keyof typeof categories]).includes(f)}
              onClick={() => toggleFeature(key as keyof typeof categories, f)}
            />
          ))}
        </FeatureGroup>
      ))}

      <div className="mt-6">
        <h3 className="text-base font-heading font-semibold mb-3">Custom Features</h3>
        <Textarea 
          placeholder="Please describe any custom features you need..."
          value={data.features.custom}
          onChange={(e) => updateData({ features: { ...data.features, custom: e.target.value }})}
          className="min-h-[80px] text-sm"
        />
      </div>
    </div>
  );
}

export function Step6Storage({ data, updateData }: StepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-heading font-bold mb-4">6. Storage & Content Requirements</h2>
        <p className="text-sm text-muted-foreground mb-4">What type of content will your website contain?</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {["Mostly Text Content", "Images & Portfolio Content", "Heavy Media (Photos/Videos)", "Downloadable Files / PDFs"].map(opt => (
            <RadioCard
              key={opt}
              title={opt}
              selected={data.contentStorage === opt}
              onClick={() => updateData({ contentStorage: opt })}
            />
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-3">Approximate requirement:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {["Small Business Usage", "Medium Business Usage", "High Storage Requirement"].map(opt => (
            <RadioCard
              key={opt}
              title={opt}
              selected={data.storageUsage === opt}
              onClick={() => updateData({ storageUsage: opt })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { nameValidation, emailValidation, phoneValidation } from "@/lib/validations";

const step7Schema = z.object({
  name: nameValidation,
  email: emailValidation,
  phone: phoneValidation,
  services: z.string().optional(),
  description: z.string().optional(),
  whatsapp: z.string().optional(),
  social: z.string().optional(),
  address: z.string().optional(),
});

type Step7FormValues = z.infer<typeof step7Schema>;

interface Step7Props {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onValidSubmit?: () => void;
}

export function Step7BusinessInfo({ data, updateData, onValidSubmit }: Step7Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step7FormValues>({
    resolver: zodResolver(step7Schema),
    defaultValues: {
      name: data.businessInfo.name,
      email: data.businessInfo.email,
      phone: data.businessInfo.phone,
      services: data.businessInfo.services,
      description: data.businessInfo.description,
      whatsapp: data.businessInfo.whatsapp,
      social: data.businessInfo.social,
      address: data.businessInfo.address,
    },
  });

  const onSubmit = (formData: Step7FormValues) => {
    updateData({
      businessInfo: {
        ...data.businessInfo,
        ...formData,
      },
    });
    if (onValidSubmit) {
      onValidSubmit();
    }
  };

  const updateNonFormInfo = (key: keyof OnboardingData["businessInfo"], value: any) => {
    updateData({ businessInfo: { ...data.businessInfo, [key]: value } });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold">7. Business Information Required</h2>
      
      <form id="step7-form" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Business Name *</Label>
          <Input 
            {...register("name")} 
            className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Services / Products</Label>
          <Input {...register("services")} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Business Description</Label>
          <Textarea {...register("description")} />
        </div>
        <div className="space-y-2">
          <Label>Contact Number *</Label>
          <Input 
            type="tel" 
            {...register("phone")} 
            className={errors.phone ? "border-destructive focus-visible:ring-destructive" : ""}
          />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Email Address *</Label>
          <Input 
            type="email" 
            {...register("email")} 
            className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>WhatsApp Number</Label>
          <Input type="tel" {...register("whatsapp")} />
        </div>
        <div className="space-y-2">
          <Label>Social Media Links</Label>
          <Input {...register("social")} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Business Address</Label>
          <Textarea {...register("address")} />
        </div>
      </form>

      <div className="space-y-6 pt-4 border-t border-border/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Label className="text-base">Do you already have a logo?</Label>
          <YesNoSelector id="logo" value={data.businessInfo.hasLogo} onChange={v => updateNonFormInfo("hasLogo", v)} />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Label className="text-base">Do you already own a domain?</Label>
          <YesNoSelector id="domain" value={data.businessInfo.hasDomain} onChange={v => updateNonFormInfo("hasDomain", v)} />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Label className="text-base">Do you already have hosting?</Label>
          <YesNoSelector id="hosting" value={data.businessInfo.hasHosting} onChange={v => updateNonFormInfo("hasHosting", v)} />
        </div>
        <div className="space-y-2 pt-2">
          <Label>Please share websites/designs you like (optional):</Label>
          <Textarea 
            value={data.businessInfo.referenceSites} 
            onChange={e => updateNonFormInfo("referenceSites", e.target.value)} 
          />
        </div>
      </div>
    </div>
  );
}

export function Step8Content({ data, updateData }: StepProps) {
  const updateContent = (key: keyof OnboardingData["contentAvailability"], value: boolean) => {
    updateData({ contentAvailability: { ...data.contentAvailability, [key]: value } });
  };

  const questions = [
    { key: "logo", label: "Logo" },
    { key: "photos", label: "Business Photos" },
    { key: "videos", label: "Videos" },
    { key: "text", label: "Written Content / Text" },
    { key: "productPhotos", label: "Product Photos" },
    { key: "brandGuidelines", label: "Brand Colors / Brand Guidelines" }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-heading font-bold mb-4">8. Content Availability</h2>
        <p className="text-sm text-muted-foreground mb-6">Do you already have the following?</p>
        
        <div className="space-y-3 max-w-2xl">
          {questions.map((q) => (
            <div key={q.key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-card border border-border/50">
              <span className="font-medium">{q.label}</span>
              <YesNoSelector 
                id={`content-${q.key}`}
                value={data.contentAvailability[q.key as keyof OnboardingData["contentAvailability"]]} 
                onChange={v => updateContent(q.key as keyof OnboardingData["contentAvailability"], v)} 
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-border/50">
        <h2 className="text-xl font-heading font-bold mb-3">Additional Notes / Requirements</h2>
        <p className="text-muted-foreground mb-3 text-xs">
          Maintenance can include updates, edits, backups, security monitoring, bug fixing, and technical support.
        </p>
        <Textarea 
          placeholder="Please mention anything specific you want..."
          value={data.additionalNotes}
          onChange={(e) => updateData({ additionalNotes: e.target.value })}
          className="min-h-[100px] text-sm"
        />
      </div>
    </div>
  );
}

export function Step9Summary({ data }: { data: OnboardingData }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-primary">Ready to Submit?</h2>
      <p className="text-muted-foreground text-base">Please review your requirements before submitting.</p>
      
      <div className="space-y-5 rounded-xl bg-card border border-border p-5 md:p-6">
        <div>
          <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-2">Website Type</h3>
          <p className="text-lg font-medium">{data.websiteType || "Not selected"}</p>
        </div>
        
        <div className="pt-4 border-t border-border/50">
          <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-2">Design Style</h3>
          <p className="text-lg font-medium">{data.designStyle || "Not selected"}</p>
        </div>

        <div className="pt-4 border-t border-border/50">
          <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-2">Business Info</h3>
          <p className="font-medium">{data.businessInfo.name || "No name provided"}</p>
          <p className="text-muted-foreground">{data.businessInfo.email}</p>
        </div>

        <div className="pt-4 border-t border-border/50">
          <p className="text-muted-foreground italic">
            You can go back to edit any of your answers, or click Submit below to finalize your project requirements. Our team will review this and contact you shortly.
          </p>
        </div>
      </div>
    </div>
  );
}

import { motion } from "framer-motion";

import Link from "next/link";

export function StepSuccess() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-center text-center space-y-8 py-12 md:py-16 w-full max-w-2xl mx-auto"
    >
      <div className="w-24 h-24 relative mb-4">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="w-full h-full text-accent"
        >
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <motion.path
            d="M30 50 L45 65 L70 35"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          />
        </motion.svg>
      </div>
      
      <div className="space-y-4">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-3xl md:text-5xl font-heading font-bold text-foreground"
        >
          Your project request has been submitted successfully.
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
        >
          We will review your requirements and contact you with a detailed proposal.
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 mt-8"
      >
        <Link 
          href="/"
          className="px-8 py-4 rounded-md font-bold transition-colors bg-secondary text-secondary-foreground hover:bg-secondary/80 text-center"
        >
          Back to Home
        </Link>
        <Link 
          href="/dashboard"
          className="px-8 py-4 rounded-md font-bold transition-colors bg-accent text-accent-foreground hover:bg-accent/90 text-center shadow-lg shadow-accent/20"
        >
          View Dashboard
        </Link>
      </motion.div>
    </motion.div>
  );
}
