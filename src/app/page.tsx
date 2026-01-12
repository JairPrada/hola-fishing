import { CaptainSection } from "@/components/sections/CaptainSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { PackagesSection } from "@/components/sections/PackagesSection";
import { CallToActionSection } from "@/components/sections/CallToActionSection";
import Header from "@/components/ui/Header";
import {
  FloatingElements,
  MarineBubbles,
} from "@/components/ui/FloatingElements";
import { getAllPackages } from "@/data/fishing-packages";

export default function HomePage(): JSX.Element {
  const packages = getAllPackages();

  return (
    <main className="min-h-screen relative z-10 overflow-x-hidden" role="main">
      {/* Navegación principal */}
      <Header />

      {/* Hero section with main message */}
      <HeroSection />

      {/* Presentación del capitán */}
      <CaptainSection />

      {/* Catálogo de paquetes de pesca - Patrón Strategy */}
      <PackagesSection packages={packages} />

      {/* Llamada a la acción y contacto */}
      <CallToActionSection />
    </main>
  );
}
