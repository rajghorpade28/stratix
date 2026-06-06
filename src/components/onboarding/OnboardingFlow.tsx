"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { initialOnboardingData, OnboardingData } from "@/types/onboarding";
import { ProgressTracker } from "./ProgressTracker";
import { submitWebsiteRequest } from "@/actions/submissions";
import { Step1WebsiteType, Step2Goal, Step3Pages, Step4Design } from "./StepsPart1";
import { Step5Features, Step6Storage, Step7BusinessInfo, Step8Content, Step9Summary, StepSuccess } from "./StepsPart2";
import { ArrowLeft, ArrowRight, CheckCircle, Loader2 } from "lucide-react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitWebsiteRequest(data);
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
      case 7: return <Step7BusinessInfo data={data} updateData={updateData} onValidSubmit={handleNext} />;
      case 8: return <Step8Content data={data} updateData={updateData} />;
      case 9: return <Step9Summary data={data} />;
      default: return null;
    }
  };

  const isSummary = currentStep === TOTAL_STEPS + 1;

  return (
    <div className="min-h-[90vh] pt-24 pb-16 px-4 sm:px-6 flex flex-col">
      <div className="w-full max-w-2xl mx-auto flex-1 flex flex-col">
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

        <div className="relative flex-1 flex flex-col justify-center min-h-[350px]">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentStep}
              custom={direction}
              variants={{
                initial: (dir: number) => ({
                  x: dir > 0 ? 80 : -80,
                  y: 20,
                  opacity: 0,
                  scale: 0.95
                }),
                animate: {
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  transition: { type: "spring" as const, stiffness: 350, damping: 30 }
                },
                exit: (dir: number) => ({
                  x: dir > 0 ? -80 : 80,
                  y: -20,
                  opacity: 0,
                  scale: 0.95,
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                })
              }}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full bg-transparent"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          {currentStep > 1 ? (
            <button
              onClick={handleBack}
              className="group flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl font-bold transition-all text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 w-full sm:w-auto"
            >
              <ArrowLeft size={18} className="transform group-hover:-translate-x-1 transition-transform" />
              Back
            </button>
          ) : (
            <div className="hidden sm:block"></div>
          )}

          {!isSummary ? (
            currentStep === 7 ? (
              <button
                type="submit"
                form="step7-form"
                className="group relative flex items-center justify-center gap-3 px-10 py-4 rounded-xl font-bold transition-all bg-foreground text-background hover:scale-[1.02] active:scale-95 w-full sm:w-auto shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300 blur-md"></div>
                <span className="relative z-10">Continue</span>
                <ArrowRight size={18} className="relative z-10 transform group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="group relative flex items-center justify-center gap-3 px-10 py-4 rounded-xl font-bold transition-all bg-foreground text-background hover:scale-[1.02] active:scale-95 w-full sm:w-auto shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300 blur-md"></div>
                <span className="relative z-10">Continue</span>
                <ArrowRight size={18} className="relative z-10 transform group-hover:translate-x-1 transition-transform" />
              </button>
            )
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="group relative flex items-center justify-center gap-3 px-10 py-4 rounded-xl font-bold transition-all bg-gradient-to-r from-primary to-accent text-white hover:scale-[1.02] active:scale-95 w-full sm:w-auto shadow-[0_10px_30px_rgba(124,58,237,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <span className="relative z-10">Submitting Project...</span>
                  <Loader2 size={20} className="relative z-10 animate-spin" />
                </>
              ) : (
                <>
                  <span className="relative z-10">Submit Requirements</span>
                  <CheckCircle size={20} className="relative z-10 transform group-hover:scale-110 transition-transform" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
