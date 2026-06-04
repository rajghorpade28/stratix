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

export function Step1AppType({ data, updateData }: AppStepProps) {
  const options = [
    "E-Commerce App", "Food Delivery App", "Booking / Appointment App", 
    "Education / Learning App", "Healthcare App", "Fitness App", 
    "Finance / Expense Management App", "Social Media App", "Community App", 
    "Real Estate App", "Logistics / Delivery App", "Business Management App", 
    "Employee Management App", "Marketplace App", "SaaS Application", 
    "AI Powered Application", "Custom Requirement"
  ];

  const targetUsers = [
    "Customers", "Employees", "Vendors", "Delivery Partners", 
    "Students", "Teachers", "Administrators", "Business Owners", 
    "Multiple User Types"
  ];

  const toggleUser = (user: string) => {
    if (data.targetUsers.includes(user)) {
      updateData({ targetUsers: data.targetUsers.filter(u => u !== user) });
    } else {
      updateData({ targetUsers: [...data.targetUsers, user] });
    }
  };

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h2 className="text-2xl font-heading font-bold">1. What Type of App Do You Want To Build?</h2>
        <p className="text-sm text-muted-foreground">Please select the option that best describes your project:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {options.map((opt) => (
            <RadioCard
              key={opt}
              title={opt}
              selected={data.appType === opt}
              onClick={() => updateData({ appType: opt })}
            />
          ))}
        </div>
        {data.appType === "Custom Requirement" && (
          <div className="mt-4">
            <Input 
              placeholder="Please describe your custom requirement..." 
              value={data.customAppType}
              onChange={(e) => updateData({ customAppType: e.target.value })}
              className="w-full"
            />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-heading font-bold">2. Who Will Use This App?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {targetUsers.map((user) => (
            <CheckboxCard
              key={user}
              label={user}
              selected={data.targetUsers.includes(user)}
              onClick={() => toggleUser(user)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Step2GoalPlatform({ data, updateData }: AppStepProps) {
  const goals = [
    "Sell Products", "Provide Services", "Manage Business Operations", 
    "Generate Leads", "Build Community", "Offer Online Learning", 
    "Automate Workflows", "Improve Customer Experience", "Internal Company Use", 
    "Other"
  ];

  const platforms = [
    "Android App", "iOS App", "Web App", "Desktop Application", 
    "Android + iOS", "Android + iOS + Web"
  ];

  const toggleGoal = (goal: string) => {
    if (data.mainGoal.includes(goal)) {
      updateData({ mainGoal: data.mainGoal.filter(g => g !== goal) });
    } else {
      updateData({ mainGoal: [...data.mainGoal, goal] });
    }
  };

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h2 className="text-2xl font-heading font-bold">3. What Is The Main Goal Of Your App?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {goals.map((goal) => (
            <CheckboxCard
              key={goal}
              label={goal}
              selected={data.mainGoal.includes(goal)}
              onClick={() => toggleGoal(goal)}
            />
          ))}
        </div>
        {data.mainGoal.includes("Other") && (
          <div className="mt-4">
            <Input 
              placeholder="Please specify..." 
              value={data.customMainGoal}
              onChange={(e) => updateData({ customMainGoal: e.target.value })}
            />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-heading font-bold">4. Platform Requirements</h2>
        <p className="text-sm text-muted-foreground">Where do you want your app to run?</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {platforms.map((platform) => (
            <RadioCard
              key={platform}
              title={platform}
              selected={data.platformRequirements === platform}
              onClick={() => updateData({ platformRequirements: platform })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Step3AuthScreens({ data, updateData }: AppStepProps) {
  const authFeatures = [
    "Email Sign-Up", "Mobile Number Sign-Up", "OTP Verification", 
    "Google Login", "Apple Login", "Facebook Login", 
    "Multi-Factor Authentication", "Role-Based Access"
  ];

  const coreScreens = [
    "Splash Screen", "Login / Sign Up", "Home Screen", "Profile Screen", 
    "Settings", "Contact Support", "Notifications", "Search"
  ];

  const businessScreens = [
    "Product Listings", "Product Details", "Shopping Cart", "Checkout", 
    "Orders", "Booking Screen", "Appointment Management", "Service Listings", 
    "Dashboard"
  ];

  const toggleArrayItem = (field: "authFeatures" | "coreScreens" | "businessScreens", value: string) => {
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
        <h2 className="text-2xl font-heading font-bold">5. User Authentication Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {authFeatures.map((feature) => (
            <CheckboxCard
              key={feature}
              label={feature}
              selected={data.authFeatures.includes(feature)}
              onClick={() => toggleArrayItem("authFeatures", feature)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-heading font-bold">6. App Screens Required</h2>
        
        <FeatureGroup title="Core Screens">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {coreScreens.map(screen => (
              <CheckboxCard
                key={screen}
                label={screen}
                selected={data.coreScreens.includes(screen)}
                onClick={() => toggleArrayItem("coreScreens", screen)}
              />
            ))}
          </div>
        </FeatureGroup>

        <FeatureGroup title="Business Screens">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {businessScreens.map(screen => (
              <CheckboxCard
                key={screen}
                label={screen}
                selected={data.businessScreens.includes(screen)}
                onClick={() => toggleArrayItem("businessScreens", screen)}
              />
            ))}
          </div>
        </FeatureGroup>

        <FeatureGroup title="Custom Screens">
          <Input 
            placeholder="Please Mention (comma separated)..." 
            value={data.customScreens}
            onChange={(e) => updateData({ customScreens: e.target.value })}
            className="w-full"
          />
        </FeatureGroup>
      </div>
    </div>
  );
}

export function Step4Design({ data, updateData }: AppStepProps) {
  const designStyles = [
    "Basic Clean Design", "Modern Professional Design", "Premium UI/UX", 
    "Interactive Premium UI", "Luxury Brand Experience", "Fully Custom Design System"
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-heading font-bold">7. Design Style Required</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {designStyles.map((style) => (
          <RadioCard
            key={style}
            title={style}
            selected={data.designStyle === style}
            onClick={() => updateData({ designStyle: style })}
          />
        ))}
      </div>
    </div>
  );
}
