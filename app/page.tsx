import { ASSETS } from "./lib/assets";
import Navbar from "./components/Navbar";
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
    <div className="bg-[#0a0a0a] min-h-screen">
      <Navbar />

      <main className="flex flex-col gap-20 pt-14 pb-0">
        {/* Hero + promo banners */}
        <HeroSection />

        {/* Trust badges + platform intro */}
        <TrustSection />

        {/* Best Gaming PC Builds */}
        <PCBuildsSection />

        {/* Full-width decorative banner */}
        <div className="w-full h-[660px] overflow-hidden">
          <img
            src={ASSETS.decorativeBanner}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Blog / offer image scroll */}
        <BlogOffersSection />

        {/* Explore categories */}
        <CategorySection />

        {/* Krypta Universe */}
        <KryptaUniverseSection />

        {/* PC Components info */}
        <ComponentsSection />

        {/* FAQ */}
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}
