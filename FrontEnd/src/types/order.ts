import type { CartItemTypes } from "./cart";
import type { PaymentMethodType } from "./payment";

export type OrderType = {
  _id: string;
  user: string;

  items: CartItemTypes[];

  shippingAddress: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    pincode: string;
  };

  paymentMethod: PaymentMethodType;
  paymentStatus: string;
  orderStatus: string;

  subtotal: number;
  discount: number;
  shippingFee: number;
  totalAmount: number;

  createdAt: string;
  updatedAt: string;
};
