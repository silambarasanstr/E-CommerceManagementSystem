export type CategoryType = {
  _id: string;
  name: string;
  description?: string;
  image?: string;
};



export interface ProductType {
  
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: CategoryType;
  inStock?: boolean;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  isFeatured?: boolean;
}