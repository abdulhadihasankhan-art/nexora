// app/page.tsx
import { Hero } from "@/components/hero/Hero";
import { SocialProof } from "@/components/sections/SocialProof";
import { Services } from "@/components/sections/Services";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { ProductsShowcase } from "@/components/sections/ProductsShowcase";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Industries } from "@/components/sections/Industries";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

// SoftwareApplication schema — covers the product suite for rich results
const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Fluide AI",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Android, iOS",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <main id="main-content" className="bg-ink text-text-primary pb-24 md:pb-0">
        <Hero />
        <SocialProof />
        <Services />
        <HowWeWork />
        <ProductsShowcase />
        <WhyChoose />
        <Industries />
        <FAQ />
        <FinalCTA />
      </main>
    </>
  );
}
