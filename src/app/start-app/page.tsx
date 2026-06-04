import { AppOnboardingFlow } from "@/components/app-onboarding/AppOnboardingFlow";

export const metadata = {
  title: "Start Your App Project | STRATIX",
  description: "Tell us about your application requirements to get started.",
};

export default function StartAppProjectPage() {
  return (
    <main className="min-h-screen bg-background">
      <AppOnboardingFlow />
    </main>
  );
}
