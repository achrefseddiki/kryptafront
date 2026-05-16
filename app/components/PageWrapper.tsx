import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#0a0a0a] min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col gap-16 pt-14">{children}</main>
      <Footer />
    </div>
  );
}
