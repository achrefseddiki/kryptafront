import { ASSETS } from "./assets";

export const PC_CATEGORIES = [
  { slug: "gpus", label: "GPUs", count: 24 },
  { slug: "cpus", label: "CPUs", count: 18 },
  { slug: "ram", label: "RAM", count: 32 },
  { slug: "storage", label: "Storage", count: 41 },
  { slug: "motherboards", label: "Boards", count: 27 },
  { slug: "power", label: "Power", count: 19 },
  { slug: "cooling", label: "Cooling", count: 35 },
  { slug: "cases", label: "Cases", count: 22 },
];

export const GPU_PRODUCTS = [
  { id: "rtx-5090", name: "NVIDIA GeForce RTX 5090", brand: "NVIDIA", price: 1999, oldPrice: 2199, img: ASSETS.productRtx5090, badge: "NEW", specs: ["32GB GDDR7", "PCIe 5.0", "575W TDP"] },
  { id: "rtx-4090", name: "NVIDIA GeForce RTX 4090", brand: "NVIDIA", price: 1499, oldPrice: null, img: ASSETS.productRtx5090, badge: null, specs: ["24GB GDDR6X", "PCIe 4.0", "450W TDP"] },
  { id: "rtx-4080-super", name: "NVIDIA GeForce RTX 4080 Super", brand: "NVIDIA", price: 999, oldPrice: 1099, img: ASSETS.productRtx5090, badge: "SALE", specs: ["16GB GDDR6X", "PCIe 4.0", "320W TDP"] },
  { id: "rx-7900-xtx", name: "AMD Radeon RX 7900 XTX", brand: "AMD", price: 899, oldPrice: null, img: ASSETS.productRtx5090, badge: null, specs: ["24GB GDDR6", "PCIe 4.0", "355W TDP"] },
  { id: "rtx-4070-ti", name: "NVIDIA GeForce RTX 4070 Ti", brand: "NVIDIA", price: 749, oldPrice: 799, img: ASSETS.productRtx5090, badge: null, specs: ["12GB GDDR6X", "PCIe 4.0", "285W TDP"] },
  { id: "rx-7800-xt", name: "AMD Radeon RX 7800 XT", brand: "AMD", price: 499, oldPrice: null, img: ASSETS.productRtx5090, badge: null, specs: ["16GB GDDR6", "PCIe 4.0", "263W TDP"] },
  { id: "rtx-4060-ti", name: "NVIDIA GeForce RTX 4060 Ti", brand: "NVIDIA", price: 399, oldPrice: 429, img: ASSETS.productRtx5090, badge: "SALE", specs: ["8GB GDDR6", "PCIe 4.0", "165W TDP"] },
  { id: "arc-a770", name: "Intel Arc A770", brand: "Intel", price: 299, oldPrice: null, img: ASSETS.productRtx5090, badge: null, specs: ["16GB GDDR6", "PCIe 4.0", "225W TDP"] },
];

export const BLOG_POSTS = [
  {
    slug: "rtx-5090-review",
    title: "NVIDIA RTX 5090 Review: The Ultimate 4K Gaming GPU",
    excerpt: "We put NVIDIA's flagship RTX 5090 through its paces in the latest AAA titles and benchmarks.",
    category: "Reviews",
    date: "May 10, 2026",
    readTime: "8 min read",
    img: ASSETS.productRtx5090,
  },
  {
    slug: "best-gaming-pc-builds-2026",
    title: "Best Gaming PC Builds in Tunisia for 2026",
    excerpt: "Our expert team curates the best value-for-money gaming PC configurations across all budget ranges.",
    category: "Guides",
    date: "May 5, 2026",
    readTime: "12 min read",
    img: ASSETS.catGamingPCs,
  },
  {
    slug: "ddr5-vs-ddr4-gaming",
    title: "DDR5 vs DDR4: Does It Matter for Gaming in 2026?",
    excerpt: "We test 20+ games to see if upgrading to DDR5 RAM actually improves your gaming experience.",
    category: "Guides",
    date: "Apr 28, 2026",
    readTime: "6 min read",
    img: ASSETS.catComponents,
  },
  {
    slug: "pc-building-beginners-guide",
    title: "The Complete PC Building Guide for Beginners in Tunisia",
    excerpt: "Everything you need to know about building your first gaming PC, from choosing parts to final assembly.",
    category: "Tutorials",
    date: "Apr 20, 2026",
    readTime: "15 min read",
    img: ASSETS.catComponents,
  },
  {
    slug: "best-gaming-peripherals-2026",
    title: "Best Gaming Peripherals for 2026: Mice, Keyboards & Headsets",
    excerpt: "Level up your gaming setup with our curated selection of the best peripherals available in Tunisia.",
    category: "Reviews",
    date: "Apr 15, 2026",
    readTime: "10 min read",
    img: ASSETS.catPeripherals,
  },
  {
    slug: "krypta-rtx-5090-build",
    title: "Inside the KRYPTA RTX 5090 Flagship Build",
    excerpt: "A deep dive into how we assemble our most powerful custom PC build, part by part.",
    category: "Behind the Build",
    date: "Apr 8, 2026",
    readTime: "9 min read",
    img: ASSETS.productRtx5090,
  },
];

export const CART_ITEMS = [
  { id: "rtx-5090", name: "NVIDIA GeForce RTX 5090 24GB", price: 1999, qty: 1, img: ASSETS.productRtx5090 },
  { id: "mouse", name: "Professional Gaming Mouse", price: 149, qty: 1, img: ASSETS.productGamingMouse },
];

export const BUILDER_COMPONENTS = [
  { slot: "CPU", label: "Processor", selected: "Intel Core i9-14900K" },
  { slot: "GPU", label: "Graphics Card", selected: "NVIDIA RTX 5090" },
  { slot: "MB", label: "Motherboard", selected: null },
  { slot: "RAM", label: "Memory", selected: null },
  { slot: "SSD", label: "Storage", selected: null },
  { slot: "PSU", label: "Power Supply", selected: null },
  { slot: "CASE", label: "Case", selected: null },
  { slot: "COOL", label: "CPU Cooler", selected: null },
];
