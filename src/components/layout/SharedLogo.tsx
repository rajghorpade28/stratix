"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";

export function SharedLogo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsets, setOffsets] = useState({ x: 0, y: 0 });
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // We want to scrub from scrollY 0 to 400
  const { scrollY } = useScroll();

  // Create smooth springs for the transform to ensure premium feel
  const smoothProgress = useSpring(
    useTransform(scrollY, [0, 400], [1, 0]),
    { stiffness: 100, damping: 25, restDelta: 0.001 }
  );

  useEffect(() => {
    if (!isHome) {
      setIsReady(true);
      return;
    }

    const calculateOffset = () => {
      if (!containerRef.current) return;
      
      // Temporarily remove transforms to get accurate natural position
      const el = containerRef.current;
      const originalTransform = el.style.transform;
      el.style.transform = "none";
      
      const rect = el.getBoundingClientRect();
      
      // Target center of the viewport
      const targetX = window.innerWidth / 2;
      // Target upper center of the viewport to leave room for hero text below
      const targetY = window.innerHeight * 0.25;
      
      // Current center of the element in its natural navbar position
      const currentX = rect.left + rect.width / 2;
      const currentY = rect.top + rect.height / 2;
      
      setOffsets({
        x: targetX - currentX,
        y: targetY - currentY
      });
      
      // Restore transform
      el.style.transform = originalTransform;
      setIsReady(true);
    };

    // Calculate on mount and a slight delay to ensure fonts/layout are loaded
    calculateOffset();
    const timeoutId = setTimeout(calculateOffset, 100);
    
    window.addEventListener("resize", calculateOffset);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", calculateOffset);
    };
  }, [isHome]);

  // Calculate dynamic transform values based on scroll
  const x = useTransform(smoothProgress, p => p * offsets.x);
  const y = useTransform(smoothProgress, p => p * offsets.y);
  
  // Scale from 1 (navbar) to 6 (hero) - large but leaves room for text
  const scale = useTransform(smoothProgress, [0, 1], [1, 6]);

  // If not on home page or not ready yet, keep in navbar position (but hide until ready to avoid flash)
  const finalX = isHome ? x : 0;
  const finalY = isHome ? y : 0;
  const finalScale = isHome ? scale : 1;
  const opacity = isReady ? 1 : 0;

  return (
    <motion.div
      ref={containerRef}
      style={{
        x: finalX,
        y: finalY,
        scale: finalScale,
        opacity,
        transformOrigin: "center center",
      }}
      className="origin-center transform-gpu will-change-transform z-[100]"
    >
      <Logo />
    </motion.div>
  );
}
