"use client";

import { AppOnboardingData } from "@/types/appOnboarding";
import { CheckboxCard } from "@/components/onboarding/ui/CheckboxCard";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface AppStepProps {
  data: AppOnboardingData;
  updateData: (updates: Partial<AppOnboardingData>) => void;
}

export function Step8BusinessAssets({ data, updateData }: AppStepProps) {
  const assets = ["Logo", "Brand Guidelines", "UI Design", "Wireframes", "Existing Website", "Existing App", "Existing Database", "None"];

  const toggleAsset = (asset: string) => {
    const current = data.existingAssets;
    if (asset === "None") {
      updateData({ existingAssets: ["None"] });
      return;
    }
    
    let updated = current.filter(i => i !== "None");
    if (updated.includes(asset)) {
      updated = updated.filter(i => i !== asset);
    } else {
      updated = [...updated, asset];
    }
    updateData({ existingAssets: updated });
  };

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({
      businessInfo: {
        ...data.businessInfo,
        [e.target.name]: e.target.value
      }
    });
  };

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h2 className="text-2xl font-heading font-bold">14. Do You Already Have?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {assets.map((asset) => (
            <CheckboxCard key={asset} label={asset} selected={data.existingAssets.includes(asset)} onClick={() => toggleAsset(asset)} />
          ))}
        </div>
      </div>

      <div className="space-y-6 pt-4 border-t border-border/50">
        <div>
          <h2 className="text-2xl font-heading font-bold mb-2">Business Information</h2>
          <p className="text-sm text-muted-foreground">Please provide your contact details so we can get back to you with a proposal.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Your Name <span className="text-destructive">*</span></label>
            <Input name="name" value={data.businessInfo.name} onChange={handleInfoChange} placeholder="John Doe" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Company Name</label>
            <Input name="companyName" value={data.businessInfo.companyName} onChange={handleInfoChange} placeholder="Company Ltd." />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email Address <span className="text-destructive">*</span></label>
            <Input name="email" type="email" value={data.businessInfo.email} onChange={handleInfoChange} placeholder="john@example.com" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Phone / WhatsApp <span className="text-destructive">*</span></label>
            <Input name="phone" value={data.businessInfo.phone} onChange={handleInfoChange} placeholder="+1 234 567 890" required />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Step9Additional({ data, updateData }: AppStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-heading font-bold">15. Additional Requirements</h2>
        <p className="text-sm text-muted-foreground">Please describe any custom functionality, workflow, automation, integrations, or unique features you would like in your application.</p>
        <Textarea 
          placeholder="Type your additional requirements here..." 
          value={data.additionalRequirements}
          onChange={(e) => updateData({ additionalRequirements: e.target.value })}
          className="min-h-[150px]"
        />
      </div>
    </div>
  );
}

export function AppStepSuccess() {
  return (
    <div className="w-full max-w-2xl mx-auto bg-card border border-border/50 rounded-lg p-8 sm:p-12 text-center shadow-lg relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
      
      <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-10 h-10 text-accent" />
      </div>
      
      <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Application Requirements Received</h2>
      
      <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
        Thank you for choosing us to build your application. We have received your detailed requirements and will contact you shortly with a proposed solution and timeline.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link 
          href="/"
          className="px-8 py-3 rounded-md font-semibold transition-colors bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
