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

            <div className="hidden md:flex items-center gap-8">
              <Link 
                href="/contact"
                className="relative text-[13px] uppercase tracking-[0.1em] font-bold text-primary py-1 group overflow-hidden"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-[var(--primary-hover)]">Contact Us</span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--primary-hover)] origin-bottom-right scale-x-0 transition-transform duration-300 ease-out group-hover:origin-bottom-left group-hover:scale-x-100" />
              </Link>

              {status !== "loading" && (
                session ? (
                  <Link 
                    href={session.user?.role === "ADMIN" ? "/admin" : "/dashboard"}
                    className="flex items-center gap-2 text-[13px] uppercase tracking-[0.1em] font-bold bg-primary text-primary-foreground px-6 py-2.5 rounded-md hover:bg-[var(--primary-hover)] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
                  >
                    <UserIcon size={16} /> {session.user?.role === "ADMIN" ? "Admin Panel" : "Dashboard"}
                  </Link>
                ) : (
                  <div className="flex items-center gap-6">
                    <Link 
                      href="/auth/login"
                      className="relative text-[13px] uppercase tracking-[0.1em] font-bold text-foreground py-1 group overflow-hidden"
                    >
                      <span className="relative z-10 transition-colors duration-300 group-hover:text-accent">Log In</span>
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent origin-bottom-right scale-x-0 transition-transform duration-300 ease-out group-hover:origin-bottom-left group-hover:scale-x-100" />
                    </Link>
                    <Link 
                      href="/auth/signup"
                      className="text-[13px] uppercase tracking-[0.1em] font-bold bg-primary text-primary-foreground px-6 py-2.5 rounded-md hover:bg-[var(--primary-hover)] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
                    >
                      Sign Up
                    </Link>
                  </div>
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
                className="mt-auto pb-12 px-4 flex flex-col gap-6"
              >
                <Link 
                  href="/contact"
                  className="text-lg uppercase tracking-[0.1em] font-medium text-primary border-b border-primary pb-2 inline-block w-max"
                >
                  Contact Us
                </Link>

                {status !== "loading" && (
                  session ? (
                    <Link 
                      href={session.user?.role === "ADMIN" ? "/admin" : "/dashboard"}
                      className="flex items-center justify-center gap-2 text-sm uppercase tracking-[0.1em] font-bold bg-primary text-primary-foreground px-6 py-4 rounded-md hover:bg-primary/90 transition-all w-full text-center mt-4"
                    >
                      <UserIcon size={18} /> {session.user?.role === "ADMIN" ? "Admin Panel" : "Dashboard"}
                    </Link>
                  ) : (
                    <div className="flex flex-col gap-4 mt-4">
                      <Link 
                        href="/auth/login"
                        className="text-sm uppercase tracking-[0.1em] font-bold text-foreground border-2 border-border/50 px-6 py-4 rounded-md hover:border-foreground/30 transition-all w-full text-center"
                      >
                        Log In
                      </Link>
                      <Link 
                        href="/auth/signup"
                        className="text-sm uppercase tracking-[0.1em] font-bold bg-primary text-primary-foreground px-6 py-4 rounded-md hover:bg-primary/90 transition-all w-full text-center"
                      >
                        Sign Up
                      </Link>
                    </div>
                  )
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
