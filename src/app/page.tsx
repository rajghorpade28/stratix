import { HeroSection } from "@/components/sections/HeroSection";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { StatisticsCounter } from "@/components/sections/StatisticsCounter";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { QuoteSeparator } from "@/components/ui/QuoteSeparator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <WhatWeDo />
      <ServicesPreview />
      
      <QuoteSeparator quote="Good marketing is not an expense. It is an investment in future growth." />
      
      <ProcessSection />
      <ManifestoSection />
      <StatisticsCounter />
      <FAQSection />
      
      <QuoteSeparator quote="Being discovered is better than being the best-kept secret." />
      
      <CTASection />
    </main>
  );
}
