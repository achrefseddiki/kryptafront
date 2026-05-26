import Link from "next/link";
import PageWrapper from "../components/PageWrapper";
import { GRADIENT } from "../lib/assets";

const CARDS = [
  {
    href: "/account/orders",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
    title: "Order Issues",
    desc: "View your order history, track delivery status, and manage your purchases.",
    cta: "View my orders",
  },
  {
    href: "/lab/repair",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    title: "Repair & Service",
    desc: "Book a KryptaLab repair, upgrade, or custom PC assembly service.",
    cta: "Book a repair",
  },
  {
    href: "/builder",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: "PC Builder Help",
    desc: "Get expert advice on component compatibility and build configuration.",
    cta: "Open PC Builder",
  },
  {
    href: "mailto:support@krypta.tn",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    title: "Contact Us",
    desc: "Have a question not covered above? Reach us directly by email.",
    cta: "Send an email",
    external: true,
  },
];

export default function SupportPage() {
  return (
    <PageWrapper>
      <div className="px-4 sm:px-8 lg:px-24 pb-16 flex flex-col gap-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#a0a0a0] flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
          <span className="text-white/20">/</span>
          <span className="text-white">Support</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 pt-4">
          <div
            className="size-16 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(0,245,255,0.1)", border: "1px solid rgba(0,245,255,0.2)" }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00f5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">How can we help?</h1>
            <p className="text-[#a0a0a0] text-base lg:text-lg max-w-[540px]">
              Choose a topic below and we'll get you to the right place.
            </p>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 max-w-[900px] mx-auto w-full">
          {CARDS.map(({ href, icon, title, desc, cta, external }) => (
            <Link
              key={title}
              href={href as string}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 lg:p-8 flex flex-col gap-5 hover:border-[rgba(255,255,255,0.18)] transition-colors group"
            >
              <div
                className="size-14 rounded-2xl flex items-center justify-center text-[#00f5ff] shrink-0 transition-colors group-hover:bg-[#00f5ff]/15"
                style={{ background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.15)" }}
              >
                {icon}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <h2 className="text-white text-lg font-semibold">{title}</h2>
                <p className="text-[#a0a0a0] text-sm leading-relaxed">{desc}</p>
              </div>
              <span className="text-[#00f5ff] text-sm font-medium flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                {cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </Link>
          ))}
        </div>

        {/* Bottom reassurance */}
        <div className="flex flex-col items-center gap-3 text-center pt-4 pb-2 border-t border-[rgba(255,255,255,0.06)]">
          <p className="text-[#a0a0a0] text-sm">
            Our support team is available <span className="text-white">24/7</span>.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a href="mailto:support@krypta.tn" className="text-[#00f5ff] hover:underline">support@krypta.tn</a>
            <span className="text-[rgba(255,255,255,0.1)]">|</span>
            <a href="tel:+21600000000" className="text-[#00f5ff] hover:underline">+216 00 000 000</a>
          </div>
        </div>

      </div>
    </PageWrapper>
  );
}
