export interface AppOnboardingData {
  appType: string;
  customAppType: string;
  targetUsers: string[];
  mainGoal: string[];
  customMainGoal: string;
  platformRequirements: string;
  authFeatures: string[];
  coreScreens: string[];
  businessScreens: string[];
  customScreens: string;
  designStyle: string;
  features: {
    communication: string[];
    user: string[];
    business: string[];
    payments: string[];
    location: string[];
    ai: string[];
    advanced: string[];
  };
  storageRequirements: string[];
  userScale: string;
  adminRequirements: string[];
  securityRequirements: string[];
  thirdPartyIntegrations: string[];
  customIntegrations: string;
  existingAssets: string[];
  businessInfo: {
    name: string;
    email: string;
    phone: string;
    companyName: string;
  };
  additionalRequirements: string;
}

export const initialAppOnboardingData: AppOnboardingData = {
  appType: "",
  customAppType: "",
  targetUsers: [],
  mainGoal: [],
  customMainGoal: "",
  platformRequirements: "",
  authFeatures: [],
  coreScreens: [],
  businessScreens: [],
  customScreens: "",
  designStyle: "",
  features: {
    communication: [],
    user: [],
    business: [],
    payments: [],
    location: [],
    ai: [],
    advanced: [],
  },
  storageRequirements: [],
  userScale: "",
  adminRequirements: [],
  securityRequirements: [],
  thirdPartyIntegrations: [],
  customIntegrations: "",
  existingAssets: [],
  businessInfo: {
    name: "",
    email: "",
    phone: "",
    companyName: "",
  },
  additionalRequirements: "",
};
