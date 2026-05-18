import type { Category, Product, BlogPost, Drop, Review } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductSearchParams {
  category?: string;
  search?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

export const api = {
  categories: {
    list: () => get<Category[]>('/categories'),
    roots: () => get<Category[]>('/categories?root=true'),
    children: (parentSlug: string) => get<Category[]>(`/categories?parent=${parentSlug}`),
    get: (slug: string) => get<Category>(`/categories/${slug}`),
  },
  products: {
    search: (params: ProductSearchParams) => {
      const qs = new URLSearchParams();
      if (params.category) qs.set('category', params.category);
      if (params.search) qs.set('search', params.search);
      if (params.brand) qs.set('brand', params.brand);
      if (params.minPrice != null) qs.set('minPrice', String(params.minPrice));
      if (params.maxPrice != null) qs.set('maxPrice', String(params.maxPrice));
      if (params.page != null) qs.set('page', String(params.page));
      if (params.limit != null) qs.set('limit', String(params.limit));
      return get<PaginatedResult<Product>>(`/products?${qs.toString()}`);
    },
    get: (id: string) => get<Product>(`/products/${id}`),
    getBySlug: (slug: string) => get<Product>(`/products/slug/${slug}`),
    reviews: (productId: string) => get<Review[]>(`/products/${productId}/reviews`),
  },
  blogPosts: {
    list: (category?: string) =>
      get<BlogPost[]>(`/blog-posts${category ? `?category=${encodeURIComponent(category)}` : ''}`),
    get: (slug: string) => get<BlogPost>(`/blog-posts/${slug}`),
  },
  drops: {
    list: (status?: string) =>
      get<Drop[]>(`/drops${status ? `?status=${status}` : ''}`),
    get: (id: string) => get<Drop>(`/drops/${id}`),
  },
};
