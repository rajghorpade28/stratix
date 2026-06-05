"use client";

import { useState, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { verifyEmailOTP, resendVerificationOTP } from "@/actions/auth";

function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const email = searchParams.get("email") || "";
  const callbackUrl = searchParams.get("callbackUrl") || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pastedValue = value.slice(0, 6).split("");
      const newOtp = [...otp];
      pastedValue.forEach((char, i) => {
        if (index + i < 6) newOtp[index + i] = char;
      });
      setOtp(newOtp);
      
      // Focus the next empty input or the last one
      const nextIndex = Math.min(index + pastedValue.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      // Backspace goes to previous input if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    
    if (code.length !== 6) {
      setError("Please enter the complete 6-digit code.");
      return;
    }

    if (!email) {
      setError("Email address is missing. Please try logging in again.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccessMsg("");

    const result = await verifyEmailOTP(email, code);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      router.push(`/auth/login?verified=true&email=${encodeURIComponent(email)}${callbackUrl ? `&callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    setIsResending(true);
    setError("");
    setSuccessMsg("");
    
    const result = await resendVerificationOTP(email);
    
    if (result.error) {
      setError(result.error);
    } else {
      setSuccessMsg("A new verification code has been sent to your email!");
    }
    setIsResending(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 pt-32 pb-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-card border border-border/50 rounded-lg shadow-xl p-8 text-center"
      >
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Check your email</h1>
        <p className="text-muted-foreground text-sm mb-8">
          We've sent a 6-digit verification code to <br/>
          <span className="font-semibold text-foreground">{email || "your email"}</span>
        </p>

        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-6">
            {error}
          </div>
        )}
        
        {successMsg && (
          <div className="bg-green-500/10 text-green-600 text-sm p-3 rounded-md mb-6">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-2 sm:gap-3 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={6}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => { inputRefs.current[index] = el; }}
                className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold bg-muted/50 border border-border/50 rounded-md focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading || otp.join("").length !== 6}
            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-md hover:bg-primary/90 transition-colors flex justify-center items-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : "Verify Account"}
          </button>
        </form>

        <div className="mt-8 text-sm text-muted-foreground flex items-center justify-center gap-2">
          Didn't receive the code?{" "}
          <button 
            onClick={handleResend} 
            disabled={isResending}
            className="text-foreground font-semibold hover:text-accent transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isResending ? <Loader2 size={12} className="animate-spin" /> : null}
            Try again
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>}>
      <VerifyEmailForm />
    </Suspense>
  );
}
