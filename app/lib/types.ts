export interface Category {
  slug: string;
  label: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  oldPrice: number | null;
  img: string;
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
