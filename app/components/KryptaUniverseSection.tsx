import { ASSETS, GRADIENT } from "../lib/assets";

const SERVICES = [
  {
    iconBg: "linear-gradient(90deg, #1e3aff 0%, #00f5ff 100%)",
    icon: ASSETS.iconDrops,
    title: "Drops",
    desc: "Limited edition releases and exclusive collaborations",
    href: "/drops",
  },
  {
    iconBg: "linear-gradient(90deg, #00f5ff 0%, #1e3aff 100%)",
    icon: ASSETS.iconRepair,
    title: "Krypta Repair",
    desc: "Bring your dream build to life with our expert team",
    href: "/repair",
  },
];

export default function KryptaUniverseSection() {
  return (
    <section className="px-24 flex flex-col gap-7">
      {/* Heading */}
      <div className="flex flex-col items-center gap-5 text-center">
        <h2 className="text-[38px] font-bold text-white tracking-[-0.3px] leading-normal">
          The Krypta Universe
        </h2>
        <p className="text-[#a0a0a0] text-2xl font-normal leading-[39px] max-w-[821px]">
          Discover Krypta services including custom PC builds, exclusive drops, esports content, and gaming community experiences in Tunisia.
        </p>
      </div>

      {/* Service cards */}
      <div className="flex gap-6">
        {SERVICES.map(({ iconBg, icon, title, desc, href }) => (
          <a
            key={title}
            href={href}
            className="flex-1 bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl p-8 h-[270px] relative hover:border-[rgba(255,255,255,0.2)] transition-colors"
          >
            <div className="size-12 rounded-2xl flex items-center justify-center" style={{ background: iconBg }}>
              <img src={icon} alt="" className="size-6" />
            </div>
            <h3 className="text-white text-5xl font-medium leading-[64px] mt-6">{title}</h3>
            <p className="text-[#a0a0a0] text-base font-normal leading-6 mt-4">{desc}</p>
            <div className="flex items-center gap-1 mt-4 absolute bottom-8 left-8">
              <span className="text-[#00f5ff] text-base font-normal leading-6">Explore</span>
              <img src={ASSETS.iconArrowSmall} alt="" className="size-4" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
