// app/layout.tsx
import type { Metadata } from "next";
import { ThemeProvider } from "@/hooks/useTheme";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingAIWidget } from "@/components/ai-widget/FloatingAIWidget";
import { StickyMobileCTA } from "@/components/ui/StickyMobileCTA";
import "./globals.css";

const SITE_URL = "https://nexoratech.example.com"; // replace with real domain

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "AI Automation & Chatbot Development Agency | Nexora Technologies",
  description:
    "We build custom AI chatbots, WhatsApp automation & software for growing businesses — shipped fast by founders, not agencies. Book a free strategy call.",
  keywords: [
    "AI chatbot development company",
    "WhatsApp automation for business",
    "custom AI automation services",
    "hire AI developers",
    "AI automation agency",
  ],
  openGraph: {
    title: "AI Automation & Chatbot Development Agency | Nexora Technologies",
    description:
      "Custom AI chatbots, WhatsApp automation, and software for growing businesses — shipped fast by founders, not agencies.",
    url: SITE_URL,
    siteName: "Nexora Technologies",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation & Chatbot Development Agency | Nexora Technologies",
    description:
      "Custom AI chatbots, WhatsApp automation, and software for growing businesses — shipped fast by founders.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Nexora Technologies",
  url: SITE_URL,
  logo: `${SITE_URL}/logo/nexora-mark.png`,
  sameAs: [
    "https://twitter.com/nexoratech",
    "https://linkedin.com/company/nexoratech",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
          <FloatingAIWidget />
          <StickyMobileCTA />
        </ThemeProvider>
      </body>
    </html>
  );
}
