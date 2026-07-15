// components/sections/WhyChoose.tsx
"use client";

import { motion } from "framer-motion";
import { Zap, User, Database, LucideIcon } from "lucide-react";

interface Reason {
  icon: LucideIcon;
  title: string;
  proof: string;
}

const REASONS: Reason[] = [
  { icon: Zap, title: "Ships fast", proof: "Fluide AI went from concept to a live app in under two weeks." },
  { icon: User, title: "Founder-led", proof: "Direct access to the people building the product — no account managers in between." },
  { icon: Database, title: "Built on real usage", proof: "Features shaped by actual student conversations, not assumptions." },
];

export function WhyChoose() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="max-w-3xl mb-16">
          <div className="inline-block text-xs font-medium tracking-widest uppercase mb-4 px-3 py-1 rounded-pill border border-border text-muted">
            Why Nexora
          </div>
          <h2 className="text-[26px] md:text-2xl font-display font-semibold uppercase tracking-tight md:whitespace-nowrap">
            &quot;AI company&quot; isn&apos;t a differentiator. This is.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <r.icon size={22} className="text-muted mb-4" aria-hidden="true" />
              <h3 className="font-medium text-lg mb-2">{r.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{r.proof}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
