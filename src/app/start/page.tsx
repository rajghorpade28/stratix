import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";

export const metadata = {
  title: "Start Your Project | STRATIX",
  description: "Tell us about your project requirements to get started.",
};

export default function StartProjectPage() {
  return (
    <main className="min-h-screen bg-background">
      <OnboardingFlow />
    </main>
  );
}
