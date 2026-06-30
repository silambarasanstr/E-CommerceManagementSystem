import type { ShippingTypes } from "./shipping";
import type { CartItemTypes } from "./cart";
import type { PaymentMethodType } from "./payment";

export type OrderType = {
  id: string;
  items: CartItemTypes[];
  total: number;
  grandTotal: number;
  date: string;
  status: "pending" | "processing" | "delivered";
  shippingDetails: ShippingTypes;
  paymentMethod: PaymentMethodType;
};
