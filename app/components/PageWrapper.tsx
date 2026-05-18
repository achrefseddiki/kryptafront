import Footer from "./Footer";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex-1 flex flex-col gap-16 pt-14">{children}</main>
      <Footer />
    </>
  );
}
