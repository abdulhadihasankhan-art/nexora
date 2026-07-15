// components/ui/StickyMobileCTA.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { CALENDAR_URL, CTA_LABEL } from "@/lib/constants";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const ticking = useRef(false);

  // Only shows up once the visitor has scrolled roughly past the hero's
  // own CTA — keeps the first screen clean instead of duplicating buttons.
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setVisible(window.scrollY > window.innerHeight * 0.6);
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-[80] p-3 bg-ink border-t border-border shadow-[0_-8px_24px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-out"
      style={{ transform: visible ? "translateY(0)" : "translateY(100%)" }}
    >
      <a
        href={CALENDAR_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary w-full flex items-center justify-center gap-2 focus-visible-ring"
      >
        {CTA_LABEL} <ArrowRight size={16} aria-hidden="true" />
      </a>
    </div>
  );
}
