export type ProductType = {
  _id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  image?: string;
};

export const categories = [
  { id: "mobiles", name: "Mobiles" },
  { id: "appliances", name: "Home Appliances" },
];
