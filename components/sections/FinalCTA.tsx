// components/sections/FinalCTA.tsx
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-32 px-6 bg-accent">
      <div className="max-w-[800px] mx-auto text-center">
        <h2 className="text-3xl md:text-2xl font-display font-semibold tracking-tight text-white mb-8">
          Ready to build with AI that ships?
        </h2>
        <button className="inline-flex items-center gap-2 px-8 py-4 rounded-pill bg-white text-ink font-medium transition-transform duration-300 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
          Book a Call <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
