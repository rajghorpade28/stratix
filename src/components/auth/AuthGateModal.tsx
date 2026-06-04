import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AuthGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetHref: string;
}

export function AuthGateModal({ isOpen, onClose, targetHref }: AuthGateModalProps) {
  const pathname = usePathname();
  // We attach a redirect parameter so the login/signup page knows where to send them back to
  const callbackUrl = encodeURIComponent(targetHref);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-card border border-border/50 rounded-xl shadow-2xl overflow-hidden z-10"
        >
          <div className="flex justify-end p-4 pb-0">
            <button 
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
            >
              <X size={20} />
            </button>
          </div>

          <div className="px-8 pb-8 pt-2">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-3">
                Please sign in to continue
              </h2>
              <p className="text-muted-foreground text-sm">
                Create an account or sign in to start your project. We'll automatically return you to your form.
              </p>
            </div>

            <div className="bg-muted/30 rounded-lg p-5 mb-8 border border-border/40">
              <p className="text-sm font-semibold text-foreground mb-4">Create an account to:</p>
              <ul className="space-y-3">
                {[
                  "Track your project requests in real-time",
                  "View previously submitted forms",
                  "Receive critical project updates",
                  "Manage all future service requests securely",
                  "Experience faster form submissions"
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link 
                href={`/auth/signup?callbackUrl=${callbackUrl}`}
                className="flex-1 bg-primary text-primary-foreground font-semibold py-3 px-4 rounded-md hover:bg-primary/90 transition-colors text-center text-sm uppercase tracking-wide shadow-md"
              >
                Create Account
              </Link>
              <Link 
                href={`/auth/login?callbackUrl=${callbackUrl}`}
                className="flex-1 bg-card border-2 border-border text-foreground font-semibold py-3 px-4 rounded-md hover:border-foreground/30 hover:bg-muted/20 transition-all text-center text-sm uppercase tracking-wide"
              >
                Log In
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
