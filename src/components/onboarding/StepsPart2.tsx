"use client";

import { OnboardingData } from "@/types/onboarding";
import { CheckboxCard } from "./ui/CheckboxCard";
import { RadioCard } from "./ui/RadioCard";
import { FeatureGroup } from "./ui/FeatureGroup";
import { YesNoSelector } from "./ui/YesNoSelector";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { QuotationResult } from "@/actions/calculateQuotation";

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

export function StepSuccess({ quotation }: { quotation: QuotationResult }) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 py-12 md:py-16 w-full max-w-3xl mx-auto">
      <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-2">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl shadow-[0_0_15px_rgba(var(--primary-color),0.2)]">
          ✓
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground">Requirements Received</h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Thank you for sharing your vision with us. Based on your specific requirements, our intelligent engine has generated your estimated project investment.
        </p>
      </div>

      <div className="w-full bg-card border border-border/50 rounded-2xl p-8 md:p-12 mt-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-border/50">
          
          <div className="flex flex-col items-center justify-center space-y-3 pt-4 md:pt-0">
            <span className="text-xs font-bold text-accent uppercase tracking-widest">Estimated Investment</span>
            <div className="text-4xl md:text-5xl font-heading font-bold text-foreground tracking-tight">
              {formatPrice(quotation.price)}
            </div>
            <span className="text-xs text-muted-foreground font-medium">Includes 15% project buffer</span>
          </div>

          <div className="flex flex-col items-center justify-center space-y-3 pt-8 md:pt-0">
            <span className="text-xs font-bold text-accent uppercase tracking-widest">Estimated Timeline</span>
            <div className="text-4xl md:text-5xl font-heading font-bold text-foreground tracking-tight">
              {quotation.minDays} - {quotation.maxDays}
            </div>
            <span className="text-xs text-muted-foreground font-medium">Business Days Delivery</span>
          </div>

        </div>
      </div>

      <p className="text-sm text-muted-foreground mt-8 max-w-lg mx-auto">
        Our team will review these exact details and contact you shortly to finalize the proposal and begin building your premium digital experience.
      </p>
    </div>
  );
}
