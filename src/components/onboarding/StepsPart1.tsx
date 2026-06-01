"use client";

import { OnboardingData } from "@/types/onboarding";
import { RadioCard } from "./ui/RadioCard";
import { CheckboxCard } from "./ui/CheckboxCard";
import { FeatureGroup } from "./ui/FeatureGroup";
import { YesNoSelector } from "./ui/YesNoSelector";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface StepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
}

export function Step1WebsiteType({ data, updateData }: StepProps) {
  const options = [
    "E-commerce / Online Store",
    "Booking / Appointment Website",
    "Restaurant / Hospitality Website",
    "Educational / Training Website",
    "Event Website",
    "Landing Page / Lead Generation Website",
    "Custom Requirement"
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-heading font-bold">1. What Type of Website Do You Need?</h2>
      <p className="text-sm text-muted-foreground">Please select the option that best describes you:</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt) => (
          <RadioCard
            key={opt}
            title={opt}
            selected={data.websiteType === opt}
            onClick={() => updateData({ websiteType: opt })}
          />
        ))}
      </div>

      {data.websiteType === "Custom Requirement" && (
        <div className="mt-4">
          <Input 
            placeholder="Please describe your custom requirement..." 
            value={data.customWebsiteType}
            onChange={(e) => updateData({ customWebsiteType: e.target.value })}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}

export function Step2Goal({ data, updateData }: StepProps) {
  const options = [
    "Generate Leads / Handle Enquiries",
    "Sell Products Online",
    "Build Brand Presence",
    "Showcase Services",
    "Collect Customer Information",
    "Take Bookings / Appointments",
    "Informational Website",
    "Other"
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-heading font-bold">2. What Is the Main Goal of Your Website?</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt) => (
          <RadioCard
            key={opt}
            title={opt}
            selected={data.mainGoal === opt}
            onClick={() => updateData({ mainGoal: opt })}
          />
        ))}
      </div>

      {data.mainGoal === "Other" && (
        <div className="mt-4">
          <Input 
            placeholder="Please mention your other goal..." 
            value={data.customMainGoal}
            onChange={(e) => updateData({ customMainGoal: e.target.value })}
          />
        </div>
      )}
    </div>
  );
}

export function Step3Pages({ data, updateData }: StepProps) {
  const essentialPages = [
    "Home Page", "About Us", "Services / Products", "Contact Page", 
    "Reviews / Testimonials", "Gallery / Portfolio", "Why Choose Us", 
    "FAQs", "Blog / Resources", "Pricing Page", "Team Page", 
    "Careers Page", "Privacy Policy / Terms"
  ];

  const togglePage = (page: string) => {
    if (data.essentialPages.includes(page)) {
      updateData({ essentialPages: data.essentialPages.filter(p => p !== page) });
    } else {
      updateData({ essentialPages: [...data.essentialPages, page] });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold mb-4">3. Website Pages Required</h2>
        <h3 className="text-lg font-semibold mb-3">Essential Pages</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {essentialPages.map(page => (
            <CheckboxCard
              key={page}
              label={page}
              selected={data.essentialPages.includes(page)}
              onClick={() => togglePage(page)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Additional Custom Pages</h3>
        <Textarea 
          placeholder="Please mention page names separated by commas..."
          value={data.customPages}
          onChange={(e) => updateData({ customPages: e.target.value })}
          className="min-h-[80px] text-sm"
        />
      </div>
    </div>
  );
}

export function Step4Design({ data, updateData }: StepProps) {
  const styles = [
    {
      title: "Basic & Clean Design",
      desc: "Simple professional website with clean layouts."
    },
    {
      title: "Premium Business Design",
      desc: "Modern, detailed, visually polished experience."
    },
    {
      title: "Interactive Premium Design",
      desc: "Animations, premium motion effects, interactive sections, high-end visual experience."
    },
    {
      title: "Elite Design",
      desc: "Detailed Animation, Motion Graphics, Custom animated design (Mascot, logo animation)."
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-heading font-bold">4. Preferred Website Design Style</h2>
      <p className="text-sm text-muted-foreground">Choose the website experience you want:</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {styles.map((style) => (
          <RadioCard
            key={style.title}
            title={style.title}
            description={style.desc}
            selected={data.designStyle === style.title}
            onClick={() => updateData({ designStyle: style.title })}
            className="h-full"
          />
        ))}
      </div>
    </div>
  );
}
