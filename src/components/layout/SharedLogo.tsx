"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";

interface FragmentData {
  id: string;
  clipPath: string;
  tx: number;
  ty: number;
  tr: number;
  ts: number;
}

function FragmentLayer({
  data,
  progress,
  children
}: {
  data: FragmentData;
  progress: MotionValue<number>;
  children: React.ReactNode;
}) {
  const x = useTransform(progress, [1, 0.5, 0], [0, data.tx, 0]);
  const y = useTransform(progress, [1, 0.5, 0], [0, data.ty, 0]);
  const rotate = useTransform(progress, [1, 0.5, 0], [0, data.tr, 0]);
  const scale = useTransform(progress, [1, 0.5, 0], [1, data.ts, 1]);

  return (
    <motion.div
      style={{
        clipPath: data.clipPath,
        x,
        y,
        rotate,
        scale,
        WebkitClipPath: data.clipPath
      }}
      className="absolute inset-0 origin-center will-change-transform pointer-events-none"
    >
      {children}
    </motion.div>
  );
}

export function SharedLogo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsets, setOffsets] = useState({ x: 0, y: 0, scale: 5 });
  const [fragments, setFragments] = useState<FragmentData[]>([]);
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const { scrollY } = useScroll();

  const smoothProgress = useSpring(
    useTransform(scrollY, [0, 400], [1, 0]),
    { stiffness: 80, damping: 20, restDelta: 0.001 }
  );

  useEffect(() => {
    if (!isHome) {
      setIsReady(true);
      return;
    }

    const calculateOffset = () => {
      if (!containerRef.current) return;
      
      const el = containerRef.current;
      const originalTransform = el.style.transform;
      el.style.transform = "none";
      
      const rect = el.getBoundingClientRect();
      const w = window.innerWidth;
      
      const heroTarget = document.getElementById('hero-logo-target');
      
      if (!heroTarget) {
        setIsReady(true);
        return;
      }

      const heroRect = heroTarget.getBoundingClientRect();
      
      // Calculate absolute positions relative to the document
      const absoluteHeroTop = heroRect.top + window.scrollY;
      const absoluteHeroLeft = heroRect.left + window.scrollX;
      
      const absoluteCurrentLeft = rect.left + window.scrollX;
      const absoluteCurrentTop = rect.top + window.scrollY;

      let targetScale = 1.8;
      let cols = 4;
      let rows = 4;
      
      if (w < 768) {
        targetScale = 1.2;
        cols = 3;
        rows = 2; // reduced complexity for mobile
      } else if (w < 1024) {
        targetScale = 1.5;
      }

      const scaledWidth = rect.width * targetScale;
      
      // Since transform-origin is center center, we map the center points.
      // We want the left edge of the scaled logo to touch the left edge of the target container.
      const targetCenterX = absoluteHeroLeft + scaledWidth / 2;
      // We want the vertical center of the scaled logo to match the target container's vertical center.
      const targetCenterY = absoluteHeroTop + heroRect.height / 2;
      
      // The current unscaled logo's center:
      const currentCenterX = absoluteCurrentLeft + rect.width / 2;
      const currentCenterY = absoluteCurrentTop + rect.height / 2;

      setOffsets({
        x: targetCenterX - currentCenterX,
        y: targetCenterY - currentCenterY,
        scale: targetScale
      });
      
      el.style.transform = originalTransform;
      
      // Generate fragments
      const newFragments: FragmentData[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const top = (r / rows) * 100;
          const bottom = 100 - ((r + 1) / rows) * 100;
          const left = (c / cols) * 100;
          const right = 100 - ((c + 1) / cols) * 100;

          // Scatter amount based on distance from center to push outwards
          const centerX = cols / 2 - 0.5;
          const centerY = rows / 2 - 0.5;
          const dirX = c - centerX;
          const dirY = r - centerY;
          
          const maxDisplacement = w < 768 ? 40 : 80;
          
          const tx = (dirX * maxDisplacement * 0.4) + (Math.random() - 0.5) * maxDisplacement;
          const ty = (dirY * maxDisplacement * 0.4) + (Math.random() - 0.5) * maxDisplacement;
          const tr = (Math.random() - 0.5) * 45; 
          const ts = 0.8 + Math.random() * 0.4; 

          newFragments.push({
            id: `frag-${r}-${c}`,
            clipPath: `inset(${top}% ${right}% ${bottom}% ${left}%)`,
            tx,
            ty,
            tr,
            ts
          });
        }
      }
      setFragments(newFragments);
      setIsReady(true);
    };

    calculateOffset();
    const timeoutId = setTimeout(calculateOffset, 100);
    
    window.addEventListener("resize", calculateOffset);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", calculateOffset);
    };
  }, [isHome]);

  const x = useTransform(smoothProgress, p => p * offsets.x);
  const y = useTransform(smoothProgress, p => p * offsets.y);
  const scale = useTransform(smoothProgress, [0, 1], [1, offsets.scale]);

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
      className="origin-center transform-gpu will-change-transform z-[100] relative"
    >
      {(!isHome || fragments.length === 0) ? (
        <Logo />
      ) : (
        <>
          {/* Base logo holds dimensions and handles clicks, but is visually hidden */}
          <div className="opacity-0">
            <Logo />
          </div>
          {/* Absolute fragmented layers overlay to perform the visual magic */}
          {fragments.map(frag => (
            <FragmentLayer key={frag.id} data={frag} progress={smoothProgress}>
              <Logo />
            </FragmentLayer>
          ))}
        </>
      )}
    </motion.div>
  );
}
