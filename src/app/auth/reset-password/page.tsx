"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { requestPasswordResetSchema, resetPasswordSchema } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { requestPasswordReset, resetPassword } from "@/actions/reset-password";

type RequestFormValues = z.infer<typeof requestPasswordResetSchema>;
type ResetFormValues = z.infer<typeof resetPasswordSchema>;

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [globalError, setGlobalError] = useState("");
  const [success, setSuccess] = useState(false);
  const [requestEmail, setRequestEmail] = useState("");

  const {
    register: registerRequest,
    handleSubmit: handleSubmitRequest,
    formState: { errors: requestErrors, isSubmitting: isSubmittingRequest },
  } = useForm<RequestFormValues>({
    resolver: zodResolver(requestPasswordResetSchema),
    defaultValues: { email: "" },
  });

  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    formState: { errors: resetErrors, isSubmitting: isSubmittingReset },
  } = useForm<ResetFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onRequestSubmit = async (data: RequestFormValues) => {
    setGlobalError("");
    try {
      const res = await requestPasswordReset(data.email);
      if (res.error) {
        setGlobalError(res.error);
      } else {
        setRequestEmail(data.email);
        setSuccess(true);
      }
    } catch (err) {
      setGlobalError("An unexpected error occurred");
    }
  };

  const onResetSubmit = async (data: ResetFormValues) => {
    setGlobalError("");
    try {
      const res = await resetPassword(token as string, data.password);
      if (res.error) {
        setGlobalError(res.error);
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      }
    } catch (err) {
      setGlobalError("An unexpected error occurred");
    }
  };

  if (success && !token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4 pt-24 pb-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-card border border-border/50 rounded-lg shadow-xl p-8 text-center"
        >
          <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Check your email</h2>
          <p className="text-muted-foreground mb-8">
            If an account exists with {requestEmail}, we have sent a password reset link to it.
          </p>
          <Link href="/auth/login" className="text-primary font-semibold hover:underline">
            Return to Login
          </Link>
        </motion.div>
      </div>
    );
  }

  if (success && token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4 pt-24 pb-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-card border border-border/50 rounded-lg shadow-xl p-8 text-center"
        >
          <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Password Reset Successful!</h2>
          <p className="text-muted-foreground mb-8">
            Your password has been securely updated. Redirecting to login...
          </p>
        </motion.div>
      </div>
    );
  }

  if (token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4 pt-24 pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-card border border-border/50 rounded-lg shadow-xl p-8"
        >
          <div className="mb-8">
            <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Set New Password</h1>
            <p className="text-muted-foreground text-sm">Please enter your new password below.</p>
          </div>

          {globalError && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-6 flex items-center gap-2">
              <AlertCircle size={16} />
              {globalError}
            </div>
          )}

          <form onSubmit={handleSubmitReset(onResetSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">New Password</label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                {...registerReset("password")}
                className={resetErrors.password ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {resetErrors.password && <p className="text-xs text-destructive mt-1">{resetErrors.password.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Confirm New Password</label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                {...registerReset("confirmPassword")}
                className={resetErrors.confirmPassword ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {resetErrors.confirmPassword && <p className="text-xs text-destructive mt-1">{resetErrors.confirmPassword.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmittingReset}
              className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-md hover:bg-primary/90 transition-colors flex justify-center items-center gap-2 shadow-md mt-4 disabled:opacity-50"
            >
              {isSubmittingReset ? <Loader2 size={18} className="animate-spin" /> : "Update Password"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 pt-24 pb-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-card border border-border/50 rounded-lg shadow-xl p-8"
      >
        <Link href="/auth/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to login
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Reset Password</h1>
          <p className="text-muted-foreground text-sm">Enter your email address and we'll send you a link to reset your password.</p>
        </div>

        {globalError && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-6 flex items-center gap-2">
            <AlertCircle size={16} />
            {globalError}
          </div>
        )}

        <form onSubmit={handleSubmitRequest(onRequestSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email Address</label>
            <Input 
              type="email" 
              placeholder="name@company.com" 
              {...registerRequest("email")}
              className={requestErrors.email ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {requestErrors.email && <p className="text-xs text-destructive mt-1">{requestErrors.email.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmittingRequest}
            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-md hover:bg-primary/90 transition-colors flex justify-center items-center gap-2 shadow-md mt-4 disabled:opacity-50"
          >
            {isSubmittingRequest ? <Loader2 size={18} className="animate-spin" /> : "Send Reset Link"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
