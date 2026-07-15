// components/sections/FAQ.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQS } from "@/lib/constants";

export function FAQ() {
  const [open, setOpen] = useState<number>(0);

  // FAQPage structured data for rich results / AI-overview citation
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="py-24 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-[800px] mx-auto">
        <div className="max-w-xl mb-12">
          <div className="inline-block text-xs font-medium tracking-widest uppercase mb-4 px-3 py-1 rounded-pill border border-border text-muted">
            FAQ
          </div>
          <h2 className="text-[26px] md:text-2xl font-display font-semibold tracking-tight">
            Common questions.
          </h2>
        </div>

        <div className="border-t border-border">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-border">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="w-full flex items-center justify-between py-5 text-left focus-visible-ring"
                >
                  <span className="font-medium pr-4">{item.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
                    <Plus size={18} className="text-muted shrink-0" aria-hidden="true" />
                  </motion.span>
                </button>
                <motion.div
                  id={`faq-panel-${i}`}
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-muted text-sm leading-relaxed pb-5 pr-8">{item.a}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}