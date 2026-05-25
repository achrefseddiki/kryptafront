export interface Category {
  slug: string;
  label: string;
  parentSlug: string | null;
  img: string | null;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  oldPrice: number | null;
  img: string;
  images: string[];
  badge: string | null;
  specs: string[];
  inStock: boolean;
  categorySlug: string;
  reviews?: Review[];
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string | null;
  category: string;
  img: string;
  readTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface Drop {
  id: string;
  title: string;
  description: string;
  price: number;
  available: number;
  total: number;
  img: string;
  status: 'live' | 'sold_out' | 'upcoming';
  endsAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  body: string;
  productId: string;
  createdAt: string;
}

export interface FeaturedBuild {
  id: string;
  productId: string;
  product: Product;
  position: number;
}

export interface Offer {
  id: string;
  slug: string | null;
  title: string;
  description: string | null;
  price: number;
  img: string | null;
  images: string[];
  startDate: string | null;
  endDate: string | null;
  products: Product[];
  createdAt: string;
  updatedAt: string;
}

export interface KryptaBuild {
  id: string;
  name: string;
  tagline: string | null;
  badge: string | null;
  price: number;
  img: string | null;
  images: string[];
  specs: { label: string; value: string; icon?: string }[];
  fps1080: number | null;
  fps1440: number | null;
  fps4k: number | null;
  features: string[];
  inStock: boolean;
  createdAt: string;
}

export interface HeroContent {
  id: number;
  title1En: string | null;
  title1Fr: string | null;
  title2En: string | null;
  title2Fr: string | null;
  subtitleEn: string | null;
  subtitleFr: string | null;
  btn1LabelEn: string | null;
  btn1LabelFr: string | null;
  btn1Href: string | null;
  btn2LabelEn: string | null;
  btn2LabelFr: string | null;
  btn2Href: string | null;
}
