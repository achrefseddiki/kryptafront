import { ASSETS, GRADIENT } from "../lib/assets";

const COMPONENT_DETAILS = [
  {
    title: "Graphics Cards (GPUs)",
    body: [
      { text: "The GPU is the heart of any gaming PC. We stock the latest ", highlight: false },
      { text: "NVIDIA RTX 40-series and AMD Radeon RX 7000-series graphics cards", highlight: true },
      { text: ", delivering exceptional performance for 4K gaming, ray tracing, and content creation. From budget-friendly options to flagship models, find the perfect GPU for your needs.", highlight: false },
    ],
  },
  {
    title: "Processors (CPUs)",
    body: [
      { text: "Choose from ", highlight: false },
      { text: "Intel Core i5, i7, i9", highlight: true },
      { text: " processors or ", highlight: false },
      { text: "AMD Ryzen 5, 7, 9", highlight: true },
      { text: " CPUs. Whether you need multi-threaded performance for streaming or high clock speeds for competitive gaming, we have the right processor for your build.", highlight: false },
    ],
  },
  {
    title: "DDR5 RAM & NVMe SSD Storage",
    body: [
      { text: "Fast DDR5 RAM ensures smooth multitasking, while NVMe SSDs provide lightning-fast load times. Our selection includes high-speed ", highlight: false },
      { text: "memory kits from Corsair, G.Skill, and Kingston", highlight: true },
      { text: ", plus Gen4 and Gen5 NVMe drives for maximum performance.", highlight: false },
    ],
  },
  {
    title: "Cooling Solutions",
    body: [
      { text: "Keep your system running cool with premium air coolers and AIO liquid cooling systems. Proper cooling extends component lifespan and enables higher overclocking potential for enthusiasts.", highlight: false },
    ],
  },
];

export default function ComponentsSection() {
  return (
    <section className="px-24 flex flex-col gap-10">
      {/* Top: heading + description */}
      <div className="flex flex-col gap-5 max-w-[691px]">
        <h2
          className="text-[39px] font-bold leading-10 tracking-[-0.36px] bg-clip-text text-transparent"
          style={{ backgroundImage: GRADIENT }}
        >
          Top PC Components for Performance
        </h2>
        <p className="text-[#a0a0a0] text-base font-normal leading-6 text-justify">
          Building a high-performance gaming PC starts with selecting the right components. Our expert-curated selection includes the latest CPUs, GPUs, motherboards, and memory modules designed for maximum gaming performance and multitasking capabilities.
        </p>
      </div>

      {/* 2×2 grid of component details */}
      <div className="grid grid-cols-2 gap-x-14 gap-y-14">
        {COMPONENT_DETAILS.map(({ title, body }) => (
          <div key={title} className="flex flex-col gap-3">
            <h3 className="text-white text-[32px] font-medium leading-[44.8px]">{title}</h3>
            <p className="text-[#a0a0a0] text-base font-normal leading-[26px] text-justify">
              {body.map(({ text, highlight }, i) =>
                highlight ? (
                  <span key={i} className="text-[#00f5ff]">{text}</span>
                ) : (
                  <span key={i}>{text}</span>
                )
              )}
            </p>
          </div>
        ))}
      </div>

      {/* CTA button */}
      <div className="flex justify-center">
        <a
          href="/components"
          className="h-14 px-10 rounded-2xl flex items-center gap-2 text-[#0a0a0a] text-base font-medium"
          style={{
            background: GRADIENT,
            filter: "drop-shadow(0px 10px 7.5px rgba(1,245,255,0.2)) drop-shadow(0px 4px 3px rgba(1,245,255,0.2))",
          }}
        >
          Browse All Components
          <img src={ASSETS.iconArrowRight} alt="" className="size-5" />
        </a>
      </div>
    </section>
  );
}
