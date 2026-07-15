// components/sections/FinalCTA.tsx
import { ArrowRight } from "lucide-react";
import { CALENDAR_URL, CTA_LABEL } from "@/lib/constants";

export function FinalCTA() {
  return (
    <section className="py-32 px-6 bg-accent">
      <div className="max-w-[800px] mx-auto text-center">
        <h2 className="text-[26px] md:text-2xl font-display font-semibold uppercase tracking-tight text-white mb-8">
          Ready to build with AI that ships?
        </h2>
        <a
          href={CALENDAR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-pill bg-white text-ink font-medium transition-transform duration-300 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          {CTA_LABEL} <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
