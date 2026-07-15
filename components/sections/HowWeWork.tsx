// components/sections/HowWeWork.tsx
"use client";

import { motion } from "framer-motion";
import { PhoneCall, Hammer, Rocket } from "lucide-react";

const STEPS = [
  {
    icon: PhoneCall,
    title: "Free strategy call",
    desc: "We map your bottleneck and where AI pays off fastest — no generic pitch, just your actual workflow.",
  },
  {
    icon: Hammer,
    title: "We build & ship",
    desc: "Founder led, in weeks. You see progress along the way, not silence until a big reveal.",
  },
  {
    icon: Rocket,
    title: "Live & supported",
    desc: "It goes live, and you talk directly to the people who built it — not an account manager.",
  },
];

export function HowWeWork() {
  return (
    <section className="py-24 px-6 border-t border-border">
      <div className="max-w-[1280px] mx-auto">
        <div className="max-w-xl mb-16">
          <div className="inline-block text-xs font-medium tracking-widest uppercase mb-4 px-3 py-1 rounded-pill border border-border text-muted">
            How We Work
          </div>
          <h2 className="text-[26px] md:text-2xl font-display font-semibold uppercase tracking-tight">
            Three steps. No handoffs.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-bg-secondary border border-border flex items-center justify-center shrink-0">
                  <step.icon size={16} className="text-muted" aria-hidden="true" />
                </div>
                <span className="text-xs text-muted font-mono">0{i + 1}</span>
              </div>
              <h3 className="font-medium text-lg mb-2">{step.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
