// components/sections/Industries.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { INDUSTRIES } from "@/lib/constants";

export function Industries() {
  const [active, setActive] = useState<string>("EdTech");

  return (
    <section id="industries" className="py-24 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="max-w-xl mb-12">
          <div className="inline-block text-xs font-medium tracking-widest uppercase mb-4 px-3 py-1 rounded-pill border border-accent text-accent">
            Industries
          </div>
          <h2 className="text-3xl md:text-2xl font-display font-semibold tracking-tight">
            Where Nexora fits.
          </h2>
        </div>

        <div role="tablist" aria-label="Industries" className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {Object.keys(INDUSTRIES).map((key) => (
            <button
              key={key}
              role="tab"
              aria-selected={active === key}
              onClick={() => setActive(key)}
              className={`px-5 py-2.5 rounded-pill text-sm font-medium whitespace-nowrap transition-colors duration-300 focus-visible-ring ${
                active === key
                  ? "bg-accent text-white border-none"
                  : "text-muted border border-border"
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            role="tabpanel"
            className="rounded-lg border border-border bg-bg-secondary p-8"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <p className="text-text-primary text-lg leading-relaxed mb-6 max-w-2xl">
              {INDUSTRIES[active].desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {INDUSTRIES[active].products.map((p) => (
                <span key={p} className="text-xs px-3 py-1.5 rounded-pill border border-border text-muted">
                  {p}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
