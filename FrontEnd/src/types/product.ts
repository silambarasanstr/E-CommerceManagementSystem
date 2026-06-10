export interface ProductType {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock?: boolean;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
}