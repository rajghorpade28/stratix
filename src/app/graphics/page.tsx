import { GraphicsPricing } from "@/components/sections/GraphicsPricing";
import { CTASection } from "@/components/sections/CTASection";

export const metadata = {
  title: "Graphics Services | STRATIX",
  description: "Premium graphics and banner design services by STRATIX.",
};

export default function GraphicsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Graphics Hero Section */}
      <section className="relative pt-[180px] pb-20 md:pt-[240px] md:pb-32 overflow-hidden bg-background">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        
        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            
            <div className="mb-6 flex justify-center">
              <span className="text-sm font-medium tracking-[0.1em] text-accent uppercase px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
                Creative Studio
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-heading font-bold tracking-tight leading-[1.1] mb-8 text-foreground">
              Visuals that make your brand <span className="text-accent italic font-serif font-medium">unforgettable.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-sans max-w-2xl mx-auto mb-12">
              From one-off festival banners to complete monthly graphics subscriptions, we deliver high-end design that builds trust and drives engagement.
            </p>
            
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <GraphicsPricing />

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}
