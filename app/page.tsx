import { ASSETS } from "./lib/assets";
import HeroSection from "./components/HeroSection";
import TrustSection from "./components/TrustSection";
import PCBuildsSection from "./components/PCBuildsSection";
import BlogOffersSection from "./components/BlogOffersSection";
import CategorySection from "./components/CategorySection";
import KryptaUniverseSection from "./components/KryptaUniverseSection";
import ComponentsSection from "./components/ComponentsSection";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <>
      <main className="flex flex-col gap-20 pt-14 pb-0">
        <HeroSection />
        <TrustSection />
        <PCBuildsSection />

        <div className="w-full h-[660px] overflow-hidden">
          <img src={ASSETS.decorativeBanner} alt="" className="w-full h-full object-cover" />
        </div>

        <BlogOffersSection />
        <CategorySection />
        <KryptaUniverseSection />
        <ComponentsSection />
        <FAQSection />
      </main>

      <Footer />
    </>
  );
}
