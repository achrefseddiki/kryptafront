import PageWrapper from "../components/PageWrapper";
import { GRADIENT } from "../lib/assets";
import { api } from "../lib/api";

const BUYING_GUIDE = [
  {
    title: "Choosing the Right PC Components",
    body: "Building a custom PC allows you to select exactly the components you need for your specific use case. Whether you're assembling a high-FPS esports machine, a 4K gaming powerhouse, or a workstation for content creation, understanding each component's role is essential for making informed purchasing decisions.",
  },
  {
    title: "Graphics Cards - The Heart of Gaming Performance",
    body: "The GPU is the most important component for gaming performance. Modern graphics cards handle rendering complex 3D graphics, ray tracing effects, and AI-enhanced features like NVIDIA DLSS or AMD FSR. Choose based on your target resolution: RTX 4060 for 1080p, RTX 4080 for 1440p/4K, and RTX 5090 for maximum 4K performance with ray tracing.",
  },
  {
    title: "Processors - Brain of Your System",
    body: "Your CPU handles game logic, physics calculations, and background tasks. Intel's 14th-gen processors offer excellent gaming performance with hybrid architecture, while AMD Ryzen 7000-series CPUs provide strong multi-threaded performance and platform longevity.",
  },
  {
    title: "Memory & Storage Essentials",
    body: "DDR5 RAM is now the standard for new builds, offering higher speeds (5600MHz+) and better performance headroom. 16GB is the minimum for gaming, while 32GB provides headroom for multitasking and content creation. NVMe Gen4 SSDs deliver excellent performance at reasonable prices.",
  },
];

export default async function PcComponentsPage() {
  const categories = await api.categories.list();

  return (
    <PageWrapper>
      <div className="px-24 flex flex-col gap-8">
        <nav className="flex items-center gap-2 text-sm text-[#a0a0a0]">
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <span className="text-white/20">/</span>
          <span className="text-white">PC Components</span>
        </nav>

        <div className="flex flex-col gap-4 max-w-[896px]">
          <h1 className="text-5xl font-bold text-white tracking-[-0.96px] leading-[48px]">PC Components</h1>
          <p className="text-[32px] font-normal text-[#a0a0a0] leading-[44.8px]">Premium parts for your custom build</p>
          <p className="text-base font-normal text-[#a0a0a0] leading-[26px] text-justify">
            {"Build your dream gaming PC with high-performance components from industry-leading manufacturers. Whether you're upgrading your existing system or building from scratch, KRYPTA offers genuine PC hardware including the latest graphics cards, processors, motherboards, RAM, storage solutions, and cooling systems—all backed by manufacturer warranties and expert support in Tunisia."}
          </p>
        </div>
      </div>

      <div className="px-24">
        <div className="grid grid-cols-4 gap-6">
          {categories.map(({ slug, label }) => (
            <a
              key={slug}
              href={`/products/${slug}`}
              className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-2xl h-[162px] flex flex-col items-center justify-center gap-2 hover:border-[#00f5ff]/50 hover:bg-[#1a1a1a]/80 transition-colors text-center"
            >
              <span className="text-5xl font-medium text-white">{label}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="px-24 flex flex-col gap-12 pb-10">
        <h2
          className="text-[36px] font-bold tracking-[-0.36px] bg-clip-text text-transparent"
          style={{ backgroundImage: GRADIENT }}
        >
          PC Components Buying Guide
        </h2>

        <div className="flex flex-col gap-10">
          {BUYING_GUIDE.map(({ title, body }) => (
            <div key={title} className="flex flex-col gap-4">
              <h3 className="text-5xl font-medium text-white leading-[64px]">{title}</h3>
              <p className="text-base font-normal text-[#a0a0a0] leading-[26px] text-justify">{body}</p>
            </div>
          ))}
        </div>

        <div
          className="rounded-2xl p-8 border border-[rgba(1,245,255,0.2)] flex flex-col gap-12"
          style={{ background: "linear-gradient(90deg, rgba(1,245,255,0.1) 0%, rgba(30,58,255,0.1) 100%)" }}
        >
          <div className="flex flex-col gap-4">
            <h3 className="text-5xl font-bold text-white leading-[64px]">
              Need Help Choosing Compatible Components?
            </h3>
            <p className="text-base font-normal text-[#a0a0a0] leading-6 text-justify max-w-[1079px]">
              Component compatibility is crucial — motherboards must match your CPU socket, RAM type, and power supply wattage must support your GPU. Use our PC configurator for automatic compatibility checking or consult with our expert team for personalized recommendations.
            </p>
          </div>
          <a
            href="/builder"
            className="self-start h-[51px] px-6 rounded-2xl flex items-center gap-3 text-[#0a0a0a] text-base font-medium"
            style={{ background: GRADIENT }}
          >
            Get Expert Help →
          </a>
        </div>
      </div>
    </PageWrapper>
  );
}
