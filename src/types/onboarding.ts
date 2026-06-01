export interface OnboardingData {
  websiteType: string;
  customWebsiteType: string;
  mainGoal: string;
  customMainGoal: string;
  essentialPages: string[];
  customPages: string;
  designStyle: string;
  features: {
    communication: string[];
    booking: string[];
    selling: string[];
    management: string[];
    marketing: string[];
    security: string[];
    custom: string;
  };
  contentStorage: string;
  storageUsage: string;
  businessInfo: {
    name: string;
    description: string;
    services: string;
    phone: string;
    email: string;
    address: string;
    whatsapp: string;
    social: string;
    hasLogo: boolean | null;
    hasDomain: boolean | null;
    hasHosting: boolean | null;
    referenceSites: string;
  };
  contentAvailability: {
    logo: boolean | null;
    photos: boolean | null;
    videos: boolean | null;
    text: boolean | null;
    productPhotos: boolean | null;
    brandGuidelines: boolean | null;
  };
  additionalNotes: string;
}

export const initialOnboardingData: OnboardingData = {
  websiteType: "",
  customWebsiteType: "",
  mainGoal: "",
  customMainGoal: "",
  essentialPages: [],
  customPages: "",
  designStyle: "",
  features: {
    communication: [],
    booking: [],
    selling: [],
    management: [],
    marketing: [],
    security: [],
    custom: "",
  },
  contentStorage: "",
  storageUsage: "",
  businessInfo: {
    name: "",
    description: "",
    services: "",
    phone: "",
    email: "",
    address: "",
    whatsapp: "",
    social: "",
    hasLogo: null,
    hasDomain: null,
    hasHosting: null,
    referenceSites: "",
  },
  contentAvailability: {
    logo: null,
    photos: null,
    videos: null,
    text: null,
    productPhotos: null,
    brandGuidelines: null,
  },
  additionalNotes: "",
};
