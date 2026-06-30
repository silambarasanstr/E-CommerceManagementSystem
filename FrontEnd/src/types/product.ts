export type CategoryType = {
  _id: string;
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
};

export interface ProductType {
  _id: string;
  name: string;
  slug?: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  category: CategoryType  // 👈 FIX: API may return populated OR ID
  brand: string;
  rating: number;
  reviews?: number;
  inStock?: boolean;
  isFeatured?: boolean;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
 
}
