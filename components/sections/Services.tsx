// components/sections/Services.tsx
"use client";

import { motion } from "framer-motion";
import { Bot, Workflow, Smartphone, Lightbulb, LucideIcon } from "lucide-react";

interface Service {
  icon: LucideIcon;
  name: string;
  desc: string;
}

const SERVICES: Service[] = [
  { icon: Bot, name: "AI Integration", desc: "Embed AI capabilities into your existing product or workflow." },
  { icon: Workflow, name: "Custom Automation", desc: "WhatsApp, CRM, and voice automation built for your business." },
  { icon: Smartphone, name: "Mobile App Development", desc: "Flutter-based apps, from prototype to app store." },
  { icon: Lightbulb, name: "AI Consulting", desc: "Strategy and technical guidance for teams adopting AI." },
];

export function Services() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="max-w-xl mb-16">
          <div className="inline-block text-xs font-medium tracking-widest uppercase mb-4 px-3 py-1 rounded-pill border border-accent text-accent">
            Services
          </div>
          <h2 className="text-3xl md:text-2xl font-display font-semibold tracking-tight">
            Capabilities you can hire us for.
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
              <s.icon size={22} className="text-accent mb-4" aria-hidden="true" />
              <h3 className="font-medium mb-2">{s.name}</h3>
              <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
