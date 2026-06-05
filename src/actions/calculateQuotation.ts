import { OnboardingData } from "@/types/onboarding";

export interface QuoteBreakdown {
  baseCost: number;
  goalCost: number;
  pagesCost: number;
  designCost: number;
  featuresCost: number;
  storageCost: number;
  missingContentCost: number;
  subtotal: number;
  bufferCost: number;
  finalQuote: number;
  baseDays: number;
  goalDays: number;
  pageDays: number;
  designDays: number;
  featureDays: number;
  totalDays: number;
  finalMinDays: number;
  finalMaxDays: number;
}

export function calculateInternalQuotation(data: OnboardingData): QuoteBreakdown {
  const breakdown: QuoteBreakdown = {
    baseCost: 0, goalCost: 0, pagesCost: 0, designCost: 0, featuresCost: 0, storageCost: 0, missingContentCost: 0,
    subtotal: 0, bufferCost: 0, finalQuote: 0,
    baseDays: 0, goalDays: 0, pageDays: 0, designDays: 0, featureDays: 0,
    totalDays: 0, finalMinDays: 0, finalMaxDays: 0
  };

  // 1. Base Website Type Cost
  switch (data.websiteType) {
    case "Landing Page / Lead Generation Website":
      breakdown.baseCost = 8000; breakdown.baseDays = 4;
      break;
    case "Restaurant / Hospitality Website":
      breakdown.baseCost = 15000; breakdown.baseDays = 6.5;
      break;
    case "Educational / Training Website":
      breakdown.baseCost = 18000; breakdown.baseDays = 9.5;
      break;
    case "Booking / Appointment Website":
      breakdown.baseCost = 20000; breakdown.baseDays = 11;
      break;
    case "E-commerce / Online Store":
      breakdown.baseCost = 30000; breakdown.baseDays = 18.5;
      break;
    case "Event Website":
      breakdown.baseCost = 12000; breakdown.baseDays = 5.5;
      break;
    case "Custom Requirement":
      breakdown.baseCost = 20000; breakdown.baseDays = 14; 
      break;
    default:
      breakdown.baseCost = 15000; breakdown.baseDays = 7;
      break;
  }

  // 2. Goal Complexity Multiplier
  switch (data.mainGoal) {
    case "Informational Website":
      breakdown.goalCost = 0; breakdown.goalDays = 0; break;
    case "Showcase Services":
      breakdown.goalCost = 2000; breakdown.goalDays = 1; break;
    case "Build Brand Presence":
      breakdown.goalCost = 3000; breakdown.goalDays = 1; break;
    case "Generate Leads / Handle Enquiries":
      breakdown.goalCost = 4000; breakdown.goalDays = 2; break;
    case "Collect Customer Information":
      breakdown.goalCost = 4000; breakdown.goalDays = 2; break;
    case "Take Bookings / Appointments":
      breakdown.goalCost = 7000; breakdown.goalDays = 3; break;
    case "Sell Products Online":
      breakdown.goalCost = 15000; breakdown.goalDays = 5; break;
    default:
      break;
  }

  // 3. Pages Pricing
  const basePages = ["Home Page", "About Us", "Contact Page", "Services / Products"];
  data.essentialPages.forEach(page => {
    if (!basePages.includes(page)) {
      if (page === "Reviews / Testimonials") { breakdown.pagesCost += 1500; breakdown.pageDays += 0.5; }
      else if (page === "Gallery / Portfolio") { breakdown.pagesCost += 2000; breakdown.pageDays += 1; }
      else if (page === "Why Choose Us") { breakdown.pagesCost += 1000; breakdown.pageDays += 0.5; }
      else if (page === "FAQs") { breakdown.pagesCost += 1500; breakdown.pageDays += 0.5; }
      else if (page === "Blog / Resources") { breakdown.pagesCost += 4000; breakdown.pageDays += 2; }
      else if (page === "Pricing Page") { breakdown.pagesCost += 2000; breakdown.pageDays += 1; }
      else if (page === "Team Page") { breakdown.pagesCost += 2000; breakdown.pageDays += 1; }
      else if (page === "Careers Page") { breakdown.pagesCost += 3000; breakdown.pageDays += 1; }
      else if (page === "Privacy Policy / Terms") { breakdown.pagesCost += 1000; breakdown.pageDays += 0; }
    }
  });

  if (data.customPages && data.customPages.trim() !== "") {
    const customPagesArray = data.customPages.split(",").filter(p => p.trim() !== "");
    breakdown.pagesCost += customPagesArray.length * 4000;
    breakdown.pageDays += customPagesArray.length * 1.5;
  }

  // 4. Design Style Multiplier
  if (data.designStyle.includes("Basic & Clean")) {
    breakdown.designCost += 3000; breakdown.designDays += 0;
  } else if (data.designStyle.includes("Premium Business")) {
    breakdown.designCost += 10000; breakdown.designDays += 4;
  } else if (data.designStyle.includes("Interactive Premium")) {
    breakdown.designCost += 25000; breakdown.designDays += 7;
  } else if (data.designStyle.includes("Elite Design")) {
    breakdown.designCost += 50000; breakdown.designDays += 15;
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
    "Shopping Cart Tracking": { price: 8000, days: 3 }, 
    "Order Tracking": { price: 7000, days: 3 },
    "Admin Dashboard": { price: 10000, days: 4 },
    "Inventory Management": { price: 10000, days: 4 },
    "Order Management": { price: 8000, days: 3 },
    "Analytics Dashboard": { price: 6000, days: 2 },
    "Report Generation": { price: 6000, days: 2 },
    "SEO Setup": { price: 5000, days: 2 },
    "Blog Management": { price: 4000, days: 2 },
    "Newsletter Signup": { price: 2000, days: 1 },
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
          breakdown.featuresCost += featurePricing[feature].price;
          breakdown.featureDays += featurePricing[feature].days;
        } else {
          // AI Chatbots or anything not explicit in prompt table
          if (feature === "AI Chatbot (Text Based)") { breakdown.featuresCost += 6000; breakdown.featureDays += 3; }
          else if (feature === "AI Voice Agent (Website Voice Assistant)") { breakdown.featuresCost += 15000; breakdown.featureDays += 7; }
        }
      });
    }
  });

  // 6. Storage Pricing
  if (data.contentStorage === "Images & Portfolio Content") { breakdown.storageCost += 2000; }
  else if (data.contentStorage === "Heavy Media (Photos/Videos)") { breakdown.storageCost += 7000; }
  else if (data.contentStorage === "Downloadable Files / PDFs") { breakdown.storageCost += 3000; }
  else if (data.contentStorage === "Downloadable PDFs / Files") { breakdown.storageCost += 3000; }

  if (data.storageUsage === "Medium Business Usage") { breakdown.storageCost += 3000; }
  else if (data.storageUsage === "High Storage Requirement") { breakdown.storageCost += 7000; }

  // 7. Content Missing Penalty
  if (data.businessInfo.hasLogo === false) { breakdown.missingContentCost += 3000; }
  if (data.contentAvailability.text === false) { breakdown.missingContentCost += 5000; }
  if (data.contentAvailability.productPhotos === false) { breakdown.missingContentCost += 2000; }
  if (data.contentAvailability.brandGuidelines === false) { breakdown.missingContentCost += 5000; }

  // 8. Final Formulas
  breakdown.subtotal = breakdown.baseCost + breakdown.goalCost + breakdown.pagesCost + breakdown.designCost + breakdown.featuresCost + breakdown.storageCost + breakdown.missingContentCost;
  breakdown.bufferCost = Math.round(breakdown.subtotal * 0.15); // 15% buffer
  breakdown.finalQuote = breakdown.subtotal + breakdown.bufferCost;

  // 9. Timeline Formulas
  breakdown.totalDays = breakdown.baseDays + breakdown.goalDays + breakdown.featureDays + breakdown.designDays + breakdown.pageDays;
  breakdown.finalMinDays = Math.round(breakdown.totalDays * 1.20); // 20% buffer
  breakdown.finalMaxDays = Math.round(breakdown.totalDays * 1.30); // 30% buffer

  return breakdown;
}
