import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./lib/cart-context";
import { AuthProvider } from "./lib/auth-context";
import { LanguageProvider } from "./lib/language-context";
import { getLocale } from "./lib/i18n";
import Navbar from "./components/Navbar";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "KRYPTA - Best Gaming PCs & PC Components in Tunisia",
  description:
    "Tunisia's leading platform for high-performance gaming PCs, premium PC components, and professional gaming peripherals.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={spaceGrotesk.className}>
      <body className="min-h-screen flex flex-col bg-[#0a0a0a] text-white antialiased">
        <LanguageProvider initial={locale}>
          <AuthProvider>
            <CartProvider>
              <Navbar />
              {children}
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
