// lib/constants.ts

export const WHATSAPP_URL = "https://wa.me/919389599735";

export const CTA_LABEL = "Book a Free AI Strategy Call";

export const CALENDAR_URL = "https://calendar.app.google/zAUPQk9YVVZ4Zgiz6";

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/#products" },
  { label: "Industries", href: "/#industries" },
  { label: "Company", href: "/company" },
];

export interface Product {
  name: string;
  tag: string;
  desc: string;
  initial: string;
  stat: string;
  inDevelopment?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    name: "Fluide AI",
    tag: "French · TEF/TCF",
    desc: "French fluency for Canada PR aspirants, built around real tutor conversation patterns.",
    initial: "F",
    stat: "87% avg. fluency score",
  },
  {
    name: "GermanFluide",
    tag: "German · Classrooms",
    desc: "German learning with live classes and role-based classrooms for Indian students.",
    initial: "G",
    stat: "13 adaptive learning modes",
  },
  {
    name: "Medicor AI",
    tag: "Healthcare · In development",
    desc: "AI-assisted medical guidance, built across regulatory tiers.",
    initial: "M",
    stat: "In development",
    inDevelopment: true,
  },
  {
    name: "Nexora Automation",
    tag: "Business · WhatsApp-native",
    desc: "AI sales automation for local businesses — chatbots, CRM, and auto-proposals.",
    initial: "N",
    stat: "One-time pricing model",
  },
];

export interface Industry {
  desc: string;
  products: string[];
  cta?: boolean;
}

export const INDUSTRIES: Record<string, Industry> = {
  EdTech: {
    desc: "Language learning platforms built for real exam prep and classroom delivery — from TEF/TCF conversation practice to role-based German classrooms.",
    products: ["Fluide AI", "GermanFluide"],
  },
  Healthcare: {
    desc: "AI-assisted medical guidance organized into clear regulatory tiers, built with privacy and safety as non-negotiables.",
    products: ["Medicor AI"],
  },
  "SMB & Real Estate": {
    desc: "WhatsApp-native automation for local businesses — chatbots, CRM, and voice AI with one-time pricing.",
    products: ["Nexora Automation Suite"],
  },
  "Website Development": {
    desc: "Modern websites built for every business — from startups and local businesses to schools, healthcare, restaurants, e-commerce, real estate, portfolios, and enterprise companies. Fast, responsive, SEO-friendly, and designed to convert visitors into customers.",
    products: ["Custom Websites"],
    cta: true,
  },
};


export interface FaqItem {
  q: string;
  a: string;
}

export const FAQS: FaqItem[] = [
  {
    q: "What does Nexora actually build?",
    a: "AI-powered products — currently language learning apps (Fluide AI, GermanFluide) and business automation tools, with a healthcare AI product in development.",
  },
  {
    q: "How is pricing structured?",
    a: "Products use their own pricing (subscription or one-time depending on the product). Custom automation work is quoted per project.",
  },
  {
    q: "How is my data handled?",
    a: "Data is encrypted in transit and at rest, isolated per user, and never sold to third parties. Some approval flows are manually reviewed rather than automated.",
  },
  {
    q: "How do I get started?",
    a: "Download the relevant app, or use the contact form below for business automation or enterprise inquiries.",
  },
  {
    q: "Do you take enterprise or partnership inquiries?",
    a: "Yes — reach out through the contact section and we'll follow up directly.",
  },
];

export const FOOTER_COLUMNS: Record<string, string[]> = {
  Products: ["Fluide AI", "GermanFluide", "Medicor AI", "Automation Suite"],
  Company: ["About", "Careers", "Press Kit"],
  Developers: ["API Docs", "Status"],
  Legal: ["Privacy Policy", "Terms of Service", "Security"],
};
