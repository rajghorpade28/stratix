"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { initialOnboardingData, OnboardingData } from "@/types/onboarding";
import { ProgressTracker } from "./ProgressTracker";
import { Step1WebsiteType, Step2Goal, Step3Pages, Step4Design } from "./StepsPart1";
import { Step5Features, Step6Storage, Step7BusinessInfo, Step8Content, Step9Summary, StepSuccess } from "./StepsPart2";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const TOTAL_STEPS = 8;
const STEP_NAMES = [
  "Website Type",
  "Primary Goal",
  "Required Pages",
  "Design Style",
  "Features",
  "Storage & Usage",
  "Business Info",
  "Content & Notes",
  "Summary"
];

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<OnboardingData>(initialOnboardingData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateData = (updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS + 1) { // +1 for Summary page
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

  const handleSubmit = () => {
    // In a real app, send data to backend here.
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        <StepSuccess />
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1WebsiteType data={data} updateData={updateData} />;
      case 2: return <Step2Goal data={data} updateData={updateData} />;
      case 3: return <Step3Pages data={data} updateData={updateData} />;
      case 4: return <Step4Design data={data} updateData={updateData} />;
      case 5: return <Step5Features data={data} updateData={updateData} />;
      case 6: return <Step6Storage data={data} updateData={updateData} />;
      case 7: return <Step7BusinessInfo data={data} updateData={updateData} />;
      case 8: return <Step8Content data={data} updateData={updateData} />;
      case 9: return <Step9Summary data={data} />;
      default: return null;
    }
  };

  const isSummary = currentStep === TOTAL_STEPS + 1;

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {!isSummary && (
          <ProgressTracker 
            currentStep={currentStep} 
            totalSteps={TOTAL_STEPS} 
            stepName={STEP_NAMES[currentStep - 1]} 
          />
        )}
        {isSummary && (
          <div className="mb-12 flex justify-center">
            <div className="bg-primary/10 text-primary px-6 py-2 rounded-full font-bold uppercase tracking-wider text-sm">
              Review & Finalize
            </div>
          </div>
        )}

        <div className="relative min-h-[500px]">
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

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
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

          {!isSummary ? (
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
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-md font-bold transition-colors bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto shadow-lg shadow-accent/20"
            >
              Submit Requirements
              <CheckCircle size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
