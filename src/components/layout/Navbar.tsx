"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User as UserIcon } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { SharedLogo } from "@/components/layout/SharedLogo";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
          isScrolled
            ? "bg-[#F1ECFA]/95 backdrop-blur-md py-4 shadow-md border-b border-[#E6E1ED]"
            : "bg-transparent py-8"
        )}
      >
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex-shrink-0">
              <SharedLogo />
            </div>

            <div className="hidden md:flex items-center gap-6">
              <Link 
                href="/contact"
                className="text-[13px] uppercase tracking-[0.1em] font-medium text-primary border-b border-primary/30 pb-1 hover:text-[var(--primary-hover)] hover:border-[var(--primary-hover)] transition-all"
              >
                Contact Us
              </Link>

              {status !== "loading" && (
                session ? (
                  <Link 
                    href="/dashboard"
                    className="flex items-center gap-2 text-[13px] uppercase tracking-[0.1em] font-medium bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-all"
                  >
                    <UserIcon size={16} /> Dashboard
                  </Link>
                ) : (
                  <Link 
                    href="/auth/login"
                    className="text-[13px] uppercase tracking-[0.1em] font-medium text-foreground hover:text-accent transition-all"
                  >
                    Log In
                  </Link>
                )
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-foreground -mr-2"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#F1ECFA] md:hidden"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex items-center justify-between mb-16">
                <Logo />
                <button
                  className="p-2 text-foreground -mr-2"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mt-auto pb-12 px-4"
              >
                <Link 
                  href="/contact"
                  className="text-lg uppercase tracking-[0.1em] font-medium text-primary border-b border-primary pb-2 inline-block"
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
