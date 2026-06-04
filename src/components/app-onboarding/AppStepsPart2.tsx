"use client";

import { AppOnboardingData } from "@/types/appOnboarding";
import { RadioCard } from "@/components/onboarding/ui/RadioCard";
import { CheckboxCard } from "@/components/onboarding/ui/CheckboxCard";
import { FeatureGroup } from "@/components/onboarding/ui/FeatureGroup";
import { Input } from "@/components/ui/input";

interface AppStepProps {
  data: AppOnboardingData;
  updateData: (updates: Partial<AppOnboardingData>) => void;
}

export function Step5FeaturesStorage({ data, updateData }: AppStepProps) {
  const commFeatures = ["Chat System", "Live Chat", "Video Calling", "Voice Calling", "Push Notifications", "Email Notifications", "SMS Notifications", "WhatsApp Integration"];
  const userFeatures = ["User Profiles", "Reviews & Ratings", "Favorites / Wishlist", "Search & Filters", "Referral Program", "Loyalty Rewards"];
  const businessFeatures = ["Admin Dashboard", "Analytics Dashboard", "Customer Management", "Inventory Management", "Employee Management", "Vendor Management", "Report Generation"];
  const paymentFeatures = ["Razorpay", "Stripe", "PayPal", "UPI Payments", "Subscription Billing", "In-App Purchases"];
  const locationFeatures = ["GPS Tracking", "Maps Integration", "Route Optimization", "Location Based Services"];
  const aiFeatures = ["AI Chatbot", "AI Voice Agent", "AI Customer Support", "AI Recommendations", "AI Content Generation", "AI Data Analysis", "AI Search"];
  const advancedFeatures = ["Multi Language Support", "Dark Mode", "Offline Mode", "QR Code System", "Barcode Scanner", "File Upload System", "Document Management", "Calendar Integration", "API Integrations", "Third Party Software Integrations"];
  
  const storageOptions = ["Images", "Videos", "Documents", "Audio Files", "Large File Storage", "User Generated Content", "Product Catalog", "Learning Materials", "Custom Data"];

  const toggleFeature = (category: keyof AppOnboardingData['features'], feature: string) => {
    const current = data.features[category];
    const updated = current.includes(feature) ? current.filter(f => f !== feature) : [...current, feature];
    updateData({ features: { ...data.features, [category]: updated } });
  };

  const toggleStorage = (item: string) => {
    const current = data.storageRequirements;
    if (current.includes(item)) {
      updateData({ storageRequirements: current.filter(i => i !== item) });
    } else {
      updateData({ storageRequirements: [...current, item] });
    }
  };

  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <h2 className="text-2xl font-heading font-bold">8. Core Features Required</h2>
        
        <FeatureGroup title="Communication">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {commFeatures.map(f => (
              <CheckboxCard key={f} label={f} selected={data.features.communication.includes(f)} onClick={() => toggleFeature("communication", f)} />
            ))}
          </div>
        </FeatureGroup>

        <FeatureGroup title="User Features">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {userFeatures.map(f => (
              <CheckboxCard key={f} label={f} selected={data.features.user.includes(f)} onClick={() => toggleFeature("user", f)} />
            ))}
          </div>
        </FeatureGroup>

        <FeatureGroup title="Business Features">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {businessFeatures.map(f => (
              <CheckboxCard key={f} label={f} selected={data.features.business.includes(f)} onClick={() => toggleFeature("business", f)} />
            ))}
          </div>
        </FeatureGroup>

        <FeatureGroup title="Payments">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {paymentFeatures.map(f => (
              <CheckboxCard key={f} label={f} selected={data.features.payments.includes(f)} onClick={() => toggleFeature("payments", f)} />
            ))}
          </div>
        </FeatureGroup>

        <FeatureGroup title="Location Features">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {locationFeatures.map(f => (
              <CheckboxCard key={f} label={f} selected={data.features.location.includes(f)} onClick={() => toggleFeature("location", f)} />
            ))}
          </div>
        </FeatureGroup>

        <FeatureGroup title="AI Features">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {aiFeatures.map(f => (
              <CheckboxCard key={f} label={f} selected={data.features.ai.includes(f)} onClick={() => toggleFeature("ai", f)} />
            ))}
          </div>
        </FeatureGroup>

        <FeatureGroup title="Advanced Features">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {advancedFeatures.map(f => (
              <CheckboxCard key={f} label={f} selected={data.features.advanced.includes(f)} onClick={() => toggleFeature("advanced", f)} />
            ))}
          </div>
        </FeatureGroup>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-heading font-bold">9. Storage & Content Requirements</h2>
        <p className="text-sm text-muted-foreground">What type of content will users upload or access?</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {storageOptions.map((item) => (
            <CheckboxCard key={item} label={item} selected={data.storageRequirements.includes(item)} onClick={() => toggleStorage(item)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Step6ScaleAdmin({ data, updateData }: AppStepProps) {
  const scales = ["Less than 100", "100 - 1,000", "1,000 - 10,000", "10,000 - 100,000", "100,000+"];
  const adminReqs = ["Manage Users", "Manage Products", "Manage Orders", "Manage Bookings", "Manage Content", "View Analytics", "Export Reports", "Manage Payments", "Manage Notifications"];

  const toggleAdmin = (req: string) => {
    const current = data.adminRequirements;
    if (current.includes(req)) {
      updateData({ adminRequirements: current.filter(i => i !== req) });
    } else {
      updateData({ adminRequirements: [...current, req] });
    }
  };

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h2 className="text-2xl font-heading font-bold">10. User Scale Expectation</h2>
        <p className="text-sm text-muted-foreground">Expected number of users:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {scales.map((scale) => (
            <RadioCard key={scale} title={scale} selected={data.userScale === scale} onClick={() => updateData({ userScale: scale })} />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-heading font-bold">11. Admin Panel Requirements</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {adminReqs.map((req) => (
            <CheckboxCard key={req} label={req} selected={data.adminRequirements.includes(req)} onClick={() => toggleAdmin(req)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Step7SecurityIntegrations({ data, updateData }: AppStepProps) {
  const securityReqs = ["User Authentication", "Data Encryption", "Backup & Recovery", "Activity Logs", "GDPR Compliance", "Security Monitoring", "Fraud Detection"];
  const integrations = ["WhatsApp", "Google Maps", "Payment Gateway", "CRM", "ERP", "Email Marketing", "SMS Gateway", "AI Services", "Custom API"];

  const toggleArrayItem = (field: "securityRequirements" | "thirdPartyIntegrations", value: string) => {
    const current = data[field];
    if (current.includes(value)) {
      updateData({ [field]: current.filter(i => i !== value) });
    } else {
      updateData({ [field]: [...current, value] });
    }
  };

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h2 className="text-2xl font-heading font-bold">12. Security Requirements</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {securityReqs.map((req) => (
            <CheckboxCard key={req} label={req} selected={data.securityRequirements.includes(req)} onClick={() => toggleArrayItem("securityRequirements", req)} />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-heading font-bold">13. Third Party Integrations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {integrations.map((int) => (
            <CheckboxCard key={int} label={int} selected={data.thirdPartyIntegrations.includes(int)} onClick={() => toggleArrayItem("thirdPartyIntegrations", int)} />
          ))}
        </div>
        
        {data.thirdPartyIntegrations.includes("Custom API") && (
          <div className="mt-4">
            <Input 
              placeholder="Please Specify..." 
              value={data.customIntegrations}
              onChange={(e) => updateData({ customIntegrations: e.target.value })}
            />
          </div>
        )}
      </div>
    </div>
  );
}
