// app/company/page.tsx
import type { Metadata } from "next";
import { ArrowRight, Bot, Globe, Workflow, GraduationCap, Code2, Palette, Sparkles, Zap, LifeBuoy } from "lucide-react";
import { CALENDAR_URL, CTA_LABEL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Company — Nexora Technologies",
  description:
    "Nexora develops AI software and modern digital solutions for businesses, education, healthcare, and organizations worldwide.",
};

const WHAT_WE_BUILD = [
  {
    icon: Bot,
    name: "AI Applications",
    desc: "Conversational AI, automation engines, and intelligent product features built on production grade infrastructure.",
  },
  {
    icon: Globe,
    name: "Website Development",
    desc: "Fast, responsive, SEO friendly websites for startups, local businesses, schools, healthcare, and enterprise.",
  },
  {
    icon: Workflow,
    name: "Business Automation",
    desc: "WhatsApp native chatbots, CRM integrations, and workflow automation that reduce manual work.",
  },
  {
    icon: GraduationCap,
    name: "Educational Platforms",
    desc: "Role based learning platforms with live classes, adaptive content, and student progress tracking.",
  },
  {
    icon: Code2,
    name: "Custom Software",
    desc: "Tailored applications built around a specific business process, from prototype to production.",
  },
];

const WHY_CHOOSE = [
  { icon: Palette, title: "Modern Design", desc: "Premium, minimal interfaces built with the same care as top tier product companies." },
  { icon: Sparkles, title: "AI First", desc: "AI is built into the product from day one, not bolted on as an afterthought." },
  { icon: Zap, title: "Fast Development", desc: "Founder led execution means fewer handoffs and faster shipping." },
  { icon: LifeBuoy, title: "Long term Support", desc: "Direct access to the team that built your product, long after launch." },
];

const FOCUS_AREAS = [
  "AI Products",
  "Website Development",
  "Business Automation",
  "Language Learning Solutions",
  "Healthcare AI",
];

export default function CompanyPage() {
  return (
    <main className="bg-ink text-text-primary pb-24 md:pb-0">
      {/* HERO */}
      <section className="relative max-w-[1280px] mx-auto px-6 pt-40 pb-24 md:pt-48 md:pb-32 text-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 900px 600px at 50% 0%, rgba(232,84,42,0.10), transparent 60%)",
          }}
        />
        <div className="relative max-w-2xl mx-auto">
          <div className="inline-block text-xs font-medium tracking-widest uppercase mb-6 px-3 py-1 rounded-pill border border-border text-muted">
            Company
          </div>
          <h1 className="text-4xl md:text-3xl font-display font-semibold leading-[1.1] uppercase tracking-tight mb-6">
            Building AI products that solve real problems.
          </h1>
          <p className="text-lg text-muted mb-10 leading-relaxed">
            Nexora develops AI software and modern digital solutions for businesses, education, healthcare, and organizations worldwide.
          </p>
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 focus-visible-ring"
          >
            {CTA_LABEL} <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* ABOUT NEXORA */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-[1280px] mx-auto">
          <div className="max-w-4xl mb-10">
            <div className="inline-block text-xs font-medium tracking-widest uppercase mb-4 px-3 py-1 rounded-pill border border-border text-muted">
              About Nexora
            </div>
            <h2 className="text-[26px] md:text-2xl font-display font-semibold uppercase tracking-tight mb-6">
              We build production-ready software, not prototypes.
            </h2>
            <p className="text-muted text-lg leading-relaxed">
              Nexora is an AI technology company focused on shipping real, working products —
              not pitch decks or proof-of-concepts. Our work spans AI products, website
              development, business automation, language learning solutions, and healthcare AI,
              built with the same production standards regardless of industry.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {FOCUS_AREAS.map((area) => (
              <span key={area} className="text-xs px-3 py-1.5 rounded-pill border border-border text-muted">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-[1280px] mx-auto">
          <div className="max-w-xl mx-auto mb-16 text-center">
            <div className="inline-block text-xs font-medium tracking-widest uppercase mb-4 px-3 py-1 rounded-pill border border-border text-muted">
              What We Build
            </div>
            <h2 className="text-[26px] md:text-2xl font-display font-semibold uppercase tracking-tight">
              Five capabilities, one team.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHAT_WE_BUILD.map((item) => (
              <div key={item.name} className="rounded-lg border border-border bg-bg-secondary p-6 text-center flex flex-col items-center">
                <item.icon size={22} className="text-muted mb-4" aria-hidden="true" />
                <h3 className="font-medium text-lg mb-2">{item.name}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY BUSINESSES CHOOSE NEXORA */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-[1280px] mx-auto">
          <div className="max-w-xl mx-auto mb-16 text-center">
            <div className="inline-block text-xs font-medium tracking-widest uppercase mb-4 px-3 py-1 rounded-pill border border-border text-muted">
              Why Nexora
            </div>
            <h2 className="text-[26px] md:text-2xl font-display font-semibold uppercase tracking-tight">
              Why businesses choose Nexora.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px border border-border rounded-lg overflow-hidden">
            {WHY_CHOOSE.map((item) => (
              <div key={item.title} className="bg-ink p-6 hover:bg-bg-secondary transition-colors duration-300 text-center flex flex-col items-center">
                <item.icon size={22} className="text-muted mb-4" aria-hidden="true" />
                <h3 className="font-medium mb-2">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 bg-accent">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-[26px] md:text-2xl font-display font-semibold uppercase tracking-tight text-white mb-8">
            Let&apos;s build something exceptional together.
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
    </main>
  );
}
