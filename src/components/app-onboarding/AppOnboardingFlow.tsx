"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { initialAppOnboardingData, AppOnboardingData } from "@/types/appOnboarding";
import { ProgressTracker } from "@/components/onboarding/ProgressTracker";
import { Step1AppType, Step2GoalPlatform, Step3AuthScreens, Step4Design } from "./AppStepsPart1";
import { Step5FeaturesStorage, Step6ScaleAdmin, Step7SecurityIntegrations } from "./AppStepsPart2";
import { Step8BusinessAssets, Step9Additional, AppStepSuccess } from "./AppStepsPart3";
import { ArrowLeft, ArrowRight, CheckCircle, Loader2 } from "lucide-react";

const TOTAL_STEPS = 9;
const STEP_NAMES = [
  "App Type & Users",
  "Goals & Platforms",
  "Auth & Screens",
  "Design Style",
  "Core Features",
  "Scale & Admin",
  "Security & APIs",
  "Business & Assets",
  "Additional Reqs",
];

export function AppOnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<AppOnboardingData>(initialAppOnboardingData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateData = (updates: Partial<AppOnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS + 1) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate submission delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error(error);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const variants = {
    initial: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 300, damping: 30 }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.2 }
    })
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center pt-24 px-6">
        <AppStepSuccess />
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1AppType data={data} updateData={updateData} />;
      case 2: return <Step2GoalPlatform data={data} updateData={updateData} />;
      case 3: return <Step3AuthScreens data={data} updateData={updateData} />;
      case 4: return <Step4Design data={data} updateData={updateData} />;
      case 5: return <Step5FeaturesStorage data={data} updateData={updateData} />;
      case 6: return <Step6ScaleAdmin data={data} updateData={updateData} />;
      case 7: return <Step7SecurityIntegrations data={data} updateData={updateData} />;
      case 8: return <Step8BusinessAssets data={data} updateData={updateData} />;
      case 9: return <Step9Additional data={data} updateData={updateData} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-[90vh] pt-24 pb-16 px-4 sm:px-6 flex flex-col">
      <div className="w-full max-w-2xl mx-auto flex-1 flex flex-col">
        <ProgressTracker 
          currentStep={currentStep} 
          totalSteps={TOTAL_STEPS} 
          stepName={STEP_NAMES[currentStep - 1]} 
        />

        <div className="relative flex-1 flex flex-col justify-center min-h-[350px]">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentStep}
              custom={direction}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full bg-background"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 pt-6 border-t border-border/50 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          {currentStep > 1 ? (
            <button
              onClick={handleBack}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-md font-semibold transition-colors text-muted-foreground hover:text-foreground hover:bg-accent/20 w-full sm:w-auto"
            >
              <ArrowLeft size={18} />
              Back
            </button>
          ) : (
            <div className="hidden sm:block"></div>
          )}

          {currentStep < TOTAL_STEPS ? (
            <button
              onClick={handleNext}
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-md font-semibold transition-colors bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto shadow-md"
            >
              Continue
              <ArrowRight size={18} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-md font-bold transition-colors bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto shadow-lg shadow-accent/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  Submitting...
                  <Loader2 size={20} className="animate-spin" />
                </>
              ) : (
                <>
                  Submit Requirements
                  <CheckCircle size={20} />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
