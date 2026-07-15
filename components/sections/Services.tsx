// components/sections/Services.tsx
"use client";

import { motion } from "framer-motion";
import { Bot, Workflow, Lightbulb, Layers } from "lucide-react";

const SERVICES = [
  { icon: Bot, name: "AI Applications & Chatbots", desc: "Custom AI assistants that answer customers, qualify leads, and work 24/7." },
  { icon: Workflow, name: "Business & Workflow Automation", desc: "WhatsApp, CRM, and internal automation that cuts manual, repetitive work." },
  { icon: Lightbulb, name: "AI Integration & Consulting", desc: "Strategy and hands-on implementation for teams adopting AI." },
  { icon: Layers, name: "Full product build", desc: "Need the website, app, or custom software around your AI? We build it in-house — one team, no handoffs." },
];

export function Services() {
  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="max-w-xl mb-16">
          <div className="inline-block text-xs font-medium tracking-widest uppercase mb-4 px-3 py-1 rounded-pill border border-border text-muted">
            Services
          </div>
          <h2 className="text-[26px] md:text-2xl font-display font-semibold uppercase tracking-tight">
            What we do.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px border border-border rounded-lg overflow-hidden">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.name}
              className="bg-ink p-6 hover:bg-bg-secondary transition-colors duration-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <s.icon size={22} className="text-muted mb-4" aria-hidden="true" />
              <h3 className="font-medium mb-2">{s.name}</h3>
              <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
