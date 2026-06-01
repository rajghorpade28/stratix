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
    <div className="space-y-8">
      <h2 className="text-3xl font-heading font-bold">5. Website Features Required</h2>
      
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

      <div className="mt-8">
        <h3 className="text-lg font-heading font-semibold mb-4">Custom Features</h3>
        <Textarea 
          placeholder="Please describe any custom features you need..."
          value={data.features.custom}
          onChange={(e) => updateData({ features: { ...data.features, custom: e.target.value }})}
        />
      </div>
    </div>
  );
}

export function Step6Storage({ data, updateData }: StepProps) {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-heading font-bold mb-6">6. Storage & Content Requirements</h2>
        <p className="text-muted-foreground mb-4">What type of content will your website contain?</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        <h3 className="text-xl font-semibold mb-4">Approximate requirement:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

export function Step7BusinessInfo({ data, updateData }: StepProps) {
  const updateInfo = (key: keyof OnboardingData["businessInfo"], value: any) => {
    updateData({ businessInfo: { ...data.businessInfo, [key]: value } });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-heading font-bold">7. Business Information Required</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Business Name</Label>
          <Input value={data.businessInfo.name} onChange={e => updateInfo("name", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Services / Products</Label>
          <Input value={data.businessInfo.services} onChange={e => updateInfo("services", e.target.value)} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Business Description</Label>
          <Textarea value={data.businessInfo.description} onChange={e => updateInfo("description", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Contact Number</Label>
          <Input type="tel" value={data.businessInfo.phone} onChange={e => updateInfo("phone", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Email Address</Label>
          <Input type="email" value={data.businessInfo.email} onChange={e => updateInfo("email", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>WhatsApp Number</Label>
          <Input type="tel" value={data.businessInfo.whatsapp} onChange={e => updateInfo("whatsapp", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Social Media Links</Label>
          <Input value={data.businessInfo.social} onChange={e => updateInfo("social", e.target.value)} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Business Address</Label>
          <Textarea value={data.businessInfo.address} onChange={e => updateInfo("address", e.target.value)} />
        </div>
      </div>

      <div className="space-y-6 pt-4 border-t border-border/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Label className="text-base">Do you already have a logo?</Label>
          <YesNoSelector id="logo" value={data.businessInfo.hasLogo} onChange={v => updateInfo("hasLogo", v)} />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Label className="text-base">Do you already own a domain?</Label>
          <YesNoSelector id="domain" value={data.businessInfo.hasDomain} onChange={v => updateInfo("hasDomain", v)} />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Label className="text-base">Do you already have hosting?</Label>
          <YesNoSelector id="hosting" value={data.businessInfo.hasHosting} onChange={v => updateInfo("hasHosting", v)} />
        </div>
        <div className="space-y-2 pt-2">
          <Label>Please share websites/designs you like (optional):</Label>
          <Textarea value={data.businessInfo.referenceSites} onChange={e => updateInfo("referenceSites", e.target.value)} />
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
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-heading font-bold mb-6">8. Content Availability</h2>
        <p className="text-muted-foreground mb-8">Do you already have the following?</p>
        
        <div className="space-y-4 max-w-2xl">
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

      <div className="pt-8 border-t border-border/50">
        <h2 className="text-2xl font-heading font-bold mb-4">Additional Notes / Requirements</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          Maintenance can include updates, edits, backups, security monitoring, bug fixing, and technical support.
        </p>
        <Textarea 
          placeholder="Please mention anything specific you want..."
          value={data.additionalNotes}
          onChange={(e) => updateData({ additionalNotes: e.target.value })}
          className="min-h-[150px]"
        />
      </div>
    </div>
  );
}

export function Step9Summary({ data }: { data: OnboardingData }) {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-heading font-bold text-primary">Ready to Submit?</h2>
      <p className="text-muted-foreground text-lg">Please review your requirements before submitting.</p>
      
      <div className="space-y-6 rounded-xl bg-card border border-border p-6 md:p-8">
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

export function StepSuccess() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 py-12 md:py-24">
      <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-4">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl">
          ✓
        </div>
      </div>
      <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">Thank You!</h2>
      <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
        We have received your requirements and will contact you shortly to begin building your premium digital experience.
      </p>
    </div>
  );
}
