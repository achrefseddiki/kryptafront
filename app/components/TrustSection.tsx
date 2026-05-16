import { ASSETS } from "../lib/assets";

const TRUST_ITEMS = [
  {
    icon: ASSETS.iconTrustedQuality,
    title: "Trusted Quality",
    desc: "Authentic components from authorized distributors",
  },
  {
    icon: ASSETS.iconFastDelivery,
    title: "Fast Delivery",
    desc: "Quick shipping across Tunisia",
  },
  {
    icon: ASSETS.iconExpertSupport,
    title: "Expert Support",
    desc: "Professional guidance for your build",
  },
];

export default function TrustSection() {
  return (
    <section className="flex flex-col items-center gap-14 px-24 py-20">
      {/* Section heading */}
      <div className="flex flex-col items-center gap-5 text-center max-w-[791px]">
        <h2 className="text-[38px] font-bold leading-normal tracking-[-0.3px] text-white max-w-[658px]">
          {"Your Premier Destination for Gaming Hardware & PC Components"}
        </h2>
        <p className="text-[#a0a0a0] text-2xl font-normal leading-[39px]">
          {"KRYPTA is Tunisia's leading platform for high-performance gaming PCs, premium PC components, and professional gaming peripherals."}
        </p>
      </div>

      {/* Trust badges */}
      <div className="flex items-center justify-center gap-32 w-full max-w-[930px]">
        {TRUST_ITEMS.map(({ icon, title, desc }) => (
          <div key={title} className="flex flex-col items-center gap-3.5 max-w-[260px]">
            <img src={icon} alt="" className="size-[51px]" />
            <p className="text-[30px] font-medium text-white text-center leading-[42px]">{title}</p>
            <p className="text-[#a0a0a0] text-[18px] font-normal text-center leading-[25px]">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
