// components/ui/StickyMobileCTA.tsx
import { ArrowRight } from "lucide-react";
import { CALENDAR_URL, CTA_LABEL } from "@/lib/constants";

export function StickyMobileCTA() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[80] p-3 bg-ink/95 backdrop-blur-md border-t border-border">
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