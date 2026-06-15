import { Hero } from "@/components/Hero";
import { CapabilityLayers } from "@/components/CapabilityLayers";
import { ProductOrbit } from "@/components/ProductOrbit";
import { AuditEngine } from "@/components/AuditEngine";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <CapabilityLayers />
      <ProductOrbit />
      <AuditEngine />
      <Footer />
    </main>
  );
}
