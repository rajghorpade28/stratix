"use server";

import { OnboardingData } from "@/types/onboarding";

export interface QuotationResult {
  price: number;
  minDays: number;
  maxDays: number;
}

export async function calculateQuotation(data: OnboardingData): Promise<QuotationResult> {
  let price = 0;
  let days = 0;

  // 1. Base Website Type Cost
  switch (data.websiteType) {
    case "Landing Page / Lead Generation Website":
      price += 8000; days += 4; // avg 3-5
      break;
    case "Restaurant / Hospitality Website":
      price += 15000; days += 6.5; // avg 5-8
      break;
    case "Educational / Training Website":
      price += 18000; days += 9.5; // avg 7-12
      break;
    case "Booking / Appointment Website":
      price += 20000; days += 11; // avg 8-14
      break;
    case "E-commerce / Online Store":
      price += 30000; days += 18.5; // avg 12-25
      break;
    case "Event Website":
      price += 12000; days += 5.5; // avg 4-7
      break;
    case "Custom Requirement":
      price += 20000; days += 14; 
      break;
    default:
      price += 15000; days += 7;
      break;
  }

  // 2. Goal Complexity Multiplier
  switch (data.mainGoal) {
    case "Informational Website":
      price += 0; days += 0; break;
    case "Showcase Services":
      price += 2000; days += 1; break;
    case "Build Brand Presence":
      price += 3000; days += 1; break;
    case "Generate Leads / Handle Enquiries":
      price += 4000; days += 2; break;
    case "Collect Customer Information":
      price += 4000; days += 2; break;
    case "Take Bookings / Appointments":
      price += 7000; days += 3; break;
    case "Sell Products Online":
      price += 15000; days += 5; break;
    default:
      break;
  }

  // 3. Pages Pricing
  const basePages = ["Home Page", "About Us", "Contact Page", "Services / Products"];
  data.essentialPages.forEach(page => {
    if (!basePages.includes(page)) {
      if (page === "Reviews / Testimonials") { price += 1500; days += 0.5; }
      else if (page === "Gallery / Portfolio") { price += 2000; days += 1; }
      else if (page === "Why Choose Us") { price += 1000; days += 0.5; }
      else if (page === "FAQs") { price += 1500; days += 0.5; }
      else if (page === "Blog / Resources") { price += 4000; days += 2; }
      else if (page === "Pricing Page") { price += 2000; days += 1; }
      else if (page === "Team Page") { price += 2000; days += 1; }
      else if (page === "Careers Page") { price += 3000; days += 1; }
      else if (page === "Privacy Policy / Terms") { price += 1000; days += 0; }
    }
  });

  if (data.customPages && data.customPages.trim() !== "") {
    const customPagesArray = data.customPages.split(",").filter(p => p.trim() !== "");
    price += customPagesArray.length * 4000;
    days += customPagesArray.length * 1.5;
  }

  // 4. Design Style Multiplier
  if (data.designStyle.includes("Basic & Clean")) {
    price += 0; days += 0;
  } else if (data.designStyle.includes("Premium Business")) {
    price += 10000; days += 4;
  } else if (data.designStyle.includes("Interactive Premium")) {
    price += 25000; days += 7;
  } else if (data.designStyle.includes("Elite Design")) {
    price += 50000; days += 15;
  }

  // 5. Features Pricing
  const featurePricing: Record<string, { price: number, days: number }> = {
    "WhatsApp Integration": { price: 1000, days: 0.5 },
    "Email Integration": { price: 2000, days: 1 },
    "Live Chat": { price: 3000, days: 1 },
    "Appointment Booking": { price: 7000, days: 2 },
    "Reservation System": { price: 8000, days: 3 },
    "Customer Data Collection": { price: 4000, days: 1 },
    "Online Payments": { price: 5000, days: 2 },
    "Product Purchase Records": { price: 5000, days: 2 },
    "Shopping Cart track": { price: 8000, days: 3 }, 
    "Order Tracking": { price: 7000, days: 3 },
    "Admin Dashboard": { price: 10000, days: 4 },
    "Inventory Management": { price: 10000, days: 4 },
    "Order Management": { price: 8000, days: 3 },
    "Analytics Dashboard": { price: 6000, days: 2 },
    "Report Generation": { price: 6000, days: 2 },
    "SEO Setup": { price: 5000, days: 2 },
    "Lead Collection Forms": { price: 3000, days: 1 },
    "WhatsApp Automation": { price: 8000, days: 3 },
    "Email Automation": { price: 7000, days: 3 },
    "Social Media Integration": { price: 2000, days: 1 },
    "Website Security Setup": { price: 4000, days: 1 },
    "Backup & Recovery": { price: 3000, days: 1 },
    "Speed Optimization": { price: 4000, days: 1 },
    "Spam Protection": { price: 2000, days: 0.5 }
  };

  Object.values(data.features).forEach(categoryFeatures => {
    if (Array.isArray(categoryFeatures)) {
      categoryFeatures.forEach(feature => {
        if (featurePricing[feature]) {
          price += featurePricing[feature].price;
          days += featurePricing[feature].days;
        } else {
          if (feature === "AI Chatbot (Text Based)") { price += 6000; days += 3; }
          else if (feature === "AI Voice Agent (Website Voice Assistant)") { price += 15000; days += 7; }
        }
      });
    }
  });

  // 6. Storage Pricing
  if (data.contentStorage === "Images & Portfolio Content") { price += 2000; }
  else if (data.contentStorage === "Heavy Media (Photos/Videos)") { price += 7000; }
  else if (data.contentStorage === "Downloadable Files / PDFs") { price += 3000; }

  if (data.storageUsage === "Medium Business Usage") { price += 3000; }
  else if (data.storageUsage === "High Storage Requirement") { price += 7000; }

  // 7. Content Missing Penalty
  if (data.businessInfo.hasLogo === false) { price += 3000; }
  if (data.contentAvailability.text === false) { price += 5000; }
  if (data.contentAvailability.productPhotos === false) { price += 2000; }
  if (data.contentAvailability.brandGuidelines === false) { price += 5000; }

  // 8 & 9. Final Formulas
  const finalPrice = Math.round(price * 1.15); // 15% buffer
  const minDays = Math.round(days * 1.20); // 20% buffer
  const maxDays = Math.round(days * 1.30); // 30% buffer

  // Simulate network delay for a more "premium calculating" feel
  await new Promise(resolve => setTimeout(resolve, 2500));

  return {
    price: finalPrice,
    minDays: minDays > 0 ? minDays : 7,
    maxDays: maxDays > 0 ? maxDays : 14
  };
}
