"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { requestPasswordReset, resetPassword } from "@/actions/reset-password";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await requestPasswordReset(email);
      if (res.error) {
        setError(res.error);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await resetPassword(token as string, password);
      if (res.error) {
        setError(res.error);
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (success && !token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-card border border-border/50 rounded-lg shadow-xl p-8 text-center"
        >
          <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Check your email</h2>
          <p className="text-muted-foreground mb-8">
            If an account exists with {email}, we have sent a password reset link to it.
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
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
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
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-card border border-border/50 rounded-lg shadow-xl p-8"
        >
          <div className="mb-8">
            <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Set New Password</h1>
            <p className="text-muted-foreground text-sm">Please enter your new password below.</p>
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleResetSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">New Password</label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                minLength={8}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Confirm New Password</label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
                minLength={8}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-md hover:bg-primary/90 transition-colors flex justify-center items-center gap-2 shadow-md mt-4"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : "Update Password"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
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

        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleRequestSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email Address</label>
            <Input 
              type="email" 
              placeholder="name@company.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-md hover:bg-primary/90 transition-colors flex justify-center items-center gap-2 shadow-md mt-4"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : "Send Reset Link"}
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
