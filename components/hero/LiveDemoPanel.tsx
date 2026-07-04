// components/hero/LiveDemoPanel.tsx
"use client";

import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

export default function LiveDemoPanel() {
  return (
    <motion.div
      className="relative mt-16 rounded-lg border border-border bg-bg-secondary p-8"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-2 mb-2">
        <MessageSquare size={18} className="text-accent" aria-hidden="true" />
        <h3 className="font-medium">Try a real conversation — no signup</h3>
      </div>
      <p className="text-sm text-muted mb-4">
        Sample of the actual Fluide AI engine, not a scripted demo.
      </p>
      <div className="border border-border rounded-md p-4 text-sm text-muted">
        [Interactive widget mounts here — code-split so it never adds to the
        initial homepage bundle]
      </div>
    </motion.div>
  );
}
