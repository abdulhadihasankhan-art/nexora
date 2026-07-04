// app/page.tsx
import { Navbar } from "@/components/navigation/Navbar";
import { Hero } from "@/components/hero/Hero";
import { SocialProof } from "@/components/sections/SocialProof";
import { ProductsShowcase } from "@/components/sections/ProductsShowcase";
import { Services } from "@/components/sections/Services";
import { Industries } from "@/components/sections/Industries";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/layout/Footer";

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
      <Navbar />
      <main id="main-content" className="bg-ink text-text-primary">
        <Hero />
        <SocialProof />
        <ProductsShowcase />
        <Services />
        <Industries />
        <WhyChoose />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
