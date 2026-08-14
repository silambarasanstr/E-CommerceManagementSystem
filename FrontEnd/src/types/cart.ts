export type CartItemTypes = {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  originalPrice?: number;
  discount?: number;
  product?: {
    _id: string;
    name: string;
    price?: number;
    image?: string;
    finalPrice?: number;
    // id?: string;
  };
};

export type CartResponse = {
  _id: string;
  user: string;
  items: CartItemTypes[];
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
};
